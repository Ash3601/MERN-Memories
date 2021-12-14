import React, { useState } from "react";
import useStyles from "./styles";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  CircularProgress,
} from "@material-ui/core/";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import { useDispatch } from "react-redux";
import { likePost, deletePost } from "../../../actions/posts";

const Post = ({ post, setCurrentId, setError }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  // let deleteClick = false;
  const [deleteClick, setDeleteClick] = useState(false);
  // utility
  function displayTags(t) {
    let tagsString = t[0];
    const tags = tagsString.split(",");
    let hashTagsString = tags.map((tag) => `#${tag.trim()} `);
    return hashTagsString;
  }
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={
          post.selectedFile ||
          "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
        }
        title={post.title}
      />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.creator}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      <div className={classes.overlay2}>
        <Button
          style={{ color: "white" }}
          size="small"
          onClick={() => setCurrentId(post._id)}
        >
          <MoreHorizIcon fontSize="medium" />
        </Button>
      </div>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary" component="h2">
          {displayTags(post.tags)}
        </Typography>
      </div>
      <Typography
        className={classes.title}
        gutterBottom
        variant="h5"
        component="h2"
      >
        {post.title}
      </Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.message}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          onClick={() => dispatch(likePost(post))}
        >
          <ThumbUpAltIcon fontSize="small" /> Like {post.likeCount}
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            setDeleteClick(true);
            setTimeout(() => {
              dispatch(deletePost(post, setError));
            }, 4000);
            // setDeleteClick(false);
          }}
        >
          {deleteClick ? <CircularProgress /> : <DeleteIcon fontSize="small" />}
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
