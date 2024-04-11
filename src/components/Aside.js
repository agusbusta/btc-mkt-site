import React, { useState, useEffect, useRef } from "react";
import NewsItemXs from "./NewsItemXs";
import MoreNews from "./MoreNews";
import ad3 from "../assets/Ads-03.jpg";

function Aside({ coinIds }) {
  const [latestNews, setLatestNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const lastCoinIdsRef = useRef("");

  useEffect(() => {
    const coinIdsString = coinIds.join(",");
    if (coinIds.length > 0 && lastCoinIdsRef.current !== coinIdsString) {
      fetchLatestNews();
      lastCoinIdsRef.current = coinIdsString;
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

  const renderNewsItems = () => {
    if (coinIds.length > 1) {
      // Si hay más de un ID, muestra un rango específico de noticias
      return latestNews.slice(3, 6).map((item, index) => (
        <React.Fragment key={item.article_id}>
          {index === 1 && (
            <div className="ad3container">
              <img src={ad3} className="ad3" />
              <hr></hr>
            </div>
          )}
          <NewsItemXs
            articleId={item.article_id}
            publishedTime={item.created_at}
            title={item.title}
          />
        </React.Fragment>
      ));
    } else {
      // Si solo hay un ID, muestra todas las noticias
      return (
        <>
          {latestNews.map((item, index) => (
            <React.Fragment key={item.article_id}>
              {index === 1 && (
                <div className="ad3container">
                  <img src={ad3} className="ad3" />
                  <hr></hr>
                </div>
                
              )}
              <NewsItemXs
                articleId={item.article_id}
                publishedTime={item.created_at}
                title={item.title}
              />
            </React.Fragment>
          ))}
        </>
      );
    }
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
          <div className="ad">{renderNewsItems()}</div>
        )}

        <br />
        <MoreNews />
      </div>
    </aside>
  );
}

export default Aside;
