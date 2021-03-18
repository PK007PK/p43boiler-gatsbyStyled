import path from 'path';
import { createFilePath } from 'gatsby-source-filesystem';

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
  const result = await graphql(
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

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    );
    return;
  }

  const posts = result.data.allMarkdownRemark.nodes;

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
  const pageCount = Math.ceil(
    result.data.allMarkdownRemark.totalCount / pageSize
  );
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
    actions.createPage({
      path: `category/${category.frontmatter.slug}`,
      component: categoryTemplate,
      context: {
        category: category.frontmatter.name,
        categoryRegex: `/${category.frontmatter.slug}/i`,
        selectPosts: `/${category.frontmatter.slug}/i`,
        pageType: 'allPostsInCategory',
      },
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
    actions.createPage({
      path: `tags/${tag.frontmatter.slug}`,
      component: tagTemplate,
      context: {
        tag: tag.frontmatter.name,
        tagRegex: `/${tag.frontmatter.slug}/i`,
        selectPosts: `/${tag.frontmatter.slug}/i`,
        pageType: 'allPostsInTag',
      },
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
