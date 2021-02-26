module.exports = {
  siteMetadata: {
    title: "Gatsby boilerplate",
    siteUrl: "https://pkgatsbystarter.netlify.com",
  },
  plugins: [
    "gatsby-plugin-netlify-cms",
    "gatsby-plugin-styled-components",
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "xxxgoogleanaliticsxxx",
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-offline",
    // {
    //   resolve: "gatsby-plugin-manifest",
    //   options: {
    //     icon: "src/images/icon.png",
    //   },
    // },
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
  ],
};
