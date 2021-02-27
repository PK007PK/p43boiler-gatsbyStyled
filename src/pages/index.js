import React from "react";

import AppProvider from "../AppProvider";
import Button from "../components/Button";
import Layout from "../components/Layout";

const IndexPage = ({ location }) => {
  return (
    <AppProvider state={location?.state}>
      <Layout>
        <h1>Index page</h1>
        <Button />
      </Layout>
    </AppProvider>
  );
};

export default IndexPage;
