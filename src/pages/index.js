import { graphql } from 'gatsby';
import React from 'react';

import Layout from 'src/components/Layout/Layout';
import SEO from 'src/components/SEO/SEO';

const IndexPage = ({ data }) => {
  const content = data.markdownRemark;

  return (
    <Layout>
      <SEO
        title={content.frontmatter.title}
        description={content.frontmatter.description || content.excerpt}
      />
      <main>
        <header>
          <h1>{content.frontmatter.title}</h1>
          <p>{content.frontmatter.description}</p>
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: content.html }}
          itemProp="articleBody"
        />
      </main>
    </Layout>
  );
};

export const pageQuery = graphql`
  query PageBySlug {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(frontmatter: { slug: { eq: "gatsby-starter" } }) {
      excerpt(pruneLength: 160)
      html
      frontmatter {
        description
        title
      }
    }
  }
`;

export default IndexPage;
