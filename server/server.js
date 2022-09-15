// const { reduce } = require("./NewsFetching");
const { response } = require("express");
const newsFetching = require("./NewsFetching");
const express = require("express");
const cors = require("cors");

const app = express();
const port = 5000;

const whitelist = ["http://localhost:3000"];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not Allowed Origin!"));
    }
  },
};
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  newsFetching().then((response) => res.send(response));
});

app.get("/api/news", (req, res) => {
  newsFetching().then((response) => res.send(response));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
