const path = require("path");
const authRoutes = require("./routes/v2/auth.js");
const usersRoutes = require("./routes/v2/users.js");
const ordersRoutes = require("./routes/v2/orders.js");
const productsRoutes = require("./routes/v2/products.js");
const categoriesRoutes = require("./routes/v2/categories.js");

const express = require("express");
const { setHeaders } = require("./middlewares/headers.js");
const app = express();

app.use(express.json({ limit: "10mb" }));

// Set Headers
app.use(setHeaders);

// Routes
app.use("/api/v2/users", usersRoutes);
app.use("/api/v2/products", productsRoutes);
app.use("/api/v2/orders", ordersRoutes);
app.use("/api/v2/categories", categoriesRoutes);
app.use("/api/v2/auth", authRoutes);

app.use("/api", (req, res) => {
  console.log("this path is not available:", req.path);
  res.status(404).json({ message: "404 OOPS! PATH NOT FOUND" });
});

// Static files
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// app.use(express.static(path.join(__dirname, "public")));

// app.get(/./, (req, res) => {
//   const reqPath = req.path;
//   if (reqPath.startsWith("/assets") || reqPath.startsWith("/fonts")) {
//     res.sendFile(path.join(__dirname, "public", "dist", req.path));
//   } else {
//     res.sendFile(path.join(__dirname, "public", "dist", "index.html"));
//   }
// });

//* Error Controller
// app.use((req, res) => {
//   console.log("this path is not available:", req.path);
//   res.status(404).json({ message: "404 OOPS! PATH NOT FOUND" });
// });

module.exports = app;
