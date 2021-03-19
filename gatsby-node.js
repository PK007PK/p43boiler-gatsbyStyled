import path from 'path';
import { createFilePath } from 'gatsby-source-filesystem';
import { typeOf } from 'react-is';

export const createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
    }

    type Fields {
      slug: String
    }
  `);
};

export const onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });

    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};

async function createBlogPages({ graphql, actions, reporter }) {
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
  const pageSize = 2;
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

async function turnCategoriesIntoPages({ graphql, actions }) {
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

async function turnTagsIntoPages({ graphql, actions }) {
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
      const pageSize = 2;
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
            pageType: 'allPostsInTag',
            dirName: `/${tag.frontmatter.slug}`,
          },
        });
      });
    });
  });
}

export async function createPages(params) {
  // Create pages dynamically
  // Wait for all promises to be resolved before finishing this function
  await Promise.all([createBlogPages(params)]);
  await Promise.all([turnCategoriesIntoPages(params)]);
  await Promise.all([turnTagsIntoPages(params)]);
}
