import React from 'react';
import 'normalize.css';
import GlobalStyles from '../styles/GlobalStyles';
import Navbar from './Navbar';
import Footer from './Footer';
import { BootsContainer } from './BootsElements';
import Typography from '../styles/Typography';

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
