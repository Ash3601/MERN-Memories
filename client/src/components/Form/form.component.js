import { Button, Paper, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
import useStyles from "./styles";

const Form = ({ currentId, setCurrentId, setError }) => {
  const post = useSelector((state) =>
    currentId ? state.posts.find((message) => message._id === currentId) : null,
  );
  const user = JSON.parse(localStorage.getItem("profile"));
  const [postData, setPostData] = useState({
    // creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFiles: "",
  });
  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const classes = useStyles();
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(
        updatePost(
          currentId,
          { ...postData, creatorName: user?.result?.name },
          setError,
        ),
      );
      clear();
    } else {
      dispatch(
        createPost({ ...postData, creatorName: user?.result?.name }, setError),
      );
      clear();
    }
  };
  const clear = (e) => {
    setPostData({
      // creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFiles: "",
    });
    setCurrentId(null);
  };
  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please sign in to create your own memories and like other's memories
        </Typography>
      </Paper>
    );
  }
  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={classes.form}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? `Editing ` : `Creating `} a memory
        </Typography>
        {/* //? Removed since we can populate it when user logs in */}
        {/* <TextField
          variant="outlined"
          name="creator"
          label="Creator"
          fullWidth
          value={postData.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
        ></TextField> */}
        <TextField
          variant="outlined"
          name="title"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        ></TextField>
        <TextField
          variant="outlined"
          name="message"
          label="Message"
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        ></TextField>
        <TextField
          variant="outlined"
          name="tags"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value })}
        ></TextField>
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => {
              setPostData({ ...postData, selectedFiles: base64 });
            }}
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          color="primary"
          size="large"
          variant="contained"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          className={classes.buttonSubmit}
          color="secondary"
          size="small"
          variant="contained"
          onClick={clear}
          fullWidth
          disabled={
            JSON.stringify(postData) ===
            JSON.stringify({
              // creator: "",
              title: "",
              message: "",
              tags: "",
              selectedFiles: "",
            })
              ? true
              : false
          }
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
