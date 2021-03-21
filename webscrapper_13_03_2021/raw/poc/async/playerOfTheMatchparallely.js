let request = require("request");
let cheerio = require("cheerio");
console.log("before");
let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/match-results";
request(url,cb);

function cb(error,response,html)
{
    if(error)
    {
        console.log(error);
    }
    else
    {
        extractHtml(html);
    }
}

function extractHtml(html)
{
    let selectorTool = cheerio.load(html);

    let matchCardArr = selectorTool(".col-md-8.col-16 ");

    for(let i = 0; i  < matchCardArr.length; i++ )
    {
        let scoreCardbtnsLinks = selectorTool(matchCardArr[i]).find(".btn.btn-sm.btn-outline-dark.match-cta");
        let scoreCardLinks = selectorTool(scoreCardbtnsLinks[2]).attr("href");
        console.log("https://www.espncricinfo.com/"+scoreCardLinks);
    }
    // console.log(teamDetailArr.length);
}