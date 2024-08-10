import { Router } from "express";
import {registerUser,  loginUser, logoutUser ,refreshAccessToken, changeUserPassword, getCurrentUser, updateAccountDetails, updateUserAvatar, updateUserCoverImage , getUserChannel , getWatchHistory , getUserDashboard , getUserVideos} from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        },
    ]),
    registerUser
    )

// users //
router.route("/login").post(loginUser)

//secured routes
router.route("/logout").post(
    verifyJWT,
    logoutUser)

router.route("/refreshtoken").post(
    refreshAccessToken
)
router.route("/changepass").post(
    verifyJWT,
    changeUserPassword
)
router.route("/currentuser").get(
    verifyJWT,
    getCurrentUser
)
router.route("/updatedetails").patch(
    verifyJWT,
    updateAccountDetails
)
router.route("/updateavatar").patch(
    verifyJWT,
    upload.single("avatar"),
    updateUserAvatar
)
router.route("/updatecover").patch(
    verifyJWT,
    upload.single("coverImage"),
    updateUserCoverImage
)
router.route("/c/:username").get(
    verifyJWT,
    getUserChannel
)

router.route("/watchhistory").get(
    verifyJWT,
    getWatchHistory
)
router.route("/dashboard").get(
    verifyJWT,
    getUserDashboard
)
router.route("/videos/:username").get(
    verifyJWT,
    getUserVideos
)
export default router;