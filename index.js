import  express  from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config.js'
import cartItemRoute from "./routes/cartItemRoute.js";
import orderRoute from "./routes/orderRoute.js";
import {dirname} from "path";
import { fileURLToPath } from "url";

//app config

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT;

// const corsOptions = {
//     origin: (origin, callback) => {
//       if (['https://www.deliveed.com', 'http://localhost:3000', 'http://localhost:5173', 'http://localhost:3001'].indexOf(origin) !== -1 || !origin) {
//         callback(null, true);
//       } else {
//         callback(new Error('Not allowed by CORS'));
//       }
//     },
//     optionsSuccessStatus: 200,
//   };


//middleware
app.use(express.json())
app.use(cors())


//DB Connection
connectDB();

//API endpoint
app.use("/api/food", foodRouter)
app.use("/images",express.static('uploads'));
app.use("/api/user",userRouter)
app.use("/api/cart",cartItemRoute)
app.use("/api/order",orderRoute)



app.get("/",(req,res)=>
{
    res.send("API working")
})

app.listen(port,'0.0.0.0',()=>
{
    console.log(`server started on port  ${port}`)
})


