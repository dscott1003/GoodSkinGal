import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <a href="#home" className="footer__logo">
            GoodSkin<span>Gal</span>
          </a>
          <p className="footer__tagline">
            Personalized esthetics by Kristin — minimal, elegant, and always about you.
          </p>
        </div>

        <div className="footer__links">
          <div className="footer__col">
            <h4>Explore</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#gallery">Gallery</a></li>
              <li><a href="#forms">Forms</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer__col">
            <h4>Connect</h4>
            <ul>
              <li>
                <a
                  href="https://instagram.com/goodskingal"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </li>
              <li><a href="#contact">Book a Visit</a></li>
              <li><a href="#forms">Client Forms</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>&copy; {year} GoodSkinGal. All rights reserved.</p>
          <p className="footer__made">Built with care ✦</p>
        </div>
      </div>
    </footer>
  );
}
