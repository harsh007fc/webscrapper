// npm init -y
// npm install request cheerio
// node k packlages ko na daalne ka tarika hai ki un packages ko .gitignore mein daal do

let request = require("request");
let cheerio = require("cheerio");
console.log("before");
request("http://google.com",cb);

function cb(error, response, html){
    if(error)
    {
        console.log(error);
    }
        else{
            extractHtml(html)
        }
} 


function extractHtml(html)
{
    let selectorTool = cheerio.load(html);
    let selectElem = selectorTool("#SIvCob");//css selector rules apllicable here now 
    // console.log(selectElem.text());
    console.log(selectElem.html()); // to fetch html under element  #SIvCob
};
console.log("after");