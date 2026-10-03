// Run with Playwright available in NODE_PATH. Writes images for mandatory visual review.
// Optional second argument: a browser fixture containing the actual diagram components.
const fs = require('fs');
const path = require('path');
const assert = require('assert/strict');
const { chromium } = require('playwright');

(async () => {
  const output = path.resolve(process.argv[2] || 'artifacts/integrated-science-labels');
  fs.mkdirSync(output, { recursive: true });
  const browser = await chromium.launch({ headless: true, channel: process.env.PLAYWRIGHT_CHANNEL || 'msedge' });
  try {
    const page = await browser.newPage({ viewport: { width: 1100, height: 900 } });
    const source = fs.readFileSync(path.join(__dirname, '../public/integrated-science/diagrams/bean-seed-labelled.svg'), 'utf8');
    await page.setContent(`<style>body{margin:0;background:white}svg{width:1000px;height:auto;display:block}</style>${source}`);
    await page.locator('svg').screenshot({ path: path.join(output, 'bean-seed-desktop.png') });
    const geometry = await page.locator('svg').evaluate(svg => {
      const rect = node => {
        const b = node.getBoundingClientRect();
        return { x: b.x, y: b.y, width: b.width, height: b.height };
      };
      return {
        labels: [...svg.querySelectorAll('text')].map(node => ({ text: node.textContent, ...rect(node) })),
        arrows: [...svg.querySelectorAll('path')].filter(node => getComputedStyle(node).fill === 'rgb(67, 67, 67)').map(rect),
      };
    });
    assert.equal(geometry.labels.length, 11, 'Both dicot and monocot labels must remain');
    assert.equal(geometry.arrows.length, 8, 'All source leader arrows must remain');
    const overlaps = (a, b, gap) => a.x - gap < b.x + b.width && a.x + a.width + gap > b.x && a.y - gap < b.y + b.height && a.y + a.height + gap > b.y;
    geometry.labels.forEach((label, i) => {
      // Four CSS pixels includes the white text stroke, arrow outline and a visible gap.
      geometry.arrows.forEach(arrow => assert(!overlaps(label, arrow, 4), `${label.text} touches an arrow`));
      geometry.labels.slice(i + 1).forEach(other => assert(!overlaps(label, other, 4), `${label.text} touches ${other.text}`));
      assert(label.height >= 14, `${label.text} became too small at normal desktop width`);
    });
    fs.writeFileSync(path.join(output, 'bean-label-geometry.json'), JSON.stringify(geometry, null, 2));
    if (process.argv[3]) {
      const femaleNames = ['Ovary', 'Oviduct', 'Uterus', 'Cervix', 'Vagina', 'Endometrium'];
      for (const [device, width, height] of [['desktop',1440,1000],['tablet',820,1180],['ipad',1024,1366],['mobile',390,844]]) {
        await page.setViewportSize({ width, height });
        await page.goto(process.argv[3]);
        const female = page.locator('#female-reproductive-system');
        assert.equal(await female.locator('.spark-label-target-group').count(), 6);
        const mobile = await female.locator('.spark-label-diagram-mobile-targets').isVisible();
        const targets = female.locator(mobile ? '.spark-label-diagram-mobile-targets button' : '.spark-label-target');
        for (let i = 0; i < femaleNames.length; i++) {
          const label = female.getByRole('complementary', { name: 'Labels' }).getByRole('button', { name: femaleNames[i], exact: true });
          if (mobile) { await label.click(); await targets.nth(i).click(); }
          else await label.dragTo(targets.nth(i));
        }
        await female.getByRole('button', { name: 'Check answers' }).click();
        assert.match(await female.getByRole('status').textContent(), /6\/6/);
        for (const theme of ['light','dark']) {
          await page.evaluate(theme => document.documentElement.dataset.theme = theme, theme);
          for (const id of ['female-reproductive-system','pregnancy-uterus','human-brain','teeth']) {
            const section = page.locator('#' + id);
            if (mobile && id !== 'teeth') {
              const badges = await section.locator('.spark-label-target-index-circle').evaluateAll(nodes => nodes.map(node => {
                const b = node.getBoundingClientRect();
                return { x:b.x,y:b.y,width:b.width,height:b.height };
              }));
              badges.forEach((badge,i) => {
                assert(badge.width >= 16, `${id}: mobile index is unreadable`);
                badges.slice(i+1).forEach(other => assert(!overlaps(badge,other,1), `${id}: mobile indices overlap`));
              });
            }
            const show = section.getByRole('button', { name: 'Show labelled diagram' });
            if (await show.count()) await show.click();
            const image = section.locator('.spark-labelled-reference-art');
            if (await image.count()) {
              assert(await image.evaluate(img => img.complete && img.naturalWidth > 0), 'Reference image did not load');
              const box = await image.boundingBox();
              assert(box.x >= 0 && box.x + box.width <= width, 'Reference image overflows the viewport');
            }
            await section.screenshot({ path: path.join(output, `${id}-${device}-${theme}.png`) });
            const hide = section.getByRole('button', { name: 'Hide labelled diagram' });
            if (await hide.count()) {
              await hide.click();
              assert.equal(await image.count(), 0);
            }
          }
        }
      }
    }
    console.log('PASS: bean text/arrow spacing; supplied fixture interactions and screenshots');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
