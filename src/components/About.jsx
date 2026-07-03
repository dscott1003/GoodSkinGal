import './About.css';
import kristinPhoto from '../assets/kristin.jpg';

export default function About() {
  return (
    <section id="about" className="about section">
      <div className="container about__grid">
        <div className="about__visual">
          <div className="about__image-frame">
            <img
              src={kristinPhoto}
              alt="Kristin Scott, licensed esthetician and founder of GoodSkinGal"
              className="about__image"
              loading="lazy"
            />
            <div className="about__image-accent" />
          </div>
        </div>

        <div className="about__content">
          <span className="section-label">Meet Kristin</span>
          <h2 className="section-title">Your esthetician,<br />your glow partner</h2>
          <p className="about__text">
            Hi there — I'm <strong>Kristin Scott</strong>, the heart behind
            GoodSkinGal. I've spent <em>over 19 years</em> in the skincare world,
            a path that began with my own struggle with acne. I enrolled in
            esthetics school simply to understand my skin, and somewhere along the
            way that curiosity blossomed into a lifelong passion.
          </p>
          <p className="about__text">
            I love working with my hands, building genuine relationships, and
            crafting the ultimate in-studio experience paired with an at-home
            routine that actually fits your life. I'm endlessly fascinated by the
            science — the evolving technologies for treating different skin
            concerns, and the small lifestyle shifts that help your body, and your
            skin, function beautifully.
          </p>
          <blockquote className="about__quote">
            "Great skin starts with listening — to your concerns, your routine,
            and what makes you feel like you."
          </blockquote>
          <p className="about__text">
            When I'm not in the studio, you'll find me dreaming up home
            renovation projects that are gloriously above my skill level — then
            recruiting my husband, <em>Dan</em>, to bring them to life. We call
            Nolensville home, along with our three amazing kiddos: Eliza (15),
            Louisa (12), and Hunter (almost 4).
          </p>
          <div className="about__highlights">
            <div className="about__highlight">
              <strong>Experienced</strong>
              <span>19+ years caring for skin</span>
            </div>
            <div className="about__highlight">
              <strong>Educational</strong>
              <span>Leave knowing your skin better</span>
            </div>
            <div className="about__highlight">
              <strong>Personal</strong>
              <span>Real relationships, real results</span>
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
