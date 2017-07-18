const express = require('express');
const router = express.Router();

router.get('/dashboard/data', (request, response) => {
    response.send(request.session);
})

router.get('/dashboard', (request, response) => {
    if (request.session.user.isAuthenticated != true) {
        response.redirect('/login');
    } else {
        response.render('dashboard');
    }
})

router.get('/create-snippet', (request, response) => {

})

router.post('/create-snippet', (request, response) => {

})

module.exports = router;