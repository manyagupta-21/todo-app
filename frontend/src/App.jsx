import { useEffect, useState } from "react";
import TodoList from "./components/TodoList";
import "./App.css";

const API_URL = "http://127.0.0.1:8000/todos/";

function App() {
  console.log("✅ UPDATED APP.JSX IS RUNNING");
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  // 🔹 STEP 4: FETCH TODOS FROM BACKEND
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error(err));
  }, []);

  // 🔹 ADD TODO (POST)
  const addTodo = async () => {
    if (!input.trim()) return;

    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: input }),
    });

    const newTodo = await res.json();
    setTodos([...todos, newTodo]);
    setInput("");
  };

  // 🔹 DELETE TODO
  const deleteTodo = async (id) => {
    await fetch(`${API_URL}${id}/`, {
      method: "DELETE",
    });

    setTodos(todos.filter((t) => t.id !== id));
  };

  // 🔹 TOGGLE TODO (PUT / PATCH)
  const toggleTodo = async (id) => {
  const todo = todos.find((t) => t.id === id);

  const res = await fetch(`${API_URL}${id}/`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      completed: !todo.completed,
    }),
  });

  const updatedTodo = await res.json();

  setTodos(
    todos.map((t) =>
      t.id === id ? updatedTodo : t
    )
  );
};


  return (
    <div className="background">
      <div className="card">
        <h2>To-Do</h2>

        <div className="inputRow">
          <input
            placeholder="Add a task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
          />
          <button className="add" onClick={addTodo}>
            Add
          </button>
        </div>

        <TodoList
          todos={todos}
          onDelete={deleteTodo}
          onToggle={toggleTodo}
        />
      </div>
    </div>
  );
}

export default App;
