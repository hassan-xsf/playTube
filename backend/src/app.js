import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express()


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

// Routers

// user routers

import userRouter from './routes/user.routes.js'

app.use('/api/v1/healthcheck' , (req,res) => {
    res.status(200).json(
        {
            status: "Okay"
        }
    )
})

app.use("/api/v1/users" , userRouter)

import likeRouter from './routes/like.routes.js'

app.use("/api/v1/likes" , likeRouter)

import vidRouter from "./routes/video.routes.js"

app.use("/api/v1/video" , vidRouter)

import subRouter from "./routes/subs.routes.js"

app.use("/api/v1/sub" , subRouter)

import commentRouter from "./routes/comment.routes.js"

app.use("/api/v1/comment" , commentRouter)


app.use(errorHandler);

export {app}