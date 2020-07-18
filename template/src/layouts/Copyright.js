import React from 'react';
import { Link, Typography } from '@material-ui/core';

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © 2020'}
      <Link color="inherit" href="https://www.exmaple.com">
        company name
      </Link>
    </Typography>
  );
};

export default Copyright;
