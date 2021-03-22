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
//this is a comment
function extractHtml(html)
{
    let selectorTool = cheerio.load(html);

    let matchCardArr = selectorTool(".col-md-8.col-16 ");

    for(let i = 0; i  < matchCardArr.length; i++ )
    {
        let scoreCardbtnsLinks = selectorTool(matchCardArr[i]).find(".btn.btn-sm.btn-outline-dark.match-cta");
        let scoreCardLinks = selectorTool(scoreCardbtnsLinks[2]).attr("href");
        let fulLink = "https://www.espncricinfo.com/"+scoreCardLinks
        // console.log(fulLink);
        getplayerOfTHeMatch(fulLink);
    }
    // console.log(teamDetailArr.length);
}


function getplayerOfTHeMatch(fulLink)
{
    request(fulLink,cb1)
    

    function cb1(error,res,html)
    {
        if(error)
        {
            console.log(error);
        }
        else
        {
            extractHtml1(html);
        }
    }
}


function extractHtml1(html)
{
    let selectorTool = cheerio.load(html);

    let bestPlayerName = selectorTool(".best-player .best-player-name").text();
    //to print with teamname
    // let bestPlayerName = selectorTool(".best-player-content").text();
    console.log(bestPlayerName);
}