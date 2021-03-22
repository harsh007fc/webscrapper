let fs = require("fs");

console.log("before");

function fileReader(fileName)
{
    fs.readFile(fileName,cb);
}
function cb(err,data)
{
    if(err)
    {
        console.log(err);
    }
    else
    {
        console.log("Content->"+data);
    }
}
fileReader("f1.txt");
console.log("after");