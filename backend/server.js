const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoute");
// const authMiddleware = require("./middlewares/authMiddleware")
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

//Middlewares:

app.use(
  cors({
    origin: ["https://beindescipline-api.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);
app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ extended: true, limit: "500mb" }));
app.use("/auth", authRoutes);

// Define a simple route
app.get("/auth", (req, res) => {
  res.send("This is a protected route");
});

//Connect to DB
mongoose.connect(process.env.MONGO_URL);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
