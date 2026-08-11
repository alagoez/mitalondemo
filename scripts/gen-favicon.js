/* Logo SVG'sinden sekme ikonlarını üretir: icon.png (512, şeffaf) + apple-icon.png (180, beyaz zemin).
   Kullanım: node scripts/gen-favicon.js */
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

(async () => {
  const svg = fs.readFileSync(
    path.join(__dirname, "..", "public", "images", "mitalon-logo.svg"),
    "utf8",
  );

  const browser = await chromium.launch();

  // Amblem, logonun üst ~%72'si (altta MITALON yazısı var — küçük boyutta okunmaz, kırpılır)
  const makeHtml = (box, logoW, bg) => {
    const logoH = logoW * (402 / 553);
    const cropH = Math.round(logoH * 0.72);
    return `<!doctype html><style>
      html,body{margin:0;padding:0;background:${bg};width:${box}px;height:${box}px;overflow:hidden}
      body{display:grid;place-items:center}
      .crop{width:${logoW}px;height:${cropH}px;overflow:hidden}
      .crop svg{width:${logoW}px;height:auto;display:block}
    </style><div class="crop">${svg}</div>`;
  };

  const page = await browser.newPage({ viewport: { width: 512, height: 512 } });
  await page.setContent(makeHtml(512, 470, "transparent"));
  await page.screenshot({
    path: path.join(__dirname, "..", "src", "app", "icon.png"),
    omitBackground: true,
  });

  const page2 = await browser.newPage({ viewport: { width: 180, height: 180 } });
  await page2.setContent(makeHtml(180, 132, "#ffffff"));
  await page2.screenshot({
    path: path.join(__dirname, "..", "src", "app", "apple-icon.png"),
  });

  await browser.close();
  console.log("icon.png + apple-icon.png yazildi");
})();
