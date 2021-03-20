// highest wickets taker
let request = require("request");
let cheerio = require("cheerio");
console.log("before");
request("https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard",cb1);

function cb1(error,response,html){
    if(error)
    {
        console.log(error);
    }
    else
    {
        extractHtml1(html);
    }
}



function extractHtml1(html)
{
    let selectorTool = cheerio.load(html);
    //bowler table
    let bowlersTable = selectorTool(".table.bowler");
    // let stringHtml = "";
    // for(let i = 0; i < bowlersTable.length; i++)
    // {
    //     //rule -> index , wrap inside cherrio selector
    //     stringHtml += selectorTool(bowlersTable[i]).html();
    // } 
    // console.log(stringHtml);

    let hwtname = "";
    let hwkt = 0;

    for(let i=0;i<bowlersTable.length;i++)
    {
        let singleInningBowler = selectorTool(bowlersTable[i]).find("tbody tr");
        for(let j=0; j<singleInningBowler.length; j++)
        {
            let singleAllCols = selectorTool(singleInningBowler[j]).find("td");
            let name = selectorTool(singleAllCols[0]).text();
            let wickets = selectorTool(singleAllCols[4]).text();

            console.log("Name ->",name,"Wickets ->",wickets);
            if(hwkt <= Number.parseInt(wickets) )
            {
                hwkt = wickets;
                hwtname = name;
            }
            // console.log("Wickets->",wickets);
        }
        console.log("-------------------------------------")
    }
    console.log(hwtname," : ",hwkt);
}
console.log("after");