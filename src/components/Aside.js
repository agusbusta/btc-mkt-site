import React, { useState, useEffect } from "react";
import NewsItemXs from "./NewsItemXs";
import config from "../config";
import MoreNews from "./MoreNews";

function Aside() {
  const [latestNews, setLatestNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const coinBotId = 1;

  useEffect(() => {
    fetch(`https://aialpha.ngrok.io/api/get/latest_news?coin_bot_id=${coinBotId}&limit=4`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch latest news");
        }
        return response.json();
      })
      .then((data) => {
        setLatestNews(data.articles.slice(1, 4));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching latest news:", error);
        setLoading(false);
      });
  }, [coinBotId]);

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
            {latestNews.map((item) => (
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
