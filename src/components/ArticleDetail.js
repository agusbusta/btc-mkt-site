import React, { useState, useEffect } from 'react';
import config from "../config";
import moment from 'moment'; 
import { useParams } from 'react-router-dom';
import MoreNews from "./MoreNews";

function ArticleDetail() {
    const { articleId } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
  
    useEffect(() => {
      fetch(`https://aialpha.ngrok.io/api/get/article?article_id=${articleId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch article details');
          }
          return response.json();
        })
        .then((data) => {
          setArticle(data.article);
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

    // Formatea la fecha utilizando moment
    const formattedDate = moment(article.created_at).format('MM-DD-YYYY [at] HH:mm [EST]');
    const summaryIndex = article.summary.indexOf('Summary: -') + 'Summary: -'.length;
    // Obtener el resumen
    const summary = article.summary.substring(summaryIndex);
    
    return (
      <div style={{ display: 'flex', marginRight: '2%' }}>
        <div style={{ flex: '0 0 70%', marginRight: '2%' }}>
        <img style={{ width: '100%', height: '400px' }} src={`https://apparticleimages.s3.us-east-2.amazonaws.com/${article.article_id}.jpg`} />
          <h1>{article.title}</h1>
          <p style={{ fontWeight: '150' }}>Published on {formattedDate}</p>
          <p>{summary}</p>
        </div>
        <div style={{ flex: '0 0 30%' , marginTop: '-20px'}}>
          <MoreNews />
        </div>
      </div>
    );
  }
  
export default ArticleDetail;



