import React from 'react';
import './src/styles/index.css';

import { AppProvider } from './src/AppProvider';

export function wrapRootElement({ element }) {
  return <AppProvider>{element}</AppProvider>;
}
