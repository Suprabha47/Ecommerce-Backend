const User = require("../models/userModel");

exports.signUp = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res
        .status(409)
        .send("Provided email is already registerd!\nSign-in instead.");
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: password,
    });
    return res.status(201).json({ message: "User created!", reply: user });
  } catch (err) {
    res.status(500).json({
      message: "Currently we are facing server issues...",
      error: err,
    });
  }
};

exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const isUser = await User.findOne({ email, password });
    if (!isUser) return res.status(401).send("Incorrect email or password!");
    console.log("signing in ...");
    return res.status(200).json(isUser.firstName);
  } catch (err) {
    res.status(500).send("Currently we are facing server issues...");
    console.log("Error while signing in: ", err);
  }
};

exports.googleAuth = async (req, res) => {
  const { uid, displayName, email, photoUrl } = req.body;
  try {
    const isUser = await User.findOne({ email });
    console.log("User found: ", isUser);
    if (isUser)
      return res.status(200).json({
        message: "user already registered",
        firstName: isUser.firstName || "User",
        photoUrl: isUser.photoUrl || null,
      });
    const [firstName, ...rest] = displayName.split(" ");
    const lastName = rest.join(" ");
    const user = await User.create({
      firstName,
      lastName,
      email,
      photoUrl,
      googleId: uid,
    });
    console.log("user created: ", user);
    return res
      .status(201)
      .json({ message: "User created", firstName, photoUrl, email });
  } catch (err) {
    res.status(500).json({ message: "Server issue occured", err });
  }
};
