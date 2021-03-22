import React from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../components/Layout';
import CategoryFilter from '../components/CategoryFilter';
import TagsFilter from '../components/TagsFilter';
import Pagination from '../components/Pagination';

import projectConfig from '../../projectConfig';

const BlogPage = ({ data, pageContext }) => {
  if (pageContext.dirName === undefined) {
    pageContext.dirName = `/blog`;
  }

  console.log('Page context: ', pageContext);
  const categories = data.category;
  const tags = data.tag;
  const { allPosts } = data;
  let postsToDisplay;
  switch (pageContext.pageType) {
    case 'allPaginatedPosts':
      postsToDisplay = allPosts;
      break;
    case 'allPostsInCategory':
      postsToDisplay = categories;
      break;
    case 'allPostsInTag':
      postsToDisplay = tags;
      break;
    default:
      postsToDisplay = allPosts;
  }

  const DisplayPosts = () => (
    <ul style={{ listStyle: `none`, paddingLeft: 0 }}>
      {postsToDisplay.nodes
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
      <Pagination
        pageSize={projectConfig.pagesAmountInSet}
        totalCount={postsToDisplay.totalCount}
        currentPage={pageContext.currentPage || 1}
        skip={pageContext.skip}
        base={pageContext.dirName}
      />
    </Layout>
  );
};

export const pageQuery = graphql`
  query pagesQuery($selectPosts: String, $skip: Int = 0, $pageSize: Int = 4) {
    site {
      siteMetadata {
        title
      }
    }
    category: allMarkdownRemark(
      limit: $pageSize
      skip: $skip
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        fileAbsolutePath: { regex: "/blog/" }
        frontmatter: { category: { regex: $selectPosts } }
      }
    ) {
      totalCount
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "YYYY-MM-DD")
          title
          description
        }
      }
    }
    tag: allMarkdownRemark(
      limit: $pageSize
      skip: $skip
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        fileAbsolutePath: { regex: "/blog/" }
        frontmatter: { tag: { regex: $selectPosts } }
      }
    ) {
      totalCount
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "YYYY-MM-DD")
          title
          description
        }
      }
    }
    allPosts: allMarkdownRemark(
      limit: $pageSize
      skip: $skip
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fileAbsolutePath: { regex: "/blog/" } }
    ) {
      totalCount
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "YYYY-MM-DD")
          title
          description
        }
      }
    }
  }
`;

export default BlogPage;
