const { rejects } = require("assert");
const nodemailer = require("nodemailer");

const config = {
  host: "smtp.daum.net",
  port: 465,
  secure: true,
  auth: {
    user: "rlatjdtn236@daum.net",
    pass: "kpgmkneleazastfb",
  },
};

const sendEmail = async (data) => {
  const transporter = nodemailer.createTransport(config);
  try {
    const result = await transporter.sendMail(data);
    console.log("메일 성공", result);
    return result; // async 함수에서 return은 Promise.resolve(result)와 같습니다.
  } catch (err) {
    console.error("메일 실패", err);
    throw err; // async 함수에서 throw는 Promise.reject(err)와 같습니다.
  }
};

module.exports = {
  sendEmail,
};

module.exports = {
  sendEmail,
};
