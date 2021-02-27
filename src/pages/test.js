import React from "react";

import AppProvider from "../AppProvider";
import Button from "../components/Button";
import Layout from "../components/Layout";

const TestPage = ({ location }) => {
  return (
    <AppProvider state={location?.state}>
      <Layout>
        <h1>Test page</h1>
        <Button />
      </Layout>
    </AppProvider>
  );
};

export default TestPage;
