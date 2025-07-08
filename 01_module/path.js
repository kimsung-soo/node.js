//path.js
const path = require("path");

console.log(__filename); //현재파일경로 => D:\Dev\git\node\01_module\path.js
console.log(path.basename(__filename)); //경로의 마지막 부분 => path.js
console.log(path.basename(__filename, "js")); //경로의 마지막 부분에서 확장자를 제거한 이름 =>path.

let result = path.format({
  base: "sample.txt",
  dir: "/home/temp", ///home/temp\sample.txt
});
console.log(result);

result = path.parse("/home/temp/sample.txt");
console.log(result);
