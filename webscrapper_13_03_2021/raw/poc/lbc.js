
///last ball comentry

let request = require("request");
let cheerio = require("cheerio");
console.log("before");
request("https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/ball-by-ball-commentary",cb);


// request("https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard",cb1);

// function cb1(error,response,html){
//     if(error)
//     {
//         console.log(error);
//     }
//     else
//     {
//         extractHtml1(html);
//     }
// }
//==============================================================
function cb(error, response, html){
    if(error)
    {
        console.log(error);
    }
        else{
            // console.log(html)
            extractHtml(html)
        }
} 

//==================================================================
function extractHtml(html)
{
    let selectorTool = cheerio.load(html);
    let allComments = selectorTool(".d-flex.match-comment-padder.align-items-center .match-comment-long-text"); 
    // console.log(selectElem.text());
    // console.log(selectElem.html()); 
    // console.log(allComments.length); 

    //rule -> index , wrap inside cherrio selector
    let lastBallComment = selectorTool(allComments[0]).text();
    // let lastBallhtml = selectorTool(allComments[0]).html();
    console.log(lastBallComment);
    // console.log(lastBallhtml); // to select html inside given element
}
//=======================================================================

// function extractHtml1(html)
// {
//     let selectorTool = cheerio.load(html);
//     let allTable = selectorTool(".table.bowler"); 
    // console.log(selectElem.text());
    // console.log(selectElem.html()); 
    // console.log(allComments.length); 

//     //rule -> index , wrap inside cherrio selector
//     let bowlerTable1 = selectorTool(allTable[0]).html();
//     let bowlerTable2 = selectorTool(allTable[1]).html();

//     console.log(bowlerTable1);
//     console.log(bowlerTable2);
// }
console.log("after");