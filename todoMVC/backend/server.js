const express = require('express');
const path = require('path');
const tasksRouter = require('./tasks');

const app = express();
const port = 3000;
const public_dir = path.join(__dirname, '..', 'public');
const framework_dir = path.join(__dirname, '..', 'framework');
app.use(express.json());
app.use('/static', express.static(path.join(public_dir, 'static')));
app.use('/framework', express.static(framework_dir));

app.use('/', tasksRouter)

app.get('/', (req, res) => {
  res.sendFile(path.join(public_dir, 'index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});