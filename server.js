import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { bonsaiRoute} from "./routes/bonsaiRoute.js"
import { authRoute } from "./routes/authRoute.js";
import { addressRoute } from "./routes/addressRoute.js";
import { commentRoute } from "./routes/commentRoute.js";
import { messageRoute } from "./routes/messageRoute.js";
import { orderRoute } from "./routes/orderRoute.js";
import { replyRoute } from "./routes/replyRoute.js";

const app = express();

app.use(cors());
app.use(express.json());
dotenv.config();

app.use('/api/bonsais', bonsaiRoute);
app.use('/api/auth', authRoute);
app.use('/api/addresses', addressRoute);
app.use('/api/comment', commentRoute);
app.use('/api/message', messageRoute);
app.use('/api/orders', orderRoute);
app.use('/api/reply', replyRoute);

mongoose.connect(process.env.DB_URI, {dbName: 'db_bonsai'})
    .then((res) => {
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`)
        })
    })
    .catch(error => {
        console.log(error)
    })

