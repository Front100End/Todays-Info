// 네이버 주식 현재가 크롤링작업
import cheerio from "cheerio";
import { crawlerDecode } from "./Crawler.js";

export const StockFetching = async (itemCode) => {
  const html = await crawlerDecode(
    "https://finance.naver.com/item/main.nhn?code=005930",
    "euc-kr"
  );
  const $ = cheerio.load(html);

  let stockArr = [];
  const $todayPrice = $(".no_today > em:nth-child(1)");
  const $comparePrice = $(".no_exday > em ");

  $todayPrice.each((index, item) => {
    const price = $(item).find("> span:nth-child(1)").text();
    stockArr.push({
      price: price,
    });
  });

  $comparePrice.each((index, item) => {
    const priceState = $(item).find("span:nth-child(1)").text();
    const comparePrice = $(item).find("span:nth-child(2)").text();
    stockArr.push({
      priceState: priceState,
      comparePrice: comparePrice,
    });
  });
  // console.log(stockArr);
};
StockFetching();
