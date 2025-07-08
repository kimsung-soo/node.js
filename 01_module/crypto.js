//crypto.js
//crypto.js는 Node.js의 내장 모듈인 crypto를 사용해 비밀번호를 안전하게 암호화하는 예제입니다.

// Node.js 내장 모듈 로드
const { rejects } = require("assert"); // (사용되지 않음 - 제거해도 무방)
const crypto = require("crypto"); // 암호화 모듈
const { resolve } = require("path"); // (사용되지 않음 - 제거해도 무방)

// sha512 해시 방식으로 평문 비밀번호 "pw1234"를 단순 암호화 (salt 없이)
let pw = crypto.createHash("sha512").update("pw1234").digest("base64");
// console.log(pw);  // 결과: base64 형태의 암호화된 문자열 출력

// -------------------------
// Salt 생성 함수
// -------------------------
const creatSalt = () => {
  return new Promise((resolve, reject) => {
    // crypto.randomBytes: 64바이트 길이의 랜덤 데이터 생성 (salt 역할)
    crypto.randomBytes(64, (err, buf) => {
      if (err) {
        reject(err); // 실패 시 reject
      }
      resolve(buf); // 성공 시 buffer 반환
    });
  });
};

// creatSalt 사용 예시 (salt를 base64 문자열로 출력)
creatSalt() //
  .then((result) => console.log(result.toString("base64")));

// -------------------------
// Salt 기반 비밀번호 암호화 함수
// -------------------------
const createCryptoPassword = (plainPassword, salt) => {
  return new Promise((resolve, reject) => {
    // pbkdf2: 암호화 방식 중 하나 (반복적인 해시를 통한 보안 강화)
    crypto.pbkdf2(plainPassword, salt, 10000, 64, "sha512", (err, key) => {
      if (err) {
        reject(err); // 에러 발생 시
      }
      // 성공 시 암호화된 비밀번호와 salt 반환
      resolve({
        salt: salt,
        password: key.toString("base64"),
      });
    });
  });
};

// -------------------------
// 패스워드 생성
// -------------------------
async function main() {
  const salt = await creatSalt(); // 1. salt 생성
  console.log(salt); // 2. 생성된 salt 출력 (Buffer 객체)

  const pw = await createCryptoPassword("1111", salt); // 3. "1111"을 암호화
  console.log(pw.password); // 4. 암호화된 결과 출력
}

main(); // 실행
