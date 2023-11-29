import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

//middleware for parsing request body
app.use(express.json());

//middleware for handeling CORS policy
//allow all origins with default of cors
app.use(cors());

//HTTP method, get resources from server
app.get('/',(request, response) => {
    console.log(request)
    return response.status(234).send('Welcome to MERN Stack')

});

app.use('/books', booksRoute);

//connect database
mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    })