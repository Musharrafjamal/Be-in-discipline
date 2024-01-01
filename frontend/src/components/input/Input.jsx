import React from "react";
import "./Input.css";

const Input = ({ handlePostItem, setTitle, setNewItem }) => {
  return (
    <form
      className="input-container"
      onSubmit={handlePostItem}
    >
      <input
        type="text"
        name="title"
        placeholder="Title"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <div className="input-wrapper">
          <input
            type="text"
            name="item"
            placeholder="Add new task..."
            onChange={(e) => {
              setNewItem(e.target.value);
            }}
          />
          <button type="submit"><span>+</span></button>
      </div>
    </form>
  );
};

export default Input;
