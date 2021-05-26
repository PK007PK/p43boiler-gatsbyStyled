import React from 'react';
import GlobalStyles from 'src/styles/GlobalStyles';
import Navbar from 'src/components/Navbar/Navbar';
import Footer from 'src/components/Footer/Footer';
import { BootsContainer } from 'src/components/BootsElements/BootsElements';
import Typography from 'src/styles/Typography';

const Layout = ({ children }) => (
  <>
    <GlobalStyles />
    <Typography />
    <Navbar />
    <BootsContainer>{children}</BootsContainer>
    <Footer />
  </>
);

export default Layout;
