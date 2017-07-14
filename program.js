const express = require('express');
const bodyParser = require('bodyParser');



const application = express();


application.use(bodyParser.json());
application.use(bodyParser.urlencoded());
