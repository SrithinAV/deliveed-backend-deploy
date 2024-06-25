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
import rateLimit from "express-rate-limit";

//app config

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT;

const corsOptions = {
    origin: (origin, callback) => {
      if (['https://www.deliveed.com','https://deliveed.adaptable.app',].indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    optionsSuccessStatus: 200,
  };

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes',
  });

//middleware
app.use(limiter);
app.use(express.json())
// app.use(cors())
app.use(cors(corsOptions));


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

app.listen(port,()=>
{
    console.log(`server started on port  ${port}`)
})


