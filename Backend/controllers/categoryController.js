import asyncHandler from "../middlewares/asyncHandler.js";
import Category from "../models/categoryModel.js";

const createCategory = asyncHandler(async(req, res) => {

    const {name} = req.body;
    if (!name) {
        return res.status(404).json({error: "Please enter the category name"})
    }

    const existingCategory = await Category.findOne({name});
    if (existingCategory) {
        return res.status(404).json({error: "This category already exist"})
    } else {
        try {
            const newCategory = new Category({name});
            await newCategory.save();
            res.status(200).json(newCategory)
        } catch (error) {
            res.status(404).json({error})
        }
    }
})

const updateCategory = asyncHandler(async(req, res) => {

    const category = await Category.findById(req.params.categoryID);

    //{categoryID} = req.params
    //Category.findOne({_id: categoryID});
    //Category.findById(categoryID);
    //console.log(req.params.categoryID);
    
    if (category) {
        category.name = req.body.name
        const updatedCategory = await category.save();
        res.status(200).json(updatedCategory)
    } else {
        res.status(404).json({error: "Category not found"})
    }

})

const deleteCategory = asyncHandler(async(req, res) => {
    const category = await Category.findById(req.params.categoryID);
    //     const category = await Category.findByIdAndRemove(req.params.categoryID); this method find and remove in one step

    if (category) {
        await category.deleteOne({_id: category._id});
        res.status(200).json({message : "Category deleted successfully"});
    } else {
        res.status(404).json({message : "Category not found"});

    }
})

const listCategories = asyncHandler(async(req, res ) => {
    try {
        const categories = await Category.find({})
        if (categories) {
            res.status(201).json(categories)
        } else {
            res.status(404).json({message: "Category not found"})
        }
    } catch (error) {
        res.status(500).json({message: "Internal server error"})
    }
})

const specificCategory = asyncHandler(async(req, res) => {
    try {
        const category = await Category.findById(req.params.categoryID)
        if (category) {
            res.status(201).json(category)
        } else {
            res.status(404).json({message: "Category not found"})
        }
    } catch (error) {
        res.status(500).json({message: "Internal server error"})
    }
})

export {createCategory, updateCategory, deleteCategory, listCategories, specificCategory};