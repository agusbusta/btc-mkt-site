import React, { useState, useEffect } from 'react';
import NewsItem from './NewsItem';

function NewsSection({ coinIds }) {
  const [news, setNews] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, [coinIds]); // Actualizamos el efecto para que se ejecute cuando cambia coinIds

  const fetchNews = () => {
    setLoading(true);
    Promise.all(coinIds.map(coinId => fetch(`https://aialpha.ngrok.io/api/get/latest_news?coin_bot_id=${coinId}&limit=10`))) 
      .then(responses => Promise.all(responses.map(response => response.json())))
      .then(dataArray => {
        const allNews = dataArray.flatMap(data => data.articles);
        setNews(allNews); 
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching the latest news:', error);
        setLoading(false);
      });
  };

  return (
    <section className="news-section">
      <br />
      <br />
      <div>
        <h2>All News</h2>
        <hr />
        {news.map((item, index) => (
          <NewsItem
            key={index}
            title={item.title}
            description={item.description}
            imageUrl={`https://apparticleimages.s3.us-east-2.amazonaws.com/${item.article_id}.jpg`}
            publishedTime={item.created_at}
            articleId={item.article_id}
          />
        ))}
      </div>
    </section>
  );
}

export default NewsSection;
