import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';

import { CookiesProvider } from 'react-cookie';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { store } from './redux/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ChakraProvider>
     <BrowserRouter>
    <Provider store={store}>
    <CookiesProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
      </CookiesProvider>
    </Provider>
    </BrowserRouter>
  </ChakraProvider>
);
