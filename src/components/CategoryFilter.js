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
      <Link to="/blog" activeStyle={{ color: 'red' }}>
        <span className="name">All categories</span>
      </Link>
      <br />
      {categories.map((category) => (
        <Link
          activeStyle={{ color: 'red' }}
          to={`/category/${category.frontmatter.slug}`}
          key={category.frontmatter.slug}
        >
          {category.frontmatter.name}
        </Link>
      ))}
    </div>
  );
}