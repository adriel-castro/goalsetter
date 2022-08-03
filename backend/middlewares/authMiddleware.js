const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const db = require("../models");

const User = db.users;

const protect = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  let token;

  if (!authHeader && !authHeader.startsWith("Bearer")) {
    return res
      .status(401)
      .json({ error: "Token not provided - User not allowed" });
  }

  try {
    // Get token from header
    token = req.headers.authorization.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from the token
    // req.user = await User.findByPk(decoded.id).select("-password");
    req.user = decoded;

    next();
  } catch (error) {
    console.log(error);
    res.status(401);
    throw new Error("Not Authorized!");
  }

  if (!token) {
    res.status(401);
    throw new Error("Not Authorized, No token!");
  }
});

module.exports = { protect };
