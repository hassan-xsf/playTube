import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    toggleVideoLike,
    toggleCommentLike,
    getTotalVideoLikes,
    getTotalCommentLikes,
    hasLikedComment,
    hasLikedVideo
}
from "../controllers/like.controller.js"

const router = Router()

router.route("/video/toggle/:videoId").post(verifyJWT,toggleVideoLike)
router.route("/comment/toggle/:commentId").post(verifyJWT,toggleCommentLike)
router.route("/video/totallikes/:videoId").get(getTotalVideoLikes)
router.route("/comment/totallikes/:commentId").get(getTotalCommentLikes)
router.route("/comment/hasliked/:commentId").get(verifyJWT,hasLikedComment)
router.route("/video/hasliked/:videoId").get(verifyJWT,hasLikedVideo)



export default router;

