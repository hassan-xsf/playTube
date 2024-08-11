import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";

import {
    addComment,
    deleteComment,
    viewComments
} from '../controllers/comment.controller.js'

const router = Router()


router.route("/add").post(verifyJWT,addComment)
router.route("/delete/:videoId/:commentId").delete(verifyJWT,deleteComment)
router.route("/get/:videoId").get(viewComments)



export default router;