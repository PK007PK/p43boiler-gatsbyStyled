import React from "react";
import PropTypes from "prop-types";
import "normalize.css";
import GlobalStyles from "../styles/GlobalStyles";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Layout = ({ location, children }) => {
  return (
    <>
      <GlobalStyles />
      {/* <Typography /> */}
      <Navbar location={location} />
      {children}
      <Footer />
    </>
  );
};

Layout.propTypes = {
  location: PropTypes.object,
};

export default Layout;
