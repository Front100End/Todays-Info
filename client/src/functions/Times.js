const currentTime = new Date();
const dayArray = ["월", "화", "수", "목", "금", "토", "일"];

export const HomeHeaderTime = () => {
  const month = currentTime.getMonth();
  const date = currentTime.getDate();
  const day = currentTime.getDay();

  return `${month + 1}월 ${date}일 ${dayArray[day - 1]}요일 소식입니다`;
};

export const weatherRequestParams = () => {
  let time = currentTime.toLocaleString("ko-KR", { timeZone: "UTC" });
  let filtering = time.slice(0, 11).replaceAll(" ", "").replaceAll(".", "");
  if (currentTime.getDate() < 10) {
    let result = filtering.slice(0, -1) + "0" + filtering.slice(-1);
    return result;
  } else {
    return filtering;
  }
};

export const stockFooterTime = () => {
  const year = currentTime.getFullYear();
  const month = currentTime.getMonth();
  const date = currentTime.getDate();
  const hour = currentTime.getHours();
  const minute = currentTime.getMinutes();

  let timeState = "AM";
  if (hour > 12) {
    timeState = "PM";
  }

  return `${year}.${month + 1}.${date} ${hour}:${minute}${timeState}`;
};
