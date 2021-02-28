import React from "react";
import { graphql } from "gatsby";

import AppProvider from "../AppProvider";
import Button from "../components/Button";
import Layout from "../components/Layout";

const BlogPage = ({ location, data }) => {
  return (
    <AppProvider state={location?.state}>
      <Layout>
        <h1>Blog page</h1>
        <Button />
      </Layout>
    </AppProvider>
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
    # placeholderImage: file(relativePath: { eq: "pkinf1.jpg" }) {
    #   childImageSharp {
    #     fluid(maxWidth: 300) {
    #       ...GatsbyImageSharpFluid
    #     }
    #   }
    # }
  }
`;

export default BlogPage;
