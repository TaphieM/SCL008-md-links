#!/usr/bin/env node                             
/*esta linea sirve para indicar que es un programa JS o no es un script de shell y que debe usar un intérprete diferente*/
/*De aquí exporto la función md-links e imprimo en consola */
/*Aquí debe de revisar si el archivo es .md, debe revisar si le da la opción
validate , status , las dos o ninguna*/

const readFileInfo=require("./src/md-links");
const fetch = require('node-fetch');
const markdownLinkExtractor = require('markdown-link-extractor')


readFileInfo.readFileInfo(process.argv[2], 'utf-8')      /*llamamos la función, el primer parametro es la ruta y el segundo el código para que no lo muestre en binario*/
.then(res => {
    
     let links = markdownLinkExtractor(res)    /*extrae los links*/
     let linkInfo = [];                         /*arreglo vacío que contendra todos los links con la informaciñon requerida*/


   if(process.argv[3]==='--validate'){  
     links.forEach((link)=>{                    /*recorremos cada link*/
     fetch(link)                                /*extraemos información de cada link*/
       .then((links) =>{
        linkInfo.push({                         /*con el push generamos un objeto con las key requeridas en el readme*/
          href: link[0],
          text: link[1].substr(0,50),
          file: process.argv[2],
          status: links.status,
          statusText: links.statusText
        })

        console.log(linkInfo);              /*imprimimos en consola el resultado*/  
    }) 
      .catch(error =>{
        console.log(error.message)
        //reject(error)
    })
    
});
}else{
links.forEach((link)=>{                    /*recorremos cada link*/
  fetch(link)                                /*extraemos información de cada link*/
    .then((links) =>{
     linkInfo.push({                         /*con el push generamos un objeto con las key requeridas en el readme*/
       href: link[0],
       text: link[1].substr(0,50),
       file: process.argv[2],

     })

     console.log(linkInfo);              /*imprimimos en consola el resultado*/  
 }) 
   .catch(error =>{
     console.log(error.message)
     //reject(error)
 })
 
});

}
})

.catch(error =>{
  console.log('Por favor ingresa un archivo .md') 
})
