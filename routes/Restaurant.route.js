const express = require('express');
const router = express.Router();
const { createRestaurant , getRestaurant , getRelatedRestaurant , getRestaurantById , updateRestaurant , deleteRestaurant}
 = require('../controllers/Restaurant.controller');
const {authenticate}= require('../middlewares/auth.middleware')
const {authorize} = require('../middlewares/role.middleware')
const upload = require('../middlewares/multer.middleware');
const paginate = require('../middlewares/paginate.middleware');
const Restaurant = require('../models/Restaurant.model');

router.post('/' , authenticate , authorize('admin') , upload.single('img') , createRestaurant);

router.get('/' , paginate(Restaurant) , getRestaurant );

router.get('/:id' , getRestaurantById);

router.get('/related/:id' , getRelatedRestaurant);

router.put('/:id' , upload.single('img') , authenticate , authorize('admin') , updateRestaurant);

router.delete('/:id' , authenticate , authorize('admin') , deleteRestaurant);


module.exports = router;