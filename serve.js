var expressJwt = require('express-jwt'); // protege toute les routes
var mySecret = require('./secret') // configuration jwt 

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

app.use(expressJwt({ secret: mySecret }).unless({ path: ['/login/signin', '/login/signup'] })); // demante pas de token pour cette route



app.use('/wiki', wiki)
app.use('/tasks', tasks)
app.use('/login', login)