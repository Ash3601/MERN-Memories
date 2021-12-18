import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import PasswordStrengthBar from "react-password-strength-bar";
import Input from "./Input";
import useStyles from "./styles";
import Icon from "./Icon";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signup, signin } from "../../actions/auth";
const Auth = () => {
  const initialFormValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const classes = useStyles();
  // const isSignUp = true;
  const [isSignUp, setIsSignUp] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data below: ", formData);
    if (isSignUp) {
      dispatch(signup(formData, history));
    } else {
      dispatch(signin(formData, history));
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [formData, setFormData] = useState(initialFormValues);
  const dispatch = useDispatch();
  const history = useNavigate();

  const switchMode = () => {
    return setIsSignUp(!isSignUp);
  };
  const googleSuccess = async (response) => {
    const result = response?.profileObj;
    const token = response?.tokenId;
    try {
      dispatch({ type: "AUTH", data: { result, token } });
      history("/");
    } catch (error) {
      console.log("Client Error: googleSuccess method", error);
    }
  };
  const googleFailure = (error) => {
    console.log("Client Error: Google Login Button", error);
  };
  const handleShowPassword = () => {
    setShowPassword((prevShowPasswordState) => !prevShowPasswordState);
  };
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isSignUp ? "Sign Up" : "Sign In"}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                ></Input>
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                ></Input>
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              type="email"
              handleChange={handleChange}
            ></Input>
            <>
              <Input
                name="password"
                label="Password"
                handleChange={handleChange}
                type={showPassword ? "text" : "password"}
                handleShowPassword={handleShowPassword}
                setPassword={setPassword}
              ></Input>
              {password.length > 0 ? (
                <PasswordStrengthBar password={password} />
              ) : (
                ""
              )}
            </>

            {isSignUp && (
              <Input
                name="confirmPassword"
                label="Confirm Password"
                handleChange={handleChange}
                type="password"
                setPassword={setPassword}
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin
            clientId="576988180356-qmvsc6hr8u9ovln12c1aqfsopcmbcghs.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
          <Grid container justifyContent="center">
            <Grid item>
              <Button onClick={switchMode} color="default" variant="outlined">
                {isSignUp
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
