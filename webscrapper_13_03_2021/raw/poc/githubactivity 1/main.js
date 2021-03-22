let request = require("request");
let cheerio = require("cheerio");


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

    let arr = selTool("a.text-bold");
    console.log(topicName);
    for (let i = 0; i < 8; i++)
     {
        let link = selTool(arr[i]).attr("href");

        let fullLink = "https://github.com" + link;
        console.log(fullLink);
    }
    console.log("`````````````````````````````")
}