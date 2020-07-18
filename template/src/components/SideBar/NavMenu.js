import React from 'react';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Link, List, ListItem, ListItemText, Icon, Collapse } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { locationContainPath } from 'utils/path';

const useMenuItemStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    color: 'hsla(0,0%,100%,.65)',

    padding: 0,
  },
  icon: {},
  content: {
    position: 'relative',
    width: '100%',
  },
  contentActive: {
    color: 'white',
  },
  contentItem: {
    width: '100%',
    height: '4rem',
    lineHeight: '4rem',
  },
  contentItemActive: {
    background: theme.palette.primary.main,
  },
  expand: {
    position: 'absolute',
    top: '1.1rem',
    width: '1.6rem',
    height: '1.6rem',
    right: '1.6rem',
  },
}));

const NavMenuItemContent = ({
  indentSize,
  indent,
  name,
  icon,
  open = false,
  routes = [],
  currentLocation,
  children,
}) => {
  const classes = useMenuItemStyles();

  const [collapsed, setCollapsed] = React.useState(open);
  const myIndent = indent + indentSize;

  let iconNode = icon;
  if (icon) {
    if (typeof icon === 'string') {
      iconNode = <Icon className={classes.icon}>{icon}</Icon>;
    } else {
      iconNode = <iconNode className={classes.icon} />;
    }
  }

  const hasCollapse = (routes && routes.length) || false;
  const handleClickItem = () => {
    if (hasCollapse) {
      setCollapsed(!collapsed);
    }
  };
  // console.log('open ===', indent, open, collapsed, collapsed);

  return (
    <ListItem className={classes.root} disableGutters>
      <Box
        className={clsx(classes.content, open && classes.contentActive)}
        onClick={handleClickItem}
      >
        {iconNode}
        <ListItemText
          className={clsx(classes.contentItem, !hasCollapse && open && classes.contentItemActive)}
          primary={name}
          disableTypography={true}
          style={{ paddingLeft: myIndent, paddingRight: indentSize }}
        />
        {hasCollapse &&
          (collapsed ? (
            <ExpandLess className={classes.expand} />
          ) : (
            <ExpandMore className={classes.expand} />
          ))}
      </Box>
      {hasCollapse && (
        <Collapse style={{ width: '100%' }} timeout="auto" in={collapsed}>
          <NavMenu
            indent={myIndent}
            indentSize={indentSize}
            currentLocation={currentLocation}
            routes={routes}
          />
        </Collapse>
      )}
      {children}
    </ListItem>
  );
};

const useMenuStyles = makeStyles((theme) => ({
  active: {},
}));

const NavMenuItem = (props) => {
  const { currentLocation, path, routes, ...rest } = props;
  const classes = useMenuStyles();

  const open = React.useMemo(() => {
    if (locationContainPath(currentLocation, path)) {
      return true;
    }
    return false;
  }, [currentLocation, path]);
  // console.log('--- ', path, open);

  if (routes && !routes.length) {
    return (
      <Link component={NavLink} underline="none" to={path} activeClassName={classes.active}>
        <NavMenuItemContent {...rest} currentLocation={open ? currentLocation : ''} open={open} />
      </Link>
    );
  }

  return (
    <NavMenuItemContent
      {...rest}
      routes={routes}
      open={open}
      currentLocation={open ? currentLocation : ''}
    />
  );
};

const useNavMenuStyles = makeStyles({
  root: {
    width: '100%',
    padding: 0,
    userSelect: 'none',
  },
});
const NavMenu = (props) => {
  const { routes, indent = 0, indentSize, currentLocation } = props;
  const styles = useNavMenuStyles();

  if (!routes || !routes.length) {
    return false;
  }
  // console.log('----', currentLocation);

  return (
    <List className={styles.root}>
      {routes.map((item, key) => {
        const { children, ...rest } = item;
        return (
          <NavMenuItem
            key={key}
            indent={indent}
            indentSize={indentSize}
            routes={children}
            {...rest}
            currentLocation={currentLocation}
          />
        );
      })}
    </List>
  );
};

export default NavMenu;
