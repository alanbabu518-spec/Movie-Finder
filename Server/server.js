const express =  require("express");
const cors = require("cors");
const  connectDB  = require("./config/db");
const dotenv=require("dotenv");
dotenv.config();
const userRouter = require("./routes/userRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const watchlistRoutes = require("./routes/watchlistRoutes")

console.log(process.env.MONGO_URI);
connectDB();

const app = express();

app.use(cors())
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({
    extended: true,
    limit: "10mb"
}));
app.use("/api/users",userRouter);
app.use("/api/favorites",favoriteRoutes);
app.use("/api/watchlist",watchlistRoutes);

app.get("/",(req,res)=>{
    res.send("movie finder API is running");
})

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})