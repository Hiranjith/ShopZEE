import asyncHandler from "../middlewares/asyncHandler.js";
import Order from "../models/oredrModel.js";
import Product from '../models/productModel.js'

const orderPriceFunction = (ordereItems) => {

    const itemsPrice = ordereItems.reduce((acc, item) => acc + item.price * item.qnty, 0)

    const shippingPrice = itemsPrice > 500 ? 0 : 20

    const tax = 0.18

    const taxPrice = (itemsPrice*tax).toFixed(2)
    
    const totalPrice = (shippingPrice + itemsPrice + parseFloat(taxPrice)).toFixed(2)

    return {
        itemsPrice: itemsPrice.toFixed(2),
        shippingPrice: shippingPrice.toFixed(2),
        taxPrice,
        totalPrice
    }
}
const createOrder = async(req, res) => {
    try {
        //res.status(200).json('this is orders api')
        const {orderItems, shippingAddress, paymentMethod} = req.body;
        

        if (orderItems && orderItems.length === 0) {
            res.status(400).json("Product not found")
        }

        const itemsFromDB = await Product.find({
            _id: { $in : orderItems.map((item) => item._id)}
        })

        const dbOrderedItems = orderItems.map((itemFromClient) => {
            const matchingItemsFromDb = itemsFromDB.find((itemFromDb) => itemFromDb._id.toString() === itemFromClient._id)

            if (!matchingItemsFromDb) {
                res.status(404)
                throw new Error("Product not found for your orders");
                
            }

            return {
                ...itemFromClient,
                product: itemFromClient._id,
                price: matchingItemsFromDb.price,
                _id: undefined
            }
        })


        const {itemsPrice, shippingPrice, taxPrice, totalPrice} = orderPriceFunction(dbOrderedItems)

        const newOrder = new Order({
            user: req.user._id,
            orderItems: dbOrderedItems,
            shippingAddress: shippingAddress, 
            paymentMethod: paymentMethod,
            itemsPrice,
            taxPrice, 
            totalPrice,
            shippingPrice
        })

        const order = await newOrder.save();
        res.status(201).json(order)

    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const getAllOrders = asyncHandler(async(req, res) => {
    try {
     const orders = await Order.find({}).populate('user', 'id username')
 
     if (orders) {
         res.status(201).json(orders)
     }else{
         res.status(404).json({message: "Orders not found"})
     }
    } catch (error) {
     res.status(500).json({error: error.message})
    }
 
 })

const getUserOrders = async(req, res) => {
    try {
        const orders = await Order.find({user: req.user._id})

        if(orders){
            res.status(201).json(orders)
        }else{
            res.status(404)
            throw new Error("Order not found");
            
        }
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const getOrderCounts = async(req, res) => {
    try {
        const orderCount = await Order.countDocuments()
        if (orderCount) {
            return res.status(201).json({orderCount: orderCount})
        } else {
            res.status(404)
            throw new Error("Order count not found");
        }
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const getTotalSales =async(req, res) => {
    try {
        const orders = await Order.find({})
        const totalSales = await orders.reduce((acc, item) => acc + item.totalPrice, 0)
        if (totalSales !== 0) {
            return res.status(201).json(totalSales)
        } else {
            res.status(404)
            throw new Error("Total sales not found");
        }
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const getTotalSalesByDate = async(req, res) => {
    try {
        const salesByDate = await Order.aggregate([
            {
                $match : {
                    isPaid : true
                }
            },
            {
                $group : {
                    _id : {
                        $dateToString: { format: '%Y-%m-%d', date: "$paidAt" },
                    },
                    totalSales : { $sum : "$totalPrice"}
                }
            }
        ])

        if (salesByDate) {
            res.status(201).json(salesByDate)
        } else {
            res.status(404)
            throw new Error("Sales not found");

        }
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const findOrderById = asyncHandler(async(req, res) => {
    try {
        const order = await Order.findById(req.params.orderId).populate('user', 'id username email')
        if (order) {
            res.status(200).json(order)
        } else {
            res.status(404)
            throw new Error("Order not found");
        }
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

const markOrderAsPaid = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)

        if (order) {
            order.isPaid = true
            order.paidAt = Date.now()
            order.paymentResult = {
                id: req.body.id,
                status : req.body.status,
                update_time : req.body.update_time,
                email_address : req.body.payer.email_address
            }

            const updatedOrder = await order.save()
            res.status(201).json(updatedOrder)
        } else {
            res.status(404)
            throw new Error("Order not found");
        }
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const markOrderAsDelivered = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)

        if (order) {
            order.isDelivered = true;
            order.deliveredAt = Date.now();
    
            const updatedOrder = await order.save()
            res.status(201).json(updatedOrder)
        } else {
            res.status(404)
            throw new Error("Order not delivered");
        }
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const deleteOrder = asyncHandler(async(req, res) => {
    try {
        const order = await Order.findById(req.params.orderId)
        console.log('order from delete function is ', order);
        

        if (order) {
            await order.deleteOne({_id: order._id})
            res.status(200).json({message : "Category deleted successfully"});
        }else{
            res.status(404)
            throw new Error("Order not deleted");
        }

    } catch (error) {
        res.status(500).json({error: error.message})
    }
    
})

export {
    createOrder,
    getAllOrders,
    getUserOrders,
    getOrderCounts,
    getTotalSales,
    getTotalSalesByDate,
    findOrderById,
    markOrderAsPaid,
    markOrderAsDelivered,
    deleteOrder
};