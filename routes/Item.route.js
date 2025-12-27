const express = require('express');
const router = express.Router();
const {addItemToRestaurant , getItemsByRestaurant , getItemById , updateItem , deleteItem} = require('../controllers/Item.controller')
const upload = require('../middlewares/multer.middleware');
const {authenticate}= require('../middlewares/auth.middleware')
const {authorize} = require('../middlewares/role.middleware')


// Create item 
router.post('/', authenticate , authorize('admin'), upload.single('img') , addItemToRestaurant);

// Get items by restaurant
router.get('/restaurant/:restaurantId', getItemsByRestaurant);

// Get item by ID
router.get('/:id', getItemById);

// Update item
router.put('/:id', upload.single('img') , authenticate , authorize('admin') , updateItem);

// Delete item
router.delete('/:id', authenticate , authorize('admin') , deleteItem);

module.exports = router;
