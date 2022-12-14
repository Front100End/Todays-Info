import React, { useEffect, useState } from "react";
import styles from "./CreateNews.module.scss";
import * as api from "../../api/crawlingAPI";
import headerIcon from "../../images/ico_loudspeaker.png";
import refreshIcon from "../../images/refresh_icon.png";

const CreateNews = (props) => {
  const [newsArray, setNewsArray] = useState([]);
  const getNews = async () => {
    try {
      let result = await api.getNews();
      let majorNews = result.data.slice(0, 8);
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
        <ul>
          <li>
            <img src={headerIcon} alt="ico_speaker problem" />
            <h2>뉴스</h2>
          </li>
          <li>
            <button onClick={() => getNews()}>
              <img src={refreshIcon} alt="arrows-rotate-solid img problem" />
            </button>
          </li>
        </ul>
      </header>
      <div>
        {newsArray.map((current, index) => {
          return (
            <ul className={styles.newsItem} key={index}>
              <a href={current.link}>
                <li>
                  <img
                    className={styles.newsNumber}
                    src={`images/${index + 1}num.svg`}
                    alt=""
                  />
                </li>
                <li>
                  <h3>{current.title}</h3>
                  <span>
                    {current.des.length > 55
                      ? current.des.slice(0, 54) + "..."
                      : current.des}
                  </span>
                </li>
              </a>
            </ul>
          );
        })}
      </div>
    </div>
  );
};

export default CreateNews;
