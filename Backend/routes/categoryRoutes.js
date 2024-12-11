import express from "express";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import { createCategory, 
    updateCategory, 
    deleteCategory, 
    listCategories,
    specificCategory,
 } from "../controllers/categoryController.js";


const router = express.Router();

router.route('/').post(authenticate, authorizeAdmin, createCategory);
router.route('/:categoryID').put(authenticate, authorizeAdmin, updateCategory);
router.route('/:categoryID').delete(authenticate, authorizeAdmin, deleteCategory);
router.route('/listCategories').get(listCategories);
router.route('/:categoryID').get(specificCategory);

export default router;