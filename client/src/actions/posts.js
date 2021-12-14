import { Alert } from "@mui/material";
import * as api from "../api";
// import { Alert } from "../components/Alert/Alert";

// Action Creators
// const alert = new Alert();
export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    dispatch({ type: "FETCH_ALL", payload: data });
  } catch (err) {
    <Alert variant="filled" severity="error">
      This is an error alert — check it out!
    </Alert>;
    console.log(err.message);
  }
};

export const createPost = (post, setError) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    dispatch({ type: "CREATE", payload: data });
    setError({
      severity: "success",
      message: "Post added",
      visibility: true,
    });
  } catch (err) {
    setError({
      severity: "error",
      message: err.message,
      visibility: true,
    });
    console.log("Client error: CREATE Post", err.message);
  }
};

export const updatePost = (id, post, setError) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    dispatch({ type: "UPDATE", payload: data });
  } catch (error) {
    setError({
      severity: "error",
      message: error.message,
      visibility: true,
    });
    console.log(error);
  }
};

export const likePost = (post) => async (dispatch) => {
  try {
    const postId = post._id;
    const data = await api.likePost(postId);
    const likeUpdatedPost = data.data;
    dispatch({ type: "UPDATE", payload: likeUpdatedPost });
  } catch (error) {
    console.log("Client Error: Action likePost", error);
  }
};
export const deletePost = (post, setError) => async (dispatch) => {
  console.log("Delete clicked");
  try {
    const postId = post._id;
    console.log("Getting post", postId);
    await api.deletePost(postId);
    dispatch({ type: "DELETE", payload: post });
    setError({
      severity: "warning",
      message: "Post Deleted",
      visibility: true,
    });
  } catch (error) {
    setError({
      severity: "error",
      message: error.message,
      visibility: true,
    });
    console.log("Client Error: Action deletePost", error);
  }
};

// api.fetchPosts();
