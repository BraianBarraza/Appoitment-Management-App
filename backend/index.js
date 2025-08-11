import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import servicesRoutes from "./routes/servicesRoutes.js";
import {db} from './config/db.js'

//env var
dotenv.config();

//App configuration
const app = express();

//read body data
app.use(express.json());

//connect db
db()

//route definition
app.use('/api/services', servicesRoutes);
//port definition
const PORT = process.env.PORT || 8000

//start App
app.listen(PORT, () => {
    console.log(colors.blue(`Server started on port:`),colors.bold(`${PORT}`));
})

console.log(process.env.PORT);