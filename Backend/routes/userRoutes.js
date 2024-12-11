import express from "express";
import { createUser,
        loginUser, 
        logoutCurrentUser, 
        getAllUsers,
        getCurrentUserProfile,
        updateCurrentUserProfile,
        deleteUserById,
        getUserById,
        updateUserById
    
} from "../controllers/userControllers.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
const router = express.Router();


router.route('/').post(createUser).get(authenticate, authorizeAdmin, getAllUsers)
router.post('/auth', loginUser)
router.route('/logout').post( logoutCurrentUser)
router.route('/profile').get(authenticate, getCurrentUserProfile)
            .put(authenticate, updateCurrentUserProfile)

//admin routes
router.route('/:id').get(authenticate, authorizeAdmin, getUserById)
                    .delete(authenticate, authorizeAdmin, deleteUserById)
                    .put(authenticate, authorizeAdmin, updateUserById)

export default router;