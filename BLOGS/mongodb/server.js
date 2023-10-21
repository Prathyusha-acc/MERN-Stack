const express = require("express");
const app = express();
const port = 5000;
const mongodb = require("./db");
const userRoutes = require("./Routes/userRoutes");
const blogRoutes = require("./Routes/blogRoutes");
const cors = require("cors");

app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Header",
    "Origin, X-Requested-With, Content-Type,Accept"
  );
  next();
});
app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api/blog", blogRoutes);
app.get("/", (req, res) => {
  res.send("Hello World!---------");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
