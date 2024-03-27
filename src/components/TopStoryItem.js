import React, { useState, useEffect } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faClock } from "@fortawesome/free-solid-svg-icons";
import config from "../../src/config";

function TopStoryItem() {
  const [topStory, setTopStory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLatestNews();
  }, []);

  const fetchLatestNews = () => {
    setLoading(true);
    fetch(`https://aialpha.ngrok.io/api/get/latest_news?coin_bot_id=1&limit=1`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch the latest news");
        }
        return response.json();
      })
      .then((data) => {
        setTopStory(data.articles[0]);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching the latest news:", error);
        setLoading(false);
      });
  };

  return (
    <div>
      {topStory && (
        <Link
          to={`/article/${topStory.article_id}`}
          style={{
            textDecoration: "none",
            color: "black",
            fontWeight: "bold",
            fontSize: "20px",
          }}
        >
          <div
            className="topStory-image"
            style={{
              backgroundImage: topStory
                ? `url(https://mktnewsposters.s3.us-east-2.amazonaws.com/${topStory.article_id}.jpg)`
                : "",
            }}
          >
            {loading ? (
              <p>Loading top story...</p>
            ) : (
              <div className="topStory-details">
                <p className="topStory-description">
                  <FontAwesomeIcon
                    icon={faCalendarAlt}
                    style={{ marginRight: "5px", opacity: 0.5 }}
                  />
                  Published {moment(topStory.created_at).format("MM-DD-YYYY")}{" "}
                  <FontAwesomeIcon
                    icon={faClock}
                    style={{ marginRight: "5px", opacity: 0.5 }}
                  />
                  {moment(topStory.created_at).format("HH:mm [EST]")}
                </p>
                <h2 className="topStory-title">{topStory.title}</h2>
                <p className="topStory-description">{topStory.description}</p>
              </div>
            )}
          </div>
        </Link>
      )}
    </div>
  );
  
}

export default TopStoryItem;
