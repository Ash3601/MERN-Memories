// eslint-disable-next-line
export default (posts = [], action) => {
  switch (action.type) {
    // case "LIKE":
    //   return posts.map((post) =>
    //     post._id === action.payload._id ? action.payload : post,
    //   );
    case "FETCH_ALL":
      return action.payload;

    case "UPDATE":
    case "LIKE":
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post,
      );
    case "DELETE":
      return posts.filter((post) => post._id !== action.payload._id);

    case "CREATE":
      return [...posts, action.payload];
    default:
      return posts;
  }
};

// export default reducers;