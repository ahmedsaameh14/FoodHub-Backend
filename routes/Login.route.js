const express = require('express');
const router = express.Router();
const {login} = require('../controllers/Login.controller')

router.post('/', login)

module.exports = router;