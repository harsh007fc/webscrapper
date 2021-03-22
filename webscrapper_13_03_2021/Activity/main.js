
///AlWAYS DELETE FOLDES AND FILES INCLUDED BY THIS CODE

let request = require("request");
let cheerio = require("cheerio");
let fs = require("fs");
let path = require("path");
let PDFDocument = require('pdfkit');


let url = "https://github.com/topics";
request(url, cb);

function cb(err, response, html) {
    if (err) {
        console.log(err);
    } else {
        extractData(html);
    }
}
function extractData(html) 
{
    let selTool = cheerio.load(html);
    let anchors = selTool(".no-underline.d-flex.flex-column.flex-justify-center");
    for (let i = 0; i < anchors.length; i++) 
    {
        let link = selTool(anchors[i]).attr("href");
        let fullLink = "https://github.com" + link;
        // console.log(fullLink);
        processrepoPage(fullLink);
    }
}


function processrepoPage(fullLink) 
{
    request(fullLink, cb);
    function cb(err, resp, html) 
    {
        if (err)
         {
            console.log(err);
        } 
        else 
        {
            getRepoLinks(html);
        }
    }
}

function getRepoLinks(html)
 {
    let selTool = cheerio.load(html);

    let topicElem = selTool(".h1-mktg");

    let topicName = topicElem.text().trim();
    dirCreator(topicName);

    let arr = selTool("a.text-bold");
    // console.log(topicName);
    for (let i = 0; i < 8; i++)
     {
        let link = selTool(arr[i]).attr("href");

        let fullLink = "https://github.com" + link;
        let repoName = fullLink.split('/').pop();
        // console.log(repoName);
        // createFile(repoName,topicName); // so that json dont form with pdfs
        let fullRepoLink = "https://github.com"+link+"/issues";
        getIssues(repoName,topicName,fullRepoLink);
    }
    // console.log("`````````````````````````````")
}

function getIssues(repoName,topicName,fullRepoLink)
{
    request(fullRepoLink,cb);
    function cb(err,res,html)
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
            extractIssues(html,repoName,topicName);
        }
    }
}

function dirCreator(topicName)
{
    let pathofFolder = path.join(__dirname,topicName);
    if(fs.existsSync(pathofFolder) == false)
    {
        fs.mkdirSync(pathofFolder);
    }
}

function createFile(repoName,topicName)
{
    //__dirname is inbuilt
    let pathofFile = path.join(__dirname, topicName, repoName + ".json");
    if (fs.existsSync(pathofFile) == false) 
    {
        let createStream = fs.createWriteStream(pathofFile);
        createStream.end();
    
    }
}


function extractIssues(html,repoName,topicName)
{
    let selectorTool = cheerio.load(html);

    let issueAnchorArr = selectorTool(".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title");
    let arr = [];
    for(let i = 0; i < issueAnchorArr.length; i++)
    {
        let name = selectorTool(issueAnchorArr[i]).text();
        let link = selectorTool(issueAnchorArr[i]).attr("href");

        arr.push({
            "name": name,
            "link": "http://github.com"+link
        });
    }
    // console.table(arr);

    let filePath = path.join(__dirname,topicName,repoName+".pdf");
    // fs.writeFileSync(filePath,JSON.stringify(arr));

    let pdfDoc = new PDFDocument;
    pdfDoc.pipe(fs.createWriteStream(filePath));
    pdfDoc.text(JSON.stringify(arr));
    pdfDoc.end();

}