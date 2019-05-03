#!/usr/bin/env node                             
/*esta linea sirve para indicar que es un programa JS o no es un script de shell y que debe usar un intérprete diferente*/
/*De aquí exporto la función md-links e imprimo en consola */

const readFileInfo=require("./src/md-links");
const fetch = require('node-fetch');
const markdownLinkExtractor = require('markdown-link-extractor');
const chalk = require('chalk');

/* if(require.main===module){
  readFileInfo(process.argv[2], {validate:true})
  .then(console.log);
} */

readFileInfo.readFileInfo(process.argv[2], 'utf-8')      /*llamamos la función, el primer parametro es la ruta y el segundo el código para que no lo muestre en binario*/
.then(res => {
    
     let links = markdownLinkExtractor(res)              /*extrae los links*/
     let linkInfo = [];                                  /*arreglo vacío que contendra todos los links con la informaciñon requerida*/


   if(require.main===process.argv[3]==='--validate'){    /* se agrega el require.main para que no repita los valores cuando se agrega como modulo*/
     links.forEach((link)=>{                             /*recorremos cada link*/
     fetch(link)                                         /*llamamos a la API para extraer información de cada link*/
       .then((links) =>{
        linkInfo.push({                                  /*con el push generamos un objeto con las key requeridas en el readme*/
          href:link[0],
          text: link[1].substr(0,50),
          file: process.argv[2],
          status: links.status,
          statusText: links.statusText
        })

        console.log(chalk.bgMagenta('linkInfo'));                          /*imprimimos en consola el resultado*/  
    }) 
       .catch(error =>{
        console.log(error.message)
       
    })
    
    });
  }else{
      links.forEach((link)=>{                                 
      fetch(link)                                
       .then((links) =>{
       linkInfo.push({                         
       href: link[0],
       text: link[1].substr(0,50),
       file: process.argv[2],

     })

     console.log(chalk.bgMagenta('linkInfo'));               
 }) 
     .catch(error =>{
     console.log(error.message)
    
 })
 
});

}
})



.catch(error =>{
  console.log('Por favor ingresa un archivo .md') 
})

/*Implementando función stats

links.forEach((element) => {
  if (!LinksUnique.includes(element)) {
      LinksUnique.push(element);
  }
})
stats.LinksUnique = LinksUnique.length;
console.log(fileIn)
console.log(stats)

.catch(err => {
console.log(err);
})*/