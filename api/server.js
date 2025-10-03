const dotenv = require("dotenv");
dotenv.config();
const routes = require("./routes");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const port = process.env.PORT;


const app = express();
app.use(
  cors({
    origin: true, // Autorise toutes les origines
    credentials: true
  })
);

app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));





app.use(routes); 
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
