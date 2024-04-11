import React from "react";
import ethereum from "../assets/ethereum.png";
import bitcoin from "../assets/bitcoin.png";
import layer0 from "../assets/layer0.png";
import layer1 from "../assets/layer1.png";
import layer2 from "../assets/layer2.png";
import lsd from "../assets/lsd.png";
import xpayments from "../assets/xpayments.png";
import oracles from "../assets/oracles.png";
import ai from "../assets/ai.png";
import defi from "../assets/defi.png";
import ad2 from "../assets/Ads-02.jpg";

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
              <a href="https://www.allcryptonews.co/2">
                <img
                  src={ethereum}
                  className="otherwebsiteimg"
                  alt="Ethereum"
                />
                <p className="textCardMoreWebsites">Ethereum</p>
              </a>
            </li>
            <li className="website-li">
              <a href="https://www.allcryptonews.co/1">
                <img src={bitcoin} className="otherwebsiteimg" alt="Bitcoin" />
                <p className="textCardMoreWebsites"> Bitcoin</p>
              </a>
            </li>
          </div>
          <div className="ad2container">
            <img src={ad2} className="ad2" />
          </div>
          <div className="website-entire">
            <li className="website-li layer0div">
              <a href="https://www.allcryptonews.co/7,8,9">
                <img src={layer0} className="layer0logo" alt="Layer 1 (LMC)" />
                <p className="textCardMoreWebsites l0">Layer 0</p>
              </a>
            </li>
          </div>
          <br></br>
          <div className="website-entire">
            <li className="website-li layer1div">
              <a href="https://www.allcryptonews.co/10,11,12,13,14,15">
                <img src={layer1} className="layer1logo" alt="Layer 1 (LMC)" />
                <p className="textCardMoreWebsites">Layer 1</p>
              </a>
            </li>
          </div>
          <br></br>

          <div className="website-group">
            <li className="website-li">
              <a href="https://www.allcryptonews.co/17,18,37">
                <img
                  src={layer2}
                  className="otherwebsiteimgp2"
                  alt="Ethereum"
                />
              </a>
            </li>
            <li className="website-li">
              <a href="https://www.allcryptonews.co/4,5,6">
                <img src={lsd} className="otherwebsiteimgp2" alt="Layer 0" />
              </a>
            </li>
          </div>
          <div className="website-group">
            <li className="website-li">
              <a href="https://www.allcryptonews.co/22,23,24">
                <img
                  src={xpayments}
                  className="otherwebsiteimgp2"
                  alt="Ethereum"
                />
              </a>
            </li>
            <li className="website-li">
              <a href="https://www.allcryptonews.co/19,20,21">
                <img
                  src={oracles}
                  className="otherwebsiteimgp2"
                  alt="Layer 0"
                />
              </a>
            </li>
          </div>
          <div className="website-group">
            <li className="website-li">
              <a href="https://www.allcryptonews.co/25,26,27,28,29,30,31,32,33">
                <img src={defi} className="otherwebsiteimgp2" alt="Ethereum" />
              </a>
            </li>
            <li className="website-li">
              <a href="https://www.allcryptonews.co/34,35,36">
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
