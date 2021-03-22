import path from 'path';
import projectConfig from '../projectConfig';

export async function createBlogPages({ graphql, actions, reporter }) {
  // Define a template for blog post
  const blogPostTemplate = path.resolve(`./src/templates/blog-post.js`);

  // Get all markdown blog posts sorted by date
  const { data } = await graphql(
    `
      {
        allMarkdownRemark(
          filter: { fileAbsolutePath: { regex: "/blog/i" } }
          sort: { fields: [frontmatter___date], order: ASC }
          limit: 1000
        ) {
          totalCount
          nodes {
            id
            fields {
              slug
            }
          }
        }
      }
    `
  );

  if (data.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      data.errors
    );
    return;
  }

  const posts = data.allMarkdownRemark.nodes;

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : posts[index - 1].id;
      const nextPostId =
        index === posts.length - 1 ? null : posts[index + 1].id;

      actions.createPage({
        path: post.fields.slug,
        component: blogPostTemplate,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
        },
      });
    });
  }

  // Create pagination
  const pageSize = projectConfig.pagesAmountInSet;
  const pageCount = Math.ceil(data.allMarkdownRemark.totalCount / pageSize);

  // Loop from 1 to n and create the pages for them
  Array.from({ length: pageCount }).forEach((_, i) => {
    actions.createPage({
      path: `/blog/${i + 1}`,
      component: path.resolve('./src/pages/blog.js'),
      // This data is pass to the template when we create it
      context: {
        skip: i * pageSize,
        currentPage: i + 1,
        pageSize,
        pageType: 'allPaginatedPosts',
        dirName: `/blog`,
      },
    });
  });
}
