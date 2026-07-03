import { useState } from 'react';
import { BOOKING_ENABLED, getBookingLinkProps } from '../config';
import './Contact.css';

const INITIAL = {
  name: '',
  email: '',
  phone: '',
  service: '',
  message: '',
};

export default function Contact() {
  const [form, setForm] = useState(INITIAL);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setForm(INITIAL);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="contact" className="contact section">
      <div className="container contact__grid">
        <div className="contact__info">
          <span className="section-label">Contact</span>
          <h2 className="section-title">Let's connect</h2>
          <p className="contact__text">
            Ready to book or have a question? Reach out — Kristin would love to
            hear from you.
          </p>

          <div className="contact__details">
            <a
              href="https://instagram.com/goodskingal"
              target="_blank"
              rel="noopener noreferrer"
              className="contact__link"
            >
              <span className="contact__link-icon">◉</span>
              <div>
                <strong>Instagram</strong>
                <span>@goodskingal</span>
              </div>
            </a>

            <a href="mailto:yourgoodskingal@gmail.com" className="contact__link">
              <span className="contact__link-icon">✉</span>
              <div>
                <strong>Email</strong>
                <span>yourgoodskingal@gmail.com</span>
              </div>
            </a>

            {BOOKING_ENABLED ? (
              <a {...getBookingLinkProps()} className="contact__link">
                <span className="contact__link-icon">◎</span>
                <div>
                  <strong>Online Booking</strong>
                  <span>Book an appointment instantly →</span>
                </div>
              </a>
            ) : (
              <div className="contact__link">
                <span className="contact__link-icon">◎</span>
                <div>
                  <strong>Online Booking</strong>
                  <span>Coming soon — use the form for now</span>
                </div>
              </div>
            )}
          </div>

          <div className="contact__book-banner">
            <p>New clients welcome!</p>
            <a href="#forms" className="btn btn-ghost">Complete your forms first →</a>
          </div>
        </div>

        <form className="contact__form" onSubmit={handleSubmit}>
          <div className="contact__field">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="contact__row">
            <div className="contact__field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="contact__field">
              <label htmlFor="contactPhone">Phone</label>
              <input
                id="contactPhone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="contact__field">
            <label htmlFor="service">Interested In</label>
            <select
              id="service"
              name="service"
              value={form.service}
              onChange={handleChange}
            >
              <option value="">Select a service...</option>
              <option value="facial">Custom Facial</option>
              <option value="consultation">Skin Consultation</option>
              <option value="other">Other / Question</option>
            </select>
          </div>

          <div className="contact__field">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={form.message}
              onChange={handleChange}
              placeholder="Tell us about your skin goals or preferred dates..."
              required
            />
          </div>

          <button type="submit" className="btn btn-primary contact__submit">
            Send Message
          </button>

          {submitted && (
            <p className="contact__success" role="status">
              Message sent! Kristin will get back to you soon.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
