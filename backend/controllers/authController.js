const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    // Return token in response
    res.status(200).json({ token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// Additional auth function for verification (already provided earlier)
exports.verifyToken = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("role");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ role: user.role });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};