const express = require("express");
const cors = require("cors");
const dns = require("dns");
require("dotenv").config();

const connectDB = require("./connect");

const authRoutes = require("./routes/authRoutes");
const todoRoutes = require("./routes/todoRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

dns.setServers(["8.8.8.8", "8.8.4.4"]);

app.use(cors());
app.use(express.json());

// Database Connection
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/todos", todoRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});