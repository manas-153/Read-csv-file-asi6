const express = require('express');
const cors=require('cors');
const { readCsvFile} = require('../controller/controller');
const fs=require('fs');
const path=require('path');


const app=express();
require('dotenv').config();

app.use(cors());

const PORT=process.env.PORT;

app.get('/',(req,res)=>{
    res.send("Hello from node js");
})

app.get('/readCsv', async (req,res)=>
{
    let file_path=path.join(__dirname,'../','json-files',"myfile.json");
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

})



app.listen(5000,()=>
{
    console.log(`server is listening on ${5000} PORT`);
})