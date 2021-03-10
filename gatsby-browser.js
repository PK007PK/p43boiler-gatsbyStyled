import React from 'react';
import { AppProvider } from './src/AppProvider';

export function wrapRootElement({ element }) {
  return <AppProvider>{element}</AppProvider>;
}
