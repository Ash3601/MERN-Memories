import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Typography,
} from "@material-ui/core/";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import moment from "moment";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";
import useStyles from "./styles";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";

const Post = ({ post, setCurrentId, setError }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  // let deleteClick = false;
  const [deleteClick, setDeleteClick] = useState(false);
  let user = JSON.parse(localStorage.getItem("profile"));
  if (user.result.hasOwnProperty("googleId")) {
    user = user.result.googleId !== post.creatorId ? null : user;
  } else user = user.result._id !== post.creatorId ? null : user;
  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find(
        (like) => like === (user?.result?.googleId || user?.result?._id),
      ) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {post.likes.length > 2
            ? `You and ${post.likes.length - 1} others`
            : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };
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
          post.selectedFiles ||
          "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
        }
        title={post.title}
      />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.creatorName}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      {user && (
        <div className={classes.overlay2}>
          <Button
            style={{ color: "white" }}
            size="small"
            onClick={() => setCurrentId(post._id)}
            // // disabled={!user}
            hidden={!user ? "true" : ""}
          >
            <MoreHorizIcon fontSize="medium" />
          </Button>
        </div>
      )}
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
        {user && (
          <>
            <Button
              size="small"
              color="primary"
              onClick={() => dispatch(likePost(post))}
              // disabled={!user}
              // hidden={user ? "hidden" : "hidden"}
            >
              {/* <ThumbUpAltIcon fontSize="small" /> */}
              {/* Like {post.likes.length} */}
              <Likes />
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
              // disabled={!user}
            >
              {deleteClick ? (
                <CircularProgress />
              ) : (
                <DeleteIcon fontSize="small" />
              )}
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
