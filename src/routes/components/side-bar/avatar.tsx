import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import {
  Avatar,
  Box,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  listItemIconClasses,
} from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import { useRef, useState } from 'react';

const SideBarAvatar = () => {
  const avatarRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Avatar
        sx={{
          bgcolor: deepPurple[500],
          height: '2.3rem',
          width: '2.3rem',
          fontSize: 12,
          cursor: 'pointer',
        }}
        ref={avatarRef}
        onClick={() => {
          setOpen(!open);
        }}
      >
        Mio
      </Avatar>
      <Menu
        anchorEl={avatarRef.current}
        id="menu"
        open={open}
        onClose={handleClose}
        anchorOrigin={{ horizontal: 42, vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>个人资料</MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            console.log('logout');
          }}
          sx={{
            [`& .${listItemIconClasses.root}`]: {
              minWidth: 0,
            },
          }}
        >
          <ListItemText>退出</ListItemText>
          <ListItemIcon>
            <LogoutRoundedIcon fontSize="small" />
          </ListItemIcon>
        </MenuItem>
      </Menu>
    </>
  );
};

export default SideBarAvatar;
