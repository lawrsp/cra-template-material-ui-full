import React from 'react';

const AuthContext = React.createContext({
  checkPerm: () => false,
});

export default AuthContext;
