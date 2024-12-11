import express from "express";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import {createOrder, 
    getAllOrders, 
    getUserOrders, 
    getOrderCounts,
    getTotalSales,
    getTotalSalesByDate,
    findOrderById,
    markOrderAsPaid,
    markOrderAsDelivered,
    deleteOrder,

} from "../controllers/orderController.js";

const router = express.Router();



router.route('/').post(authenticate, createOrder).get(authenticate, authorizeAdmin, getAllOrders)
router.route('/my-orders').get(authenticate, getUserOrders)
router.route('/orderCount').get( getOrderCounts)
router.route('/totalSales').get( getTotalSales)
router.route('/totalSalesByDate').get( getTotalSalesByDate)
router.route('/:orderId').get(authenticate, findOrderById).delete(authenticate, deleteOrder)
router.route('/:id/payed').put(authenticate, markOrderAsPaid)
router.route('/:id/deliver').put(authenticate, authorizeAdmin, markOrderAsDelivered)

export default router;