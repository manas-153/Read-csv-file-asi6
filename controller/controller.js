const fs = require('fs');
const csv = require('csv-parser');
const path=require('path');



const readCsvFile = (filePath,filterCriteria)=>
{

         const filteredResults=[];  

     return new Promise((resolve,reject)=>
     {
          try
          {
          let stream=fs.createReadStream(filePath).pipe(csv());
          stream.on('data',(data)=>{
               let filterObject=copyObjectWithSelectedKeys(data,filterCriteria);
               filteredResults.push(filterObject);
          });
          
          stream.on('end',()=>resolve(filteredResults));
          stream.on('error',(err)=>reject(err));

     }
     catch(err)
     {
          console.log("hey");
          reject(err.message);
     }

     });   

}
  

const copyObjectWithSelectedKeys = (data,filterCriteria)=>
{
     const copyObject={};

     filterCriteria.forEach(key => {
            if(data.hasOwnProperty(key))
            {
               copyObject[key]=data[key];
            }
     });

     return copyObject;

}

module.exports={readCsvFile};