const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let todos = [];
let idCounter = 1;

/*
    CREATE TODO
*/
app.post("/todos", (req, res) => {
    const { title } = req.body;

    if (!title || title.trim() === "") {
        return res.status(400).json({
            message: "Title is required"
        });
    }

    const newTodo = {
        id: idCounter++,
        title,
        completed: false
    };

    todos.push(newTodo);

    res.status(201).json(newTodo);
});

/*
    READ ALL TODOS
*/
app.get("/todos", (req, res) => {
    res.json(todos);
});

/*
    UPDATE TODO
*/
app.put("/todos/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const todo = todos.find(todo => todo.id === id);

    if (!todo) {
        return res.status(404).json({
            message: "Todo not found"
        });
    }

    const { title, completed } = req.body;

    if (title !== undefined) {
        todo.title = title;
    }

    if (completed !== undefined) {
        todo.completed = completed;
    }

    res.json(todo);
});

/*
    DELETE TODO
*/
app.delete("/todos/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const index = todos.findIndex(todo => todo.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Todo not found"
        });
    }

    todos.splice(index, 1);

    res.json({
        message: "Todo deleted successfully"
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}  `);
});