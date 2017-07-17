const express = require('express');
const bodyParser = require('body-parser');
const mustache = require('mustache-express');
const session = require('express-session');


const userController = require('./routes/user-controller');
const snippetController = require('./routes/snippet-controller')

const application = express();

application.engine('mustache', mustache());

application.set('views', './views');
application.set('view engine', 'mustache');


application.use(bodyParser.json());
application.use(bodyParser.urlencoded());
application.use(session({
    secret: 'bruinisinthehouse',
    resave: false,
    saveUninitialized: true
}))

application.use(express.static(__dirname + '/public'));

application.use(userController);
application.use(snippetController);

application.listen(3000, () => {console.log("Server started on 3000")});
