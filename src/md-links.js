
const fs = require('fs');   
const fetch = require('node-fetch');
const markdownLinkExtractor = require('markdown-link-extractor')
const pathLibrary = require ('path')


//Función que va a leer la ruta ingresada por el usuario e identificar si es un md
 const readFile = (path,type)=>{   
    return new Promise ((resolve,reject)=>{
     fs.readFile(path,type, (error,content) =>{
         pathLibrary.extname(path)!='.md' ? reject(error) : resolve(content); //condición para que solo lea los archivos .md
      });
      
    });
    
  } 
  readFile(process.argv[2], 'utf-8')  //llamamos la función, el primer parametro es la ruta y el segundo el código para que no lo muestre en binario
  .then(res => {
      
       let links = markdownLinkExtractor(res) //extrae los links
       let linkInfo = [];                     //arreglo vacío que contendra todos los links con la informaciñon requerida

       links.forEach((link)=>{                //recorremos cada link
       fetch(link)                            //extraemos información de cada link
         .then((links) =>{
          linkInfo.push({                     //con el push generamos un objeto con las key requeridas en el readme
            href: link[0],
            text: link[1].substr(0,50),
            file: process.argv[2]
          })
          console.log(linkInfo);              //imprimimos en consola el resultado
          //console.log(res.url + ' ' +res.status+ ' ' +res.statusText);

      }) 
        .catch(error =>{
          console.log(error.message)
      })
      
  });
  })
 
  .catch(error =>{
    console.log('Por favor ingresa un archivo .md') 
})
  


