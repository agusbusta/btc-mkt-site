import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
  const [additionalNews, setAdditionalNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const coinId = window.location.pathname.split('/')[1];
  const coinIds = coinId.length > 1 ? coinId.split(',') : [coinId]; 

  useEffect(() => {
    fetchNews(coinIds);
  }, [coinIds]);

  const fetchNews = (coinIds) => {
    const formattedCoinIds = coinIds.join(','); 
    fetch(`https://aialpha.ngrok.io/api/get/latest_news?coin_bot_id=${formattedCoinIds}&limit=17`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch additional news");
        }
        return response.json();
      })
      .then((data) => {
        setAdditionalNews(data.articles);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching additional news:", error);
        setLoading(false);
      });
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
