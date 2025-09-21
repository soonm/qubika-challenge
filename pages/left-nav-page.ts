import { expect, type Locator, type Page } from '@playwright/test';

export class leftNavPage {
  readonly page: Page;
  readonly categoryTypes: Locator;
  readonly categoryTypesHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.categoryTypes = page.getByText('Tipos de Categorias');
    this.categoryTypesHeader = page.getByRole('heading', { name: 'Tipos de categorías' });
  }

  async goToCategoryTypes() {
    await this.categoryTypes.click();
    await expect(this.categoryTypesHeader).toBeVisible();
  }
}