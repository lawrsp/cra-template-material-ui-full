import React from 'react';
import { useHistory } from 'react-router-dom';
import { MenuItem, Menu } from '@material-ui/core';

import { accountLogout } from 'api/account';
import { logout } from 'reducers/account';

const AvatarMenu = (props) => {
  const { anchorEl, id, open, onClose } = props;
  const history = useHistory();

  const handleClickLogout = async () => {
    history.push('/login');
    try {
      await accountLogout();
    } finally {
      logout();
    }
  };

  return (
    <Menu
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      keepMounted
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <MenuItem onClick={handleClickLogout}>退出登陆</MenuItem>
    </Menu>
  );
};

export default AvatarMenu;
