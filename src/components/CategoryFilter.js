import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import styled from 'styled-components';

export default function CategoryFilter() {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        sort: { fields: [frontmatter___name], order: ASC }
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

  const categories = data.allMarkdownRemark.nodes;

  return (
    <div>
      <Link to="/blog/" activeStyle={{ color: 'red' }} partiallyActive>
        <span className="name">All posts</span>
      </Link>
      <br />
      {categories.map((category) => (
        <Link
          to={`/${category.frontmatter.slug}/`}
          activeStyle={{ color: 'red' }}
          partiallyActive
          key={category.frontmatter.slug}
        >
          {category.frontmatter.name}
        </Link>
      ))}
    </div>
  );
}
