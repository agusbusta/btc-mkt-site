import React, { useState, useEffect } from "react";
import NewsItemXs from "./NewsItemXs";
import config from "../config";
import MoreNews from "./MoreNews";

function Aside({ coinIds }) {
  const [latestNews, setLatestNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (coinIds.length > 0) {
      fetchLatestNews();
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [coinIds]);

  const fetchLatestNews = () => {
    setLoading(true);
    Promise.all(
      coinIds.map((coinId) =>
        fetch(
          `https://aialpha.ngrok.io/api/get/latest_news?coin_bot_id=${coinId}&limit=4`
        )
      )
    )
      .then((responses) =>
        Promise.all(responses.map((response) => response.json()))
      )
      .then((dataArray) => {
        const allNews = dataArray.flatMap((data) => data.articles.slice(1, 4));
        setLatestNews(allNews);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching latest news:", error);
        setLoading(false);
      });
  };

  return (
    <aside>
      <div className="aside-content">
        <div
          style={{
            display: "flex",
            height: "28px",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2>Most Recent</h2>
        </div>
        <hr />
        {loading ? (
          <div className="dots-loader">
            <div></div>
            <div></div>
            <div></div>
          </div>
        ) : latestNews.length === 0 ? (
          <p>No news available</p>
        ) : (
          <div className="ad">
            {latestNews.slice(3, 6).map((item) => (
              <NewsItemXs
                key={item.article_id}
                articleId={item.article_id}
                publishedTime={item.created_at}
                title={item.title}
              />
            ))}
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "center" }}>
          <span
            style={{
              margin: "10px",
              border: "1px solid black",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "50%",
            }}
          >
            AD AI ALPHA
          </span>
        </div>
        <br />
        <MoreNews />
      </div>
    </aside>
  );
}

export default Aside;
