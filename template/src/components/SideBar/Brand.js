import React from 'react';

import { Box, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  link: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    height: '3.2rem',
  },
  text: {
    margin: 0,
    color: '#fff',
    fontWeight: 600,
    fontSize: '2rem',
  },
}));

const Brand = ({ logo, text }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Link
        underline="none"
        component={NavLink}
        to="/admin"
        className={classes.link}
      >
        <img src={logo} alt="logo" className={classes.logo} />
        <span className={classes.text}>{text}</span>
      </Link>
    </Box>
  );
};

export default Brand;
