import path from 'path';

export async function turnCategoriesIntoPages({ graphql, actions }) {
  // 1. Get the template
  const categoryTemplate = path.resolve('./src/pages/blog.js');

  // 2. query all the categories
  const { data } = await graphql(`
    query {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/categories/i" } }
      ) {
        nodes {
          frontmatter {
            name
            slug
          }
        }
      }
    }
  `);

  // 3. createPage
  data.allMarkdownRemark.nodes.forEach((category) => {
    async function countPost() {
      const selectCategory = `"/${category.frontmatter.slug}/"`;

      const categoryDetails = await graphql(`
          query myQuery {
            allMarkdownRemark(
              filter: {
                fileAbsolutePath: { regex: "/blog/" }
                frontmatter: { category: { regex: ${selectCategory} } }
              }
            ) {
              totalCount
            }
          }
        `);
      return categoryDetails;
    }

    countPost().then((result) => {
      const pageSize = 2;
      const allPostsInCategory = result.data.allMarkdownRemark.totalCount;
      const pageCount = Math.ceil(allPostsInCategory / pageSize);

      Array.from({ length: pageCount }).forEach((_, i) => {
        actions.createPage({
          path: `/${category.frontmatter.slug}/${i + 1}`,
          component: categoryTemplate,
          context: {
            skip: i * pageSize,
            currentPage: i + 1,
            pageSize,
            selectPosts: `/${category.frontmatter.slug}/i`,
            pageType: 'allPostsInCategory',
            dirName: `/${category.frontmatter.slug}`,
          },
        });
      });
    });
  });
}
