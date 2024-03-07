import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import App from './App';
import ProductList from './ProductList';
import ProductDetails from './ProductDetails';
import Cart from './Cart';

// Importera makeStyles från Material-UI
import { makeStyles } from '@material-ui/core/styles';

// Definiera stilar med makeStyles
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
}));

function Frontend() {
  // Använd makeStyles för att hämta stilar
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Router>
        <CssBaseline />
        <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/products" component={ProductList} />
          <Route path="/products/:id" component={ProductDetails} />
          <Route path="/cart" component={Cart} />
        </Switch>
      </Router>
    </div>
  );
}

ReactDOM.render(
  <Frontend />,
  document.getElementById('root')
);