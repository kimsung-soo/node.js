//01_module/console.js
const { Console } = require("console");
const fs = require("fs");
const express = require("express"); //외부모듈.

//sample 폴더 하위에 output.log 파일 생성
const output = fs.createWriteStream("./sample/output.log", { flags: "a" });
//sample 폴더 하위에 errlog.log 파일 생성
const errlog = fs.createWriteStream("./sample/errlog.log", { flags: "a" });

const logger = new Console({
  stdout: output,
  stderr: errlog,
});
logger.log("로그기록하기.");
logger.error("에로로그기록하기.");
console.log("end");
