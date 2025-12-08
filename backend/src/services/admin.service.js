const pool = require("../../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (name, email, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO admin (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    return {
      status: 201,
      data: { message: "Admin registered successfully" }
    };

  } catch (error) {
    return {
      status: 500, 
      data: { error: "Email may already exist or DB error" }
    };
  }
};


exports.login = async (email, password) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM admin WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return { status: 404, data: { message: "Admin not found" } };
    }

    const admin = rows[0];
    const match = await bcrypt.compare(password, admin.password);

    if (!match) {
      return { status: 401, data: { message: "Incorrect password" } };
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return {
      status: 200,
      data: { message: "Login successful", token }
    };

  } catch (error) {
    return { status: 500, data: { error: "Database error" } };
  }
};
