
import * as fs from 'node:fs/promises';




   /*  fs.readFile("file.txt", {encoding: 'utf-8'}, function(err,data){
        if (!err) {
            console.log('received data: ' + data);
            
        } else {
            console.log(err);
        }
    }); */

   
    
    const readFile = async () => {
        const response =  await fs.readFile("file.txt", {encoding: 'utf-8'})
        console.log(response);
        return response;
    }

readFile()
    

