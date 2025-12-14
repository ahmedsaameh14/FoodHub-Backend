const express = require('express');
const router = express.Router();
const {createUser , getUser , getUserById , deleteUserById} = require('../controllers/Reg.controller');
const {authenticate} = require('../middlewares/auth.middleware')

router.get('/' , authenticate,getUser);
router.post('/' ,createUser('user'));
router.post('/createAdmin' , authenticate , createUser('admin'));        // Only Admin can Create New Admins
router.get('/:id' , authenticate , getUserById);
router.delete("/:id" , deleteUserById);


module.exports = router;