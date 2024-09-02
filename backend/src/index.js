import connectDB from './db/index.js'
import { app } from './app.js';




connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000 , () => {
            console.log("App is running on port: " +process.env.PORT || 8000)
        })
    })
    .catch((e) => {
        console.log("Express Error: "+e)
    })

