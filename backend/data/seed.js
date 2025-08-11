import dotenv from "dotenv";
import {db} from "../config/db.js";
import Services from "../models/Services.js";
import {services} from "./beautyServices.js";
import colors from "colors";

dotenv.config();
await db()

async function seedDB(){
    try {
        await Services.insertMany(services);
        console.log(colors.green.bold('Services inserted correctly'));
        process.exit(0);
    }catch(err){
        console.log(colors.red(`Failed to connect to MongoDB`));
        process.exit(1);
    }
}

async function clearDB(){
    try {
        await Services.deleteMany();
        console.log(colors.red.bold('Services deleted correctly'));
        process.exit(0);
    }catch(err){
        console.log(colors.red(`Failed to connect to MongoDB`));
        process.exit(1);
    }
}

if(process.argv[2] === '--import'){
    seedDB();
}else{
    clearDB();
}