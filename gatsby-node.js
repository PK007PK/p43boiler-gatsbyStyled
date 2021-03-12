import path, { resolve } from 'path';
import slugify from 'slugify';
import createFilePath from 'gatsby-source-filesystem';
import fetch from 'isomorphic-fetch';

async function turnPostsIntoPages({ graphql, actions }) {
  // 1. Get a template for this page
  const postTemplate = path.resolve('./src/templates/blog-post.js');

  // 2. Query all posts
  const { data } = await graphql(`
    query {
      allMarkdownRemark {
        nodes {
          frontmatter {
            title
            date
          }
        }
      }
    }
  `);

  // 3. Loop over each post and create a page for that post

  data.allMarkdownRemark.nodes.forEach((page) => {
    const slug = slugify(
      `${page.frontmatter.date.substring(0, 10)}-${page.frontmatter.title}`
    );
    actions.createPage({
      path: `post/${slug}`,
      component: postTemplate,
      context: {
        slug,
      },
    });
  });
}

export async function createPages(params) {
  // Create pages dynamically
  // Wait for all promises to be resolved before finishing this function
  await Promise.all([turnPostsIntoPages(params)]);
}
