let request = require("request");
let cheerio = require("cheerio");
let fs = require("fs");
let path = require("path");


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
    console.log(topicName);
    for (let i = 0; i < 8; i++)
     {
        let link = selTool(arr[i]).attr("href");

        let fullLink = "https://github.com" + link;
        let repoName = fullLink.split('/').pop();
        console.log(repoName);
        createFile(repoName,topicName);
    }
    console.log("`````````````````````````````")
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