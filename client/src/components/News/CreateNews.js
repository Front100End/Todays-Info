import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./CreateNews.module.scss";
import * as api from "../../api/ItemAPI";
import headerIcon from "../../images/ico_loudspeaker.png";

const CreateNews = (props) => {
  const [newsArray, setNewsArray] = useState([]);
  const getNews = async () => {
    try {
      let result = await api.getNews();
      let majorNews = result.data.slice(0, 7);
      setNewsArray(majorNews);
    } catch (error) {
      console.log(`error :`, error);
    }
  };
  useEffect(() => {
    getNews();
  }, []);

  return (
    <div className={styles.CreateNews}>
      <header>
        <img src={headerIcon} alt="ico_speaker problem" />
        <h2>뉴스</h2>
      </header>
      {newsArray.map((current, index) => {
        return (
          <ul className={styles.newsItem} key={index}>
            <a href={current.link}>
              <li>
                <img
                  className={styles.newsNumber}
                  src={`../../images/${index + 1}num.svg`}
                  alt=""
                />
              </li>
              <li>
                <h3>{current.title}</h3>
                <span>{current.des}</span>
              </li>
            </a>
          </ul>
        );
      })}
    </div>
  );
};

export default CreateNews;
