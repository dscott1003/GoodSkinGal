import './Services.css';

const SERVICES = [
  {
    title: 'Custom Facials',
    description: 'Tailored treatments designed for your unique skin — cleansing, exfoliation, and deep nourishment.',
    icon: '✧',
  },
  {
    title: 'Skin Consultations',
    description: 'One-on-one guidance to build a routine that works for your lifestyle, goals, and budget.',
    icon: '◈',
  },
  {
    title: 'Relaxation & Renewal',
    description: 'A calm, beautiful experience where you can unwind while your skin gets the care it deserves.',
    icon: '❋',
  },
  {
    title: 'Coming Soon: Shop',
    description: 'Curated skincare products hand-picked by Kristin — your favorites, delivered to your door.',
    icon: '◇',
    comingSoon: true,
  },
];

export default function Services() {
  return (
    <section className="services section">
      <div className="container">
        <span className="section-label">What We Offer</span>
        <h2 className="section-title">Care that feels as good as it looks</h2>
        <p className="section-subtitle">
          Inspired by the best in modern esthetics — proof over promises,
          personalized over one-size-fits-all.
        </p>

        <div className="services__grid">
          {SERVICES.map((service) => (
            <article
              key={service.title}
              className={`services__card ${service.comingSoon ? 'services__card--soon' : ''}`}
            >
              <span className="services__icon">{service.icon}</span>
              <h3 className="services__title">{service.title}</h3>
              <p className="services__desc">{service.description}</p>
              {service.comingSoon && (
                <span className="services__badge">Coming Soon</span>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
