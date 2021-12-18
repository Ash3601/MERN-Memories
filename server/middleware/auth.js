// used to authenticate if the user is validate and he is allowed to do whatever he wants
// wherver he is given access to, for instance deleting his own added posts, liking one post one at a time and so on
import jsonwebtoken from "jsonwebtoken";

const auth = async (req, res, next) => {
  // Example: User wants to like a post, click the like button => auth middleware (next) [if all correct] => like controller

  try {
    // check if user the one he is given access to
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;
    let decodedData;
    if (token && isCustomAuth) {
      decodedData = jsonwebtoken.verify(token, "test");
      req.userId = decodedData?.id;
    } else {
      decodedData = jsonwebtoken.decode(token);
      req.userId = decodedData?.sub; // google id to differentiate users
    }
    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
    console.log("Server Error: middleware auth function", error);
  }
};

export default auth;
