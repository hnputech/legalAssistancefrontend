import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import LogoutIcon from "@mui/icons-material/Logout";
import ListItemText from "@mui/material/ListItemText";
import { Outlet } from "react-router-dom";
import chatIcon from "../../assets/chat.png";
import documentsIcon from "../../assets/draft-.png";
import AllDocsIcon from "../../assets/allodocs.png";
import AnalyzeIcon from "../../assets/analyze.png";
import { useIsMobile } from "../../hooks/useIsMobile";
import { useNavigate } from "react-router-dom/dist";
import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import MoreVert from "@mui/icons-material/MoreVert";
import SourceIcon from "@mui/icons-material/Source";
import ChatIcon from "@mui/icons-material/Chat";
import PostAddIcon from "@mui/icons-material/PostAdd";

import { useState } from "react";

const drawerWidth = 240;

const sideBarData = [
  {
    title: "Chats",
    link: "/",
    icon: chatIcon,
  },
  {
    title: "Draft Documents",
    link: "/template",
    icon: documentsIcon,
  },
];

const sideBarData2 = [
  {
    title: "All Documents",
    link: `/AllGeneratedTemplate/${localStorage.getItem("email")}`,
    icon: AllDocsIcon,
  },
  {
    title: "Document Analysis",
    link: "/analyze",
    icon: AnalyzeIcon,
  },
];

export const SideBarLayout = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Correctly store the token
    localStorage.removeItem("email");
    navigate("/signin");
  };

  return (
    <Box sx={{ display: isMobile ? "block" : "flex" }}>
      {/* {!isMobile ? ( */}
      <>
        {" "}
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6" noWrap component="div">
              Law Gpt
            </Typography>
            {isMobile ? (
              <div>
                <IconButton
                  sx={{
                    "&:focus": {
                      outline: "none",
                      boxShadow: "none",
                    },
                  }}
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <MoreVert />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      navigate("/");
                    }}
                  >
                    {" "}
                    <ListItemIcon>
                      <ChatIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText> Chat</ListItemText>
                  </MenuItem>

                  <MenuItem
                    onClick={() => {
                      handleClose();
                      navigate("/template");
                    }}
                  >
                    {" "}
                    <ListItemIcon>
                      <PostAddIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText> Draft Documents</ListItemText>
                  </MenuItem>

                  <MenuItem
                    onClick={() => {
                      handleClose();
                      navigate(
                        `/AllGeneratedTemplate/${localStorage.getItem("email")}`
                      );
                    }}
                  >
                    <ListItemIcon>
                      <SourceIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText> All Documents</ListItemText>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      navigate("/analyze");
                    }}
                  >
                    <ListItemIcon>
                      <img src={AnalyzeIcon} width={20} height={20} />
                    </ListItemIcon>
                    <ListItemText> Document Analysis</ListItemText>
                  </MenuItem>

                  <MenuItem
                    onClick={() => {
                      handleClose();
                      handleLogout();
                    }}
                  >
                    <ListItemIcon>
                      <LogoutIcon />
                    </ListItemIcon>

                    <ListItemText> Logout</ListItemText>
                  </MenuItem>
                </Menu>
              </div>
            ) : null}
            {!isMobile ? (
              <Button onClick={handleLogout} style={{ color: "white" }}>
                Logout
              </Button>
            ) : null}
          </Toolbar>
        </AppBar>
        {!isMobile ? (
          <Drawer
            variant="permanent"
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: {
                width: drawerWidth,
                boxSizing: "border-box",
              },
            }}
          >
            <Toolbar />
            <Box sx={{ overflow: "auto" }}>
              <List>
                {sideBarData.map((item) => (
                  <ListItem key={item.title} disablePadding>
                    <ListItemButton onClick={() => navigate(item.link)}>
                      <ListItemIcon>
                        <img src={item.icon} width={30} height={30} />
                      </ListItemIcon>
                      <ListItemText primary={item.title} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
              <Divider />
              <List>
                {sideBarData2.map((item) => (
                  <ListItem key={item.title} disablePadding>
                    <ListItemButton onClick={() => navigate(item.link)}>
                      <ListItemIcon>
                        <img src={item.icon} width={30} height={30} />
                      </ListItemIcon>
                      <ListItemText primary={item.title} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Drawer>
        ) : null}
      </>
      {/* // ) : null} */}
      <div style={{ width: "100%" }}>
        {/* {!isMobile ? <Toolbar /> : null} */}
        <Toolbar />

        <Outlet />
      </div>
    </Box>
  );
};
