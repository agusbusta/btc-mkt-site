import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from "react-router-dom";
import Header from "./components/Header";
import NewsSection from "./components/NewsSection";
import Aside from "./components/Aside";
import "./App.css";
import Footer from "./components/Footer";
import ArticleDetail from "./components/ArticleDetail";
import TopStoryItem from "./components/TopStoryItem";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/1" />} />
            <Route path="/:coinId" element={<MainContent />} />
            <Route path="/article/:articleId" element={<ArticleDetail />} /> 
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

function MainContent() {
  const { coinId } = useParams();
  const [additionalNews, setAdditionalNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const coinIds = coinId ? coinId.split(',') : [];

  useEffect(() => {
    if (coinIds.length > 0) {
      fetchNews(coinIds);
    }
  }, [coinId]); // Solo se ejecuta cuando coinId cambia

  const fetchNews = async (coinIds) => {
    setLoading(true);
    try {
      const fetchPromises = coinIds.map(id => 
        fetch(`https://newsbotv2.ngrok.io/get_articles?bot_id=${id}&limit=17`)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to fetch additional news");
            }
            return response.json();
          })
          .then((data) => data.articles)
      );

      const articlesArray = await Promise.all(fetchPromises);
      const allArticles = articlesArray.flat();
      setAdditionalNews(allArticles);
    } catch (error) {
      console.error("Error fetching additional news:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="news-sections">
        <h2>Top Stories</h2>
        <hr />
        <TopStoryItem coinIds={coinIds} /> {/* Pasar coinIds en lugar de coinId */}
        {loading ? (
          <div className="dots-loader">
            <div></div>
            <div></div>
            <div></div>
          </div>
        ) : (
          <NewsSection
            sectionTitle="Additional News"
            news={additionalNews.slice(3)}
            coinIds={coinIds}
          />
        )}
      </section>
      <Aside coinIds={coinIds} />
    </>
  );
}

export default App;
