import { Router } from "express";
import {upload} from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import 
{ 
    uploadVideo,
    deleteVideo,
    getVideoById,
    getAllVideos,
    incrementView,
    searchVideo
}
from "../controllers/video.controller.js";

const router = Router()


// router.use(verifyJWT)

router.route("/upload").post(
    verifyJWT,
    upload.fields([
        {
            name: "thumbnail",
            maxCount: 1
        },
        {
            name: "video",
            maxCount: 1
        },
    ]),
    uploadVideo
)


router.route("/all").get(getAllVideos)

router.route("/search/:searchterm").get(searchVideo)

router.route("/:videoId")
    .delete(verifyJWT , deleteVideo)
    .get(getVideoById)
    .patch(incrementView)

export default router;