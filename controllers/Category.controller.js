const category = require('../models/Category.model')

exports.createCategory = async (req , res) =>{
    try{
        const {name} = req.body;

        const cat = await category.create({name});
        res.status(201).json({ message: 'Category Created' , data: cat});
    }
    catch (err) {
        res.status(500).json({ message: 'Faild to Create Category' , error: err.message})
    }
};

exports.getCategory = async (req , res) => {
    try{
        const cat = await category.find();
        res.status(200).json({ message: 'List of Categories' , data: cat});
    }
    catch (err) {
        res.status(500).json({ message: 'Faild to Get Category' , error: err.message})
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const cat = await category.findByIdAndDelete(id);

        if (!cat) {
            return res.status(404).json({
                message: 'Category Not Found'
            });
        }

        res.status(200).json({
            message: 'Category Deleted Successfully',
            data: cat
        });
    } catch (err) {
        res.status(500).json({
            message: 'Faild to Delete Category',
            error: err.message
        });
    }
};
