import { test, expect } from '@playwright/test';


test('homepage has correct title', async ({ page }) => {
  await page.goto('https://example.com');

  console.log(
  await page.getByRole('heading', { name: 'Example Domain' }).count()
);

  await expect(page).toHaveTitle('Example Domain');
  await expect(page.locator('a')).toHaveText('Learn more');
})