import React from "react";
import ethereum from "../assets/ethereum.png";
import layer0 from "../assets/layer0.png";
import layer1 from "../assets/layer1.png";
import layer2 from "../assets/layer2.png";
import lsd from "../assets/lsd.png";
import xpayments from "../assets/xpayments.png";
import oracles from "../assets/oracles.png";
import ai from "../assets/ai.png";
import defi from "../assets/defi.png";


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
              <a href="https://eth-mkt-webiste.vercel.app">
                <img
                  src={ethereum}
                  className="otherwebsiteimg"
                  alt="Ethereum"
                />
                <p className="textCardMoreWebsites">Ethereum</p>
              </a>
            </li>
            <li className="website-li">
              <a href="https://layer0-mkt-website.vercel.app">
                <img src={layer0} className="otherwebsiteimg" alt="Layer 0" />
                <p className="textCardMoreWebsites"> Layer 0</p>
              </a>
            </li>
          </div>
          <div className="website-entire">
            <li className="website-li layer1div">
              <a href="https://layer1-mkt-webiste.vercel.app">
                <img src={layer1} className="layer1logo" alt="Layer 1 (LMC)" />
                <p className="textCardMoreWebsites">Layer 1</p>
              </a>
            </li>
          </div>
          <br></br>
          
          <div className="website-group">
            <li className="website-li">
              <a href="https://layer2-mkt-webiste.vercel.app">
                <img
                  src={layer2}
                  className="otherwebsiteimgp2"
                  alt="Ethereum"
                />
              </a>
            </li>
            <li className="website-li">
              <a href="https://lsd-mkt-webiste.vercel.app">
                <img src={lsd} className="otherwebsiteimgp2" alt="Layer 0" />
              </a>
            </li>
          </div>
          <div className="website-group">
            <li className="website-li">
              <a href="https://eth-mkt-webiste.vercel.app">
                <img
                  src={xpayments}
                  className="otherwebsiteimgp2"
                  alt="Ethereum"
                />
              </a>
            </li>
            <li className="website-li">
              <a href="https://oracle-met-website.vercel.app/">
                <img src={oracles} className="otherwebsiteimgp2" alt="Layer 0" />
              </a>
            </li>
          </div>
          <div className="website-group">
            <li className="website-li">
              <a href="https://defi-mkt-website.vercel.app/">
                <img
                  src={defi}
                  className="otherwebsiteimgp2"
                  alt="Ethereum"
                />
              </a>
            </li>
            <li className="website-li">
              <a href="https://ai-mkt-website.vercel.app">
                <img src={ai} className="otherwebsiteimgp2" alt="Layer 0" />
              </a>
            </li>
          </div>
        </ul>
      </div>
    </>
  );
}

export default MoreNews;
