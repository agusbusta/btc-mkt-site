import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";

function NewsSection({ coinIds }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, [coinIds]); // Actualizamos el efecto para que se ejecute cuando cambia coinIds

  const fetchNews = () => {
    setLoading(true);
    Promise.all(
      coinIds.map((coinId) =>
        fetch(
          `https://newsbotv2.ngrok.io/get_articles?bot_id=${coinId}&limit=30`
        )
      )
    )
      .then((responses) =>
        Promise.all(responses.map((response) => response.json()))
      )
      .then((dataArray) => {
        const allNews = dataArray.flatMap((data) => data.data);
        // Agrupar las noticias por tópico
        const groupedNews = groupNewsByTopic(allNews);
        // Mezclar intercaladamente las noticias de cada tópico
        const mixedNews = mixNews(groupedNews);
        setNews(mixedNews);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching the latest news:", error);
        setLoading(false);
      });
  };

  // Función para agrupar las noticias por tópico
  const groupNewsByTopic = (news) => {
    const grouped = {};
    news.forEach((item) => {
      const topic = item.topic; // Se asume que hay una propiedad 'topic' en cada noticia
      if (!grouped[topic]) {
        grouped[topic] = [];
      }
      grouped[topic].push(item);
    });
    return grouped;
  };

  // Función para mezclar intercaladamente las noticias de cada tópico
  const mixNews = (groupedNews) => {
    const mixedNews = [];
    let maxCount = 0;
    // Encontrar la cantidad máxima de noticias en un solo tópico
    for (const topic in groupedNews) {
      if (groupedNews.hasOwnProperty(topic)) {
        maxCount = Math.max(maxCount, groupedNews[topic].length);
      }
    }
    // Mezclar intercaladamente
    for (let i = 0; i < maxCount; i++) {
      for (const topic in groupedNews) {
        if (groupedNews.hasOwnProperty(topic)) {
          const newsForTopic = groupedNews[topic];
          if (newsForTopic[i]) {
            mixedNews.push(newsForTopic[i]);
          }
        }
      }
    }
    return mixedNews;
  };
  console.log("news: ", news)
  return (
    <section className="news-section">
      <br />
      <br />
      <div>
        <h2>All News</h2>
        <hr />
        {news.slice(6,30).map((item, index) => (
          <NewsItem
            key={index}
            title={item.title}
            description={item.description}
            imageUrl={`https://sitesnewsposters.s3.us-east-2.amazonaws.com/${item.image}`}
            publishedTime={item.created_at}
            articleId={item.id}
          />
        ))}
      </div>
    </section>
  );
}

export default NewsSection;
