require("dotenv").config();
const express = require("express");
const path = require("path");
const helmet = require("helmet");
const mongoose = require("mongoose");
const csrf = require("csurf");
const routes = require("./routes");
const {
  globalMiddleware,
  csrfMiddleware,
  checkCsrfError,
} = require("./src/middlewares/goblalMiddlewares");

const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");

const app = express();

mongoose
  .connect(process.env.CONNECTION_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("db connected, ready to listen the server.");
    app.emit("dbConnected");
  })
  .catch((err) => {
    console.error("Está caindo no erro do catch:", err);
  });

const port = 3000;

app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const sessionOptions = session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  },
  store: MongoStore.create({
    mongoUrl: process.env.CONNECTION_DB,
  }),
});
app.use(sessionOptions);
app.use(flash());

app.set("views", path.resolve(__dirname, "src", "views"));
app.set("view engine", "ejs");

app.use(express.static(path.resolve(__dirname, "public")));

app.use(csrf());
app.use(csrfMiddleware);
app.use(globalMiddleware);
app.use(routes);
app.use(checkCsrfError);

app.on("dbConnected", () => {
  app.listen(port, () => {
    console.log(`Online! servidor em: http://localhost:${port}`);
  });
});
