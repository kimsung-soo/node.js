const express = require("express");
const router = express.Router();
//라우팅 정보
router.get("/customers", (req, res) => {
  res.send("/customer 루트디렉토리");
});

router.post("/insert", (req, res) => {
  res.send("/customer Post요청.");
});

router.put("/update", (req, res) => {
  res.send("/customer의 update(PUT) 요청");
});

router.delete("/delete", (req, res) => {
  res.send("/customer의 delete(DELETE) 요청");
});

module.exports = router;
