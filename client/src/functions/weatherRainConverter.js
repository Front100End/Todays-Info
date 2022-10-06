export const weatherRainConverter = (pop) => {
  if (pop == 0) {
    return pop;
  } else {
    return Math.round(pop * 10) * 10;
  }
};
