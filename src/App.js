import "./styles.css";
import React, { useEffect } from "react";
export default function App() {
  const [todos, setTodos] = React.useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );

  useEffect(() => {
    // console.log("uhhhhh");
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="App">
      <h1>To Do List</h1>
      <AddTodo setTodos={setTodos} todos={todos} />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
}
function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

function TodoList({ todos, setTodos }) {
  function handleToggleTodo(todo) {
    const updatedTodos = todos.map((t) =>
      t.id === todo.id ? { ...t, done: !t.done } : t
    );
    setTodos(updatedTodos);
  }
  if (!todos.length) {
    return <p>No todos left!</p>;
  }
  return (
    <div>
      <ol>
        {todos.map((todo) => (
          <li
            style={{ textDecoration: todo.done ? "line-through" : "" }}
            key={todo.id}
            id={uuidv4()}
          >
            <span onClick={() => handleToggleTodo(todo)}>{todo.text}</span>
            <DeleteTodo todo={todo} setTodos={setTodos} />
          </li>
        ))}
      </ol>
      <p>You have {todos.length} tasks</p>
    </div>
  );
}

function DeleteTodo({ todo, setTodos }) {
  function handleDeleteTodo() {
    // const confirmed = window.confirm("Do you want to delete this?");
    // if (confirmed) {
    setTodos((prevTodos) => {
      return prevTodos.filter((t) => t.id !== todo.id);
    });
  }

  return (
    <span
      onClick={handleDeleteTodo}
      role="button"
      className="deleteButton"
      style={{
        // color: "red",
        fontWeight: "bold",
        marginLeft: 10,
        cursor: "pointer"
      }}
    >
      x
    </span>
  );
}
function AddTodo({ todos, setTodos }) {
  const inputRef = React.useRef();
  const [counter, setCounter] = React.useState(0);
  function handleAddTodo(event) {
    event.preventDefault();
    const text = event.target.elements.addTodo.value;
    if (text) {
      setCounter((p) => p + 1);

      setTodos((p) => [...p, { id: uuidv4(), text, done: false }]);
      inputRef.current.value = "";
    } else {
      alert("Dummy text lmao");
    }
  }
  return (
    <div className="addItem">
      <form onSubmit={handleAddTodo}>
        <input name="addTodo" placeholder="Add Todo" ref={inputRef} />
        <button type="submit" className="addButton">
          Submit
        </button>
      </form>
    </div>
  );
}
