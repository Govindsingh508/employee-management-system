import { AppBar, Toolbar, Typography } from "@mui/material";

const drawerWidth = 220;

function Navbar() {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
      }}
    >
      <Toolbar>
        <Typography variant="h6">
          Employee Management System
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;