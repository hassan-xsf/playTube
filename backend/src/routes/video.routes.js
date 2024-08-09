import { Router } from "express";
import {upload} from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import 
{ 
    uploadVideo,
    deleteVideo,
    getVideoById,
    getAllVideos
}
from "../controllers/video.controller.js";

const router = Router()


router.use(verifyJWT)

router.route("/upload").post(
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

router.route("/:videoId")
    .delete(deleteVideo)
    .get(getVideoById)

export default router;