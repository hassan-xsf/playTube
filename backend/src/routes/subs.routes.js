import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";

import {
    isSubscribed,
    toggleSubscribeChannel,
    toggleSubscribeVideo,
    getChannelSubscribers
    
} from '../controllers/subscription.controller.js'

const router = Router()


router.use(verifyJWT)

router.route("/video/:videoId").post(toggleSubscribeVideo)
router.route("/channel/:channel").post(toggleSubscribeChannel)
router.route("/hassubbed/:videoId").get(isSubscribed)
router.route("/all/:channel").get(getChannelSubscribers)



export default router;