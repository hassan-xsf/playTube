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
router.use(verifyJWT)

router.route("/video/toggle/:videoId").post(toggleVideoLike)
router.route("/comment/toggle/:commentId").post(toggleCommentLike)
router.route("/video/totallikes/:videoId").get(getTotalVideoLikes)
router.route("/comment/totallikes/:commentId").get(getTotalCommentLikes)
router.route("/comment/hasliked/:commentId").get(hasLikedComment)
router.route("/video/hasliked/:videoId").get(hasLikedVideo)



export default router;

