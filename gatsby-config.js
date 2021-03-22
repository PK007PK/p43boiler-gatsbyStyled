// import dotenv from 'dotenv';
// dotenv.config({ path: '.env' });
import projectConfig from './projectConfig';

export default {
  siteMetadata: {
    title: projectConfig.title,
    description: projectConfig.description,
    siteUrl: projectConfig.siteUrl,
    language: projectConfig.language,
  },

  flags: { DEV_SSR: true },
  plugins: [
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: projectConfig.trackingGoogleId,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/categories`,
        name: `categories`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/tags`,
        name: `tags`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./src/assets/images/`,
        name: `images`,
      },
      __key: `images`,
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-remark-copy-linked-files`,
    'gatsby-plugin-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-offline',
    // {
    //   resolve: "gatsby-plugin-manifest",
    //   options: {
    //     icon: "src/images/icon.png",
    //   },
    // },
    'gatsby-transformer-sharp',
    'gatsby-plugin-netlify-cms',
  ],
};
