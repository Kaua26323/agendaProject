const express = require("express");
const path = require("path");
const routes = require("./routes");

const app = express();
const port = 3000;

app.use(express.urlencoded({ urlencoded: true }));
app.use(express.json());

app.set("views", path.resolve(__dirname, "src", "views"));
app.set("view engine", "ejs");

app.use(express.static(path.resolve(__dirname, "public")));

app.use(routes);

app.listen(port, () => {
  console.log(`Online! servidor em: http://localhost:${port}`);
});
