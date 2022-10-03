const currentTime = new Date();
const dayArray = ["월", "화", "수", "목", "금", "토", "일"];

export const HomeHeaderTime = () => {
  const month = currentTime.getMonth();
  const date = currentTime.getDate();
  const day = currentTime.getDay();

  return `${month + 1}월 ${date}일 ${dayArray[day - 1]}요일 소식입니다`;
};

export const WeatherRequestParams = () => {
  const year = currentTime.getFullYear();
  const month = currentTime.getMonth();
  const date = currentTime.getDate();
  const time = currentTime.toLocaleDateString();
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
