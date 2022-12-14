// 네이버 뉴스 크롤링작업
import iconv from "iconv-lite";
import axios from "axios";
import cheerio from "cheerio";
import { crawlerDecode } from "./Crawler.js";

export const newsFetching = async () => {
  const html = await crawlerDecode(
    "https://news.naver.com/main/list.naver?mode=LS2D&mid=shm&sid1=101&sid2=258",
    "euc-kr"
  );

  const $ = cheerio.load(html);

  let newsArr = [];
  const $headlineNews = $(".type06_headline > li > dl ");
  const $additionalNews = $(".type06 > li > dl");

  $headlineNews.each((index, node) => {
    const title = $(node).find("dt:nth-child(2) a").text();
    const link = $(node).find("dt:nth-child(2) a").attr("href");
    const des = $(node).find("dd .lede").text();
    const source = $(node).find("dd .writing").text();

    if (title === "") {
      return;
    }

    newsArr.push({
      title: title,
      link: link,
      des: des,
      source: source,
    });
  });

  $additionalNews.each((index, node) => {
    const title = $(node).find("dt a").text();
    const link = $(node).find("dt a").attr("href");
    const des = $(node).find("dd .lede").text();
    const source = $(node).find("dd .writing").text();

    newsArr.push({
      title: title,
      link: link,
      des: des,
      source: source,
    });
  });

  return newsArr;
};
