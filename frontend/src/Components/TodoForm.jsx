import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function TodoForm() {
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const filteredTodos = todos
    .filter((todo) =>
      todo.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((todo) => {
      if (filter === "completed") return todo.completed;
      if (filter === "pending") return !todo.completed;
      return true;
    });

  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/auth/profile",
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTodos = async () => {
    try {
      console.log("Current Page:", page);

      const res = await axios.get(
        `http://localhost:5000/todos?page=${page}&limit=5`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      console.log("API Response:", res.data);

      setTodos(res.data.todos);
      setTotalPages(res.data.totalPages);
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

  const toggleComplete = async (todo) => {
    try {
      await axios.put(
        `http://localhost:5000/todos/${todo._id}`,
        {
          completed: !todo.completed,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      fetchTodos();
    } catch (error) {
      console.log(error);
    }
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

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetchTodos();
  }, [page]);

  useEffect(() => {
    fetchProfile();
  }, []);


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

              <div className="card-header bg-white border-0 py-3 d-flex justify-content-between align-items-center">

                <div>
                  <h4 className="fw-bold text-primary mb-1">
                    Todo Manager
                  </h4>

                  <p className="text-muted mb-0">
                    Organize • Track • Complete
                  </p>
                </div>

                <div className="d-flex flex-column align-items-start p-3 shadow-sm rounded bg-light" style={{ width: "220px" }}>
                  {/* Profile Link */}
                  <Link
                    to="/profile"
                    className="d-flex align-items-center gap-2 text-decoration-none mb-2"
                  >
                    <img
                      src={user?.picture || "/images/pooja.jpg"}
                      alt="Profile"
                      width="40"
                      height="40"
                      className="rounded-circle border"
                    />
                    <span className="fw-semibold text-dark">{user?.name || "Pooja Pal"}</span>
                  </Link>

                  {/* Logout Link with Icon */}
                  <button
                    className="btn btn-link text-danger fw-semibold d-flex align-items-center gap-2 p-0"
                    onClick={logout}
                    style={{ textDecoration: "none" }}
                  >
                    <i className="bi bi-box-arrow-right"></i>
                    Log out
                  </button>
                </div>

              </div>


              <div className="card-body p-4">

                {/* STATS */}
                <div className="row mb-4">

                  <div
                    className="col-md-4 mb-3"
                    onClick={() => setFilter("all")}
                    style={{ cursor: "pointer" }}
                  >
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

                  <div
                    className="col-md-4 mb-3"
                    onClick={() => setFilter("completed")}
                    style={{ cursor: "pointer" }}
                  >
                    <div
                      className={`card border-0 shadow-sm ${filter === "completed"
                        ? "border border-success border-3"
                        : ""
                        }`}
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

                  <div
                    className="col-md-4 mb-3"
                    onClick={() => setFilter("completed")}
                    style={{ cursor: "pointer" }}
                  >
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
                    className={`btn d-flex align-items-center gap-2 px-3 py-1 fw-semibold shadow-sm ${editId ? "btn-warning" : "btn-success"
                      }`}
                    style={{ borderRadius: "20px", transition: "0.3s" }}
                    onClick={handleSubmit}
                  >
                    <i className={`bi ${editId ? "bi-pencil-square" : "bi-plus-circle"}`}></i>
                    {editId ? "Update" : "Add"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="mx-auto mb-3"
          style={{ maxWidth: "650px" }}
        >
          <div className="input-group shadow-sm">
            <span className="input-group-text">🔍</span>

            <input
              type="text"
              className="form-control"
              placeholder="Search todos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div
          className="mx-auto mb-3"
          style={{ maxWidth: "650px" }}>
          <small className="text-muted d-block mt-2">
            Showing {filteredTodos.length} of {todos.length} todos
          </small>
        </div>

        {/* TODO LIST */}
        <div className="row justify-content-center">
          <div className="col-lg-7">

            {filteredTodos.map((todo) => (
              <div
                key={todo._id}
                className="card shadow-sm border rounded-4 mb-3 todo-card bg-white"
              >
                <div className="card-body d-flex justify-content-between align-items-center">

                  <div>
                    <h5
                      className={`fw-bold mb-1 ${todo.completed
                        ? "text-decoration-line-through text-muted"
                        : "text-dark"
                        }`}
                    >
                      {todo.title}
                    </h5>
                  </div>

                  <div>
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => toggleComplete(todo)}
                    >
                      {todo.completed ? "Undo" : "Complete"}
                    </button>

                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => editTodo(todo)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteTodo(todo._id)}
                    >
                      Delete
                    </button>
                  </div>

                </div>
              </div>
            ))}

            {/* Pagination - Only once */}
            <nav className="d-flex justify-content-center mt-4">
              <ul className="pagination shadow-sm">

                <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                  <button
                    className="page-link"
                    onClick={() => setPage(page - 1)}
                  >
                    Previous
                  </button>
                </li>

                <li className="page-item active">
                  <span className="page-link">
                    {page}
                  </span>
                </li>

                <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
                  <button
                    className="page-link"
                    onClick={() => setPage(page + 1)}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>

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