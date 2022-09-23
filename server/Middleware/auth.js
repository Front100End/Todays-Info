// export const auth = async (req, res, next) => {
//   //브라우저에서 쿠키찾기
//   let token = req.cookies.accessToken;
//   console.log(token);
//   let connection = await pool.getConnection(async (conn) => {
//     if (err) throw err;
//     return conn;
//   });
//   const user = await connection.query(`SELECT * FROM user WHERE token = ?`, [
//     token,
//   ]);
//   console.log(user[0]);
//   // 쿠키에 저장된 토큰 값 확인
//   // 토큰 디코드하면 나오는 id와 토큰 값을 DB의 저장값과 비교

//   next();
// };
