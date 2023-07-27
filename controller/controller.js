const fs = require('fs');
const csv = require('csv-parser');
const path=require('path');



const readCsvFile = (filePath,key,value)=>
{
     const filteredResults=[];  

     return new Promise((resolve,reject)=>
     {
          try
          {

          let stream=fs.createReadStream(filePath).pipe(csv());
          
          stream.on('data',(data)=>{

               let filterObject=copyObjectWithSelectedKeys(data,key,value);

               let temp=filterObject;

               if(Object.keys(temp).length!=0)
               {
                    filteredResults.push(filterObject);
               }
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
  
const copyObjectWithSelectedKeys = (data,key,value)=>
{
     // console.log(data);
     return data[key] == value.toUpperCase() ? data : {};
}


module.exports={readCsvFile};