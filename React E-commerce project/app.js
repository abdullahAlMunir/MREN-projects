import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import router from "./src/routes/api.js";

const app = express();

import rateLimit from "express-rate-limit";
import helmet from "helmet";
import ExpressMongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import hpp from "hpp";
import cors from "cors";
import cookieParser from 'cookie-parser';
import mongoose from "mongoose";
import {
    PORT, DATABASE, MAX_JSON_SIZE, REQUEST_NUMBER, REQUEST_TIME, URL_ENCODE, WEB_CACHE
} from "./src/config/config.js";




// Default Midleware
app.use(helmet());
// app.use(mongoSanitize());
app.use(xss());
app.use(hpp());
app.use(cors());
app.use(cookieParser());
app.use(express.json({limit: MAX_JSON_SIZE}));
app.use(express.urlencoded(URL_ENCODE));

// App Use Limiter
const limiter = rateLimit({windowMs: REQUEST_TIME, max: REQUEST_NUMBER})
app.use(limiter);

app.use("/api/v1", router);

app.use(express.static("client/dist"))

app.get("*", function (req, res) {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"))
})

// Database Connection
mongoose.connect(DATABASE, {autoIndex: true}).then( () => {
    console.log("Database connected successfully");    
}).catch((err) => {
    console.log("Database connection error: " + err); 
});

// Cache
app.set("etag", WEB_CACHE);


app.listen(PORT, () => {
    console.log(`BACK-END STARTED on Port: ${PORT}`);
    
});
