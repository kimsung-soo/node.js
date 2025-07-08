// 새로운 Promise 객체를 생성합니다.
const promise = new Promise(function (resolve, reject) {
  // 1초 후에 실행될 비동기 작업을 정의합니다.
  let run = parseInt(Math.random() * 2);
  // falsy => 0, null,"",undefied
  setTimeout(function () {
    if (run) {
      resolve({ id: "user", name: " 회원" });
    } else {
      reject(new Error("에러호출"));
    }
  }, 1000); // 1초(1000ms) 후에 실행됩니다.
});

// promise 실행 결과 처리
promise
  // 비동기 작업이 성공(resolve)했을 때 실행됩니다.
  .then(function (result) {
    console.log(result); // 출력: { id: "user", name: " 회원" }
  })
  .catch(function (err) {
    // 에러 내용을 출력합니다.
    console.log(err);
  });

fetch(
  "https:charleslee-6617723.postman.co/workspace/3461b914-2d4f-41c9-8c64-f24308da11f5/request/45560951-edf6f244-dc04-42e6-a962-02a67c0332d1?action=share&source=copy-link&creator=45560951&ctx=documentation"
) //
  .then((json) => json.json()) //
  .then((result) => {
    console.log(result);
  })
  .catch((err) => console.error(err));
