import React, { useState } from 'react';

export default function TodoForm() {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);

  // CREATE
  const addTask = (e) => {
    e.preventDefault();
    if (!task.trim()) return;
    setTodos([...todos, { id: Date.now(), text: task }]);
    setTask('');
  };


  const updateTask = (id, newText) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  // DELETE
  const deleteTask = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <>
    <div className='d-flex flex-column align-items-center mt-5'>
    <div className='bg-secondary w-50'>
        <div className="container mt-4">
      <h5 className="text-center">My Todo App</h5>
      <form onSubmit={addTask} className="d-flex flex-column align-items-center">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Enter Your Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button type="submit" className="btn btn-secondary mt-3 w-25">
          Add
        </button>
      </form>

      <ul className="list-group mt-4 w-50 mx-auto">
        {todos.map(todo => (
          <li key={todo.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{todo.text}</span>
            <div>
              <button
                className="btn btn-sm btn-secondary me-2"
                onClick={() => {
                  const newText = prompt("Update task:", todo.text);
                  if (newText) updateTask(todo.id, newText);
                }}
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => deleteTask(todo.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </div>
    </div>
    </>
  );
}
