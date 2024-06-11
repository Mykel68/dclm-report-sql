const db = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

require("dotenv").config();

exports.register = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const role = "admin";

    const user = await db.User.create({
      username,
      password: hashedPassword,
      email,
      role,
    });

    res.status(201).json({ user, message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Error registering user" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await db.User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Only allow admin users to login
    if (user.role !== "admin") {
      return res.status(403).json({ error: "Access denied" });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ token, message: "Logged in successfully" });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Error logging in" });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await db.User.findAll();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Error fetching users" });
  }
};

exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await db.User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Error fetching user" });
  }
};

exports.getUserCount = async (req, res) => {
  try {
    const userCount = await db.User.count();
    res.json({ userCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await db.User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    await user.destroy();
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Error deleting user" });
  }
};

exports.editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, role } = req.body;
    const user = await db.User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.username = username;
    user.email = email;
    user.role = role;
    await user.save();
    res.json(user);
  } catch (error) {
    console.error("Error editing user:", error);
    res.status(500).json({ error: "Error editing user" });
  }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.json({ message: "Logged out successfully" });

    // res.redirect("/login");
  } catch (error) {
    console.error("Error logging out:", error);
    res.status(500).json({ error: "Error logging out" });
  }
};
