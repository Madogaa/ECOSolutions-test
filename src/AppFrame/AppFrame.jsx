import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Avatar, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MainContent from "../Contents/MainContent";
import RouterView from "../RouterView/RouterView";
import "./AppFrame.css";
import SecondElement from "../Contents/SecondElement";
import ThirdElement from "../Contents/ThirdElement";
import FourthElement from "../Contents/FourthElement";

const routes = [
  {
    index: 0,
    path: "/",
    component: <MainContent />,
    exact: true,
  },
  {
    index: 1,
    path: "/second",
    component: <SecondElement />,
    exact: true,
  },
  {
    index: 2,
    path: "/third",
    component: <ThirdElement />,
    exact: true,
  },
  {
    index: 3,
    path: "/fourth",
    component: <FourthElement />,
    exact: true,
  },
];

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  backgroundColor: "rgba(255,255,255,0.2)",
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",

  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function AppFrame() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <div className="bg-blur" />
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            ECO Solutions
          </Typography>
          <div className="ml-auto">
            <Tooltip title="Profile Button">
              <IconButton onClick={() => {}} sx={{ p: 0 }}>
                <Avatar alt="M" src="/MLogo.jpg" />
              </IconButton>
            </Tooltip>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} classes={{ paper: "drawerCs" }}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {[
            { text: "Main Content", path: "/" },
            { text: "Second element", path: "/second" },
            { text: "Third Element", path: "/third" },
            { text: "Fourth element", path: "/fourth" },
          ].map((item, index) => (
            <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={() => navigate(item.path)} // Aquí usamos navigate con la URL
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: "var(--main-text-white)",
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box className="text-white-t" component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <div className="flex justify-center items-center ">
          <div className="container ">
            <RouterView routes={routes} />
          </div>
        </div>
        {/* Content  */}
      </Box>
    </Box>
  );
}
