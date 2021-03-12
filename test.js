// // const path = require(`path`);
// import path, { resolve } from 'path';

// // const { createFilePath } = require(`gatsby-source-filesystem`);
// import { createFilePath } from 'gatsby-source-filesystem';

// exports.createPages = async ({ graphql, actions, reporter }) => {
//   const { createPage } = actions;

//   // Define a template for blog post
//   const blogPost = path.resolve(`./src/templates/blog-post.js`);

//   // Get all markdown blog posts sorted by date
//   const result = await graphql(
//     `
//       {
//         allMarkdownRemark(
//           sort: { fields: [frontmatter___date], order: ASC }
//           limit: 1000
//         ) {
//           nodes {
//             id
//             fields {
//               slug
//             }
//           }
//         }
//       }
//     `
//   );

//   if (result.errors) {
//     reporter.panicOnBuild(
//       `There was an error loading your blog posts`,
//       result.errors
//     );
//     return;
//   }

//   const posts = result.data.allMarkdownRemark.nodes;

//   // Create blog posts pages
//   // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
//   // `context` is available in the template as a prop and as a variable in GraphQL

//   if (posts.length > 0) {
//     posts.forEach((post, index) => {
//       const previousPostId = index === 0 ? null : posts[index - 1].id;
//       const nextPostId =
//         index === posts.length - 1 ? null : posts[index + 1].id;

//       createPage({
//         path: post.fields.slug,
//         component: blogPost,
//         context: {
//           id: post.id,
//           previousPostId,
//           nextPostId,
//         },
//       });
//     });
//   }
// };

// exports.onCreateNode = ({ node, actions, getNode }) => {
//   const { createNodeField } = actions;

//   if (node.internal.type === `MarkdownRemark`) {
//     const value = createFilePath({ node, getNode });

//     createNodeField({
//       name: `slug`,
//       node,
//       value,
//     });
//   }
// };

// exports.createSchemaCustomization = ({ actions }) => {
//   const { createTypes } = actions;

//   // Explicitly define the siteMetadata {} object
//   // This way those will always be defined even if removed from gatsby-config.js

//   // Also explicitly define the Markdown frontmatter
//   // This way the "MarkdownRemark" queries will return `null` even when no
//   // blog posts are stored inside "content/blog" instead of returning an error
//   createTypes(`
//     type SiteSiteMetadata {
//       author: Author
//       siteUrl: String
//       social: Social
//     }

//     type Author {
//       name: String
//       summary: String
//     }

//     type Social {
//       twitter: String
//     }

//     type MarkdownRemark implements Node {
//       frontmatter: Frontmatter
//       fields: Fields
//     }

//     type Frontmatter {
//       title: String
//       description: String
//       date: Date @dateformat
//     }

//     type Fields {
//       slug: String
//     }
//   `);
// };

// blog;
// import React, { useContext } from 'react';
// import { graphql, Link } from 'gatsby';
// import AppContext from '../AppProvider';
// import Layout from '../components/Layout';
// import SEO from '../components/SEO';

// const BlogPage = ({ data }) => {
//   const posts = data.allMarkdownRemark.nodes;
//   const DisplayPosts = () => (
//     <ul style={{ listStyle: `none`, paddingLeft: 0 }}>
//       {posts.map((post) => (
//         <li key={post.fields.slug}>
//           <h3>{post.frontmatter.title}</h3>
//           <p>{post.frontmatter.description}</p>
//           <Link to={post.fields.slug} itemProp="url">
//             More
//           </Link>
//         </li>
//       ))}
//     </ul>
//   );

//   return (
//     <Layout>
//       <SEO title="Blog page" />
//       <h1>Blog page</h1>
//       <DisplayPosts />
//     </Layout>
//   );
// };

// export const pageQuery = graphql`
//   query {
//     site {
//       siteMetadata {
//         title
//       }
//     }
//     allMarkdownRemark(
//       filter: { fileAbsolutePath: { regex: "/blog/.*.md$/" } }
//       sort: { fields: [frontmatter___date], order: DESC }
//     ) {
//       nodes {
//         excerpt
//         fields {
//           slug
//         }
//         frontmatter {
//           date(formatString: "YYYY-MM-DD")
//           title
//           description
//           #   tags
//           #   thumbnail {
//           #     childImageSharp {
//           #       fluid {
//           #         ...GatsbyImageSharpFluid_tracedSVG
//           #       }
//           #     }
//           #   }
//         }
//       }
//     }
//   }
// `;

// export default BlogPage;
