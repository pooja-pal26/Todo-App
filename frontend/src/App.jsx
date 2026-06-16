import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {

    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState("");
    const [editingId, setEditingId] = useState(null);

    const API = "http://localhost:5000/todos";

    /*
        READ
    */
    const fetchTodos = async () => {
        try {
            const response = await axios.get(API);
            setTodos(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    /*
        CREATE
    */
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim()) return;

        try {

            if (editingId) {

                await axios.put(`${API}/${editingId}`, {
                    title
                });

                setEditingId(null);

            } else {

                await axios.post(API, {
                    title
                });
            }

            setTitle("");

            fetchTodos();

        } catch (error) {
            console.error(error);
        }
    };

    /*
        DELETE
    */
    const deleteTodo = async (id) => {
        try {

            await axios.delete(`${API}/${id}`);

            fetchTodos();

        } catch (error) {
            console.error(error);
        }
    };

    /*
        EDIT
    */
    const editTodo = (todo) => {
        setTitle(todo.title);
        setEditingId(todo.id);
    };

    /*
        TOGGLE COMPLETE
    */
    const toggleComplete = async (todo) => {
        try {

            await axios.put(`${API}/${todo.id}`, {
                completed: !todo.completed
            });

            fetchTodos();

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container mt-5">

            <div className="card shadow p-4">

                <h2 className="text-center mb-4">
                    Todo App
                </h2>

                <form onSubmit={handleSubmit}>

                    <div className="input-group mb-4">

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Todo"
                            value={title}
                            onChange={(e) =>
                                setTitle(e.target.value)
                            }
                        />

                        <button
                            className="btn btn-primary"
                        >
                            {editingId
                                ? "Update"
                                : "Add"}
                        </button>

                    </div>

                </form>

                <ul className="list-group">

                    {todos.map(todo => (

                        <li
                            key={todo.id}
                            className="list-group-item d-flex justify-content-between align-items-center"
                        >

                            <div>

                                <input
                                    type="checkbox"
                                    className="form-check-input me-3"
                                    checked={todo.completed}
                                    onChange={() =>
                                        toggleComplete(todo)
                                    }
                                />

                                <span
                                    style={{
                                        textDecoration:
                                            todo.completed
                                                ? "line-through"
                                                : "none"
                                    }}
                                >
                                    {todo.title}
                                </span>

                            </div>

                            <div>

                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() =>
                                        editTodo(todo)
                                    }
                                >
                                    Edit
                                </button>

                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() =>
                                        deleteTodo(todo.id)
                                    }
                                >
                                    Delete
                                </button>

                            </div>

                        </li>

                    ))}

                </ul>

            </div>

        </div>
    );
}

export default App;