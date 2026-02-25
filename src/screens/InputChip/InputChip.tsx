import { useState } from "react";
import "./styles.less";
function InputChip() {
  const [input, setInput] = useState("");
  const [list, setList] = useState<string[]>([]);

  const addHandler = () => {
    if (!input.trim() || list.includes(input.trim())) return;

    setList([...list, input]);
    setInput("");
  };

  const deleteHandler = (itemIndex: number) => {
    setList(list.filter((_, index) => index != itemIndex));
  };
  return (
    <div className="container">
      <h1 className="main-heading">Input Chips</h1>
      <div className="chips-wrapper">
        <div className="input-container">
          <input
            type="text"
            value={input}
            placeholder="Add a Item"
            onChange={(e) => setInput(e.target.value)}
          />
          <div className="btn-container">
            <button onClick={addHandler}> Add</button>
          </div>
        </div>
        <div className="chips-container">
          {list.map((item, index) => {
            return (
              <div className="item" key={index}>
                <p>{item}</p>
                <button onClick={() => deleteHandler(index)}>x</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default InputChip;
