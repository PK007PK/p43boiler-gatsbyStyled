import React from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../components/Layout';
import CategoryFilter from '../components/CategoryFilter';
import TagsFilter from '../components/TagsFilter';

const BlogPage = ({ data }) => {
  const categories = data.category.nodes;
  const tags = data.tag.nodes;
  const posts = categories.length > 0 ? categories : tags;

  const DisplayPosts = () => (
    <ul style={{ listStyle: `none`, paddingLeft: 0 }}>
      {posts
        .filter((post) => post.frontmatter.date !== null)
        .map((post) => (
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
      <h1>Blog page</h1>
      <CategoryFilter />
      <TagsFilter />
      <DisplayPosts />
    </Layout>
  );
};

export const pageQuery = graphql`
  query pagesQuery($selectPosts: String) {
    site {
      siteMetadata {
        title
      }
    }
    category: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { category: { regex: $selectPosts } } }
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
          # tags
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
    tag: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tag: { regex: $selectPosts } } }
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
          # tags
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
