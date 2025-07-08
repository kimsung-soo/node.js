const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const multer = require("multer");
require("dotenv").config({ path: "./sql/.env" });
const nodemailer = require("./nodemailer");

const mysql = require("./sql");

// 파일업로드 multer
// 저장경로 와 파일명 지정.
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // 저장경로.
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    // 업로드 되는 파일명.
    // 원본 파일명이 Base64 인코딩 되어있다는 가정 하에 디코딩합니다.
    let fn = Buffer.from(file.originalname, "base64").toString("utf8");
    cb(null, Date.now() + "-" + fn); // 예: 12121212_sample.jpg
  },
});
// Multer 인스턴스 생성
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB 제한
});

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Root 경로");
});
// 이메일 전송화면
app.get("/email", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// 이메일전송
app.post("/email", async (req, res) => {
  try {
    let result = await nodemailer.sendEmail(req.body.param);
    console.log(result);
    res.json({ retCode: "Success", retVal: result });
  } catch (err) {
    res.json({ retCode: "Fail" });
  }
});

// 엑셀 업로드 -> DB insert
// multer.
app.get("/excel", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "excel.html"));
});

// 첨부처리
app.post("/excel", upload.array("myFile"), (req, res) => {
  // upload.array()는 req.files에 파일 정보를 배열로 저장합니다.
  console.log(req.files); // 업로드 파일 정보
  console.log(req.body); // 요청몸체의 정보
  if (!req.files || req.files.length === 0) {
    res.send("업로드된 파일이 없습니다.");
  } else {
    res.send("업로드 완료");
  }
});

// --- 고객(Customer) API ---

// [수정] API 경로를 'customers'로 통일하여 일관성을 유지합니다.

// 전체 조회
app.get("/customers", async (req, res) => {
  try {
    const result = await mysql.query("customerList");
    res.send(result);
  } catch (err) {
    res.send("에러발생 => " + err);
  }
});

// 추가
// [경로 수정] /customer -> /customers
app.post("/customers", async (req, res) => {
  try {
    console.log(req.body.param);
    let data = req.body.param;
    let result = await mysql.query("customerInsert", data);
    res.send(result);
  } catch (err) {
    // [오류 수정] res.send는 인자를 하나만 받으므로 + 로 문자열을 합칩니다.
    res.send("에러발생 => " + err);
  }
});

// 수정
app.put("/customers/:id", async (req, res) => {
  try {
    const customerId = req.params.id;
    const data = req.body;

    let result = await mysql.query("customerUpdate", [data, customerId]);
    res.send(result);
  } catch (err) {
    res.send("에러발생 => " + err);
  }
});

// 삭제
// [경로 수정] /customer/:id -> /customers/:id
app.delete("/customers/:id", async (req, res) => {
  try {
    console.log(req.params);
    let { id } = req.params; // {id: 8}
    let result = await mysql.query("customerDelete", id);
    res.send(result);
  } catch (err) {
    // [오류 수정] res.send는 인자를 하나만 받으므로 + 로 문자열을 합칩니다.
    res.send("에러발생 => " + err);
  }
});

app.listen(3000, () => {
  console.log("http://localhost:3000 running...!!");
});
