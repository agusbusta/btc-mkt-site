import React, { useState, useEffect, useRef } from "react";
import NewsItemXs from "./NewsItemXs";
import MoreNews from "./MoreNews";

function Aside({ coinIds }) {
  const [latestNews, setLatestNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const lastCoinIdsRef = useRef("");
  const [adImage, setAdImage] = useState("ALPHA50.jpg"); // Estado inicial para la imagen

  useEffect(() => {
    const path = window.location.pathname;
    const pathIds = path.split("/")[1];
    console.log(pathIds)
    updateAdImage(pathIds); 

    const coinIdsString = coinIds.join(",");
    if (coinIds.length > 0 && lastCoinIdsRef.current !== coinIdsString) {
      fetchLatestNews();
      lastCoinIdsRef.current = coinIdsString;
    } else {
      setLoading(false);
    }
  }, [coinIds]);

  // Función para actualizar la imagen de anuncio basada en los IDs de la URL
  const updateAdImage = (pathIds) => {
    const idMapping = {
      1: "ALPHA50.jpg",
      2: "2ALPHA50.jpg",
      "4,5,6": "3ALPHA50.jpg",
      "7,8,9": "4ALPHA50.jpg",
      "10,11,12,13,14,15": "5ALPHA50.jpg",
      "16,17,18": "6ALPHA50.jpg",
      "19,20,21": "7ALPHA50.jpg",
      "21,22,23": "8ALPHA50.jpg",
      "24,25,26,27,28,29,30,31,32,33": "9ALPHA50.jpg",
      "34,35,36": "10ALPHA50.jpg",
    };
    setAdImage(idMapping[pathIds] || "ALPHA50.jpg"); // Imagen por defecto si no coincide
  };

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
              <img src={require(`../assets/${adImage}`)} className="ad3" />{" "}
              {/* Uso dinámico del src */}
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
      return (
        <>
          {latestNews.map((item, index) => (
            <React.Fragment key={item.article_id}>
              {index === 1 && (
                <div className="ad3container">
                  <img src={require(`../assets/${adImage}`)} className="ad3" />{" "}
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
