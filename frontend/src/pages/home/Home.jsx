import React, { useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";
import Input from "../../components/input/Input";
import TaskBox from "../../components/task-box/TaskBox";

const Home = () => {
  const [list, setList] = useState([]);
  const [title, setTitle] = useState("");
  const [newItem, setNewItem] = useState("");
  const [loading, setLoading] = useState(false);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  //Current date and time

  const currentDateAndTime = new Date();
  // Get the date and time components separately
  const year = currentDateAndTime.getFullYear();
  const month = currentDateAndTime.getMonth() + 1; // Months are zero-based
  const day = currentDateAndTime.getDate();
  const hours = currentDateAndTime.getHours();
  const minutes = currentDateAndTime.getMinutes();

  useEffect(() => {
    setDate(`${day}-${month}-${year}`);
    setTime(`${hours}:${minutes}`);
  }, [minutes]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/");
      setList(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Getting error on fetching data", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handlePostItem = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/", {
        title,
        item: newItem,
        date,
        time,
      });
      setList((prevList) => [...prevList, { item: newItem }]);
      fetchData();
    } catch (err) {
      console.error("Error occurs while posting data to server", err);
    }
  };
  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/${id}`);
      console.log(`Item with id ${id} deleted successfully`);

      setList((prevList) => prevList.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Error occurs while deleting data to server", err);
    }
  };

  return (
    <div className="home-wrapper">
      <div className="home-upper-wrapper">
        {list.map((item, i) => (
          <TaskBox item={item} i={i} handleDeleteItem={handleDeleteItem} />
        ))}
      </div>
      <div className="home-bottom-wrapper">
        <Input
          handlePostItem={handlePostItem}
          setTitle={setTitle}
          setNewItem={setNewItem}
        />
      </div>
    </div>
  );
};

export default Home;
