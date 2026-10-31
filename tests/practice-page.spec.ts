import { test, expect } from '@playwright/test';
import { practiceHtml } from './practice-page';

test('practice page shows its main content', async ({ page }) => {
  // Arrange
  await page.setContent(practiceHtml);
  await expect(page).toHaveTitle('Playwright Practice');

  const practiceMessage = page.getByText(
    'This page helps you practice browser tests.'
  );
  await expect(practiceMessage).toBeVisible();

  const learnMoreLink = page.getByRole('link', {
    name: 'Learn more',
  });
  await expect(learnMoreLink).toBeVisible();

  // Act
  await learnMoreLink.click();

  // Assert
  await expect(page).toHaveURL('about:blank#details');
  await expect(page.getByRole('heading', { name: 'Details' })).toBeVisible();
});

test('shows the practice introduction', async ({ page }) => {
  await page.setContent(practiceHtml);
  await expect(
    page.getByText('This page helps you practice browser tests.'),
  ).toBeVisible();
});

test('shows an information link', async ({ page }) => {
  await page.setContent(practiceHtml);
  await expect(page.getByRole('link', { name: 'Learn more' })).toBeVisible();
});
