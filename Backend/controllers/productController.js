import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";

const addProduct = asyncHandler(async( req, res) => {
    try {
        const {name, brand, description, quantity, price, stockCount} = req.fields;

        switch (true) {
            case !name:
                return res.json("Name is required");
                break;

            case !brand:
                return res.json("Brand is required");
                break;

            case !description:
                return res.json("Description is required");
                break;

            case !quantity:
                return res.json("Quantity is required");
                break;

            case !price:
                return res.json("Price is required");
                break;

            case !stockCount:
                return res.json("Stock count is required");
                break;
        
            default:
                break;
        }

        const newProduct = new Product({...req.fields});
        await newProduct.save();
        res.status(200).json({Item: newProduct})
        
    } catch (error) {
        console.log(error);
        res.status(404).json(error.message)
    }
})

const updateProduct = asyncHandler(async(req, res) => {
    try {
        const {name, brand, description, quantity, price, stockCount} = req.fields || {};
        console.log(req.fields);
        

        switch (true) {
            case !name:
                return res.json("Name is required");
                break;

            case !brand:
                return res.json("Brand is required");
                break;

            case !description:
                return res.json("Description is required");
                break;

            case !quantity:
                return res.json("Quantity is required");
                break;

            case !price:
                return res.json("Price is required");
                break;

            case !stockCount:
                return res.json("Stock count is required");
                break;
        
            default:
                break;
        }
        
        const productToUpdate = await Product.findByIdAndUpdate(req.params.productId, {...req.fields}, {new: true});
        await productToUpdate.save();

        if (!productToUpdate) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.status(200).json(productToUpdate);

    } catch (error) {
        console.log(error);
        res.status(404).json(error.message)
    }
})

const fetchProductById = asyncHandler(async(req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        if (product) {
            res.status(200).json(product)
        } else {
            res.status(404).json("Product not found");

        }
    } catch (error) {
        console.log(error);
        res.status(404).json(error.message)
    }
})

const removeProduct = asyncHandler(async(req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.productId);

        if (product) {
            res.status(200).json("Product deleted successfully")
        } else {
            res.status(404).json("Product not found")
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error.message)
    }
})

const fetchAllProducts = asyncHandler(async(req, res) => {
    try {
        const products = await Product.find({}).populate('category').sort({createAt: -1})

        if (products) {
            res.status(200).json(products);
        } else {
            res.status(404).json("products not found")
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error.message)
    }
})

const fetchProductsForPage = asyncHandler(async(req, res) => {
    try {
        const pageSize = 9;
        const pageNumber = 1;
        const keyword = req.query.keyword ? 
        {
            name: {
                $regex: req.query.keyword,
                $option: 'i',
            }
        } : {}

        const productCount = await Product.countDocuments({...keyword});
        const products = await Product.find({...keyword}).limit(pageSize).skip((pageNumber-1)*pageSize);
        console.log(productCount);
        const hasMore = pageNumber*pageSize < productCount;
        if (products) {
            res.status(200).json({
                products,
                page: pageNumber,
                pages: Math.ceil(productCount/pageSize),
                hasMore,
            })
        } else {
            res.status(404).json('Products not found')
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error.message)
    }
});

const addProductReview = asyncHandler(async(req, res) => {
    try {
        const {rating, comment} = req.body;

        const product = await Product.findById(req.params.productId);

        if (product) {
            
            const review = {
                name: req.user.username,
                rating: Number(rating),
                comment,
                user: req.user._id,
            }

            product.reviews.push(review);
            product.numReviews = product.reviews.length;
            const totalRatings = product.reviews.reduce((sum, review) => sum + review.rating, 0);
            product.rating = product.numReviews > 0 ? (totalRatings / product.numReviews) : 0;
            await product.save();
            res.status(200).json('Review added')


        } else {
            res.status(404).json('Item not found for review')
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error.message)
    }
})

const filterByTopProduct = asyncHandler(async(req, res) => {
    try {
        const products = await Product.find({}).sort({rating: -1});
        if (products) {
            res.status(200).json(products)
        } else {
            
        }
    } catch (error) {
        console.log(error);
        res.status(404).json("Unable to apply this filter")
    }
})

const filterByNewProduct = asyncHandler(async(req, res) => {
    try {
        const products = await Product.find({}).sort({createdAt: -1});
        if (products) {
            res.status(200).json(products)
        } else {
            
        }
    } catch (error) {
        console.log(error);
        res.status(404).json("Unable to apply this filter")
    }
})

const filterProducts = asyncHandler(async(req, res) => {
    try {
        const {checked, radio} = req.body;

        let args = {}

        if (checked.length > 0) {
            args.category = checked
        }
        
        if (radio.length) {
            args.price = {$gte: radio[0], $lte: radio[1]}
        }

        const products = await Product.find(args)
        res.json(products)

    } catch (error) {
        console.log(error);
        res.status(404).json("Unable to apply this filter")
    }
})
export {addProduct, updateProduct, fetchProductById, removeProduct, fetchAllProducts, 
    fetchProductsForPage, addProductReview, filterByTopProduct, filterByNewProduct, 
    filterProducts
}