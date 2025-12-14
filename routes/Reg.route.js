const express = require('express');
const router = express.Router();
const {createUser , getUser , getUserById , deleteUserById} = require('../controllers/Reg.controller');
const {authenticate} = require('../middlewares/auth.middleware')
const {authorize} = require('../middlewares/role.middleware')

router.post('/' ,createUser('user'));       // Normal User Registration 

router.post('/createAdmin' , authenticate , createUser('admin'));        // Only Admin can Create New Admins

router.get('/' , authenticate , authorize('admin') ,getUser);       // Only Admin GET All Users

router.get('/:id' , authenticate , authorize('user') ,  getUserById);            // For each Profile 

router.delete("/:id" , deleteUserById);             // Only for test in Postman


module.exports = router;