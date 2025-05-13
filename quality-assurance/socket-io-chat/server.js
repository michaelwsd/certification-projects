"use strict";
require("dotenv").config();
const express = require("express");
const myDB = require("./connection");
const fccTesting = require("./freeCodeCamp/fcctesting.js");
const session = require("express-session");
const passport = require("passport");
const routes = require("./routes.js");
const auth = require("./auth.js");

const app = express();

const http = require("http").createServer(app);
const io = require("socket.io")(http);
const passportSocketIo = require("passport.socketio");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo")(session);
const URI = process.env.MONGO_URI;
const store = new MongoStore({ url: URI });

app.set("view engine", "pug");
app.set("views", "./views/pug");

app.use(
  session({
    secret: process.env.SESSION_SECRET, // secret key used to sign the session ID cookie, prevents users from forging session cookie
    resave: true, // forces the session to be saved even if it wasn't changed during the request
    saveUninitialized: true, // save new sessions that haven't been modified
    cookie: { secure: false }, // false for HTTP and HTTPS, true for HTTPS only (true for production)
    key: "express.sid",
    store: store,
  })
);

app.use(passport.initialize());
app.use(passport.session());

fccTesting(app); // For fCC testing purposes
app.use("/public", express.static(process.cwd() + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*
Asks passport to deserialize the cookie and return the user document so it can be accessed by socket.request.user.
.use is socket's way to mount middlewares
*/
io.use(
  passportSocketIo.authorize({
    cookieParser: cookieParser,
    key: "express.sid",
    secret: process.env.SESSION_SECRET,
    store: store,
    success: onAuthorizeSuccess,
    fail: onAuthorizeFail,
  })
);

myDB(async (client) => {
  // client is the connected db
  const myDataBase = await client.db("database").collection("users"); // get the users collection

  routes(app, myDataBase);
  auth(app, myDataBase);

  let currentUsers = 0;
  // only runs once when a user connects, but listeners are all set up for the socket
  io.on("connection", (socket) => {
    ++currentUsers;
    io.emit("user", {
      username: socket.request.user.username,
      currentUsers,
      connected: true,
    });

    // listeners are set up for the socket  
    socket.on("chat message", (message) => {
      io.emit("chat message", {
        username: socket.request.user.username,
        message,
      });
    });
    console.log("A user has connected");
    socket.on("disconnect", () => {
      console.log("A user has disconnected");
      --currentUsers;
      io.emit("user", {
        username: socket.request.user.username,
        currentUsers,
        connected: false,
      });
    });
  });
}).catch((e) => {
  app.route("/").get((req, res) => {
    res.render("index", { title: e, message: "Unable to connect to database" });
  });
});

function onAuthorizeSuccess(data, accept) {
  console.log("successful connection to socket.io");

  accept(null, true);
}

function onAuthorizeFail(data, message, error, accept) {
  if (error) throw new Error(message);
  console.log("failed connection to socket.io:", message);
  accept(null, false);
}

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
