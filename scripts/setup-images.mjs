import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';

const IMAGES_DIR = path.resolve(process.cwd(), 'public/images');

if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

const images = [
  { file: 'hero.jpg', id: '1509042239860-f550ce710b93', w: 1200, h: 800 },
  { file: 'about-1.jpg', id: '1554118811-1e0d58224f24', w: 900, h: 1100 },
  { file: 'about-2.jpg', id: '1447933601403-0c6688de566e', w: 900, h: 700 },
  { file: 'menu-latte.jpg', id: '1534778101976-62847782c213', w: 600, h: 600 },
  { file: 'menu-pour-over.jpg', id: '1514432324607-a09d9b4aefdd', w: 600, h: 600 },
  { file: 'menu-espresso.jpg', id: '1510591509098-f4fdc6d0ff04', w: 600, h: 600 },
  { file: 'menu-cold-brew.jpg', id: '1517701550927-30cf4ba1dba5', w: 600, h: 600 },
  { file: 'menu-cappuccino.jpg', id: '1572442388796-11668a67e53d', w: 600, h: 600 },
  { file: 'menu-cortado.jpg', id: '1511920170033-f8396924c348', w: 600, h: 600 },
  { file: 'menu-matcha.jpg', id: '1536256263959-770b48d82b0a', w: 600, h: 600 },
  { file: 'menu-chai.jpg', id: '1576092768241-dec231879fc3', w: 600, h: 600 },
  { file: 'menu-earl-grey.jpg', id: '1597481499750-3e6b22637e12', w: 600, h: 600 },
  { file: 'menu-jasmine.jpg', id: '1564890369478-c89ca6d9cde9', w: 600, h: 600 },
  { file: 'menu-croissant.jpg', id: '1555507036-ab1f4038808a', w: 600, h: 600 },
  { file: 'menu-cinnamon.jpg', id: '1509440159596-0249088772ff', w: 600, h: 600 },
  { file: 'menu-sourdough.jpg', id: '1589367920969-ab8e050bbb04', w: 600, h: 600 },
  { file: 'menu-avocado.jpg', id: '1525351484163-7529414344d8', w: 600, h: 600 },
  { file: 'menu-shakshuka.jpg', id: '1590412200988-a436970781fa', w: 600, h: 600 },
  { file: 'menu-pancakes.jpg', id: '1528198691055-4b52a6247380', w: 600, h: 600 },
  { file: 'gallery-1.jpg', id: '1495474472287-4d71bcdd2085', w: 800, h: 900 },
  { file: 'gallery-2.jpg', id: '1442512595331-e89e73853f31', w: 800, h: 600 },
  { file: 'gallery-3.jpg', id: '1498804103079-a6351b050096', w: 800, h: 1000 },
  { file: 'gallery-4.jpg', id: '1497636577773-f1231844b336', w: 800, h: 600 },
  { file: 'gallery-5.jpg', id: '1509440159596-0249088772ff', w: 800, h: 900 },
  { file: 'gallery-6.jpg', id: '1517256064527-09c73fc73e38', w: 800, h: 600 },
  { file: 'gallery-7.jpg', id: '1521017432531-fbd92d768814', w: 800, h: 1000 },
  { file: 'gallery-8.jpg', id: '1559925393-8be0ec4767c8', w: 800, h: 600 },
  { file: 'avatar-1.jpg', id: '1494790108377-be9c29b29330', w: 200, h: 200 },
  { file: 'avatar-2.jpg', id: '1507003211169-0a1dd7228f2d', w: 200, h: 200 },
  { file: 'avatar-3.jpg', id: '1534528741775-53994a69daeb', w: 200, h: 200 },
];

function downloadUrl(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadUrl(res.headers.location, dest).then(resolve, reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed with status ${res.statusCode}`));
      }
      const fileStream = fs.createWriteStream(dest);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close(resolve);
      });
      fileStream.on('error', reject);
    }).on('error', reject);
  });
}

async function run() {
  console.log(`Starting download of ${images.length} cafe demo images...`);
  let successCount = 0;
  for (const item of images) {
    const dest = path.join(IMAGES_DIR, item.file);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
      console.log(`✓ ${item.file} already exists`);
      successCount++;
      continue;
    }
    const url = `https://images.unsplash.com/photo-${item.id}?auto=format&fit=crop&w=${item.w}&h=${item.h}&q=75`;
    try {
      await downloadUrl(url, dest);
      console.log(`✓ Downloaded ${item.file}`);
      successCount++;
    } catch (err) {
      console.error(`✗ Failed downloading ${item.file}:`, err.message);
    }
  }
  console.log(`Finished: ${successCount}/${images.length} images ready.`);
}

run();
