import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';

export default function TagsFilter() {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        sort: { fields: [frontmatter___name], order: ASC }
        filter: { fileAbsolutePath: { regex: "/tags/i" } }
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

  const tags = data.allMarkdownRemark.nodes;

  return (
    <div>
      {tags.map((tag) => (
        <Link
          activeStyle={{ color: 'red' }}
          to={`/tags/${tag.frontmatter.slug}`}
          key={tag.frontmatter.slug}
        >
          {tag.frontmatter.name}
        </Link>
      ))}
    </div>
  );
}
