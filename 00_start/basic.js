const { members, add, getperson } = require("./data.js"); //data.js에서 사용한 방식 불러오는 방법.

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

let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
let result = [...arr1, ...arr2];
console.log(result);

//Object Destructuring
let { firstName, lastName, email } = getperson(); // {firtName, lastName , age, email}
console.log(firstName, lastName, email);

//Arry Destructuring
function getScores() {
  return [70, 80, 90, 50, 60, 40];
}

//let scoreAry = getScores();
//scoreAry[1]  =>x,y,z 함수를 사용하여 보여준다.
let [x, y, ...z] = getScores(); //...을 사용하면 나머지 숫자는 배열로 정리된다 => 70 80 [ 90, 50, 60, 40 ]
console.log(x, y, z);

function sumAry(...ary) {
  // 펼친 연산자.
  let sum = 0;
  for (let num of ary) {
    sum += num;
  }
  console.log(`합계: ${sum}`);
}
//sumAry(z); //=>합계: 240
sumAry(1, 2, 3, 4, 5, 6, 7, 8); //=>합계: 36
