import React, { useContext } from 'react';

import Button from '../components/Button';
import Layout from '../components/Layout';
import AppContext from '../AppProvider';

const IndexPage = () => {
  const { piotrek } = useContext(AppContext);
  return (
    <Layout>
      <h1>Gatsby starter page</h1>
      <h2>Configured elements:</h2>
      <ul>
        <li>AppProvider as an context component</li>
        <li>Context in gatsby browser and gatsby ssr</li>
        <li>Theme conected with context</li>
      </ul>
      <Button />
    </Layout>
  );
};

export default IndexPage;
