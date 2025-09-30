const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: "*",
  })
);

const port = process.env.PORT;

app.get("/", (req, res) => {
    
  res.send("Hello World!");
});
app.get("/test", (req, res) => {
  return res.status(200).json({
    test: "test",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
