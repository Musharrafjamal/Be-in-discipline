import React, { useState, useEffect } from "react";
import "./ToDo.css";
import axios from "axios";
import Nav from "../../components/nav/Nav";
import Input from "../../components/input/Input";
import TaskBox from "../../components/task-box/TaskBox";

const ToDo = () => {
  const [list, setList] = useState([]);
  const [title, setTitle] = useState("");
  const [newItem, setNewItem] = useState("");

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  //Current date and time
  function padWithZero(value) {
    return value < 10 ? `0${value}` : value;
  }

  const username = localStorage.getItem("username")

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
  const fetchData = async () => {
    try {
      const response = await axios.get(`https://beindescipline-server.vercel.app/auth/app/${username}`);
      setList(response.data.item);
      // console.log(response.data)
    } catch (error) {
      console.error("Getting error on fetching data", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [list.length]);

  const handlePostItem = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`https://beindescipline-server.vercel.app/auth/app/${username}`, {
        title: title.toUpperCase(),
        item: newItem,
        date,
        time,
      });
      setList((prevList) => [...prevList, { item: newItem }]);
      // fetchData();
    } catch (err) {
      console.error("Error occurs while posting data to server", err);
    }
  };
  const handleDeleteItem = async (i) => {
    try {
      await axios.delete(`https://beindescipline-server.vercel.app/auth/app/${username}/${i}`);
      console.log(`Item with id ${i} deleted successfully`);

      setList((prevList) => prevList.filter((item, index) => index !== i));
    } catch (err) {
      console.error("Error occurs while deleting data to server", err);
    }
  };
  return (
    <div className="to-do-container">
      <Nav />
      <div className="to-do-upper-wrapper">
        {list.map((item, i) => (
          <TaskBox item={item} handleDeleteItem={handleDeleteItem} key={i} i={i} />
        ))}
      </div>
      <div className="to-do-bottom-wrapper">
        <Input
          handlePostItem={handlePostItem}
          setTitle={setTitle}
          setNewItem={setNewItem}
        />
      </div>
    </div>
  );
};

export default ToDo;
