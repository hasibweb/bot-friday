const path = require("path");
const express = require("express");

const app = express();

app.use(express.static(path.join(__dirname, "/public/dist")));

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("App Running on Port:", PORT));
