export const authFindUser = async (decoded) => {
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
