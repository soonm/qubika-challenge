import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly signOutOption: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByRole('textbox', { name: 'Usuario o correo electrónico' });
    this.passwordInput = page.getByRole('textbox', { name: 'Contraseña' });
    this.submitButton = page.getByRole('button', { name: 'Autenticar' });
    this.signOutOption = page.locator('a.nav-link', { hasText: 'Salir' });}

  async goto() {
    await this.page.goto('/');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
    await expect(this.signOutOption).toBeVisible();
  }
}