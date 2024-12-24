import "./Shimmer.scss";
import { Row } from "react-bootstrap";

function Shimmer() {
  return (
    <section className="shimmer-kirtan-list__container">
          <Row>
            <div className="shimmer-kirtan-list-item">
              <div className="shimmer-kirtan-list-item__wrapper">
                <div className="shimmer-kirtan-list-item__container1">
                  <div className="shimmer-kirtan-list-item__avatar"></div>
                </div>
                <div className="shimmer-kirtan-list-item__container2">
                  <p className="shimmer-kirtan-list-item__title"></p>
                  <p className="shimmer-kirtan-list-item__details">
                    <span className="shimmer-kirtan-list-item__details-span"></span>
                    <span className="shimmer-kirtan-list-item__details-span"></span>
                  </p>
                </div>
              </div>
              <div className="kirtan-list-item__container3">
                  <p className="shimmer-button"></p>
                  <p className="shimmer-button"></p>
              </div>
            </div>
          </Row>
    </section>
  );
}

export default Shimmer;
