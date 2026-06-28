const mongoose = require("mongoose");
const watchlistSchema = new mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        movieId:{
            type:Number,
            required:true,
        },
        title:{
            type:String,
            required:true,
        },
        poster :{
            type:String,
            required:true,
        },
        overview :{
            type:String,
            required:true,
        },
        rating :{
            type:Number,
            required:true,
        },
        genre :{
            type:String,
            required:true,
        },
    },
    {
        timestamps:true,
    }
);

module.exports = mongoose.model("watchlist",watchlistSchema);