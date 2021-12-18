import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:5000" });
const url = "http://localhost:5000/posts";

// function that happens on each one of our requests
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const fetchPosts = () => API.get("/posts");
export const createPost = (newPost) => API.post("/posts", newPost);
export const updatePost = (id, updatedPost) =>
  API.patch(`${"/posts"}/${id}`, updatedPost);
export const likePost = (id) => API.patch(`${"/posts"}/${id}/likePost`);
export const deletePost = (id) => API.delete(`${"/posts"}/${id}`);

// Authentication
export const signin = (formData) => API.post("/user/signin", formData);
export const signup = (formData) => API.post("/user/signup", formData);
