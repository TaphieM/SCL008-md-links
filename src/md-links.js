
const fs = require('fs');   
const fetch = require('node-fetch');
const markdownLinkExtractor = require('markdown-link-extractor')
const pathLibrary = require ('path')

//Función que va a leer la ruta ingresada por el usuario e identificar si es un md
 const readFile = (path,type)=>{   
    return new Promise ((resolve,reject)=>{
     fs.readFile(path,type, (error,content) =>{
         //let error =console.log('Porfavor ingresa un archivo .md')
         pathLibrary.extname(path)!='.md' ? reject(error) : resolve(content);
      });
      
    });
    
  }
  
 readFile(process.argv[2], 'utf-8')
  .then(res => {
    //console.log(res)
     let links = markdownLinkExtractor(res)
    links.forEach((link)=>{
      fetch(link).then((res) =>{
          //console.log(link);
          console.log(res.url + ' ' +res.status+ ' ' +res.statusText);
      }) 
      .catch(error =>{
          console.log(error.message)
      })
      
  });
  })
 
  .catch(error =>{
    console.log('Por favor ingresa un archivo .md')
})
  


