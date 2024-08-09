import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";

import {
    isSubscribed,
    toggleSubscribeChannel,
    getChannelSubscribedTo
    
} from '../controllers/subscription.controller.js'

const router = Router()


router.use(verifyJWT)

router.route("/channel/:channel").post(toggleSubscribeChannel)
router.route("/hassubbed/:videoId").get(isSubscribed)
router.route("/all/:channel").get(getChannelSubscribedTo)



export default router;