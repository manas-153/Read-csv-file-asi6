const express = require('express');
const cors=require('cors');
const {readCsvFile} = require('../controller/controller');
const fs=require('fs');
const path=require('path');



const app=express();
require('dotenv').config();

let Json_file_path=path.join(__dirname,'../','json-files',"myfile.json");
let Csv_file_path=path.join(__dirname, "../", 'FL_insurance_sample.csv','data.csv');

app.use(cors());
const PORT=process.env.PORT;

app.get('/',(req,res)=>{
    res.send("Hello from node js");
});


app.get('/readCsv',async (req,res)=>
{
    try
    {
      let filterCriteria=["policyID","county","statecode","eq_site_limit","fl_site_limit","hu_site_limit","fr_site_limit","tiv_2011","point_granularity","construction","point_longitude","point_latitude","fr_site_deductible","fl_site_deductible","hu_site_deductible","eq_site_deductible","tiv_2012","tiv_2011"];

      let res_back=await readCsvFile(Csv_file_path,filterCriteria);

      if(res_back.length)
      {
        res.send({
            status:"success",
            Date:{
                res_back,
            }
            });
     
        return;
      }

      res.status(400).send({
        status:"failed",
        msg:"REquested data not avalaible"
      })

    }
    catch(err)
    {
        res.status(400).send({
            "status":"failed",
            msg:err.message
        })
    }

})

app.get('/exportCsv', async (req,res)=>
{
    try
    {
 
    let filterCriteria=[ "policyID","county"];

       let res_back= await readCsvFile(Csv_file_path,filterCriteria);

            fs.writeFile(Json_file_path,JSON.stringify(res_back,null,2),(err)=>
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

  }

  catch(err)
     {
          res.status(400).send({
            status:"failed",
            msg:err.message
          })
  
      }

});

app.get('/readExportedData',(req,res)=>
{
    fs.readFile(Json_file_path,'utf8',(err,data)=>
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