import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout';
import './custom.css';
import { ChakraProvider } from '@chakra-ui/react';

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <ChakraProvider>
        <Layout>
        <Routes>
          {AppRoutes.map((route, index) => {
            const { element, ...rest } = route;
            return <Route key={index} {...rest} element={element} />;
          })}
        </Routes>
      </Layout>
      </ChakraProvider>
      
    );
  }
}
