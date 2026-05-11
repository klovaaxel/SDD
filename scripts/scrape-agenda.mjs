import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://sddconf.com/agenda', {
    waitUntil: 'networkidle',
    timeout: 120000,
  });

  try {
    await page.getByRole('button', { name: /save|accept all|consent/i }).click({ timeout: 8000 });
  } catch {
    try {
      await page.locator('button').filter({ hasText: /save/i }).first().click({ timeout: 3000 });
    } catch {
      /* ignore */
    }
  }

  await page.waitForTimeout(5000);

  const text = await page.evaluate(() => document.body.innerText);
  process.stdout.write(text);

  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
