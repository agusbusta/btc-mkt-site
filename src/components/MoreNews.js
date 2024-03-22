import React from "react";
import ethereum from "../assets/ethereum.png";
import layer0 from "../assets/layer0.png";
import layer1 from "../assets/layer1.png";

function MoreNews() {
  return (
    <>
      <br />
      <div className="aside-content">
        <h2>More News</h2>
        <hr />
        <br />
        <ul className="website-list">
          <div className="website-group">
            <li className="website-li">
              <a href="#">
                <img
                  src={ethereum}
                  className="otherwebsiteimg"
                  alt="Ethereum"
                />
                <p className="textCardMoreWebsites">Ethereum</p>
              </a>
            </li>
            <li className="website-li">
              <a href="#">
                <img src={layer0} className="otherwebsiteimg" alt="Layer 0" />
                <p className="textCardMoreWebsites"> Layer 0</p>
              </a>
            </li>
          </div>
          <div className="website-entire">
            <li className="website-li layer1div">
              <a href="#">
                <img src={layer1} className="layer1logo" alt="Layer 1 (LMC)" />
                <p className="textCardMoreWebsites">Layer 1</p>
              </a>
            </li>
          </div>
        </ul>
      </div>
    </>
  );
}

export default MoreNews;
