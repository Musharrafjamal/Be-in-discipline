import React, { useEffect } from "react";
import axios from "axios";

const Home = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/");
        console.log(response.data);
      } catch (error) {
        console.error("Getting error on fetching data", error);
      }
    };

    fetchData()
  }, []);

  return (
    <div className="home-wrapper">
      <h1>Make your LIST</h1>
      <p>A to do's app</p>
      <form className="input-wrapper" action="/" method="post">
        <input type="text" />
        <button type="submit">+</button>
        <button type="reset">Reset</button>
      </form>
    </div>
  );
};

export default Home;
