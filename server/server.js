const express = require('express');
const cors=require('cors');
const { readCsvFile} = require('../controller/controller');
const fs=require('fs');
const path=require('path');


const app=express();
require('dotenv').config();

let file_path=path.join(__dirname,'../','json-files',"myfile.json");

app.use(cors());

const PORT=process.env.PORT;

app.get('/',(req,res)=>{
    res.send("Hello from node js");
})

app.get('/readCsv', async (req,res)=>
{
 
    let filterCriteria=[ "policyID","county" ];

       let res_back= await readCsvFile(filterCriteria);

            fs.writeFile(file_path,JSON.stringify(res_back,null,2),(err)=>
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

});

app.get('/readExportedData',(req,res)=>
{
    fs.readFile(file_path,'utf8',(err,data)=>
    {
        if(err)
        {
            res.status(400).send({
                status:"failed",
                msg:err.message
            })

            return;
        }

        data=JSON.parse(data);

        res.json({
            status:"success",
            Data:{
             data
            }
        })
    })
})



app.listen(5000,()=>
{
    console.log(`server is listening on ${5000} PORT`);
})