import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import GlobalStyles from "../GlobalStyles";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Layout = ({ location, children }) => {
  return (
    <>
      <GlobalStyles />
      <Navbar location={location} />
      {children}
      <Footer />
    </>
  );
};

Layout.propTypes = {
  location: PropTypes.object,
  isdark: PropTypes.bool,
};

export default Layout;
