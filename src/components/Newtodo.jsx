import React from "react";

export default function AddTodo({ refresh }) {
  async function handleClick() {
    const title = document.querySelector(".title");
    const description = document.querySelector(".description");

    if (title.value === "" || description.value === "") {
      alert("Fields can't be empty");
    } else {
      fetch("https://todo-back-1.onrender.com/todo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.value,
          description: description.value,
        }),
      }).then(() => {
        title.value = "";
        description.value = "";
        refresh();
      });
    }
  }

  return (
    <div className="container">
      <div>
        <input className="title" type="text" placeholder="Enter Title" />
      </div>
      <div>
        <input
          className="description"
          type="text"
          placeholder="Enter Description"
        />
      </div>
      <div>
        <button onClick={handleClick}>Add Todo</button>
      </div>
    </div>
  );
}
