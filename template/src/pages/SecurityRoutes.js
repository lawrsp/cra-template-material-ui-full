import React, { useState, useEffect, useMemo } from 'react';
import { Switch, Route } from 'react-router-dom';
import AuthContext from 'components/Contexts/AuthContext';
import RouteConfigContext from 'components/Contexts/RouteConfigContext';


import NotFound from './NotFound';

const routesMap = {
  login: React.lazy(() => import('pages/Login')),
  'layouts/MainLayout': React.lazy(() => import('layouts/MainLayout')),
  // TODO: other pages
};

const trimTailSlashReg = /\/+$/gi;
const trimMoreSlashReg = /\/{2,}/gi;

function checkPermFunc(authorities, first, ...rest) {
  return true;
  }

const WrapperComp = (props) => <>{props.children}</>;

const makeAuthorityArray = (authority) => {
  if (Array.isArray(authority)) {
    return authority;
  }

  if (authority) {
    return [authority];
  }
  return [];
};

const fullfilRoutes = (pathPrefix = '', authorityPrefix = [], routes) => {
  if (!routes || !routes.length) {
    return [];
  }
  console.log('===', routes);

  const result = routes.map((node) => {
    const path = `${pathPrefix}${node.path}`.replace(trimMoreSlashReg).replace(trimTailSlashReg);
    const authority = [
      ...makeAuthorityArray(authorityPrefix),
      ...makeAuthorityArray(node.authority),
    ];

    return {
      ...node,
      path,
      authority,
      children: fullfilRoutes(path, authority, node.children),
    };
  });

  return result;
};

const renderFullRoutes = (routes, checkAuthoriy = () => true) => {
  console.log('routes is ', routes);
  const result = routes
    .map((node, key) => {
      // @Notice: 检查权限
      const { authority, path, exact } = node;
      const authrized = checkAuthoriy(authority);
      if (!authrized) {
        return false;
      }

      const MyComp = routesMap[node.component] || WrapperComp;

      return (
        <Route key={key} path={path} exact={exact}>
          <MyComp>
            {node.children && node.children.length
              ? renderFullRoutes(node.children, checkAuthoriy)
              : false}
          </MyComp>
        </Route>
      );
    })
    .filter((x) => x);
  console.log('===SecurityRoutes', routes, result);

  if (result.length) {
    return (
      <Switch>
        {result}
        <Route>
          <NotFound />
        </Route>
      </Switch>
    );
  }
  return false;
};

const SecurityRoutes = (props) => {
  const { routes, path = '' } = props;
  console.log('------', routes);

  const [isReady, setIsReady] = useState(false);
  const [myAuthorities, setMyAuthorities] = useState([]);

  // TODO: check if logined
  // TODO: check perm
  const checkPerm = useMemo(() => () => (...keys) => checkPermFunc(myAuthorities, ...keys), [
    myAuthorities,
  ]);

  const { routeConfig, children } = React.useMemo(() => {
    const routeConfig = fullfilRoutes(path, [], routes);
    console.log('===== routeConfig:', routeConfig);
    const children = renderFullRoutes(routeConfig, checkPerm);
    return { routeConfig, children };
  }, [path, routes, checkPerm]);

  return (
    <AuthContext.Provider value={checkPerm}>
      <RouteConfigContext.Provider value={routeConfig}>{children}</RouteConfigContext.Provider>
    </AuthContext.Provider>
  );
};

export default SecurityRoutes;
