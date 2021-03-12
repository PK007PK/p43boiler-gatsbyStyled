// import path, { resolve } from 'path';
// import fetch from 'isomorphic-fetch';

// async function turnPostsIntoPages({ graphql, actions }) {
//   // 1. Get a template for this page
//   const blogPostTemplate = path.resolve('./src/templates/blog-post.js');

//   // 2. Query all posts
//   const { data } = await graphql(`
//     {
//       allMarkdownRemark(
//         sort: { fields: [frontmatter___date], order: ASC }
//         limit: 1000
//       ) {
//         nodes {
//           id
//           fields {
//             slug
//           }
//         }
//       }
//     }
//   `);
//   // 3. Loop over each pizza and create a page for that pizza
//   data.allMarkdownRemark.nodes.forEach((post) => {
//     actions.createPage({
//       // What is the URL for this new page??
//       path: `posts/${post.slug.current}`,
//       component: blogPostTemplate,
//       context: {
//         slug: post.slug.current,
//       },
//     });
//   });
// }

// export async function createPages(params) {
//   // Create pages dynamically
//   // Wait for all promises to be resolved before finishing this function
//   await Promise.all([turnPostsIntoPages(params)]);
// }
