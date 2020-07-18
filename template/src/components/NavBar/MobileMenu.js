import React from 'react';

import { Menu, Badge, MenuItem, IconButton } from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AvatarItem from './AvatarItem';

const MobileMenu = (props) => {
  const { anchorEl, id, open, onClose } = props;

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
      <MenuItem>
        <IconButton aria-label="show new mails">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>消息</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show new notifications">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>提醒</p>
      </MenuItem>
      <MenuItem>
        <AvatarItem />
        <p>我</p>
      </MenuItem>
    </Menu>
  );
};

export default MobileMenu;
