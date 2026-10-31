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

test('learner can update preference controls', async ({ page }) => {
  // Arrange
  await page.setContent(preferencesHtml);
  const displayName = page.getByRole('textbox', { name: 'Display name' });
  const updates = page.getByRole('checkbox', { name: 'Receive updates' });
  const basicPlan = page.getByRole('radio', { name: 'Basic plan' });
  const proPlan = page.getByRole('radio', { name: 'Pro plan' });
  const language = page.getByRole('combobox', { name: 'Language' });

  // TODO 1: Display name starts as Guest
  await expect(displayName).toHaveValue('Guest');

  // TODO 2: replace it with Linh
  await displayName.fill('Linh');
  await expect(displayName).toHaveValue('Linh');

  // TODO 3: Receive updates starts unchecked
  await expect(updates).not.toBeChecked();

  // TODO 4: check, then uncheck
  await updates.check();
  await expect(updates).toBeChecked();
  await updates.uncheck();
  await expect(updates).not.toBeChecked();

  // TODO 5: Basic is selected; selecting Pro deselects Basic
  await expect(basicPlan).toBeChecked();
  await proPlan.check();
  await expect(proPlan).toBeChecked();
  await expect(basicPlan).not.toBeChecked();

  // TODO 6: Language starts as vi
  await expect(language).toHaveValue('vi');

  // TODO 7: select English by its visible label, verify its value
  await language.selectOption({ label: 'English' });
  await expect(language).toHaveValue('en');
});

test('learner can clear the display name', async ({ page }) => {
  // Arrange
  await page.setContent(preferencesHtml);
  const displayName = page.getByRole('textbox', { name: 'Display name' });
  await expect(displayName).toHaveValue('Guest');

  // Act
  await displayName.fill('Linh');
  await expect(displayName).toHaveValue('Linh');
  await displayName.clear();

  // Assert
  await expect(displayName).toHaveValue('');
});

// Practice 3 (section 49): the requirement is that a new form starts with
// "Guest", so the fix is the expectation, not the test steps. Adding
// fill('Linh') would make it PASS while no longer checking the initial state.
test('display name starts as Guest', async ({ page }) => {
  await page.setContent(preferencesHtml);
  await expect(
    page.getByRole('textbox', { name: 'Display name' })
  ).toHaveValue('Guest');
});

/*
 * Section 23 — choosing assertions:
 *   A. Full message:      await expect(page.getByRole('status')).toHaveText('Profile saved successfully');
 *   B. Contains "saved":  await expect(page.getByRole('status')).toContainText('saved');
 *   C. Email value:       await expect(page.getByLabel('Email')).toHaveValue('learner@example.com');
 *   D. Checkbox checked:  await expect(page.getByLabel('Receive updates')).toBeChecked();
 *
 * Dropdown label vs value:
 *   <option value="en">English</option> — "English" is the label the user sees,
 *   "en" is the value the form submits. selectOption({ label: 'English' })
 *   picks the option the way a user would; toHaveValue('en') checks the
 *   select's current value, i.e. what the app will actually receive.
 */
