const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const salt = 'dontSnatchTheSnippets';
const models = require('../models');
const expressValidator = require('express-validator');

router.use(expressValidator());

router.get('/', (request, response) => {
    if (!request.session.user) {
        response.render('index');
    } else {
        response.redirect('dashboard');
    }
})

router.get('/login', (request, response) => {
    response.render('login');
})

router.get('/login/data', (request, response) => {
    response.send(request.session);
})

router.get('/register', (request, response) => {
    response.render('register');
});

router.post('/register', async (request, response) => {
    var name = request.body.name;
    var email = request.body.email;
    var password = request.body.password;
    var cpwd = request.body.cpwd;
    request.checkBody('name', 'Please enter a name.').notEmpty();
    request.checkBody('email', 'Please enter a valid email address').matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "i");
    request.checkBody('password', 'Password must be at least 8 characters and contain one letter and one number').matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, "i");
    request.checkBody('cpwd', 'Passwords must match').equals(password);
    var errors = request.validationErrors();
    var existingUser = await models.users.find({ where: { email: email } });
    if (existingUser) {
        errors = [{msg: 'That email has already been registered.'}];
        var model = { errors: errors };
        response.render('register', model);
    } else if (errors) {
        var model = { errors: errors };
        response.render('register', model);
    } else {
        var hashed = crypto.pbkdf2Sync(password, salt, 10, 256, 'sha256').toString('base64');
        var newUser = await models.users.create({ name: name, email: email, password: hashed });
        var userSession = {
            name: newUser.name,
            email: newUser.email,
            isAuthenticated: true,
            id: newUser.id
        }
        request.session.user = userSession;
        // request.session = {
        //     user: {userSession}
        // }
        // response.send(newUser);
        response.redirect('dashboard')
    }
})

router.post('/login', async (request, response) => {
    var hashed = crypto.pbkdf2Sync(request.body.password, salt, 10, 256, 'sha256').toString('base64');
    var query = { where: { email: request.body.email, password: hashed } };
    var user = await models.users.find(query);
    if (user) {
        var userSession = {
            name: user.name,
            email: user.email,
            isAuthenticated: true,
            id: user.id
        }
        request.session.user = userSession;
        // response.send(request.session);
        response.render('dashboard');
    } else {
        var errors = [{msg: 'Invalid username/password combination'}];
        var model = { errors: errors };
        response.render('login', model);
    }
});



module.exports = router;