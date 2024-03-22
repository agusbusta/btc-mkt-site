import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faClock } from "@fortawesome/free-solid-svg-icons";

function NewsItemXs({ title, publishedTime, articleId }) {
  const formattedDate = moment(publishedTime).format("MM-DD-YYYY");

  return (
    <>
      <div className="news-item">
        <div className="news-item-xs">
          <p style={{ fontWeight: "150" }}>
            <FontAwesomeIcon
              icon={faCalendarAlt}
              style={{ marginRight: "5px", opacity: "0.5" }}
            />
            Published on {formattedDate} &nbsp;&nbsp;
            <FontAwesomeIcon
              icon={faClock}
              style={{ marginRight: "5px", opacity: "0.5" }}
            />
            {moment(publishedTime).format("HH:mm [EST]")}
          </p>
          <Link
            to={`/article/${articleId}`}
            style={{
              textDecoration: "none",
              color: "black",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            {title}
          </Link>
        </div>
      </div>
      <hr></hr>
    </>
  );
}

export default NewsItemXs;
