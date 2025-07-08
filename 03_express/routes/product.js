const { Router } = require("express");
const router = Router();
//라우팅 정보
router.get("/products", (req, res) => {
  res.send("/product 루트디렉토리");
});

router.post("/insert", (req, res) => {
  res.send("/product Post요청.");
});

router.put("/update", (req, res) => {
  res.send("/product Put요청");
});

router.delete("/delete", (req, res) => {
  res.send("/product DELETE요청");
});

module.exports = router;
