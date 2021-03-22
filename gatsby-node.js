import { createBlogPages } from './gatsby/createBlogPages';
import { turnCategoriesIntoPages } from './gatsby/turnCategoriesIntoPages';
import { turnTagsIntoPages } from './gatsby/turnTagsIntoPages';

export { createSchemaCustomization } from './gatsby/createSchemaCustomization';
export { onCreateNode } from './gatsby/onCreateNode';

export async function createPages(params) {
  await Promise.all([createBlogPages(params)]);
  await Promise.all([turnCategoriesIntoPages(params)]);
  await Promise.all([turnTagsIntoPages(params)]);
}
