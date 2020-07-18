import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import RouteConfigContext from 'components/Contexts/RouteConfigContext';
import SideBar from 'components/SideBar';
import NavBar from 'components/NavBar';
import logo from 'logo.svg';

const reduceManu = (routes = []) => {
  return routes.reduce((all, it) => {
    // 如果没有名字，表示不在菜单里显示，直接将其children提升
    if (!it.name || it.hideInMenu) {
      return [...all, ...reduceManu(it.children)];
    }

    return [
      ...all,
      {
        ...it,
        children: reduceManu(it.children),
      },
    ];
  }, []);
};

const drawerWidth = 240;

const useLayoutStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    minHeight: '100%',
    padding: theme.spacing(3),
    paddingTop: 0,
    background: theme.palette.background.default,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

// menu here
const MainLayout = (props) => {
  const [drawerOpen, setDrawerOpen] = React.useState(true);
  const routeConfig = React.useContext(RouteConfigContext);
  const classes = useLayoutStyles();

  const routes = React.useMemo(() => reduceManu(routeConfig), [routeConfig]);

  return (
    <div className={classes.root}>
      <NavBar
        classes={{
          root: clsx(classes.appBar, {
            [classes.appBarShift]: drawerOpen,
          }),
        }}
        toggled={drawerOpen}
        onToggle={() => setDrawerOpen(!drawerOpen)}
      />
      <SideBar
        classes={{
          root: classes.drawer,
          paper: classes.drawerPaper,
          header: classes.drawerHeader,
        }}
        routes={routes}
        open={drawerOpen}
        logo={logo}
        logoText="小商店"
      />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: drawerOpen,
        })}
      >
        <div className={classes.drawerHeader} />
        {props.children}
      </main>
    </div>
  );
};

export default MainLayout;
