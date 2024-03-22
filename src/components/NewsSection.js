import React from 'react';
import NewsItem from './NewsItem';

function NewsSection({ news }) {
  return (
    <section className="news-section">
      <br />
      <br />
      <div>
        <h2>All Bitcoin News</h2>
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
