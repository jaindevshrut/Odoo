// import { Router } from 'express';
// import {
//     deleteVideo,
//     getAllVideos,
//     getVideoById,
//     publishAVideo,
//     togglePublishStatus,
//     updateVideo,
// } from "../controllers/product.controller.js"
// import {verifyJWT} from "../middlewares/auth.middleware.js"
// import {upload} from "../middlewares/multer.middleware.js"

// const router = Router();
// router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

// router
//     .route("/")
//     .get(getAllVideos)
//     .post(
//         upload.fields([
//             {
//                 name: "videoFile",
//                 maxCount: 1,
//             },
//             {
//                 name: "thumbnail",
//                 maxCount: 1,
//             },
            
//         ]),
//         publishAVideo
//     );

// router
//     .route("/:videoId")
//     .get(getVideoById)
//     .delete(deleteVideo)
//     .patch(upload.single("thumbnail"), updateVideo);

// router.route("/toggle/publish/:videoId").patch(togglePublishStatus);

// export default router


import express from "express";
import {verifyJWT} from "../middlewares/auth.middleware.js"
import * as prodCtrl from "../controllers/product.controller.js";

import {upload} from "../middlewares/multer.middleware.js"
const router = express.Router();

router.get("/", prodCtrl.getAllProducts);
router.post(
  "/",
  verifyJWT,
  upload.fields([
    { name: "images", maxCount: 5 },
    { name: "videoFile", maxCount: 1 },
  ]),
  prodCtrl.addAProduct
);
router.get("/latest", prodCtrl.getLatestProducts);
router.get("/:id", prodCtrl.getProductById);
router.put(
  "/:id",
  verifyJWT,
  upload.fields([
    { name: "images", maxCount: 5 },
    { name: "videoFile", maxCount: 1 },
  ]),
  prodCtrl.updateProduct
);
router.delete("/:id", verifyJWT, prodCtrl.deleteProduct);
router.patch("/:id/availability", verifyJWT, prodCtrl.toggleAvailableStatus);

export default router;