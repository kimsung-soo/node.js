const { members, add } = require("./data.js"); //data.js에서 사용한 방식 불러오는 방법.

console.log("hello, world");
let myName = "홍길동";
let age = 20;

if (age >= 20) {
  console.log(`${myName}은 성인`);
} else {
  console.log(`${myName}은 미성년자`);
}

console.log(members);
console.log(add(10, 20));

members.forEach((item, idx) => {
  if (idx > 0) {
    console.log(item);
  }
}); //function(item, idx, array)
