import { response } from "express";
import { newsFetching } from "./Crawling/NewsFetching.js";
import { StockFetching } from "./Crawling/StockFetching.js";
import { createUserToken } from "./User/userToken.js";
import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import axios from "axios";
import cookie from "cookie";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import xmlConverter from "xml-js";
import { authFindUser } from "./Middleware/auth.js";

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
  credentials: true,
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
        message: "※ 존재하지 않은 아이디입니다.",
      });
    }

    if (user) {
      let hashPassword = user[0][0].userPassword;
      let passwordCheck = await bcrypt.compare(password, hashPassword);
      let cookie = req.cookies.accessCookie;

      if (id === user[0][0].userId && passwordCheck === true) {
        let id = user[0][0].id;

        if (!user[0][0].token) {
          let token = createUserToken().access(id);
          let insertToken = await connection.query(
            `UPDATE user SET token = ? WHERE id = ?`,
            [token, id]
          );
          res.cookie("accessCookie", token);
        } else if (!cookie) {
          let token = createUserToken().access(id);
          let insertToken = await connection.query(
            `UPDATE user SET token = ? WHERE id = ?`,
            [token, id]
          );
          res.cookie("accessCookie", token);
        }

        res.status(200).json({
          loginSuccess: true,
          message: "success",
        });
      } else {
        console.log("password틀림");
        res.json({
          loginSuccess: false,
          message: "※ 비밀번호가 틀렸습니다.",
        });
      }
    } else {
      console.log("※ 가입되지 않은 회원입니다.");
      res.json({
        loginSuccess: false,
        message: "※ 가입되지 않은 회원입니다.",
      });
      connection.release();
    }
  } catch (err) {
    console.log(`error : ${err}`);
  }
});

app.post("/api/users/logout", async (req, res) => {
  try {
    let { id } = req.body;
    let connection = await pool.getConnection(async (conn) => {
      if (err) throw err;
      return conn;
    });
    let logoutUser = await connection.query(
      `UPDATE user SET token="" WHERE id = ?`,
      [id]
    );
    res.clearCookie("accessCookie");
    return res.json({
      logoutSuccess: true,
      message: "로그아웃이 정상적으로 실행됐습니다..",
    });
  } catch (err) {
    return res.json({
      logoutSuccess: false,
      message: "로그아웃에 실패했습니다.",
      error: err,
    });
  }
  connection.release();
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
      res.send("join success");
    } catch (err) {
      console.log("err : ", err);
      res.status(500).send("somethings broke");
    }
  } else {
    connection.release();
    return res.status(400).json({ message: "이미 가입된 아이디입니다." });
  }
  connection.release();
});

//---------인증---------

app.get("/api/users/auth", async (req, res) => {
  //브라우저에서 쿠키찾기
  let token = req.cookies.accessCookie;
  let connection = await pool.getConnection(async (conn) => {
    if (err) throw err;
    return conn;
  });
  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
      //유저 아이디 확인.
      const findUser = async (decoded) => {
        let user;
        const jwtCheck = await connection.query(
          `SELECT * FROM user WHERE id = ? and token = ?`,
          [decoded, token]
        );
        if (!jwtCheck) return res.json({ isAuth: false, error: true });

        user = jwtCheck[0][0];

        res.status(200).json({
          isAuth: true,
          isAdmin: user.id === 0 ? true : false,
          id: user.id,
          userId: user.userId,
          userNickname: user.userNickname,
          userEmail: user.userEmail,
        });
      };
      findUser(decoded.id);
    });
  } catch (err) {
    res.json({
      isAuth: false,
      error: err,
    });
  }

  // 쿠키에 저장된 토큰 값 확인
  // 토큰 디코드하면 나오는 id와 토큰 값을 DB의 저장값과 비교
  connection.release();
});

//---------stock---------

app.get("/stock/code", async (req, res) => {
  const id = req.query.id;
  let connection = await pool.getConnection(async (conn) => {
    if (err) throw err;
    return conn;
  });
  try {
    let [rows] = await connection.query("SELECT * from stock WHERE id = ?", [
      id,
    ]);
    connection.release();
    return res.send(rows);
  } catch (err) {
    connection.release();
    return res.json({ getStockCode: false, status: 500, error: err });
  }
});

//현재는 빠른 개발을 위해 중복확인을 하지않을 것임. 추후 수정 예정.
app.post("/stock/code", async (req, res) => {
  const { id, stockCode } = req.body;
  let connection = await pool.getConnection(async (conn) => {
    if (err) throw err;
    return conn;
  });
  try {
    let [rows] = await connection.query(
      "INSERT INTO stock(id,stockcode) VALUES(?,?)",
      [id, stockCode]
    );
    connection.release();
    return res.json({ postStockCodeSuccess: true, status: 200 });
  } catch (error) {
    connection.release();
    return res.json({ postStockCodeSuccess: false, status: 500, error: error });
  }
});

app.delete("/stock/code", async (req, res) => {
  const { id, stockCode } = req.body;
  let connection = await pool.getConnection(async (conn) => {
    if (err) throw err;
    return conn;
  });
  try {
    let deleteItem = await connection.query(
      "DELETE FROM stock WHERE id=? and stockcode =?",
      [id, stockCode]
    );
    connection.release();
    return res.json({
      deleteStockCodeSuccess: true,
    });
  } catch (err) {
    connection.release();
    return res.json({
      deleteStockCodeSuccess: false,
      status: 500,
      error: error,
    });
  }
});

app.get("/bus/route", async (req, res) => {
  const id = req.query.id;
  let connection = await pool.getConnection(async (conn) => {
    if (err) throw err;
    return conn;
  });
  try {
    let [rows] = await connection.query("SELECT * from bus WHERE id = ?", [id]);
    connection.release();
    return res.send(rows);
  } catch (err) {
    connection.release();
    return res.json({ getWeatherLocation: false, status: 500, error: err });
  }
});

app.post("/bus/route", async (req, res) => {
  const { id, stationId, routeId, staOrder, routeType, routeName } = req.body;
  let connection = await pool.getConnection(async (conn) => {
    if (err) throw err;
    return conn;
  });
  try {
    let [row] = await connection.query(
      "INSERT INTO bus(id,stationId, routeId, staOrder,routeType,routeName) VALUES(?,?,?,?,?,?)",
      [id, stationId, routeId, staOrder, routeType, routeName]
    );
    connection.release();
    return res.json({ postbusRoute: true, status: 200 });
  } catch (err) {
    connection.release();
    return res.json({ postbusRoute: false, status: 500, error: err });
  }
});

app.get("/weather/location", async (req, res) => {
  const id = req.query.id;
  let connection = await pool.getConnection(async (conn) => {
    if (err) throw err;
    return conn;
  });
  try {
    let [rows] = await connection.query("SELECT * from weather WHERE id = ?", [
      id,
    ]);
    connection.release();
    return res.send(rows);
  } catch (err) {
    connection.release();
    return res.json({ getWeatherLocation: false, status: 500, error: err });
  }
});

app.post("/weather/location", async (req, res) => {
  const { id, localName, x, y } = req.body;
  let connection = await pool.getConnection(async (conn) => {
    if (err) throw err;
    return conn;
  });
  try {
    let [rows] = await connection.query(
      "INSERT INTO weather(id,localName,x,y) VALUES(?,?,?,?)",
      [id, localName, x, y]
    );
    connection.release();
    return res.json({ postWeatherLocation: true, status: 200 });
  } catch (error) {
    connection.release();
    return res.json({ postWeatherLocation: false, status: 500, error: error });
  }
});

app.delete("/weather/location", async (req, res) => {
  const { id, localName } = req.body;
  let connection = await pool.getConnection(async (conn) => {
    if (err) throw err;
    return conn;
  });
  try {
    let deleteItem = await connection.query(
      "DELETE FROM weather WHERE id=? and localName =?",
      [id, localName]
    );
    connection.release();
    return res.json({
      deleteWeatherLocationSuccess: true,
    });
  } catch (err) {
    connection.release();
    return res.json({
      deleteWeatherLocationSuccess: false,
      status: 500,
      error: error,
    });
  }
});

//---------크롤링---------

app.get("/api/news", (req, res) => {
  //news crawling
  newsFetching().then((response) => res.send(response));
});

app.get("/api/stocks", (req, res) => {
  //stock crawling
  const stockCode = req.query.stockCode;
  StockFetching(stockCode).then((response) => {
    res.send(response);
  });
});
//---------open API---------

app.post("/api/stocks/search", async (req, res) => {
  let { searchKeyword } = req.body;
  let numOfRows = 10;
  let pageNo = 1;
  let serviceKey = process.env.REACT_APP_STOCKCODE_SEARCH_API_KEY;
  let serachCodeURI = `http://api.seibro.or.kr/openapi/service/StockSvc/getStkIsinByNmN1?secnNm=${searchKeyword}&numOfRows=${numOfRows}&pageNo=${pageNo}&ServiceKey=${serviceKey}`;
  try {
    let searchResult = await axios.get(encodeURI(serachCodeURI));
    let arrayResult = [];
    let filterSearchResult = [];
    if (searchResult.data.response.body.items.item.length === undefined) {
      //값이 하나일 경우 배열로 감싸줌.
      arrayResult = [searchResult.data.response.body.items.item];
      filterSearchResult = arrayResult.filter(
        (current) => current.eltscYn === "Y"
      ); //현재 상장중인 종목만을 filter
    } else {
      filterSearchResult = searchResult.data.response.body.items.item.filter(
        (current) => current.eltscYn === "Y"
      ); //현재 상장중인 종목만을 filter
    }
    // console.log(filterSearchResult);
    res.send(filterSearchResult);
  } catch (err) {
    res.json({ isSuccess: false, error: err });
  }
});

app.get("/api/bus/search/station", async (req, res) => {
  const searchKeyword = req.query.searchKeyword;
  const stationSearchURI =
    "http://apis.data.go.kr/6410000/busstationservice/getBusStationList";
  try {
    axios
      .get(encodeURI(stationSearchURI), {
        params: {
          serviceKey: process.env.REACT_APP_BUS_STATION_SEARCH_API_KEY,
          keyword: searchKeyword,
        },
      })
      .then((response) => {
        res.send(
          xmlConverter.xml2json(response.data, { compact: true, spaces: 4 })
        );
      });
  } catch (err) {
    res.json({ stationSearchConnect: false, err: err });
  }
});
app.get("/api/bus/search/route", async (req, res) => {
  const stationId = req.query.stationId;
  const stationSearchURI =
    "http://apis.data.go.kr/6410000/busstationservice/getBusStationViaRouteList";
  try {
    axios
      .get(encodeURI(stationSearchURI), {
        params: {
          serviceKey: process.env.REACT_APP_BUS_STATION_SEARCH_API_KEY,
          stationId: stationId,
        },
      })
      .then((response) => {
        res.send(
          xmlConverter.xml2json(response.data, { compact: true, spaces: 4 })
        );
      });
  } catch (err) {
    res.json({ stationSearchConnect: false, err: err });
  }
});

app.get("/api/bus", async (req, res) => {
  const stationId = req.query.stationId;
  const routeId = req.query.routeId;
  const staOrder = req.query.staOrder;
  const stationSearchURI =
    "http://apis.data.go.kr/6410000/busarrivalservice/getBusArrivalItem";
  try {
    axios
      .get(encodeURI(stationSearchURI), {
        params: {
          serviceKey: process.env.REACT_APP_BUS_STATION_SEARCH_API_KEY,
          stationId: stationId,
          routeId: routeId,
          staOrder: staOrder,
        },
      })
      .then((response) => {
        res.send(
          xmlConverter.xml2json(response.data, { compact: true, spaces: 4 })
        );
      });
  } catch (err) {
    res.json({ routeSearchConnect: false, err: err });
  }
});

app.get("/api/weather/search", (req, res) => {
  const value = req.query.searchKeyword;
  try {
    axios
      .get(`https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode`, {
        params: {
          query: value,
          display: 5,
        },
        headers: {
          "X-NCP-APIGW-API-KEY-ID": `${process.env.REACT_APP_X_NCP_APIGW_API_KEY_ID}`,
          "X-NCP-APIGW-API-KEY": `${process.env.REACT_APP_X_NCP_APIGW_API_KEY}`,
        },
      })
      .then((response) => {
        res.send(response.data.addresses);
      });
  } catch (err) {
    res.json({ weatherSearchSuccess: false, err: err });
  }
});

app.post("/api/weather", (req, res) => {
  const { x, y } = req.body;
  const weatherBaseUrl = `https://api.openweathermap.org/data/2.5/onecall`;
  try {
    axios
      .get(
        `${weatherBaseUrl}?lat=${y}&lon=${x}&exclude=minutely&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
      )
      .then((response) => {
        res.send(response.data);
      });
  } catch (err) {
    console.log(err);
  }
});

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
