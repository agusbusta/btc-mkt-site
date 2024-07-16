import React, { useState, useEffect } from "react";
import config from "../config";
import moment from "moment";
import { useParams } from "react-router-dom";
import MoreNews from "./MoreNews";

function ArticleDetail() {
  const { articleId } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("el que llega nashe es ", articleId)
    fetch(`https://newsbotv2.ngrok.io/api/get/article?article_id=${articleId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch article details");
        }
        return response.json();
      })
      .then((data) => {
        setArticle(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching article details:", error);
        setError(error.toString());
        setLoading(false);
      });
  }, [articleId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!article) return <div>Article not found.</div>;
  console.log("article", article)
  // Formatea la fecha utilizando moment
  const formattedDate = moment(article.created_at).format(
    "MM-DD-YYYY [at] HH:mm [EST]"
  );
  const summaryIndex =
    article.content.indexOf("Summary: -") + "Summary: -".length;
  // Obtener el resumen
  const summary = article.content.substring(summaryIndex);

  return (
    <div className="article-container">
      <div className="article-content">
        <img
          className="article-image"
          src={`https://sitesnewsposters.s3.us-east-2.amazonaws.com/${article.image}`}
          alt={article.title}
        />
        <div className="article-details">
          <h1>{article.title}</h1>
          <p className="published-date">Published on {formattedDate}</p>
          <p className="article-summary">{summary}</p>
        </div>
      </div>
      <aside className="more-news-aside">
        <MoreNews />
      </aside>
    </div>
  );
}

export default ArticleDetail;
