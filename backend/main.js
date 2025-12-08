require("dotenv").config();
const express = require("express");
const app = express();

console.log("MAIN FILE LOADED");

app.use(express.json());

const adminRoutes = require("./src/routes/admin.routes");

app.use("/admin", adminRoutes);

console.log("ADMIN ROUTES MOUNTED");

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
