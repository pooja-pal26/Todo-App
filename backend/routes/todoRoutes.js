// const express = require("express");
// const router = express.Router();
// const todoController = require("../controllers/todoController");

// router.post("/todos", todoController.createTodo);
// router.get("/todos", todoController.getTodos);
// router.put("/todos/:id", todoController.updateTodo);
// router.delete("/todos/:id", todoController.deleteTodo);

// module.exports = router;


const express = require("express");
const router = express.Router();

const {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo
} = require("../controllers/todoControllers");

router.post("/", createTodo);
router.get("/", getTodos);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

module.exports = router;
