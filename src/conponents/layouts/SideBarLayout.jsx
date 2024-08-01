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
import ListItemText from "@mui/material/ListItemText";
import { Outlet } from "react-router-dom";
import chatIcon from "../../assets/chat.png";
import documentsIcon from "../../assets/draft-.png";
import AllDocsIcon from "../../assets/allodocs.png";
import AnalyzeIcon from "../../assets/analyze.png";
import { useIsMobile } from "../../hooks/useIsMobile";
import { useNavigate } from "react-router-dom/dist";

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
    link: "/AllGeneratedTemplate/testing123",
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

  return (
    <Box sx={{ display: isMobile ? "block" : "flex" }}>
      {!isMobile ? (
        <>
          {" "}
          <CssBaseline />
          <AppBar
            position="fixed"
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
          >
            <Toolbar>
              <Typography variant="h6" noWrap component="div">
                Law Gpt
              </Typography>
            </Toolbar>
          </AppBar>
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
        </>
      ) : null}
      <div style={{ width: "100%" }}>
        {!isMobile ? <Toolbar /> : null}

        <Outlet />
      </div>
    </Box>
  );
};
