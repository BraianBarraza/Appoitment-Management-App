import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import cors from 'cors';
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

//cors configuration
const whitelist = [process.env.FRONTEND_URL] ;

if (process.argv[2] === '--postman'){
    whitelist.push(undefined);
}

const corsOptions = {
    origin:function (origin, callback){
        if (whitelist.includes(origin)){
            //allow request from whitelisted origin
            console.log('operation allowed from origin:', colors.green(origin));
            callback(null, true);
        }else{
            //block request
            callback(new Error(`Origin: ${origin} is not allowed by CORS`));
        }
    }
}

app.use(cors(corsOptions));

//route definition
app.use('/api/services', servicesRoutes);
//port definition
const PORT = process.env.PORT || 8000

//start App
app.listen(PORT, () => {
    console.log(colors.blue(`Server started on port:`),colors.bold(`${PORT}`));
})

console.log(process.env.PORT);