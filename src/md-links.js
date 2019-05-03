/*Librerias que usamos de node.js*/
const fs = require('fs');   
const pathLibrary = require ('path')


/*Función que va a leer la ruta ingresada por el usuario e identificar si es un md*/
 const readFileInfo = (path,type)=>{   
    return new Promise ((resolve,reject)=>{
     fs.readFile(path,type, (error,content) =>{
         pathLibrary.extname(path)!='.md' ? reject(error) : resolve(content); /*condición para que solo lea los archivos .md*/
      });      
    });
  } 

  


module.exports.readFileInfo = readFileInfo;