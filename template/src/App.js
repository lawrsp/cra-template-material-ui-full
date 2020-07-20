import React from 'react';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import PageLoading from 'components/Loading/PageLoading';
import SecurityRoutes from './pages/SecurityRoutes';

const routes = [
  {
    path: '/login',
    component: 'login',
    hideInMenu: true,
    noLink: true,
    exact: true,
  },
  {
    path: '/admin',
    component: 'layouts/MainLayout',
    authority: 'admin',
    name: 'admin',
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
            <SecurityRoutes routes={routes} />
          </Switch>
        </Router>
      </SnackbarProvider>
    </React.Suspense>
  );
}

export default App;
