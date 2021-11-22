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
  }

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
