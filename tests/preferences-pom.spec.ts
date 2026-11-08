import { test, expect } from '@playwright/test';
import { PreferencesPage } from '../pages/PreferencesPage';

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

test.describe('Preferences form with POM', () => {
  test.beforeEach(async ({ page }) => {
    await page.setContent(preferencesHtml);
  });

  test('learner can edit preferences', async ({ page }) => {
    const preferencesPage = new PreferencesPage(page);
    await expect(preferencesPage.displayNameInput).toHaveValue('Guest');
    await expect(preferencesPage.updatesCheckbox).not.toBeChecked();

    await preferencesPage.updatePreferences('Linh', true);

    await expect(preferencesPage.displayNameInput).toHaveValue('Linh');
    await expect(preferencesPage.updatesCheckbox).toBeChecked();
  });

  test('learner can clear display name from a fresh form', async ({ page }) => {
    const preferencesPage = new PreferencesPage(page);
    await expect(preferencesPage.displayNameInput).toHaveValue('Guest');
    await expect(preferencesPage.updatesCheckbox).not.toBeChecked();

    await preferencesPage.updatePreferences('', false);

    await expect(preferencesPage.displayNameInput).toHaveValue('');
    await expect(preferencesPage.updatesCheckbox).not.toBeChecked();
  });

  // false must actively uncheck: skipping the action would leave the box
  // checked from the earlier call, so the form would not match what was asked.
  test('learner can turn updates off after turning them on', async ({ page }) => {
    const preferencesPage = new PreferencesPage(page);
    await expect(preferencesPage.displayNameInput).toHaveValue('Guest');
    await expect(preferencesPage.updatesCheckbox).not.toBeChecked();

    await preferencesPage.updatePreferences('Linh', true);
    await expect(preferencesPage.updatesCheckbox).toBeChecked();

    await preferencesPage.updatePreferences('Mai', false);

    await expect(preferencesPage.displayNameInput).toHaveValue('Mai');
    await expect(preferencesPage.updatesCheckbox).not.toBeChecked();
  });});
