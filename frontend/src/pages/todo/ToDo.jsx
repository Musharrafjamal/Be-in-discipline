import React, { useState, useEffect } from "react";
import "./ToDo.css";
import axios from "axios";
import Nav from "../../components/nav/Nav";
import Input from "../../components/input/Input";
import TaskBox from "../../components/task-box/TaskBox";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toogleSelector } from "../../redux/slice/toggleSlice";

const ToDo = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("token");
    if (!isAuthenticated) {
      return navigate("/login");
    }
  }, []);
  const [list, setList] = useState([]);
  const [title, setTitle] = useState("");
  const [newItem, setNewItem] = useState("");
  const isDarkMode = useSelector(toogleSelector);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);

  //Current date and time
  function padWithZero(value) {
    return value < 10 ? `0${value}` : value;
  }

  const username = localStorage.getItem("username");

  const currentDateAndTime = new Date();
  // Get the date and time components separately
  const year = currentDateAndTime.getFullYear();
  const month = padWithZero(currentDateAndTime.getMonth() + 1); // Month is zero-based, so add 1
  const day = padWithZero(currentDateAndTime.getDate());
  const hours = padWithZero(currentDateAndTime.getHours());
  const minutes = padWithZero(currentDateAndTime.getMinutes());

  const localUrl = "http://localhost:5000";
  const backendUrl = "https://beindescipline-server.onrender.com";

  useEffect(() => {
    setDate(`${day}-${month}-${year}`);
    setTime(`${hours}:${minutes}`);
  }, [minutes]);
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${backendUrl}/auth/app/${username}`);
      setList(response.data.item);
      // console.log(response.data)
    } catch (error) {
      console.error("Getting error on fetching data", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [list.length]);

  const handlePostItem = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${backendUrl}/auth/app/${username}`, {
        title: title.toUpperCase(),
        item: newItem,
        date,
        time,
      });
      setList((prevList) => [...prevList, { item: newItem }]);
      // fetchData();
    } catch (err) {
      console.error("Error occurs while posting data to server", err);
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteItem = async (i) => {
    setLoading(true);
    try {
      await axios.delete(`${backendUrl}/auth/app/${username}/${i}`);
      console.log(`Item with id ${i} deleted successfully`);

      setList((prevList) => prevList.filter((item, index) => index !== i));
    } catch (err) {
      console.error("Error occurs while deleting data to server", err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {loading ? (
        <div
          className="loading-wrapper"
          style={{
            background: isDarkMode
              ? "linear-gradient(180deg, #272727 0%, #151515 100%)"
              : "",
          }}
        >
          <div
            aria-label="Orange and tan hamster running in a metal wheel"
            role="img"
            className="wheel-and-hamster"
          >
            <div className="wheel"></div>
            <div className="hamster">
              <div className="hamster__body">
                <div className="hamster__head">
                  <div className="hamster__ear"></div>
                  <div className="hamster__eye"></div>
                  <div className="hamster__nose"></div>
                </div>
                <div className="hamster__limb hamster__limb--fr"></div>
                <div className="hamster__limb hamster__limb--fl"></div>
                <div className="hamster__limb hamster__limb--br"></div>
                <div className="hamster__limb hamster__limb--bl"></div>
                <div className="hamster__tail"></div>
              </div>
            </div>
            <div className="spoke"></div>
          </div>
        </div>
      ) : (
        <div
          className="to-do-container"
          style={{
            background: isDarkMode
              ? "linear-gradient(180deg, #272727 0%, #151515 100%)"
              : "",
          }}
        >
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
        </div>
      )}
    </>
  );
};

export default ToDo;
