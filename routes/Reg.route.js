const express = require('express');
const router = express.Router();
const {createUser , getUser , getUserById , deleteUserById} = require('../controllers/Reg.controller');


router.get('/',getUser);
router.post('/',createUser('user'));
router.get('/:id',getUserById);
router.delete("/:id", deleteUserById);


module.exports = router;