let fs = require("fs");
console.log("before");
// let data = fs.readFileSync("f1.txt");
// console.log("content -> "+data);
// db queries,file read, request,image processing
fs.readFile("f1.txt",cb);
function cb(err,data)
{
    console.log("content -> "+data);
}
console.log("after");
console.log("after 1");
console.log("after 2");