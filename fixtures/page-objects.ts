import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { leftNavPage } from '../pages/left-nav-page';
import { CategoryPage } from '../pages/category-page';

type MyFixtures = {
  loginPage: LoginPage;
  leftNavPage: leftNavPage;
  categoryPage: CategoryPage;
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  leftNavPage: async ({ page }, use) => {
    await use(new leftNavPage(page));
  },
  categoryPage: async ({ page }, use) => {
    await use(new CategoryPage(page));
  },
});