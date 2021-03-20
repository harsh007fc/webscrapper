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
        teamName = teamName.trim(); 
        teamNameArr.push(teamName);
    }
    
    let batsmanTableArr = selectorTool(".table.batsman");
    for (let i = 0; i < batsmanTableArr.length; i++)
    {
        let batsmanNameAnchor = selectorTool(batsmanTableArr[i]).find("tbody tr .batsman-cell a");
        for( let j = 0; j < batsmanNameAnchor.length; j++)
        {
            let name = selectorTool(batsmanNameAnchor[j]).text();
            let teamName = teamNameArr[i];//upr wala loop 
            let link = selectorTool(batsmanNameAnchor[j]).attr("href");
            // console.log(name+" "+teamName+" "+link);
            //batsman name team
            printBirthdays(link,name,teamName);
        }
        // console.log("~~~~~~~~~~~~~~~~~~~~")

    }
    
}

function printBirthdays(link,name,teamName)
{
    request(link,cb1);

 function cb1(error,response,html)
 {
    if(error)
    {
        console.log(error);
    }
    else
    {
        // console.log(html);
        extractBirthday(html,name,teamName);
        console.log("````````````````````````````````");
    }
 }
}
 function extractBirthday(html,name,teamName)
 {
     let selectorTool = cheerio.load(html);
     let birthdayElem = selectorTool(".ciPlayerinformationtxt span");
     let birthday = selectorTool(birthdayElem[1]).text();
     console.log(name+" Plays for "+teamName+" was born on "+birthday);
 }

console.log("after");