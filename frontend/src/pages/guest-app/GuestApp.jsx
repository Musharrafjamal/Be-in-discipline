import React, { useState, useEffect } from "react";
import "./GuestApp.css";
import Nav from "../../components/nav/Nav";
import TaskBox from "../../components/task-box/TaskBox";
import Input from "../../components/input/Input";
import { toogleSelector } from "../../redux/slice/toggleSlice";
import { useSelector } from "react-redux"

const GuestApp = () => {
  const [list, setList] = useState([]);
  const [title, setTitle] = useState("");
  const [newItem, setNewItem] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);
  const isDarkMode = useSelector(toogleSelector);

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
      setLoading(true);
      setList(JSON.parse(getList));
      setLoading(false);
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
      {loading ? (
        <div className="loading-wrapper" style={{
          background: isDarkMode
            ? "linear-gradient(180deg, #272727 0%, #151515 100%)"
            : "",
        }}>
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
        <div className="guest-app-container" style={{
          background: isDarkMode
            ? "linear-gradient(180deg, #272727 0%, #151515 100%)"
            : "",
        }}>
          <Nav />
          <div className="guest-app-upper-wrapper">
            {list.map((item, i) => (
              <TaskBox
                item={item}
                handleDeleteItem={handleDeleteItem}
                key={i}
                i={i}
              />
            ))}
          </div>
          <div className="guest-app-bottom-wrapper">
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

export default GuestApp;
