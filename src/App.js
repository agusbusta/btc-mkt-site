import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import NewsSection from "./components/NewsSection";
import Aside from "./components/Aside";
import "./App.css";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ArticleDetail from "./components/ArticleDetail";
import TopStoryItem from "./components/TopStoryItem";
import config from "./config";

function App() {
  const [additionalNews, setAdditionalNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch additional news from the API endpoint
    fetchNews();
  }, []);

  const fetchNews = () => {
    // Fetch additional news from the API endpoint
    
    fetch(`https://aialpha.ngrok.io/api/get/latest_news?coin_bot_id=1&limit=17`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch additional news");
        }
        return response.json();
      })
      .then((data) => {
        // Set the additional news
        setAdditionalNews(data.articles);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching additional news:", error);
        setLoading(false);
      });
  };

  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <section className="news-sections">
                    <h2>Top Stories</h2>
                    <hr />
                    <TopStoryItem />
                   
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
                      />
                    )}
                  </section>
                  <Aside />
                </>
              }
            />
            <Route path="/article/:articleId" element={<ArticleDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;