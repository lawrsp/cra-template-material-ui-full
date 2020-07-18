import React from 'react';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import PageLoading from 'components/Loading/PageLoading';
import SecurityRoutes from './pages/SecurityRoutes';
import Login from './pages/Login';

const routes = [
  {
    path: '/admin',
    component: 'layouts/MainLayout',
    authority: 'admin',
    name: '首页',
    hideInMenu: true,
    noLink: true,
    children: [],
  },
];

const useSnackStyles = makeStyles({
  base: {
    fontSize: '1.4rem',
  },
});

function App() {
  const snackStyles = useSnackStyles();
  return (
    <React.Suspense fallback={<PageLoading />}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        classes={snackStyles}
      >
        <Router>
          <Switch>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route path="/">
              <SecurityRoutes routes={routes} />
            </Route>
          </Switch>
        </Router>
      </SnackbarProvider>
    </React.Suspense>
  );
}

export default App;
