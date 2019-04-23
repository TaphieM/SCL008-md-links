

//importar a las librerias que se usaran
const fs = require('fs');   
const fetch = require('node-fetch');

const markdownLinkExtractor = require('markdown-link-extractor');
const markdown = fs.readFileSync('./../README.md').toString();
const links = markdownLinkExtractor(markdown);

links.forEach(function (link) {
    fetch(link).then((ans) =>{
        //console.log(link);
        console.log(ans.url + ' ' +ans.status+ ' ' +ans.statusText);
    })
    .catch(error =>{
        console.log(error.message)
    })
    
});

exports.links=links;