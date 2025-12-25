const express = require('express');
const router = express.Router();
const category = require('../controllers/Category.controller');

router.post('/' , category.createCategory);

router.get('/' , category.getCategory);

router.delete('/:id' , category.deleteCategory);

module.exports = router;