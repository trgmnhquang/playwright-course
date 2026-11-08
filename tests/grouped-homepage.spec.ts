import { test, expect } from '@playwright/test';
import { practiceHtml } from './practice-page';

test.describe('Practice page', () => {
  test.beforeEach(async ({ page }) => {
    await page.setContent(practiceHtml);
  });

  test('shows practice introduction', async ({ page }) => {
    await expect(
      page.getByText('This page helps you practice browser tests.'),
    ).toBeVisible();
  });

  test('shows information link', async ({ page }) => {
    await expect(
      page.getByRole('link', { name: 'Learn more' }),
    ).toBeVisible();
  });
});
