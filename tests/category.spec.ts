import { registerUser } from '../utils/api/register-user';
import { test } from '../fixtures/page-objects';
import { generateCategoryData } from '../utils/data/test-data';

test('Creates and displays category and subcategory', async ({ loginPage,leftNavPage,categoryPage }) => {
  const { email, password } = await registerUser();
  const { randomCategoryName, randomCategoryWithParentName } = generateCategoryData();

  await loginPage.goto();
  await loginPage.login(email, password);
  await leftNavPage.goToCategoryTypes();
  await categoryPage.addCategory(randomCategoryName);
  await categoryPage.verifyCategoryIsDisplayed(randomCategoryName);
  await categoryPage.addCategoryWithParent(randomCategoryWithParentName,randomCategoryName);
  await categoryPage.verifyCategoryWithParentIsDisplayed(randomCategoryWithParentName,randomCategoryName);
});


