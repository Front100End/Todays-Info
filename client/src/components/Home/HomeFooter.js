import React from "react";
import styles from "./HomeFooter.module.scss";
import { useSelector } from "react-redux";

const HomeFooter = (props) => {
  return (
    <footer className={styles.HomeFooter}>
      <ul>
        <li className={styles.provision}>
          <p>
            <span>증권뉴스 :</span>
            <a href="https://news.naver.com/main/list.naver?mode=LS2D&mid=shm&sid1=101&sid2=258">
              네이버 경제(증권) 뉴스
            </a>
          </p>
          <p>
            <span>날씨 :</span>
            <a href="https://openweathermap.org/">openweathermap</a>
          </p>
          <p>
            <span>지역검색 :</span>
            <a href="https://developers.naver.com/main/">네이버 개발자 센터</a>
          </p>
          <p>
            <span>주식 :</span>
            <a href="https://finance.naver.com/sise/">네이버 금융(국내증시)</a>
          </p>
          <div>
            <span>버스 :</span>
            <p>
              <a href="https://www.data.go.kr/">
                공공데이터포털(경기도 정류소 조회)
              </a>
              <a href="https://www.data.go.kr/">
                공공데이터포털(경기도 버스 노선 조회)
              </a>
              <a href="https://www.data.go.kr/">
                공공데이터포털(경기도 버스도착정보 조회)
              </a>
            </p>
          </div>
        </li>
        <li className={styles.companyInfo}>
          <h2>고객센터 010-0000-0000</h2>
          <p>영업시간 AM 10:00 ~ PM 17:00 (주말 및 공휴일 휴무)</p>
          <p>점심시간 PM 12:30 ~ PM 13:30</p>
        </li>
      </ul>
    </footer>
  );
};

export default HomeFooter;
