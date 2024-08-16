import React from "react";

export default function Main({ todos, refresh }) {
  async function handleClick(event) {
    const todoId = event.target.id;
    if (event.target.innerHTML === "Already Completed") return;
    event.target.innerHTML = "Already Completed";
    fetch("https://todo-back-1.onrender.com/completed", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: todoId }),
    }).then(async () => {
      refresh();
    });
  }

  async function handleDelete(event) {
    const todoId = event.target.id;
    fetch("https://todo-back-1.onrender.com/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: todoId }),
    }).then(async () => {
      refresh();
    });
  }

  return (
    <div className="container">
      {todos.map((todo) => (
        <div key={todo._id} className="todo-item">
          <div>
            <h1>{todo.title}</h1>
            <h2>{todo.description}</h2>
          </div>
          <div>
            <button id={todo._id} onClick={handleClick}>
              {todo.completed ? "Already Completed" : "Mark As Done"}
            </button>
            <button id={todo._id} className="delete" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
