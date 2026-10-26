import * as THREE from 'three';

/**
 * Procedurally generates a high-resolution latte art rosette / tulip heart texture
 * using HTML5 Canvas, eliminating the need for any external image files.
 */
export function createLatteArtTexture(): THREE.CanvasTexture {
  const size = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2;

  // 1. Base espresso crema background (radial gradient)
  const baseGrad = ctx.createRadialGradient(cx, cy, r * 0.1, cx, cy, r);
  baseGrad.addColorStop(0, '#5A3319');   // Deep rich espresso core
  baseGrad.addColorStop(0.35, '#854B24'); // Golden roasted crema
  baseGrad.addColorStop(0.7, '#A66638');  // Caramel foam edge
  baseGrad.addColorStop(0.92, '#C2834E'); // Warm crema froth
  baseGrad.addColorStop(1, '#663B1C');    // Outer espresso ring rim

  ctx.fillStyle = baseGrad;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();

  // 2. Micro-texture / crema marbling
  ctx.save();
  ctx.globalAlpha = 0.08;
  for (let i = 0; i < 400; i++) {
    const angle = Math.random() * Math.PI * 2;
    const dist = Math.random() * r * 0.95;
    const px = cx + Math.cos(angle) * dist;
    const py = cy + Math.sin(angle) * dist;
    const rad = 2 + Math.random() * 8;
    ctx.fillStyle = Math.random() > 0.5 ? '#FAF2E6' : '#3E200C';
    ctx.beginPath();
    ctx.arc(px, py, rad, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  // Helper to draw a soft milk leaf / heart tier
  const drawHeartTier = (yOffset: number, scaleX: number, scaleY: number, alpha: number) => {
    ctx.save();
    ctx.translate(cx, cy + yOffset);
    ctx.scale(scaleX, scaleY);
    ctx.globalAlpha = alpha;

    // Cream gradient for soft feathered milk foam
    const foamGrad = ctx.createRadialGradient(0, 0, 10, 0, 0, 120);
    foamGrad.addColorStop(0, '#FFFDF8');
    foamGrad.addColorStop(0.7, '#F7EDDE');
    foamGrad.addColorStop(1, 'rgba(235, 218, 196, 0)');

    ctx.fillStyle = foamGrad;
    ctx.beginPath();
    // Heart shape with bezier curves
    ctx.moveTo(0, 40);
    ctx.bezierCurveTo(-90, -30, -90, -110, 0, -60);
    ctx.bezierCurveTo(90, -110, 90, -30, 0, 40);
    ctx.fill();

    // Secondary inner highlight
    ctx.globalAlpha = alpha * 0.85;
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.moveTo(0, 30);
    ctx.bezierCurveTo(-65, -20, -65, -90, 0, -50);
    ctx.bezierCurveTo(65, -90, 65, -20, 0, 30);
    ctx.fill();

    ctx.restore();
  };

  // Helper to draw lateral feathering wings (Rosetta leaves)
  const drawWing = (yPos: number, angle: number, length: number, width: number, opacity: number) => {
    ctx.save();
    ctx.translate(cx, cy + yPos);
    ctx.rotate(angle);
    ctx.globalAlpha = opacity;

    const wingGrad = ctx.createLinearGradient(0, 0, length, 0);
    wingGrad.addColorStop(0, 'rgba(255, 253, 248, 0.95)');
    wingGrad.addColorStop(0.7, 'rgba(247, 237, 222, 0.8)');
    wingGrad.addColorStop(1, 'rgba(220, 190, 160, 0)');

    ctx.fillStyle = wingGrad;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(length * 0.4, -width, length * 0.8, -width * 0.5, length, 0);
    ctx.bezierCurveTo(length * 0.8, width * 0.5, length * 0.4, width, 0, 0);
    ctx.fill();

    ctx.restore();
  };

  // 3. Draw Rosetta tiers (stacked from base to crown)
  // Base tier
  drawHeartTier(180, 1.3, 1.1, 0.92);

  // Middle ascending tiers with feathered wings
  const tiers = [
    { y: 130, sx: 1.2, sy: 1.0, wingL: 140, wingW: 30, rot: 0.38 },
    { y: 80,  sx: 1.1, sy: 0.9, wingL: 155, wingW: 28, rot: 0.48 },
    { y: 30,  sx: 1.0, sy: 0.85, wingL: 160, wingW: 26, rot: 0.58 },
    { y: -20, sx: 0.9, sy: 0.8, wingL: 150, wingW: 24, rot: 0.68 },
    { y: -70, sx: 0.8, sy: 0.75, wingL: 130, wingW: 22, rot: 0.78 },
    { y: -120, sx: 0.7, sy: 0.7, wingL: 105, wingW: 19, rot: 0.88 },
  ];

  tiers.forEach(t => {
    drawWing(t.y, -t.rot, t.wingL, t.wingW, 0.85);
    drawWing(t.y, Math.PI + t.rot, t.wingL, t.wingW, 0.85);
    drawHeartTier(t.y, t.sx, t.sy, 0.9);
  });

  // Top heart crown
  drawHeartTier(-170, 0.6, 0.6, 0.95);
  drawHeartTier(-210, 0.45, 0.45, 0.98);

  // 4. Central cut-through stem line (characteristic barista pour pull)
  ctx.save();
  ctx.globalAlpha = 0.85;
  const stemGrad = ctx.createLinearGradient(cx, cy - 240, cx, cy + 240);
  stemGrad.addColorStop(0, '#FFFFFF');
  stemGrad.addColorStop(0.3, '#FFF7EE');
  stemGrad.addColorStop(0.8, '#F0E0D0');
  stemGrad.addColorStop(1, 'rgba(215, 175, 140, 0.3)');

  ctx.strokeStyle = stemGrad;
  ctx.lineWidth = 9;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(cx, cy - 240);
  ctx.lineTo(cx, cy + 220);
  ctx.stroke();

  // Subtle heart tip at the bottom of the cut
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.arc(cx, cy + 225, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // 5. Crema contrast ring border
  ctx.save();
  ctx.strokeStyle = '#43220E';
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.arc(cx, cy, r - 7, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return texture;
}
