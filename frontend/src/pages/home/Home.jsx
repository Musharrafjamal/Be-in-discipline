import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [list, setList] = useState([]);
  const [newItem, setNewItem] = useState("");
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/");
      setList(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Getting error on fetching data", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handlePostItem = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/", { item: newItem });
      fetchData();
    } catch (err) {
      console.error("Error occurs while posting data to server", err);
    }
  };
  const handleDeleteItem = async (id) => {
    try {
      const deleteItem = axios.delete(`http://localhost:5000/${id}`);
      fetchData();
    } catch (err) {
      console.error("Error occurs while deleting data to server", err);
    }
  };

  return (
    <div className="home-wrapper">
      <div className="home-upper-wrapper">
        <h1>Make your LIST</h1>
        <p>A to do's app</p>
        <form
          className="input-wrapper"
          action="/"
          method="post"
          onSubmit={handlePostItem}
        >
          <input
            type="text"
            name="item"
            onChange={(e) => {
              setNewItem(e.target.value);
            }}
          />
          <button type="submit">+</button>
          <button type="reset">Reset</button>
        </form>
      </div>
      <div className="home-bottom-wrapper">
        {list.map((item, index) => {
          return (
            <div
              key={index}
              style={{
                display: "flex",
              }}
            >
              <li>{item.item}</li>
              <button onClick={() => handleDeleteItem(item._id)}>Delete</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
