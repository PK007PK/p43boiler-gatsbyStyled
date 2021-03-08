import React from "react";

import Button from "../components/Button";
import Layout from "../components/Layout";
import AppContext from "../AppProvider";
import { useContext } from "react";

const IndexPage = () => {
  const { piotrek } = useContext(AppContext);
  return (
    <Layout>
      <h1>Index page</h1>
      <Button />
      <p>{piotrek}</p>
    </Layout>
  );
};

export default IndexPage;
