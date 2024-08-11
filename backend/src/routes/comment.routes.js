import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";

import {
    addComment,
    deleteComment,
    viewComments
} from '../controllers/comment.controller.js'

const router = Router()


router.use(verifyJWT)

router.route("/add").post(addComment)
router.route("/delete/:videoId/:commentId").delete(deleteComment)
router.route("/get/:videoId").get(viewComments)



export default router;