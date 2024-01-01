import React from "react";
import "./TaskBox.css";
import { MdDelete } from "react-icons/md";

const TaskBox = ({item, i, handleDeleteItem}) => {
  return (
    <div className="Task-box-wrapper">
      <h2>{item.title}</h2>
      <p>{item.item}</p>
      <span>{item.date} {item.time}</span>
      <button onClick={() => handleDeleteItem(i)} title="Delete task"><MdDelete /></button>
    </div>
  );
};

export default TaskBox;
