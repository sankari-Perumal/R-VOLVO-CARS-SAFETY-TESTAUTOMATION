import * as dotenv from 'dotenv';
import * as path from 'path';

export const getEnv=()=>{
    if(process.env.ENV){
        dotenv.config({
            override:true,
            path:path.resolve(__dirname,`volvo.env.${process.env.ENV}`)
        })
    }
    else{
        console.log("NO ENV PASSED!!!!");
    }
}