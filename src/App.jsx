import { useEffect, useState } from "react";
import "./App.css";
import Starttodo from "./components/Newtodo";
import Loadtodo from "./components/Alltodo";





function App() {
  const [todos, setTodos] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const fetchTodos = () => {
    fetch("https://todo-back-1.onrender.com/alltodo").then(async (data) => {
      const result = await data.json();
      setTodos(result.todos.x);
    });
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <>
      <div className={`container ${isDarkMode ? "dark-mode" : ""}`}>
        <h1>Todo Application</h1>
        <button onClick={toggleDarkMode} style={{ marginBottom: "20px" }}>
          Toggle {isDarkMode ? "Light" : "Dark"} Mode
        </button>
        <Starttodo refresh={fetchTodos} />
        <Loadtodo todos={todos} refresh={fetchTodos} />
      </div>
        <div class="github">
          <a href="https://github.com/Pushkar021" target="_blank">
            <i class="fab fa-github"></i>
          </a>
        </div>
      <footer>
        2024 Todo App. All rights reserved.
      </footer>
    </>
  );
}

export default App;
