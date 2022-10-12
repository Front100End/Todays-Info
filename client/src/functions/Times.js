const currentTime = new Date();
const dayArray = ["월", "화", "수", "목", "금", "토", "일"];

export const HomeHeaderTime = () => {
  const month = currentTime.getMonth();
  const date = currentTime.getDate();
  const day = currentTime.getDay();

  return `${month + 1}월 ${date}일 ${dayArray[day - 1]}요일 소식입니다.`;
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

export const weatherHourTime = (dt) => {
  let time = new Date(dt * 1000);
  let hour = time.getHours();
  let hourArray = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0];
  if (hour > 11) {
    let changeTime = hourArray[hour - 12];
    return `오후 ${changeTime}시`;
  } else {
    return `오전 0${hour}시`;
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
