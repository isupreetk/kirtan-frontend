import "./Header.scss";
import HomeIcon from "../../assets/images/home-icon.png";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <div className="wrapper top_head">
        <div className="container-fluid">
          <div className="container">
            <Link to="https://brahmbungadodra.org/home">
              <img
                className="sm_icon"
                src={HomeIcon}
                alt="redirect to homepage"
              />
            </Link>

            <div className="col-lg-11 col-md-11 col-sm-11 col-xs-12 main_quote">
              <div className="top_l">
                <b>ੴ ਸਤਿਗੁਰ ਪ੍ਰਸਾਦਿ</b>
                <br />
                ਕਲਜੁਗ ਮਹਿ ਕੀਰਤਨੁ ਪਰਧਾਨਾ॥ ਗੁਰਮੁਖਿ ਜਪੀਐ ਲਾਇ ਧਿਆਨਾ॥
                </div>
            </div>
          </div>
        </div>
      </div>
      <div className="wrapper">
        <div className="col-md-12">
          <div className="row">
            <div className="sm_menu">
              <ul>
                <li>
                  <a href="https://brahmbungadodra.org/home">
                    <i className="fa fa-home"></i>
                  </a>
                </li>
                <li>
                  <a href="https://brahmbungadodra.org/">ABOUT US</a>
                  <ul className="sub_m">
                    <li>
                      <a href="https://brahmbungadodra.org/aboutus">
                        Introduction
                      </a>
                    </li>
                    <li>
                      <a href="https://brahmbungadodra.org/amrit-sanchar">
                        Amrit Sanchar
                      </a>
                    </li>
                  </ul>
                  <span className="arrow"></span>
                </li>
                <li>
                  <a href="https://brahmbungadodra.org/">GURMAT SAMAGAMS</a>
                  <ul className="sub_m">
                    <li>
                      <a href="https://brahmbungadodra.org/dodrasamagam">
                        Dodra/Doraha SAMAGAMS
                      </a>
                    </li>
                    <li>
                      <a href="https://brahmbungadodra.org/fortnightsamagam">
                        FORTNIGHT SAMAGAMS
                      </a>
                    </li>
                    <li>
                      <a href="https://brahmbungadodra.org/citywisesamagam">
                        CITY WISE WEEKLY SAMAGAMS
                      </a>
                    </li>
                    <li>
                      <a href="https://brahmbungadodra.org/internationalwisesamagam">
                        WORLDWIDE SAMAGAMS
                      </a>
                    </li>
                  </ul>
                  <span className="arrow"></span>
                </li>
                <li>
                  <a href="https://brahmbungadodra.org/">GURBANI VICHAR</a>
                  <ul className="sub_m">
                    <li>
                      <a href="https://brahmbungadodra.org/gurbanivichar?lan=PUNJABI">
                        PUNJABI
                      </a>
                    </li>
                    <li>
                      <a href="https://brahmbungadodra.org/gurbanivichar?lan=HINDI">
                        HINDI (TRANSLATION)
                      </a>
                    </li>
                    <li>
                      <a href="https://brahmbungadodra.org/gurbanivichar?lan=ENGLISH">
                        ENGLISH (TRANSLATION)
                      </a>
                    </li>
                    <li>
                      <a href="https://brahmbungadodra.org/gurbanivichar?lan=SPIRITUALWRITINGS">
                        SPIRITUAL WRITINGS (ENGLISH)
                      </a>
                    </li>
                  </ul>
                  <span className="arrow"></span>
                </li>
                <li>
                  <a href="https://brahmbungadodra.org/">KHOJI</a>
                  <ul className="sub_m">
                    <li>
                      <a href="https://brahmbungadodra.org/otherguidance">
                        OTHER GUIDANCE
                      </a>
                    </li>
                    <li>
                      <a href="https://brahmbungadodra.org/spiritualtalks">
                        Spiritual Talks
                      </a>
                    </li>
                    <li>
                      <a href="https://brahmbungadodra.org/about-khoji">
                        About Khoji
                      </a>
                    </li>
                    <li>
                      <a href="https://brahmbungadodra.org/kirtan?artstid=586&amp;albumid=209">
                        Mataji
                      </a>
                    </li>
                  </ul>
                  <span className="arrow"></span>
                </li>
                <li>
                  <a href="https://brahmbungadodra.org/">DOWNLOAD</a>
                  <ul className="sub_m">
                    <li>
                      <a href="https://brahmbungadodra.org/naamsimran">
                        NAAM SIMRAN
                      </a>
                    </li>
                    <li>
                      <a href="https://brahmbungadodra.org/nitnem">NITNEM</a>
                    </li>
                    <li>
                      <a href="https://brahmbungadodra.org/kirtansearch">
                        NEW KIRTAN SEARCH
                      </a>
                    </li>
                  </ul>
                  <span className="arrow"></span>
                </li>
                <li>
                  <a href="https://brahmbungadodra.org/imagegallery">
                    IMAGE GALLERY
                  </a>
                </li>
                <li>
                  <a href="https://brahmbungadodra.org/faq">FAQ</a>
                </li>
                <li>
                  <a href="https://brahmbungadodra.org/">REACH US</a>
                  <ul className="sub_m">
                    <li>
                      <a href="https://brahmbungadodra.org/contactus">
                        CONTACT US
                      </a>
                    </li>
                    <li>
                      <a
                        href="#myModal"
                        data-toggle="modal"
                        data-target="#myModal"
                      >
                        Daswandh
                      </a>
                    </li>
                  </ul>
                  <span className="arrow"></span>
                </li>
              </ul>{" "}
            </div>

            <div className="logo_div">
              <div className="pull-left">
                <h1 className="heading-top">ਧੰਨ ਗੁਰੂ ਨਾਨਕ</h1>
                <h1 className="heading-top">ਵਾਹਿਗੁਰੂ</h1>
              </div>
              <div className="pull-right">
                <h1 className="heading-top">ਧੰਨ ਗੁਰੂ ਨਾਨਕ</h1>
                <h1 className="heading-top">ਵਾਹਿਗੁਰੂ</h1>
              </div>

              <div className="logo_bg">
                <div className="logo">
                  <div className="img-container"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
