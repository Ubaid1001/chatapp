import express from 'express';
import authRoutes from './routes/auth.route.js';
import messageRoute from './routes/message.route.js';
import { connectDB } from './lib/db.js';
import { ENV } from './lib/env.js';
import cookieParser from "cookie-parser"


const PORT = ENV.PORT || 5000

const app = express();
console.log(ENV.PORT);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use('/api/messages', messageRoute);


app.listen(PORT, () => {
    console.log("Server running on port: " + PORT),
        connectDB()
}); 