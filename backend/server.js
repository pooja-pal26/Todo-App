const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dns = require("dns");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();
const PORT = process.env.PORT || 5000;

dns.setServers(["8.8.8.8", "8.8.4.4"]);

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

// MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Todo Schema
const todoSchema = new mongoose.Schema(
  {
    title: String,
    completed: { type: Boolean, default: false },
    userId: String,
  },
  { timestamps: true }
);

const Todo = mongoose.model("Todo", todoSchema);

// CREATE TODO
app.post("/todos", authMiddleware, async (req, res) => {
  const todo = await Todo.create({
    title: req.body.title,
    userId: req.user.id,
  });
  res.json(todo);
});

// GET TODOS (USER ONLY)
app.get("/todos", authMiddleware, async (req, res) => {
  const todos = await Todo.find({ userId: req.user.id });
  res.json(todos);
});

// UPDATE TODO
app.put("/todos/:id", authMiddleware, async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(todo);
});

// DELETE TODO
app.delete("/todos/:id", authMiddleware, async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

app.listen(PORT, () => console.log("Server running"));