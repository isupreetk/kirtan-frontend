import "./Header.scss";
// import FaceBookIcon from "../../assets/icons/icon-facebook.png";

function Header() {
  return (
    <>
      <div className="header">
        <div>|||</div>
        <div className="header__headline">
          <p>ੴ ਸਤਿਗੁਰ ਪ੍ਰਸਾਦਿ</p>
          <p>ਕਲਜੁਗ ਮਹਿ ਕੀਰਤਨੁ ਪਰਧਾਨਾ॥ ਗੁਰਮੁਖਿ ਜਪੀਐ ਲਾਇ ਧਿਆਨਾ॥</p>
        </div>
        <div className="header__social-link">
          {/* <a href="//www.facebook.com/brahmbungadodra.org/"><img src={FaceBookIcon} className="header__social-icon"/></a> */}
        </div>
      </div>

      {/* <div>Brahm Bunga Dodra Kirtan Page</div> */}
    </>
  );
}

export default Header;
