import React, { useState, useEffect } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faClock } from "@fortawesome/free-solid-svg-icons";
import config from "../../src/config";

function TopStoryItem({ coinIds }) {
  const [topStories, setTopStories] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); // Estado para mantener el índice de la historia actualmente visible
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false); // Nuevo estado para controlar si las historias principales ya han sido cargadas

  useEffect(() => {
    if (!loaded) {
      setLoading(true);
      const fetchTopStories = async () => {
        const fetchedTopStories = [];
        for (const coinId of coinIds) {
          try {
            const response = await fetch(
              `https://newsbotv2.ngrok.io/get_articles?bot_id=${coinId}&limit=1`
            );
            if (!response.ok) {
              throw new Error("Failed to fetch top stories");
            }
            const data = await response.json();
            fetchedTopStories.push(data.data[0]);
          } catch (error) {
            console.error("Error fetching top stories:", error);
          }
        }
        setTopStories(fetchedTopStories);
        setLoading(false);
        setLoaded(true);
      };

      fetchTopStories();
    }
  }, [coinIds, loaded]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % topStories.length); // Cambiar al siguiente índice de forma circular
    }, 5000); // Cambiar cada 5 segundos (ajusta este valor según tus necesidades)

    return () => clearInterval(interval);
  }, [topStories]);

  return (
    <div>
      {loading ? (
        <p>Loading top stories...</p>
      ) : (
        <div>
          {/* Renderizar solo la historia principal actualmente visible */}
          {topStories.length > 0 && (
            <Link
              to={`/article/${topStories[currentIndex].id}`}
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
                  backgroundImage: topStories[currentIndex]
                    ? `url(https://sitesnewsposters.s3.us-east-2.amazonaws.com/${topStories[currentIndex].image})`
                    : "",
                }}
              >
                <div className="topStory-details">
                  <p className="topStory-description">
                    <FontAwesomeIcon
                      icon={faCalendarAlt}
                      style={{ marginRight: "5px", opacity: 0.5 }}
                    />
                    Published{" "}
                    {moment(topStories[currentIndex].created_at).format(
                      "MM-DD-YYYY"
                    )}{" "}
                    <FontAwesomeIcon
                      icon={faClock}
                      style={{ marginRight: "5px", opacity: 0.5 }}
                    />
                    {moment(topStories[currentIndex].created_at).format(
                      "HH:mm [EST]"
                    )}
                  </p>
                  <h2 className="topStory-title">
                    {topStories[currentIndex].title}
                  </h2>
                  <p className="topStory-description">
                    {topStories[currentIndex].description}
                  </p>
                </div>
              </div>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

export default TopStoryItem;
