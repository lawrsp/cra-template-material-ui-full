import React from 'react';
import PropTypes from 'prop-types';

import { useLocation } from 'react-router-dom';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import { Drawer } from '@material-ui/core';
import NavMenu from './NavMenu';
import Brand from './Brand';

const defaultIndentSize = 24;

const useStyles = makeStyles({
  root: {},
  paper: {
    background: '#001529',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    background: '#002140',
  },

  menu: {
    padding: '1.6rem 0',
    flex: 1,
    overflowY: 'scroll',
  },
});

const SideBar = (props) => {
  const classes = useStyles(props);
  const location = useLocation();

  const {
    logo,
    logoText,
    routes,
    open,
    indentSize = defaultIndentSize,
  } = props;

  // 菜单link

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      className={classes.root}
      classes={{
        paper: classes.paper,
      }}
      onClose={props.handleDrawerToggle}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
    >
      <div className={classes.header}>
        <Brand logo={logo} text={logoText} />
      </div>
      <div className={classes.menu}>
        <NavMenu
          indentSize={indentSize}
          routes={routes}
          currentLocation={location.pathname}
        />
      </div>
    </Drawer>
  );
};

SideBar.propTypes = {
  handleDrawerToggle: PropTypes.func,
  logo: PropTypes.string,
  logoText: PropTypes.string,
  indentSize: PropTypes.number,
  routes: PropTypes.arrayOf(PropTypes.object),
  open: PropTypes.bool,
};

export default SideBar;
