import { faker } from '@faker-js/faker';

export function generateCategoryData() {
  const randomCategoryName = `${faker.word.sample()}-${faker.word.sample()}`;
  const randomCategoryWithParentName = `${faker.word.sample()}-${faker.word.sample()}`;
  console.log('Random category name:', randomCategoryName);
  console.log('Random category with parent name:', randomCategoryWithParentName);
  return { randomCategoryName, randomCategoryWithParentName };
}