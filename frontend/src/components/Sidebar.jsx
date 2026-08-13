import {Drawer,List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar
} from "@mui/material";
import {NavLink} from "react-router-dom";

import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';

const drawerWidth = 220;

function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
        },
      }}
    >
      <Toolbar />

      <List>
        <ListItem disablePadding>
          <ListItemButton component={NavLink} to="/dashboard" 
          sx={{
            "&.active": {
              backgroundColor: "#1976d2",
              color: "white",
            },
          }}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>

            <ListItemText primary="Dashboard" />
            
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={NavLink} to="/employees" 
          sx={{
            "&.active": {
              backgroundColor: "#1976d2",
              color: "white",
            },
          }}>

            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>

            <ListItemText primary="Employees" />

          </ListItemButton>
        </ListItem>

      </List>
    </Drawer>
  );
}

export default Sidebar;