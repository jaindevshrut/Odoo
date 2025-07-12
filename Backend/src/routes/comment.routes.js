import { Router } from 'express';
import {
    addComment,
    deleteComment,
    getProductComments,
    updateComment,
} from "../controllers/comment.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"

const router = Router();

router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router.route("/:productId").get(getProductComments).post(addComment);
router.route("/c/:commentId").delete(deleteComment).patch(updateComment);

export default router