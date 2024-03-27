import React from "react";
import "../App.css";
import moment from "moment";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faClock } from "@fortawesome/free-solid-svg-icons";

function NewsItem({ title, description, publishedTime, articleId }) {
  return (
    <>
      <div className="newsRestContainer" id="uniqueTitleId">
        <div className="contentNews" id="uniqueTitleId">
          <Link id="uniqueTitleId" to={`/article/${articleId}`}>
            <p
              className="publishedTime"
              style={{ textDecoration: "none", color: "black" }}
            >
              <span style={{ opacity: 0.5 }}>
                <FontAwesomeIcon icon={faCalendarAlt} />
              </span>
              ‎ Published {moment(publishedTime).format("MM-DD-YYYY")}
              &nbsp;&nbsp;
              <span style={{ opacity: 0.5 }}>
                <FontAwesomeIcon icon={faClock} />‎ ‎ 
              </span>‎ 
              {moment(publishedTime).format("HH:mm [EST]")}
            </p>{" "}
            <h2
              className="newsRestTitle"
              id="uniqueTitleId"
              style={{ color: "black" }}
            >
              {title}
            </h2>
          </Link>
        </div>
        <img
          src={`https://mktnewsposters.s3.us-east-2.amazonaws.com/${articleId}.jpg`}
          alt="News"
          className="image"
        />
      </div>
      <hr />
    </>
  );
}

export default NewsItem;
