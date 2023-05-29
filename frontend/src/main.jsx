import React from 'react'
import { extendTheme } from '@chakra-ui/react'
import { ChakraProvider } from '@chakra-ui/react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import { apiSlice } from './features/api/apiSlice.js';



// 2. Extend the theme to include custom colors, fonts, etc
const theme = extendTheme({
  fonts: {
      heading: 'Inter, sans-serif',
      body: '"Open Sans Pro", sans-serif',
  }

})


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApiProvider api={apiSlice}>

    <ChakraProvider theme={theme}>
     <App />
    </ChakraProvider>
    </ApiProvider>
  </React.StrictMode>,
)
