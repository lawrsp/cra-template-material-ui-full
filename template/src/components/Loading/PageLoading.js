import React from 'react';

import { Box, CircularProgress } from '@material-ui/core';

const PageLoading = (props) => (
  <Box
    height="100vh"
    width="100vw"
    display="flex"
    justifyContent="center"
    alignItems="center"
    backgournd="gray"
    zIndex={1501}
    opacity="0.8"
  >
    <CircularProgress color="primary" size={60} />
  </Box>
);

export default PageLoading;
