import express from "express";
import { config } from "dotenv";

const app = express();

config();

connectDB()

app.use(express.json());

//middleware for cookies
app.use(cookieParser());