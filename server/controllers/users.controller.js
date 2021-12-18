import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; // store the user inside browser
import User from "../models/users.js"; // can be given any name since it is a default export and not named export like export const a = '12';

// https://stackoverflow.com/questions/36795819/when-should-i-use-curly-braces-for-es6-import

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password,
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Password incorrect" });
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "1h" },
    );
    res.status(200).json({ result: existingUser, token: token });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Server Error: SignIn controller method" + error.message);
  }
};

export const signup = async (req, res) => {
  const { email, password, firstName, lastName, confirmPassword } = req.body;
  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }
    if (password !== confirmPassword) {
      res.status(406).json({ message: "Passwords don't match" });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await User.create({
      name: `${firstName} ${lastName}`,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });
    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Server Error: SignUp controller method", error);
  }
};
