const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.use(express.urlencoded({extended: true}));

let uid = 1;
let users = [];

app.route('/api/users/')
.post((req, res) => {
  const username = req.body.username;
  const found = users.find((item) => item.username == username);
  if (found) return res.json({"username": found.username, "_id": found._id});

  // create new user
  const newUser = {"username": username, "count": 0, "_id": uid.toString(), "log": []};
  uid++;
  users.push(newUser);
  res.json({"username": newUser.username, "_id": newUser._id});
})
.get((req, res) => {
  res.send(users);
})

app.post('/api/users/:_id/exercises', (req, res) => {
  const { description, duration, date } = req.body;
  const userId = req.params._id;

  // Find the user by _id
  const user = users.find((user) => user._id === userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const exerciseDate = date ? new Date(date).toDateString() : new Date().toDateString();
  const exercise = {
    description,
    duration: parseInt(duration, 10), 
    date: exerciseDate,
  };
  user.log.push(exercise);
  user.count++;

  res.json({
    "username": user.username,
    "description": description,
    "duration": parseInt(duration, 10),
    "date": exerciseDate,
    "_id": user._id
  });
})

app.get('/api/users/:_id/logs', (req, res) => {
  const userId = req.params._id;
  const user = users.find((user) => user._id === userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const { from, to, limit } = req.query;
  let logs = user.log;

  // filter dates
  if (from) {
    const fromDate = new Date(from);
    logs = logs.filter(exercise => new Date(exercise.date) >= fromDate);
  }

  if (to) {
    const toDate = new Date(to);
    logs = logs.filter(exercise => new Date(exercise.date) <= toDate);
  }

  if (limit) {
    logs = logs.slice(0, parseInt(limit, 10));
  }

  res.json({
    "username": user.username,
    "count": user.count,
    "_id": user._id, 
    "log": logs
  });
})


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
