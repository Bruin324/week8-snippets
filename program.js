const express = require('express');
const bodyParser = require('bodyParser');
const mustache = require('mustache-express');


const userController = require('user-controller');
const snippetController = require('snippet-controller')

const application = express();

application.engine('mustache', mustache());

application.set('views', './views');
application.set('view engine', 'mustache');


application.use(bodyParser.json());
application.use(bodyParser.urlencoded());

application.use(userController);
application.use(snippetController);
