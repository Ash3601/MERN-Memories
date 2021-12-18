import { Collapse, Container, Grid, Grow } from "@material-ui/core";
import { Alert } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getPosts } from "../../actions/posts";
import Form from "../../components/Form/form.component";
// import Post from "./components/Posts/Post/post.component";
import Posts from "../../components/Posts/posts.component";
// import useStyles from "./styles.js";
const Home = () => {
  //   const classes = useStyles();
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);
  //   useEffect(() => {
  //     console.log("setError value is ", typeof setError);
  //     console.log(setError);
  //   }, []);
  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);
  const [error, setError] = useState({
    severity: "",
    message: "",
    visibility: false,
  });

  useEffect(() => {
    setTimeout(() => {
      setError({
        severity: "",
        message: "",
        visibility: false,
      });
    }, 4000);
  }, [error]);
  return (
    <>
      {error && (
        <Collapse in={error.visibility}>
          <Alert id="alert" variant="filled" severity={error.severity}>
            {error.message}
          </Alert>
        </Collapse>
      )}
      <Grow in>
        <Container>
          <Grid
            container
            justify="space-between"
            alignItems="center"
            spacing={3}
          >
            <Grid item xs={12} sm={7}>
              <Posts setError={setError} setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form
                setError={setError}
                currentId={currentId}
                setCurrentId={setCurrentId}
              />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </>
  );
};

export default Home;
