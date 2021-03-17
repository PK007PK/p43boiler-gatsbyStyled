// import React from 'react';
// import { graphql } from 'gatsby';
// // import PizzaList from '../components/PizzaList';
// import CategoriesFilter from '../components/CategoriesFilter';
// // import SEO from '../components/SEO';

// export default function PizzasPage({ data, pageContext }) {
//   const articles = data.articles.nodes;
//   return (
//     <>
//       {/* <SEO
//         title={
//           pageContext.topping
//             ? `Pizzas With ${pageContext.topping}`
//             : `All Pizzas`
//         }
//       /> */}
//       <CategoriesFilter activeCategory={pageContext.category} />
//       {/* <ArticlesList pizzas={pizzas} /> */}
//     </>
//   );
// }

// export const query = graphql`
//   query ArticlesQuery($categoryRegex: String) {
//     articles: allMarkdownRemark(
//       filter: { frontmatter: { category: { regex: $categoryRegex } } }
//     ) {
//       nodes {
//         frontmatter {
//           name
//           category
//         }
//       }
//     }
//   }
// `;
