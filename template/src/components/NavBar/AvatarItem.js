import React from 'react';
import { IconButton } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AvatarMenu from './AvatarMenu';

const AvatarItem = (props) => {
  const { color } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const menuId = 'primary-search-account-menu';

  const isMenuOpen = Boolean(anchorEl);

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div>
      <IconButton
        aria-label="account of current user"
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={handleOpenMenu}
        color={color}
      >
        <AccountCircle />
      </IconButton>
      <AvatarMenu anchorEl={anchorEl} id={menuId} open={isMenuOpen} onClose={handleCloseMenu} />
    </div>
  );
};

export default AvatarItem;
