import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './redux/store';

import App from './components/App/App';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary:{
      main: "#B7E9FF",
    },
    secondary:{
      main: "#FFB7C5",
    }
  },
  typography:{
    h1: {color: '#00000', fontWeight: 'normal',fontFamily: "'Comfortaa'" },
    h2: {color: '#00000', fontWeight: 'bold', fontFamily: "'Comfortaa'" },
    h3: {color: '#00000', fontWeight: 'bold', fontFamily: "'Comfortaa'" },
    h4: {color: '#00000', fontWeight: 'light', fontFamily: "'Comfortaa'" },
    h5: {color: '#00000', fontWeight: 'light', fontFamily: "'Comfortaa'" },
    h6: {color: '#00000', fontWeight: 'light', fontFamily: "'Comfortaa'" },
  },
  // "overrides":{
  //   MuiSvg
  // }
  // recipePaper: {
  //   backgroundColor: "primary"
  // }
})



ReactDOM.render(
  
  <Provider store={store}>
    <ThemeProvider theme={theme}>
    <App />
    </ThemeProvider>
  </Provider>
  ,
  document.getElementById('react-root'),
);
