import mongoose from "mongoose";



// User Subscribe ALI > MrBeast
// subs: ALI
// channel: MrBeast

const subscriptionSchema = mongoose.Schema({
    subscriber: {  // one is who subscribing
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    channel: { // subscribed to
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
} , {timestamps: true})

export const Subscription = mongoose.model("Subscription" , subscriptionSchema)