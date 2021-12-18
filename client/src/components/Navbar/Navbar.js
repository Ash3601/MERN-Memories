import { AppBar, Button, Toolbar, Typography, Avatar } from "@material-ui/core";
import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import img_memories from "../../images/memories.png";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const logOut = () => {
    dispatch({ type: "LOGOUT", data: null });
    setUser(null);
    navigate("/auth");
  };
  useEffect(() => {
    // const token = user?.token;
    // console.log(token);
    // JWT in case of manual sign up
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to="/"
          className={classes.heading}
          variant="h2"
          align="center"
        >
          Memories
        </Typography>
        <img
          className={classes.image}
          src={img_memories}
          alt="memories"
          height="60"
        />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.result.name}
              src={user.result.imageUrl}
            >
              {user.result.name.charAt(0).toUpperCase()}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.result.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logOut}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            className={classes.logout}
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
