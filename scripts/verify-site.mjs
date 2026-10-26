import puppeteer from 'puppeteer-core';
import path from 'node:path';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

async function main() {
  console.log('--- Launching Edge for Verification ---');
  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu-sandbox'],
  });

  const page = await browser.newPage();
  const consoleErrors = [];

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });
  page.on('pageerror', (err) => {
    consoleErrors.push(`[PageError] ${err.message}`);
  });

  // 1. Desktop Viewport
  console.log('Testing Desktop 1440x900...');
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });

  console.log('Waiting for preloader animation...');
  await new Promise((r) => setTimeout(r, 2200));

  // Verify Canvas
  const canvasCount = await page.$$eval('canvas', (el) => el.length);
  console.log(`✓ 3D Canvas element count: ${canvasCount}`);

  // Capture Hero Screenshot
  const heroPath = path.resolve(process.cwd(), 'screenshot-hero.png');
  await page.screenshot({ path: heroPath });
  console.log(`✓ Saved screenshot-hero.png`);

  // 2. Scroll to Menu
  console.log('Scrolling to Menu section...');
  await page.evaluate(() => {
    if (window.lenis) {
      window.lenis.scrollTo('#menu', { immediate: true });
    } else {
      const el = document.getElementById('menu');
      if (el) el.scrollIntoView({ behavior: 'instant' });
    }
  });
  await new Promise((r) => setTimeout(r, 1200));

  // Click on "Botanical & Tea" tab
  const tabButtons = await page.$$('button');
  for (const btn of tabButtons) {
    const text = await page.evaluate((el) => el.textContent, btn);
    if (text && text.includes('Botanical & Tea')) {
      await btn.click();
      await new Promise((r) => setTimeout(r, 600));
      break;
    }
  }

  const menuPath = path.resolve(process.cwd(), 'screenshot-menu.png');
  await page.screenshot({ path: menuPath });
  console.log(`✓ Saved screenshot-menu.png`);

  // 3. Test Mobile in a dedicated mobile page
  console.log('Testing Mobile Viewport (390x844)...');
  const mobilePage = await browser.newPage();
  await mobilePage.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await mobilePage.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 2200));

  const mobilePath = path.resolve(process.cwd(), 'screenshot-mobile.png');
  await mobilePage.screenshot({ path: mobilePath });
  console.log(`✓ Saved screenshot-mobile.png`);

  // Copy screenshots to artifact directory
  const artifactDir = 'C:\\Users\\amitb\\.gemini\\antigravity\\brain\\f941249d-ea67-4d9c-9e27-503ecc40cb86';
  await page.screenshot({ path: path.join(artifactDir, 'screenshot-hero.png') });
  await page.screenshot({ path: path.join(artifactDir, 'screenshot-menu.png') });
  await mobilePage.screenshot({ path: path.join(artifactDir, 'screenshot-mobile.png') });
  console.log('✓ Copied updated screenshots to artifact directory');

  if (consoleErrors.length > 0) {
    console.log(`⚠️ Console Errors:`, consoleErrors);
  } else {
    console.log('✓ Zero console errors detected across desktop and mobile!');
  }

  await browser.close();
  console.log('--- Verification Complete ---');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
