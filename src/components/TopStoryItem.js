import React, { useState, useEffect } from "react";
import moment from "moment";
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
    fetch(`${config.BASE_URL}/api/get/latest_news?coin_bot_id=1&limit=1`)
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
    <div
      className="topStory-item"
      style={{
        backgroundImage: topStory
          ? `url(https://apparticleimages.s3.us-east-2.amazonaws.com/${topStory.article_id}.jpg)`
          : "",
      }}
    >
      {loading ? (
        <p>Loading top story...</p>
      ) : topStory ? (
        <div className="topStory-details">
          <p className="topStory-description">
            <FontAwesomeIcon
              icon={faCalendarAlt}
              style={{ marginRight: "5px", opacity: 0.5 }}
            />
            Published{" "}
            {moment(topStory.created_at).format("MM-DD-YYYY")} <FontAwesomeIcon
              icon={faClock}
              style={{ marginRight: "5px", opacity: 0.5 }}
            />
            {moment(topStory.created_at).format("HH:mm [EST]")}
          </p>
          <h2 className="topStory-title">{topStory.title}</h2>
          <p className="topStory-description">{topStory.description}</p>
        </div>
      ) : (
        <p>No top story available</p>
      )}
    </div>
  );
}

export default TopStoryItem;
