import express from 'express';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.route.js';
import messageRoute from './routes/message.route.js';
import { connectDB } from './lib/db.js';

dotenv.config();

const PORT = process.env.PORT || 5000

const app = express();
console.log(process.env.PORT);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use('/api/messages', messageRoute);


app.listen(PORT, () => {
    console.log("Server running on port: " + PORT),
    connectDB()
}); 