// Backend deployment Link : https://agreeable-buckle-foal.cyclic.app

let express=require("express");
const { connection } = require("./db");
let cookie=require("cookie-parser");
const { userRouter } = require("./routes/user_route");
const { taskRouter } = require("./routes/task_route");
let app=express();
require("dotenv").config();
let port=process.env.port||8050;
app.use(express.json());
app.use(cookie());
app.use("/user",userRouter);
app.use("/task",taskRouter);

app.get("/",(req,res)=>{
    res.end("Hello, it's working");
})

app.listen(port,async()=>{
    try {
        await connection;
        console.log("Connected to mongoDB");
    } catch (error) {
        console.log(error);
    }
    console.log("Server is running on port",process.env.port)
})