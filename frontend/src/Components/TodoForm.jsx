import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function TodoForm() {
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/todos",
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setTodos(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    if (!title.trim()) return;

    try {
      if (editId) {
        await axios.put(
          `http://localhost:5000/todos/${editId}`,
          { title },
          {
            headers: {
              Authorization: token,
            },
          }
        );

        setEditId(null);
      } else {
        await axios.post(
          "http://localhost:5000/todos",
          { title },
          {
            headers: {
              Authorization: token,
            },
          }
        );
      }

      setTitle("");
      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/todos/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  const editTodo = (todo) => {
    setTitle(todo.title);
    setEditId(todo._id);
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const completedTasks = todos.filter(
    (todo) => todo.completed
  ).length;

  const pendingTasks =
    todos.length - completedTasks;

  return (
    <div
      className="container-fluid py-5"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#f5f7fa,#e4ecfb)",
      }}
    >
      <div className="container">

        {/* HEADER */}
        <div className="row justify-content-center">
          <div className="col-lg-7">

            <div className="card shadow-sm border-0 rounded-4 mb-4 bg-white">

              <div className="card-header bg-white text-center border-0 py-3">
                <h4 className="fw-bold text-primary mb-1">
                  Todo Manager
                </h4>

                <p className="text-muted mb-0">
                  Organize • Track • Complete
                </p>
              </div>

              <div className="card-body p-4">

                {/* STATS */}
                <div className="row mb-4">

                  <div className="col-md-4 mb-3">
                    <div
                      className="card border-0 shadow-sm"
                      style={{
                        backgroundColor: "#dbeafe",
                      }}
                    >
                      <div className="card-body text-center">
                        <h3>{todos.length}</h3>
                        <p className="mb-0">
                          Total Tasks
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4 mb-3">
                    <div
                      className="card border-0 shadow-sm"
                      style={{
                        backgroundColor: "#dcfce7",
                      }}
                    >
                      <div className="card-body text-center">
                        <h3>{completedTasks}</h3>
                        <p className="mb-0">
                          Completed
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4 mb-3">
                    <div
                      className="card border-0 shadow-sm"
                      style={{
                        backgroundColor: "#fef3c7",
                      }}
                    >
                      <div className="card-body text-center">
                        <h3>{pendingTasks}</h3>
                        <p className="mb-0">
                          Pending
                        </p>
                      </div>
                    </div>
                  </div>

                </div>

                {/* INPUT */}
                <div className="input-group">

                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Enter your task..."
                    value={title}
                    onChange={(e) =>
                      setTitle(e.target.value)
                    }
                  />

                  <button
                    className={`btn ${
                      editId
                        ? "btn-warning"
                        : "btn-success"
                    }`}
                    onClick={handleSubmit}
                  >
                    {editId
                      ? "Update"
                      : "Add"}
                  </button>

                  <button
                    className="btn btn-danger"
                    onClick={logout}
                  >
                    Logout
                  </button>

                </div>

              </div>
            </div>

          </div>
        </div>

        {/* TODO LIST */}
        <div className="row justify-content-center">
          <div className="col-lg-7">

            {todos.map((todo) => (
              <div
                key={todo._id}
                className="card shadow-sm border rounded-4 mb-3 todo-card bg-white"
              >
                <div className="card-body d-flex justify-content-between align-items-center">

                  <div>
                    <h5 className="fw-bold text-dark mb-1">
                      {todo.title}
                    </h5>

                    <small className="text-muted">
                      Todo Task
                    </small>
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
                        deleteTodo(todo._id)
                      }
                    >
                      Delete
                    </button>
                  </div>

                </div>
              </div>
            ))}

          </div>
        </div>

        {/* EMPTY STATE */}
        {todos.length === 0 && (
          <div className="text-center mt-5">
            <h1
              style={{
                fontSize: "70px",
              }}
            >
              📋
            </h1>

            <h4>No Tasks Yet</h4>

            <p className="text-muted">
              Add your first task and start
              being productive.
            </p>
          </div>
        )}

      </div>

      <style>
        {`
          .todo-card{
            transition:all .3s ease;
          }

          .todo-card:hover{
            transform:translateY(-3px);
            box-shadow:0 10px 20px rgba(0,0,0,.08)!important;
          }

          .form-control{
            border-radius:12px;
          }

          .btn{
            border-radius:10px;
          }
        `}
      </style>
    </div>
  );
}