import './About.css';

export default function About() {
  return (
    <section id="about" className="about section">
      <div className="container about__grid">
        <div className="about__visual">
          <div className="about__image-frame">
            <div className="about__image-placeholder">
              <span>K</span>
            </div>
            <div className="about__image-accent" />
          </div>
        </div>

        <div className="about__content">
          <span className="section-label">Meet Kristin</span>
          <h2 className="section-title">Your esthetician,<br />your glow partner</h2>
          <p className="about__text">
            Hi, I'm Kristin — the face behind GoodSkinGal. I believe great skin
            starts with listening: to your concerns, your routine, and what makes
            you feel confident in your own skin.
          </p>
          <p className="about__text">
            My approach is minimal, effective, and always personalized. No hype,
            no overwhelm — just honest care, gentle hands, and treatments that
            actually work for <em>your</em> skin.
          </p>
          <blockquote className="about__quote">
            "Skincare should feel good — on your skin and in your soul."
          </blockquote>
          <div className="about__highlights">
            <div className="about__highlight">
              <strong>Personalized</strong>
              <span>Every facial tailored to you</span>
            </div>
            <div className="about__highlight">
              <strong>Educational</strong>
              <span>Leave knowing your skin better</span>
            </div>
            <div className="about__highlight">
              <strong>Welcoming</strong>
              <span>A calm space to relax &amp; renew</span>
            </div>
          </div>
          <a
            href="https://instagram.com/goodskingal"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary about__instagram"
          >
            Follow @goodskingal
          </a>
        </div>
      </div>
    </section>
  );
}
