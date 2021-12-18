import React, { useState } from "react";
import Post from "./Post/post.component";
import { useSelector } from "react-redux";
import useStyles from "./styles";
import { CircularProgress, Grid } from "@material-ui/core";

const Posts = ({ setCurrentId, setError }) => {
  const [fetchError, setFetchError] = useState(false);

  const posts = useSelector((state) => state.posts);
  const classes = useStyles();
  setTimeout(() => {
    if (posts.length === 0) {
      setFetchError(true);
    } else {
      setFetchError(false);
    }
  }, 6000);
  return !posts.length ? (
    !fetchError ? (
      <CircularProgress />
    ) : (
      <h4>No Posts to fetch</h4>
    )
  ) : (
    // showSpinner()
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={6} md={6}>
          <Post setError={setError} post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
