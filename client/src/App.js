import React, { useEffect, useState } from "react";
import { Container, Typography, Grow, AppBar, Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";
// import Post from "./components/Posts/Post/post.component";
import Posts from "./components/Posts/posts.component";
import Form from "./components/Form/form.component";
import img_memories from "./images/memories.png";
import useStyles from "./styles";
import { getPosts } from "./actions/posts";
import { Alert } from "@mui/material";
const App = () => {
  const [error, setError] = useState({
    severity: "",
    message: "",
    visibility: false,
  });
  const [currentId, setCurrentId] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);
  return (
    <Container maxwidth="lg">
      {error && (
        <Alert id="alert" variant="filled" severity={error.severity}>
          {error.message}
        </Alert>
      )}
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">
          Memories
        </Typography>
        <img
          className={classes.image}
          src={img_memories}
          alt="memories"
          height="60"
        />
      </AppBar>
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
    </Container>
  );
};

export default App;
