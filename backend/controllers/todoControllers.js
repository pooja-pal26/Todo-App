const Todo = require("../models/todo");

// CREATE TODO
exports.createTodo = async (req, res) => {
  try {
    const todo = await Todo.create({
      title: req.body.title,
      userId: req.user.id,
    });

    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({
      message: "Error creating todo",
      error: err.message,
    });
  }
};

// GET ALL TODOS (with Pagination)
exports.getTodos = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const skip = (page - 1) * limit;

    const totalTodos = await Todo.countDocuments({
      userId: req.user.id,
    });

    const todos = await Todo.find({
      userId: req.user.id,
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      todos,
      currentPage: page,
      totalPages: Math.ceil(totalTodos / limit),
      totalTodos,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
  }
};

// UPDATE TODO
exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.id,
      },
      req.body,
      {
        new: true,
      }
    );

    if (!todo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    res.status(200).json(todo);
  } catch (err) {
    res.status(500).json({
      message: "Error updating todo",
      error: err.message,
    });
  }
};

// DELETE TODO
exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!todo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    res.status(200).json({
      message: "Todo deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Error deleting todo",
      error: err.message,
    });
  }
};