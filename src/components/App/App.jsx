import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import { ThemeProvider } from '@mui/material/styles';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import AboutPage from '../AboutPage/AboutPage';
import Profile from '../Profile/Profile';
import Favorites from '../Favorites/Favorites';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import Details from '../Details/Details';
import Home from '../Home/Home';
import RecipeForm from '../RecipeForm/RecipeForm';
import EditRecipe from '../EditRecipe/EditRecipe';

import './App.css';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);
  // const theme = createTheme({
  //   palette: {
  //     primary: {
  //       main: '#B7E9FF',
  //     },
  //     secondary: pink,
  //   },
  // });

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    // <ThemeProvider theme={theme}>
    <Router>
      <div>
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />
          
          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            exact
            path="/profile"
          >
            <Profile />
          </ProtectedRoute>

          <ProtectedRoute
          exact 
          path="/home">
            <Home/>
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path="/form"
          >
            <RecipeForm />
          </ProtectedRoute>


          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/home" />
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>

          <Route
            exact
            path="/registration"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/home" />
              :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route>

          <Route
            exact
            path="/home"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/home" />
              :
              // Otherwise, show the Landing page
              <LandingPage />
            }
          </Route>

          <Route
          exact
          path="/details">
            <Details/>
          </Route>

          <Route
          exact
          path="/edit/:recipe_id">
            <EditRecipe/>
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        {/* <Footer /> */}
      </div>
    </Router>
    // </ThemeProvider>
  );
}

export default App;
