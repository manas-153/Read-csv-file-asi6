const fs = require('fs');
const csv = require('csv-parser');
const path=require('path');



const readCsvFile = (filePath,filtercriteria)=>
{
     const filteredResults=[];  

     return new Promise((resolve,reject)=>
     {
          try
          {

          let stream=fs.createReadStream(filePath).pipe(csv());
          
          stream.on('data',(data)=>{

               let filterObject=copyObjectWithSelectedKeys(data,filtercriteria);

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
  
const copyObjectWithSelectedKeys = (data,filtercriteria)=>
{
        let keys=Object.keys(filtercriteria);

     return data[keys].toUpperCase() == filtercriteria[keys].toUpperCase() ? data : {};
}


module.exports={readCsvFile};