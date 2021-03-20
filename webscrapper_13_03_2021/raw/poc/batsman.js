// highest wickets taker
let request = require("request");
let cheerio = require("cheerio");
console.log("before");
let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";
request(url,cb1);

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
    let teamNameElemArr = selectorTool(".Collapsible h5");
    teamNameArr = [];
    for (let i = 0; i < teamNameElemArr.length; i++)
    {
        let teamName = selectorTool(teamNameElemArr[i]).text();
        teamName = teamName.split("INNINGS")[0]; 
        // teamname = teamname.split("INNINGS")//[0]; //space  aa jayenge beech mein so advised to trim to remove white spaces from start and end
        teamName = teamName.trim(); // to remove spaces
        // console.log(teamName);
        teamNameArr.push(teamName)
        // let teamname = selectorTool(teamNameArr[i]).
    }
    // console.log(teamNameArr);


    let batsmanTableArr = selectorTool(".table.batsman");


    // let batsmanHtmlStr = "";
    // for (let i = 0; i <batsmanTableArr.length; i++ )
    // {
    //     batsmanHtmlStr += selectorTool(batsmanTableArr[i]).html();
    // }
    // console.log(batsmanHtmlStr);

    for (let i = 0; i < batsmanTableArr.length; i++)
    {
        let batsmanName = selectorTool(batsmanTableArr[i]).find("tbody tr .batsman-cell");
        for( let j = 0; j < batsmanName.length; j++)
        {
            let name = selectorTool(batsmanName[j]).text();
            console.log(name+" of "+teamNameArr[i]);
        }
        console.log("~~~~~~~~~~~~~~~~~~~~")

    }
    
}
console.log("after");