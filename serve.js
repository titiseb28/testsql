const express = require('express'),
  app = express(),
  bodyParser = require('body-parser');
  port = process.env.PORT || 3000;

app.listen(port);

console.log('API server started on: ' + port);

var wiki = require('./routes/wiki')
var tasks = require('./routes/tasks')
var login = require('./routes/login')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/wiki', wiki)
app.use('/tasks', tasks)
app.use('/login', login)