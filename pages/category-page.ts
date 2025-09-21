import { expect, type Locator, type Page } from '@playwright/test';

export class CategoryPage {
  readonly page: Page;
  readonly addCategoryButton: Locator;
  readonly categoryInput: Locator;
  readonly acceptButton: Locator;
  readonly successMessage: Locator;
  readonly pagination: Locator;
  readonly subCategoryCbx: Locator;
  readonly parentCategoryDropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addCategoryButton = page.getByText('Adicionar');
    this.categoryInput = page.getByRole('textbox', { name: 'Nombre de categoría' });
    this.acceptButton = page.getByRole('button', { name: 'Aceptar' });
    this.successMessage = page.getByText('Tipo de categoría adicionada satisfactoriamente');
    this.pagination = page.locator('//ul[contains(@class, "pagination")]//li//a').filter({ hasText: /^\d+$/ });
    this.subCategoryCbx = page.getByText('Es subcategoria?');
    this.parentCategoryDropdown = page.getByText('Seleccione la categoría padre');
    }

  async addCategory(categoryName: string) {
    await this.addCategoryButton.click();
    await this.categoryInput.fill(categoryName);
    await this.acceptButton.click();
    await expect(this.successMessage).toBeVisible();
    await expect(this.successMessage).toBeHidden();
  }

  async verifyCategoryIsDisplayed(categoryName) {
    await this.pagination.last().click();
    await expect(this.page.getByText(categoryName)).toBeVisible();
  } 

  async addCategoryWithParent(categoryName: string, parentCategoryName: string) {
    await this.addCategoryButton.click();
    await this.categoryInput.fill(categoryName);
    await this.subCategoryCbx.click();
    await this.parentCategoryDropdown.click({ force: true }); // Workaround: WebKit on Ubuntu, fails to open the dropdown without force
    await this.page.getByRole('option', {name:parentCategoryName}).click();
    await this.acceptButton.click();
    await expect(this.successMessage).toBeVisible();
    await expect(this.successMessage).toBeHidden();
  }

  async verifyCategoryWithParentIsDisplayed(categoryName,parentCategoryName) {
    await this.pagination.last().click();
    const categoryElement = this.page.locator('td', { hasText: categoryName });
    const categoryWithParentElement = categoryElement.locator('xpath=following-sibling::td[1]');
    await expect(this.page.getByText(categoryName)).toBeVisible();
    await expect(categoryWithParentElement).toHaveText(parentCategoryName);
  } 
}