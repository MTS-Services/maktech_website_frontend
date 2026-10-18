// Draws a service case-study card onto a canvas so CurveFlowCarousel can use
// it as a WebGL texture (the ribbon bends every pixel column differently,
// which DOM/CSS cannot do). Two layouts, picked by the requested aspect ratio:
// the desktop card mirrors the original two-column card, the portrait card is
// a stacked version for phones. All sizes are in design pixels.
const LANDSCAPE = { w: 1000, h: 640 };
const PORTRAIT = { w: 360, h: 600 };

export const LANDSCAPE_RATIO = LANDSCAPE.w / LANDSCAPE.h;
export const PORTRAIT_RATIO = PORTRAIT.w / PORTRAIT.h;

const FONT = '"DM Sans", ui-sans-serif, system-ui, sans-serif';
const COLORS = {
  card: "#F3F3F3", // bg-white/95 over the page's #1c1c1c
  title: "#101828", // gray-900
  heading: "#3D3D3D",
  body: "#666666",
  badgeBg: "#FFEDD4", // orange-100
  badgeText: "#F54900", // orange-600
  accent: "#FF6900", // orange-500
  white: "#FFFFFF",
};
const OPERATIONS = [
  "Built for startups.",
  "Structured for SMEs.",
  "Engineered for enterprise scale.",
];

let fontsPromise = null;
const loadFonts = () => {
  if (!fontsPromise)
    fontsPromise = document.fonts
      ? Promise.all(
          [400, 500, 600, 700].map((weight) =>
            document.fonts.load(`${weight} 16px "DM Sans"`),
          ),
        ).catch(() => {})
      : Promise.resolve();
  return fontsPromise;
};

const loadImage = (src) =>
  new Promise((done) => {
    const img = new Image();
    img.onload = () => done(img.naturalWidth ? img : null);
    img.onerror = () => done(null);
    img.src = src;
  });

const setFont = (ctx, weight, size) => {
  ctx.font = `${weight} ${size}px ${FONT}`;
};

const roundRect = (ctx, x, y, w, h, r) => {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
};

/** Word-wraps text (honouring "\n") into at most maxLines, ellipsising the last. */
const wrapLines = (ctx, text, maxWidth, maxLines) => {
  const lines = [];
  for (const paragraph of text.split("\n")) {
    let line = "";
    for (const word of paragraph.split(" ")) {
      const next = line ? `${line} ${word}` : word;
      if (line && ctx.measureText(next).width > maxWidth) {
        lines.push(line);
        line = word;
      } else line = next;
    }
    lines.push(line);
  }
  if (lines.length <= maxLines) return lines;
  const kept = lines.slice(0, maxLines);
  let last = kept[maxLines - 1];
  while (last && ctx.measureText(`${last}…`).width > maxWidth)
    last = last.slice(0, -1).trimEnd();
  kept[maxLines - 1] = `${last}…`;
  return kept;
};

/** Draws lines top-down, each vertically centred in its line box like CSS. */
const drawLines = (ctx, lines, x, y, lineHeight) => {
  ctx.textBaseline = "middle";
  lines.forEach((line, i) => ctx.fillText(line, x, y + i * lineHeight + lineHeight / 2));
  return lines.length * lineHeight;
};

const drawCover = (ctx, img, x, y, w, h, r) => {
  ctx.save();
  roundRect(ctx, x, y, w, h, r);
  ctx.clip();
  if (img) {
    const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight);
    const dw = img.naturalWidth * scale;
    const dh = img.naturalHeight * scale;
    ctx.drawImage(img, x + (w - dw) / 2, y + (h - dh) / 2, dw, dh);
  } else {
    const fade = ctx.createLinearGradient(x, y, x + w, y + h);
    fade.addColorStop(0, "#FB923C");
    fade.addColorStop(1, "#EA580C");
    ctx.fillStyle = fade;
    ctx.fillRect(x, y, w, h);
  }
  ctx.restore();
};

const drawBadge = (ctx, label, x, y, h, size) => {
  setFont(ctx, 500, size);
  const dot = h * 0.3;
  const padX = h * 0.47;
  const gap = h * 0.27;
  const w = padX + dot + gap + ctx.measureText(label).width + padX;
  ctx.fillStyle = COLORS.badgeBg;
  roundRect(ctx, x, y, w, h, h / 2);
  ctx.fill();
  ctx.fillStyle = COLORS.accent;
  ctx.beginPath();
  ctx.arc(x + padX + dot / 2, y + h / 2, dot / 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = COLORS.badgeText;
  ctx.textBaseline = "middle";
  ctx.fillText(label, x + padX + dot + gap, y + h / 2);
};

const drawBullets = (ctx, items, x, y, maxWidth, size, lineHeight) => {
  setFont(ctx, 400, size);
  items.forEach((item, i) => {
    const mid = y + i * lineHeight + lineHeight / 2;
    ctx.fillStyle = COLORS.accent;
    ctx.beginPath();
    ctx.arc(x + 2, mid, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = COLORS.body;
    ctx.textBaseline = "middle";
    ctx.fillText(wrapLines(ctx, item, maxWidth - 16, 1)[0], x + 16, mid);
  });
  return items.length * lineHeight;
};

const drawButton = (ctx, label, x, y, h, size) => {
  setFont(ctx, 500, size);
  const circle = h * 0.66;
  const padL = h * 0.5;
  const inset = (h - circle) / 2;
  const textW = ctx.measureText(label).width;
  const w = padL + textW + h * 0.25 + circle + inset;
  ctx.fillStyle = COLORS.accent;
  roundRect(ctx, x, y, w, h, h / 2);
  ctx.fill();
  ctx.fillStyle = COLORS.white;
  ctx.textBaseline = "middle";
  ctx.fillText(label, x + padL, y + h / 2);

  const cx = x + w - inset - circle / 2;
  const cy = y + h / 2;
  ctx.beginPath();
  ctx.arc(cx, cy, circle / 2, 0, Math.PI * 2);
  ctx.fill();
  // Arrow, same path as the site's 16×16 arrow icon
  const s = (circle * 0.44) / 16;
  ctx.save();
  ctx.translate(cx - 8 * s, cy - 8 * s);
  ctx.scale(s, s);
  ctx.strokeStyle = COLORS.accent;
  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  ctx.moveTo(3, 8);
  ctx.lineTo(13, 8);
  ctx.moveTo(9, 4);
  ctx.lineTo(13, 8);
  ctx.lineTo(9, 12);
  ctx.stroke();
  ctx.restore();
};

const drawLandscape = (ctx, service, img) => {
  const { w, h } = LANDSCAPE;
  const pad = 48;
  const col = (w - pad * 3) / 2;
  const left = pad;
  const right = pad * 2 + col;

  // Left column: badge, title, image
  drawBadge(ctx, service.badge, left, pad, 30, 13);
  let y = pad + 30 + 20;
  setFont(ctx, 700, 32);
  ctx.fillStyle = COLORS.title;
  y += drawLines(ctx, wrapLines(ctx, service.title, col, 2), left, y, 36);
  y += 28;
  drawCover(ctx, img, left, y, col, (col * 9) / 16, 8);

  // Right column: results, description, lists, button
  let ry = pad;
  setFont(ctx, 600, 21);
  ctx.fillStyle = COLORS.body;
  ry += drawLines(ctx, ["Results."], right, ry, 28);
  ry += 6;
  setFont(ctx, 400, 15.5);
  ry += drawLines(ctx, wrapLines(ctx, service.results, col, 2), right, ry, 23);
  ry += 18;
  ry += drawLines(ctx, wrapLines(ctx, service.description, col, 3), right, ry, 25);
  ry += 24;
  setFont(ctx, 600, 21);
  ctx.fillStyle = COLORS.heading;
  ry += drawLines(ctx, ["What We Build"], right, ry, 28);
  ry += 10;
  ry += drawBullets(ctx, service.build.slice(0, 4), right, ry, col, 13.5, 24);
  ry += 22;
  setFont(ctx, 600, 21);
  ctx.fillStyle = COLORS.heading;
  ry += drawLines(ctx, ["Our Operations"], right, ry, 28);
  ry += 8;
  setFont(ctx, 400, 13.5);
  ctx.fillStyle = COLORS.body;
  drawLines(ctx, OPERATIONS, right, ry, 20);

  drawButton(ctx, "See Our Work", right, h - pad - 48, 48, 16);
};

const drawPortrait = (ctx, service, img) => {
  const { w, h } = PORTRAIT;
  const pad = 22;
  const col = w - pad * 2;

  drawBadge(ctx, service.badge, pad, pad, 28, 12);
  let y = pad + 28 + 14;
  setFont(ctx, 700, 24);
  ctx.fillStyle = COLORS.title;
  y += drawLines(ctx, wrapLines(ctx, service.title, col, 2), pad, y, 28);
  y += 14;
  const imageH = (col * 9) / 16;
  drawCover(ctx, img, pad, y, col, imageH, 8);
  y += imageH + 18;
  setFont(ctx, 600, 17);
  ctx.fillStyle = COLORS.body;
  y += drawLines(ctx, ["Results."], pad, y, 22);
  y += 4;
  setFont(ctx, 400, 13);
  y += drawLines(ctx, wrapLines(ctx, service.results, col, 2), pad, y, 19);
  y += 14;
  setFont(ctx, 600, 17);
  ctx.fillStyle = COLORS.heading;
  y += drawLines(ctx, ["What We Build"], pad, y, 22);
  y += 6;
  drawBullets(ctx, service.build.slice(0, 4), pad, y, col, 12.5, 20);

  drawButton(ctx, "See Our Work", pad, h - pad - 40, 40, 14);
};

/**
 * Turns a service into a CurveFlowCarousel slide whose face is drawn on a
 * canvas. `prepare` loads the image and fonts once; `draw` renders the card at
 * the exact pixel size the carousel shows it, so text stays sharp.
 */
export const createServiceCardSlide = (service) => {
  let img = null;
  return {
    title: service.title.replace("\n", " "),
    href: service.href,
    prepare: () =>
      Promise.all([loadImage(service.image), loadFonts()]).then(([loaded]) => {
        img = loaded;
      }),
    draw: (width, height) => {
      const portrait = width / height < 1;
      const design = portrait ? PORTRAIT : LANDSCAPE;
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return null;
      ctx.scale(width / design.w, height / design.h);
      ctx.fillStyle = COLORS.card;
      ctx.fillRect(0, 0, design.w, design.h);
      if (portrait) drawPortrait(ctx, service, img);
      else drawLandscape(ctx, service, img);
      return canvas;
    },
  };
};
