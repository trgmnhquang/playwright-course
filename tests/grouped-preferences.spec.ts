import { test, expect } from '@playwright/test';

const preferencesHtml = `
  <form>
    <label for="display-name">Display name</label>
    <input id="display-name" type="text" value="Guest" />

    <label for="updates">Receive updates</label>
    <input id="updates" type="checkbox" />

    <label for="basic-plan">Basic plan</label>
    <input id="basic-plan" type="radio" name="plan" value="basic" checked />
    <label for="pro-plan">Pro plan</label>
    <input id="pro-plan" type="radio" name="plan" value="pro" />

    <label for="language">Language</label>
    <select id="language">
      <option value="vi">Vietnamese</option>
      <option value="en">English</option>
    </select>
  </form>
`;

// Every test gets its own page, and beforeEach loads a fresh form into it.
// That is why the second test still starts with Guest and an unchecked box,
// even though the first test changed both on its own page.
test.describe('Preferences form', () => {
  test.beforeEach(async ({ page }) => {
    await page.setContent(preferencesHtml);  });

  test('learner can edit preferences', async ({ page }) => {
    const displayName = page.getByRole('textbox', { name: 'Display name' });
    const updates = page.getByRole('checkbox', { name: 'Receive updates' });
    await expect(displayName).toHaveValue('Guest');
    await expect(updates).not.toBeChecked();
    await displayName.fill('Linh');
    await updates.check();
    await expect(displayName).toHaveValue('Linh');
    await expect(updates).toBeChecked();
  });

  test('learner can clear display name from a fresh form', async ({ page }) => {
    const displayName = page.getByRole('textbox', { name: 'Display name' });
    const updates = page.getByRole('checkbox', { name: 'Receive updates' });
    await expect(displayName).toHaveValue('Guest');
    await expect(updates).not.toBeChecked();
    await displayName.fill('');
    await expect(displayName).toHaveValue('');
  });

  test('learner can choose Pro plan and English', async ({ page }) => {
    const basicPlan = page.getByRole('radio', { name: 'Basic plan' });
    const proPlan = page.getByRole('radio', { name: 'Pro plan' });
    const language = page.getByRole('combobox', { name: 'Language' });
    await expect(basicPlan).toBeChecked();
    await expect(proPlan).not.toBeChecked();
    await expect(language).toHaveValue('vi');
    await proPlan.check();
    await language.selectOption({ label: 'English' });
    await expect(proPlan).toBeChecked();
    await expect(basicPlan).not.toBeChecked();
    await expect(language).toHaveValue('en');
  });
});
