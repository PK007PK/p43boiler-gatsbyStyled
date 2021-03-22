import path from 'path';
import projectConfig from '../projectConfig';

export async function turnTagsIntoPages({ graphql, actions }) {
  // 1. Get the template
  const tagTemplate = path.resolve('./src/pages/blog.js');

  // 2. query all the categories
  const { data } = await graphql(`
    query {
      allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/tags/i" } }) {
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
  data.allMarkdownRemark.nodes.forEach((tag) => {
    async function countPostForTag() {
      const selectTag = `"/${tag.frontmatter.slug}/"`;

      const tagDetails = await graphql(`
          query myQuery {
            allMarkdownRemark(
              filter: {
                fileAbsolutePath: { regex: "/blog/" }
                frontmatter: { tag: { regex: ${selectTag} } }
              }
            ) {
              totalCount
            }
          }
        `);
      return tagDetails;
    }

    countPostForTag().then((result) => {
      const pageSize = projectConfig.pagesAmountInSet;
      const allPostsForTag = result.data.allMarkdownRemark.totalCount;
      const pageCount = Math.ceil(allPostsForTag / pageSize);

      Array.from({ length: pageCount }).forEach((_, i) => {
        actions.createPage({
          path: `/${tag.frontmatter.slug}/${i + 1}`,
          component: tagTemplate,
          context: {
            skip: i * pageSize,
            currentPage: i + 1,
            pageSize,
            selectPosts: `/${tag.frontmatter.slug}/i`,
            sellectionName: tag.frontmatter.name,
            pageType: 'allPostsInTag',
            dirName: `/${tag.frontmatter.slug}`,
          },
        });
      });
    });
  });
}
