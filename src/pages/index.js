import React from 'react';

import Layout from '../components/Layout';
import SEO from '../components/SEO';

const IndexPage = () => (
  <Layout>
    <SEO title="Main page" />
    <main>
      <header>
        <h1>Gatsby starter page</h1>
        <p>Ipsum nisi mollit adipisicing velit sit quis do.</p>
      </header>
      <section>
        <h2>Configured elements:</h2>
        <article>
          <h3>App logic</h3>
          <ul>
            <li>App logic accesible through AppProvider (context component)</li>
            <li>
              Context component conected to gatsby using browser and ssr file
            </li>
            <li>Layout as a separate component added directly to pages</li>
            <li>Theme conected together with context component</li>
          </ul>
        </article>
        <article>
          <h3>Styling</h3>
          <ul>
            <li>Styled components included</li>
            <li>
              Global styles connected as styled component functionality
              (createGlobalStyle)
            </li>
            <li>
              Global styles include css variables, accesible inside inside
              styled component
            </li>
            <li>
              Global styles include css variables, accesible inside inside
              styled component
            </li>
            <li>
              Css files added through gatsby-browser (normalize and index.css)
            </li>
            <li>
              Adding fonts using css file (to avoid strange problem with styled
              components)
            </li>
            <li>
              Project contains theme file (src/styles/theme) with default media
              queries
            </li>
          </ul>
        </article>
        <article>
          <h3>Included components</h3>
          <ul>
            <li>Layout</li>
            <li>SEO</li>
            <li>Components for blog functionality</li>
            <li>
              BootsElements: basic bootstrap-like grid components
              (BootsContainer, BootsRow, BootsColumn)
            </li>
          </ul>
        </article>
        <article>
          <h3>Blog functionality</h3>
          <ul>
            <li>Pagination for blog posts, categories posts, tags</li>
          </ul>
        </article>
        <article>
          <h3>ToDo</h3>
          <ul>
            <li>Add algolia search</li>
            <li>Improve seo to cover all pages</li>
            <li>Add favicon</li>
            <li>Add carousel</li>
            <li>Add accordion</li>
            <li>Add flexible mobile menu</li>
          </ul>
        </article>
      </section>
    </main>
  </Layout>
);

export default IndexPage;
