import { Box, IconButton, useTheme, Menu, MenuItem, Paper, Popper, Select  } from "@mui/material";
import { useContext, useState, useRef } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";





const Topbar = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [open, setOpen] = useState(false);

  const anchorRef = useRef(null);

 

  const handleLocationSelect = (event, value) => {
    setSelectedLocation(value);
    setSearchTerm('');
    setSearchResults([]);
    setOpen(false);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  
  

  const handleLogout = () => {
    sessionStorage.removeItem("jwt");
    sessionStorage.removeItem("UserData");
    window.location.reload();
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  // state for the dropdown menus
  const [anchorEl1, setAnchorEl1] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [anchorEl3, setAnchorEl3] = useState(null);

    // functions to handle opening and closing the dropdown menus
    const handleMenu1Open = (event) => {
      setAnchorEl1(event.currentTarget);
    };
    const handleMenu2Open = (event) => {
      setAnchorEl2(event.currentTarget);
    };
    const handleMenu3Open = (event) => {
      setAnchorEl3(event.currentTarget);
    };
    const handleMenuClose = () => {
      setAnchorEl1(null);
      setAnchorEl2(null);
      setAnchorEl3(null);
    };

  const userdata = JSON.parse(sessionStorage.getItem("UserData"));

  


  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box display="flex" alignItems="center">
     
    </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        {/* NOTIFICATIONS DROPDOWN */}
        <IconButton onClick={handleMenu1Open}>
          <NotificationsOutlinedIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl1}
          open={Boolean(anchorEl1)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>Notification 1</MenuItem>
          <MenuItem onClick={handleMenuClose}>Notification 2</MenuItem>
          <MenuItem onClick={handleMenuClose}>Notification 3</MenuItem>
          <MenuItem onClick={handleMenuClose}>Clear all</MenuItem>
        </Menu>
        {/* SETTINGS DROPDOWN */}
        <IconButton onClick={handleMenu2Open}>
          <SettingsOutlinedIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl2}
          open={Boolean(anchorEl2)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>Setting 1</MenuItem>
          <MenuItem onClick={handleMenuClose}>Setting 2</MenuItem>
          <MenuItem onClick={handleMenuClose}>Setting 3</MenuItem>
        </Menu>
        {/* PERSON DROPDOWN */}
        <IconButton onClick={handleMenu3Open}>
        <PersonOutlinedIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl3}
          open={Boolean(anchorEl3)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>Profile Settings</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
        
      </Box>
    </Box>
  );
};

export default Topbar;
