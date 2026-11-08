import type { Page, Locator } from '@playwright/test';

export class PreferencesPage {
  readonly displayNameInput: Locator;
  readonly updatesCheckbox: Locator;

  constructor(page: Page) {
    this.displayNameInput = page.getByRole('textbox', { name: 'Display name' });
    this.updatesCheckbox = page.getByRole('checkbox', { name: 'Receive updates' });
  }

  async updatePreferences(displayName: string, receiveUpdates: boolean) {
    await this.displayNameInput.fill(displayName);
    if (receiveUpdates) {
      await this.updatesCheckbox.check();
    } else {
      await this.updatesCheckbox.uncheck();
    }
  }
}
