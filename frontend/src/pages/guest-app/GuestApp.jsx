import React, { useState, useEffect } from "react";
import "./GuestApp.css";
import Nav from "../../components/nav/Nav";
import TaskBox from "../../components/task-box/TaskBox";
import Input from "../../components/input/Input";

const GuestApp = () => {
  const [list, setList] = useState([]);
  const [title, setTitle] = useState("");
  const [newItem, setNewItem] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  //Current date and time
  function padWithZero(value) {
    return value < 10 ? `0${value}` : value;
  }

  const currentDateAndTime = new Date();
  // Get the date and time components separately
  const year = currentDateAndTime.getFullYear();
  const month = padWithZero(currentDateAndTime.getMonth() + 1); // Month is zero-based, so add 1
  const day = padWithZero(currentDateAndTime.getDate());
  const hours = padWithZero(currentDateAndTime.getHours());
  const minutes = padWithZero(currentDateAndTime.getMinutes());

  useEffect(() => {
    setDate(`${day}-${month}-${year}`);
    setTime(`${hours}:${minutes}`);
  }, [minutes]);

  useEffect(() => {
    const getList = localStorage.getItem("list");
    if (getList) {
      setList(JSON.parse(getList));
    }
  }, []); // The dependency array is empty to run the effect only once on component mount

  const handlePostItem = (e) => {
    e.preventDefault();
    const updatedList = [...list, { title, item: newItem, date, time }];
    setList(updatedList);
    localStorage.setItem("list", JSON.stringify(updatedList));
  };
  const handleDeleteItem = (i) => {
    setList((prevList) => {
        const updatedList = prevList.filter((item, index) => index !== i);
        localStorage.setItem("list", JSON.stringify(updatedList));
        return updatedList;
      });
  };

  return (
    <>
      <Nav />
      <div className="to-do-upper-wrapper">
        {list.map((item, i) => (
          <TaskBox
            item={item}
            handleDeleteItem={handleDeleteItem}
            key={i}
            i={i}
          />
        ))}
      </div>
      <div className="to-do-bottom-wrapper">
        <Input
          handlePostItem={handlePostItem}
          setTitle={setTitle}
          setNewItem={setNewItem}
        />
      </div>
    </>
  );
};

export default GuestApp;
