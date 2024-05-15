import React, { useState, useEffect } from "react";
import "../index.css"; // Importing CSS file for styling

const Todo = () => {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (task.trim() !== "") {
      setTodos([
        ...todos,
        { id: Math.random().toString(), name: task.trim(), completed: false },
      ]);
      setTask("");
    } else {
      alert("Task cannot be empty");
    }
  };

  const handleDeleteTask = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleCompleteTask = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const handleSortTasks = () => {
    const sortedTodos = [...todos].sort((a, b) => a.name.localeCompare(b.name));
    setTodos(sortedTodos);
  };

  return (
    <form onSubmit={handleAddTask} className="container">
      <h1 className="header">Todo List</h1>
      <div className="input-section">
        <input
          type="text"
          className="task-input"
          placeholder="Enter Task"
          onChange={(e) => setTask(e.target.value)}
          value={task}
        />
        <button className="add-task-btn" onClick={handleAddTask}>
          Add Task
        </button>
        <button className="sort-task-btn" onClick={handleSortTasks}>
          Sort Tasks
        </button>
      </div>
      <div className="tasks-list">
        {todos.map((todo) => (
          <div className="task" key={todo.id}>
            <input
              type="checkbox"
              className="task-checkbox"
              id={`task-${todo.id}`}
              onChange={() => handleCompleteTask(todo.id)}
              checked={todo.completed}
            />
            <label
              htmlFor={`task-${todo.id}`}
              className="task-label"
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.name}
            </label>
            <button onClick={() => handleDeleteTask(todo.id)}>Delete</button>
          </div>
        ))}
      </div>
    </form>
  );
};

export default Todo;
