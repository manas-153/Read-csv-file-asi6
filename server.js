const express = require('express');
const cors=require('cors');
const {readCsvFile} = require('./controller/controller');
const fs=require('fs');
const path=require('path');
const bodyParser=require('body-parser');



const app=express();
app.use(bodyParser.json());
require('dotenv').config();

let Json_file_path=path.join(__dirname,'json-files',"myfile.json");
let Csv_file_path=path.join(__dirname, 'FL_insurance_sample.csv','data.csv');

app.use(cors());
const PORT=process.env.PORT;

app.get('/',(req,res)=>{
    res.send("Hello from node js");
});


app.post('/exportCsv', async (req,res)=>
{
    console.log("body",req.body);

       let res_back= await readCsvFile(Csv_file_path,req.body);

       if(res_back.length)
       {
        
        fs.writeFile(Json_file_path,JSON.stringify(res_back,"",2),(err)=>
        {
            if(err)
            {
                res.status(400).send({
                    status:"failed 1",
                    msg:err.message
                });

                return; 
            }

            res.send({
                status:"success",
                msg:"Congrats successfully export the data",
                Data:{
                    res_back
                }
            })
        });

           return;

       }

       res.status(400).send({
        status:"failed",
        msg:"No such data Find to export",
       })


});



app.listen(5000,()=>
{
    console.log(`server is listening on ${5000} PORT`);
})