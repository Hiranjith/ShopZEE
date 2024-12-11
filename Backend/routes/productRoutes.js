import express from "express"
import formidable  from "express-formidable";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import { addProduct, 
    updateProduct, 
    fetchProductById, 
    removeProduct, 
    fetchAllProducts, 
    fetchProductsForPage, 
    addProductReview, 
    filterByTopProduct, 
    filterByNewProduct, 
    filterProducts, 
 } from "../controllers/productController.js";



const router = express.Router();

router.route('/').post(authenticate, authorizeAdmin, formidable(), addProduct);

router.route('/fetchAllProducts').get(fetchAllProducts);

router.route('/fetchProductsForPage').get(fetchProductsForPage);

router.route('/filterByTopProduct').get(filterByTopProduct)
router.route('/filterByNewProduct').get(filterByNewProduct)
router.route('/filterProducts').post(filterProducts)

router.route('/:productId').put(authenticate, authorizeAdmin, formidable(), updateProduct)
.get(fetchProductById).delete(authenticate, authorizeAdmin, removeProduct);

router.route('/:productId/addReview').post(authenticate, addProductReview)


export default router;