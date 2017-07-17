const express = require('express');
const router = express.Router();

router.get('/dashboard', (request, response) => {
    response.send(request.session);
})

module.exports = router;