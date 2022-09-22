import { response } from "express";
import { newsFetching } from "./Crawling/NewsFetching.js";
import { StockFetching } from "./Crawling/StockFetching.js";
import { createUserToken, authToken } from "./User/userToken.js";
import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.static("build"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
dotenv.config();

const whitelist = ["http://localhost:3000"];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not Allowed Origin!"));
    }
  },
};
app.use(cors(corsOptions));

const pool = await mysql.createPool({
  host: "localhost",
  user: "root",
  database: "todaysinfo",
  password: `${process.env.REACT_APP_LOCAL_DB_PASSWORD}`,
  connectionLimit: 10,
});

app.get("/", (req, res) => {
  newsFetching().then((response) => res.send(response));
});

//---------로그인---------

app.post("/api/users/login", async (req, res) => {
  const { id, password } = req.body;
  try {
    let connection = await pool.getConnection(async (conn) => {
      if (err) throw err;
      return conn;
    });
    const user = await connection.query(`SELECT * FROM user WHERE userId = ?`, [
      id,
    ]);
    // console.log(user[0][0]);
    if (user[0][0] == undefined) {
      //일치하는 아이디 없을경우
      return res.json({
        loginSuccess: false,
        message: "존재하지 않은 아이디입니다.",
      });
    }
    if (user) {
      let hashPassword = user[0][0].userPassword;
      let passwordCheck = await bcrypt.compare(password, hashPassword);
      if (id === user[0][0].userId && passwordCheck === true) {
        let id = user[0][0].id;
        let token = createUserToken().access(id);
        let insertToken = await connection.query(
          `UPDATE user SET token = ? WHERE id = ?`,
          [token, id]
        );
        res.cookie("loginCookie", token, {
          httpOnly: true,
        });
        res.status(200).json({
          loginSuccess: true,
          message: "success",
        });
      } else {
        console.log("password틀림");
        res.json({
          loginSuccess: false,
          message: "password가 틀렸습니다.",
        });
      }
    } else {
      console.log("가입되지 않은 회원입니다.");
      res.json({
        loginSuccess: false,
        message: "가입되지 않은 회원입니다.",
      });
    }
    connection.release();
  } catch (err) {
    console.log(`error : ${err}`);
  }
});

//---------회원가입---------

app.post("/api/users/join", async (req, res) => {
  const { id, password, nickname, email } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  let connection = await pool.getConnection(async (conn) => {
    if (err) throw err;
    return conn;
  });
  const user = await connection.query(
    `SELECT * FROM user WHERE userId = '${id}'`
  );
  if (user[0][0] == undefined) {
    try {
      let [rows] = await connection.query(
        "INSERT INTO user(userId,userPassword,userNickname,userEmail) VALUES(?,?,?,?)",
        [id, hashPassword, nickname, email]
      );
      res.send("회원가입이 완료되었습니다.");
      connection.release();
    } catch (err) {
      console.log("err : ", err);
      res.status(500).send("somethings broke");
    }
  } else {
    connection.release();
    return res.status(400).json({ message: "이미 가입된 아이디입니다." });
  }
});

//---------크롤링---------

app.get("/api/news", (req, res) => {
  //news crawling
  newsFetching().then((response) => res.send(response));
});

app.get("/api/stocks", (req, res) => {
  //stock crawling
  StockFetching().then((response) => res.send(response));
});

//---------open API---------

let stockSearchURI =
  "http://api.seibro.or.kr/openapi/service/StockSvc/getStkIsinByNmN1?secnNm=삼성&numOfRows=2&pageNo=1&ServiceKey=";

app.listen(PORT, async () => {
  // pool = await mysql.createPool({
  //   host: "localhost",
  //   user: "root",
  //   database: "todaysinfo",
  //   password: `${process.env.REACT_APP_LOCAL_DB_PASSWORD}`,
  //   connectionLimit: 10,
  // });
  console.log(`Example app listening on port ${PORT}`);
});
