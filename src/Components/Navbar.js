import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { BACKEND_URL } from "../constants";

import axios from "axios";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";

const Navbar = (props) => {
  const {
    loginWithRedirect,
    logout,
    isAuthenticated,
    user,
    isLoading,
    getAccessTokenSilently,
  } = useAuth0();
  console.log("Authentication Status:", isAuthenticated);
  console.log("User Data:", user);

  useEffect(() => {
    const registerUser = async () => {
      if (!isAuthenticated || !user) {
        console.log("User is not authenticated or user data is not available.");
        return;
      }

      try {
        const accessToken = await getAccessTokenSilently();
        console.log("Access Token:", accessToken);

        await axios.post(
          `${BACKEND_URL}/users`,
          {
            auth0_user_id: user.sub,
            email: user.email,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log("User registered/updated");
      } catch (error) {
        console.error("Error registering user:", error);
      }
    };

    registerUser();
  }, [isAuthenticated, user, getAccessTokenSilently]);

  const pages = ["Home", "Resume", "Custom"];
  const pagesRoute = { Home: "/", Resume: "/resume", Custom: "/customresume" };
  // const pages = ["Resume", "Custom"];

  // const pagesRoute = {
  //   Resume: "/",
  //   Custom: "/customresume",
  // };

  const settings = ["Logout"];

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <AppBar>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            jobwise
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={() => {
                    navigate(pagesRoute[page]);
                  }}
                >
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Nav buttons */}

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => {
                  navigate(pagesRoute[page]);
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/* Open settings */}
          <Box sx={{ flexGrow: 0 }}>
            {user?.sub}
            {user?.email}{" "}
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={user?.email} src={user?.picture} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {!isAuthenticated && (
                <Button
                  variant="outlined"
                  startIcon={<LoginRoundedIcon />}
                  onClick={() => loginWithRedirect()}
                  Button
                  size="large"
                >
                  Log In
                </Button>
              )}
              {isAuthenticated && (
                <div>
                  <img src={user.picture} alt={user?.email} />
                  <p>{user?.email} </p>
                </div>
              )}
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() =>
                    logout({
                      logoutParams: { returnTo: window.location.origin },
                    })
                  }
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
