import { test, expect } from '@playwright/test';


test('homepage has correct title', async ({ page }) => {
  await page.goto('https://example.com');

  const expectedTitle: string = 'Example Domain';
  const learnMoreText: string = 'Learn more';
  const isExpectation: boolean = true;
  await expect(page).toHaveTitle(expectedTitle);
  await expect(page.locator('a')).toHaveText(learnMoreText);
  expect(isExpectation).toBe(true);
})

test('practice basic Typescripts values', async () => {
  const userName: string = 'John Doe';
  const userAge: number = 30;
  const isActive: boolean = true;

  const expectedResult = userName === 'John Doe' && userAge === 30 && isActive === true;
  expect(expectedResult).toBe(true);
})

test('practice basic Typescripts operators', async () => {
  const statusCode = 200;
  const responseTime = 750;
  const hasError = false;

  const isSuccess = statusCode === 200;
  const isFast = responseTime < 1000;
  const isHealthy = isSuccess && isFast && !hasError;
  expect(isHealthy).toBe(true);
})