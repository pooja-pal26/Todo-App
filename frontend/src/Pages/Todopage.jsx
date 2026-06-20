import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function TodoPage() {
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState([]);

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
    const res = await axios.get("http://localhost:5000/todos", {
      headers: { Authorization: token },
    });

    setTodos(res.data);
  };

  const addTodo = async () => {
    await axios.post(
      "http://localhost:5000/todos",
      { title },
      { headers: { Authorization: token } }
    );

    setTitle("");
    fetchTodos();
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div>
      <h1>Todo Page</h1>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button onClick={addTodo}>Add</button>
      <button onClick={logout}>Logout</button>

      {todos.map((t) => (
        <p key={t._id}>{t.title}</p>
      ))}
    </div>
  );
}