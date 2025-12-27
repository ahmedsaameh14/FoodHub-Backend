const Restaurant = require("../models/Restaurant.model");
const Category = require("../models/Category.model");
const mongoose = require("mongoose");

// If Using name of Category not ID
exports.createRestaurant = async (req, res) => {
    try {
        const { name, desc, phone, address, category } = req.body;
        const img = req.file.filename;

        let categoryId = category;
        if (!mongoose.Types.ObjectId.isValid(category)) {
            const catDoc = await Category.findOne({ name: category });
            if (!catDoc) {
                return res.status(400).json({ message: "Invalid category name" });
            }
            categoryId = catDoc._id;
        }

        const myRestaurant = await Restaurant.create({
            name,
            desc,
            phone,
            address,
            img,
            category: categoryId,
        });

        res.status(201).json({ message: "Restaurant Created", myRestaurant });
    } catch (err) {
        res.status(500).json({
            message: "Failed to create Restaurant",
            error: err.message,
        });
    }
};

// Get All Res with Pagination
exports.getRestaurant = async (req, res) => {
    const restaurant = await Restaurant.find();
    //  res.status(201).json({ message : 'List of Restaurant', data: Restaurant});
    res.status(200).json(res.paginatedResult);
};

// Get Res by ID
exports.getRestaurantById = async (req, res) => {
    const id = req.params.id;
    const restaurant = await Restaurant.findById(id);
    if (restaurant) {
        res.status(200).json({ message: "Restaurant Data", data: restaurant });
    } else {
        res.status(404).json({ message: "Restaurant Not Found" });
    }
};


// Get Related Restaurants
exports.getRelatedRestaurant = async (req , res) =>{
    const id = req.params.id;
    const restaurant = await Restaurant.where('_id').ne(id).limit(6)
    if(restaurant){
        res.status(200).json({message: 'Restaurant Rlated Data' , data: restaurant});
    }else {
        res.status(404).json({message:'Restaurant Not Found'})
    }
}


// Update Restaurant
exports.updateRestaurant = async (req , res) =>{
    try {
    const { id } = req.params;

    // Check if restaurant exists
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant Not Found' });
    }

    const { name, desc, phone, address, category } = req.body;

    // Handle image update if file was uploaded
    let img = restaurant.img;
    if (req.file) {
      img = req.file.filename;
    }

    // Handle Category (string name or ID)
    let categoryId = category || restaurant.category;
    if (category && !mongoose.Types.ObjectId.isValid(category)) {
      const catDoc = await Category.findOne({ name: category });
      if (!catDoc) {
        return res.status(400).json({ message: 'Invalid category name' });
      }
      categoryId = catDoc._id;
    }

    // Update Restaurant
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      id,
      {
        name: name || restaurant.name,
        desc: desc || restaurant.desc,
        phone: phone || restaurant.phone,
        address: address || restaurant.address,
        img,
        category: categoryId
      },
      { new: true }
    );

    res.status(200).json({ message: 'Restaurant Updated', updatedRestaurant });

  } catch (err) {
    res.status(500).json({
      message: 'Failed to update Restaurant',
      error: err.message
    });
  }
};

exports.deleteRestaurant = async (req, res) => {
    try {
        const { id } = req.params;

        const restaurant = await Restaurant.findByIdAndDelete(id);

        if (!restaurant) {
            return res.status(404).json({
                message: "Restaurant Not Found"
            });
        }

        res.status(200).json({
            message: "Restaurant Deleted Successfully",
            data: restaurant
        });

    } catch (err) {
        res.status(500).json({
            message: "Failed to delete Restaurant",
            error: err.message
        });
    }
};
