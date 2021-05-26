import React from 'react';

import Button from 'src/components/Button/Button';
import Layout from 'src/components/Layout/Layout';
import SEO from 'src/components/SEO/SEO';

const TestPage = () => (
  <Layout>
    <SEO title="Test page" />
    <h1>Test page</h1>
    <Button />
  </Layout>
);

export default TestPage;
