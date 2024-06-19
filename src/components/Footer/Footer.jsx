import "../Header/Header.scss";
import "./Footer.scss";

function Footer() {
  return (
    <>
      <div class="wrapper g-footer_bg">
        <div class="container-fluid">
          <div class="container">
            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
              <div class="f_cont">
                <h2>Contact</h2>
                <div class="add">
                  Gurdwara Brahm Bunga Sahib,
                  <br />
                  Dodra, Distt Mansa,
                  <br />
                  Punjab
                </div>
                <div class="call-us">
                  <i class="fa fa-phone-square"></i> +91 9914955098, +91
                  7307455098{" "}
                </div>
                <div class="email">
                  <i class="fa fa-envelope-square"></i>info@brahmbungadodra.org{" "}
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
              <div class="newsletter">
                <h2>ABOUT US</h2>
                <p>
                  <strong>
                    Waheguru Ji Ka Khalsa || Waheguru Ji Ki Fateh||
                  </strong>
                </p>

                <p>
                  This is the official website of{" "}
                  <a href="https://brahmbungadodra.org//aboutus">
                    Gurudwara Sahib Brahm Bunga, Dodra
                  </a>{" "}
                  &amp; will provide the latest information, regarding satsang
                  samagams organised by Gurudwara Brahm Bunga Sahib, Dodra and
                  local samagams organised by Dodra sangat.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="wrapper footer">
        <div class="container-fluid">
          <div class="container">
            <div class="footer">
              <p>© Brahm Bunga Trust, Dodra, All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );
}

export default Footer;
