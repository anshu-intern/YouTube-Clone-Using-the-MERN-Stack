//load environment variables
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import routes from './Routes/index.js';
import cors from 'cors';

//define server
const app = express();
app.use(express.json());    // parse JSON bodies
app.use(cors());            // enable cors

// Establish a connection to the MongoDB database
async function connectDB(){
    console.log("Establishing a connection to database.");
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected successfully.");
    } catch(err){
        console.error(`Database connection failed. Message- ${err}`);
        process.exit(1);
    }
}

// Start the Express application server
async function appServer(){
    console.log(`Starting application server in ${process.env.NODE_ENV || 'development'} mode. Please wait.`);

    try{
        await connectDB();
        app.get("/", (req,res)=> { return res.send("Welcome to root route.")});
        routes(app);
        const app_port = process.env.PORT || 3000;
        app.listen(app_port, (err) => { err ? console.error(`Server failed to start. Message- ${err}`) : console.log(`Server started successfully on port ${app_port}.`); })
    } catch(err){
        console.error(`Server failed to start. Message- ${err}`);
    }
}

//start server
appServer();

// Close MongoDB connection on app termination (Ctrl+C)
process.on('SIGINT', async () => {
  await mongoose.disconnect();
  console.log('MongoDB disconnected due to app termination');
  process.exit(0);
});

// Close MongoDB connection on app termination (termination signal)
process.on('SIGTERM', async () => {
  await mongoose.disconnect();
  console.log('MongoDB disconnected due to app termination');
  process.exit(0);
});

// Handle unhandled Promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
});

// Handle uncaught exceptions in the app
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});


