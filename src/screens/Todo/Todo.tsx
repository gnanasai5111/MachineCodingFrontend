import { useState } from "react";
import "./styles.less";

type Todo = {
  id: number;
  text: string;
  checked: boolean;
};

function Todo() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const addHandler = () => {
    if (!input.trim()) {
      return;
    }
    const item: Todo = {
      id: Date.now(),
      text: input,
      checked: false,
    };
    setTodos([...todos, item]);
    setInput("");
  };

  const toggleHandler = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo
      )
    );
  };

  const deleteHandler = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  return (
    <div className="container">
      <h1 className="main-heading">Todo</h1>
      <div className="todo-wrapper">
        <div className="input-container">
          <input
            type="text"
            value={input}
            placeholder="Add a todo"
            onChange={(e) => setInput(e.target.value)}
          />
          <div className="btn-container">
            <button onClick={addHandler}> Add a Todo</button>
          </div>
        </div>
        <div className="todo-container">
          {todos.map((todo) => {
            return (
              <div className="item" key={todo.id}>
                <div className="left-side">
                  <input
                    type="checkbox"
                    checked={todo.checked}
                    onChange={() => toggleHandler(todo.id)}
                  />
                  <p className={todo.checked ? "marked text" : "unmarked text"}>
                    {todo.text}
                  </p>
                </div>

                <button onClick={() => deleteHandler(todo.id)}>Delete</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Todo;
