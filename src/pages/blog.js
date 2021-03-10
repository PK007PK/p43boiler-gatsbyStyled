import React, { useContext } from 'react';
import { graphql, Link } from 'gatsby';
import AppContext from '../AppProvider';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

const BlogPage = ({ data }) => {
  const posts = data.allMarkdownRemark.nodes;
  const DisplayPosts = () => (
    <ul style={{ listStyle: `none`, paddingLeft: 0 }}>
      {posts.map((post) => (
        <li key={post.fields.slug}>
          <h3>{post.frontmatter.title}</h3>
          <p>{post.frontmatter.description}</p>
          <Link to={post.fields.slug} itemProp="url">
            More
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <Layout>
      <SEO title="Blog page" />
      <h1>Blog page</h1>
      <DisplayPosts />
    </Layout>
  );
};

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/blog/.*.md$/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "YYYY-MM-DD")
          title
          description
          #   tags
          #   thumbnail {
          #     childImageSharp {
          #       fluid {
          #         ...GatsbyImageSharpFluid_tracedSVG
          #       }
          #     }
          #   }
        }
      }
    }
  }
`;

export default BlogPage;
