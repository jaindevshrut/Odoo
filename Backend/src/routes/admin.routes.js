import express from "express";
import { verifyJWT, isAdmin } from "../middlewares/auth.middleware.js";
import * as adminController from "../controllers/admin.controller.js";

const router = express.Router();

// every admin route requires a valid token *and* acctype===true
router.use(verifyJWT, isAdmin);

router.get("/users",    adminController.getAllUsers);
router.get("/orders",   adminController.getAllOrders);
router.get("/comments", adminController.getAllComments);

export default router;
