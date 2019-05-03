/*Recordar agregar resolve o reject si es que jala de una promesa*/
const readFileInfo = require('../src/md-links.js');


describe('readFileInfo', () => {
  
  it('deberia retornar 3 links para el archivo TEST.md', ()=> {
      expect(readFileInfo.readFileInfo('../test/Files2Test/TEST.md','utf-8')).resolves.toEqual(['https://es.wikipedia.org/wiki/Markdown',
      'https://nodejs.org/','https://nodejs.org/api/path.html' ])
    });

  it('deberia retornar error si el archivo no es .md',()=>{
      expect(readFileInfo.readFileInfo('../test/Files2Test/test.js','utf-8')).resolves.toEqual(['Por favor ingresa un archivo .md']);
    }); 
    
  })
  


