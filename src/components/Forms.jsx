import { useState } from 'react';
import emailjs from '@emailjs/browser';
import {
  EMAILJS_PUBLIC_KEY,
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATES,
  isEmailConfigured,
} from '../emailConfig';
import './Forms.css';

const INITIAL_INTAKE = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  skinType: '',
  concerns: '',
  allergies: '',
  medications: '',
};

const INITIAL_WAIVER = {
  fullName: '',
  email: '',
  date: '',
  agreed: false,
  signature: '',
};

export default function Forms() {
  const [activeTab, setActiveTab] = useState('intake');
  const [intake, setIntake] = useState(INITIAL_INTAKE);
  const [waiver, setWaiver] = useState(INITIAL_WAIVER);
  const [submitted, setSubmitted] = useState(null);
  const [sending, setSending] = useState(null); // 'intake' | 'waiver' | null
  const [error, setError] = useState(null); // 'intake' | 'waiver' | null

  const handleIntakeChange = (e) => {
    const { name, value } = e.target;
    setIntake((prev) => ({ ...prev, [name]: value }));
  };

  const handleWaiverChange = (e) => {
    const { name, value, type, checked } = e.target;
    setWaiver((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const sendForm = async (templateKey, payload) => {
    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATES[templateKey],
      payload,
      { publicKey: EMAILJS_PUBLIC_KEY },
    );
  };

  const handleIntakeSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!isEmailConfigured('intake')) {
      setSubmitted('intake');
      setIntake(INITIAL_INTAKE);
      setTimeout(() => setSubmitted(null), 5000);
      return;
    }

    setSending('intake');
    try {
      await sendForm('intake', { ...intake });
      setSubmitted('intake');
      setIntake(INITIAL_INTAKE);
      setTimeout(() => setSubmitted(null), 6000);
    } catch (err) {
      console.error('Intake form send failed:', err);
      setError('intake');
    } finally {
      setSending(null);
    }
  };

  const handleWaiverSubmit = async (e) => {
    e.preventDefault();
    if (!waiver.agreed) return;
    setError(null);

    if (!isEmailConfigured('waiver')) {
      setSubmitted('waiver');
      setWaiver(INITIAL_WAIVER);
      setTimeout(() => setSubmitted(null), 5000);
      return;
    }

    setSending('waiver');
    try {
      await sendForm('waiver', {
        ...waiver,
        agreed: waiver.agreed ? 'Yes' : 'No',
      });
      setSubmitted('waiver');
      setWaiver(INITIAL_WAIVER);
      setTimeout(() => setSubmitted(null), 6000);
    } catch (err) {
      console.error('Waiver form send failed:', err);
      setError('waiver');
    } finally {
      setSending(null);
    }
  };

  return (
    <section id="forms" className="forms section">
      <div className="container">
        <span className="section-label">Client Forms</span>
        <h2 className="section-title">Get started before your visit</h2>
        <p className="section-subtitle">
          Complete your intake form and waiver online — save time at your
          appointment and help Kristin personalize your care.
        </p>

        <div className="forms__wrapper">
          <div className="forms__tabs">
            <button
              className={`forms__tab ${activeTab === 'intake' ? 'forms__tab--active' : ''}`}
              onClick={() => setActiveTab('intake')}
            >
              Client Intake
            </button>
            <button
              className={`forms__tab ${activeTab === 'waiver' ? 'forms__tab--active' : ''}`}
              onClick={() => setActiveTab('waiver')}
            >
              Consent &amp; Waiver
            </button>
          </div>

          {activeTab === 'intake' && (
            <form className="forms__form" onSubmit={handleIntakeSubmit}>
              <div className="forms__row">
                <div className="forms__field">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    id="firstName"
                    name="firstName"
                    value={intake.firstName}
                    onChange={handleIntakeChange}
                    required
                  />
                </div>
                <div className="forms__field">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    id="lastName"
                    name="lastName"
                    value={intake.lastName}
                    onChange={handleIntakeChange}
                    required
                  />
                </div>
              </div>

              <div className="forms__row">
                <div className="forms__field">
                  <label htmlFor="intakeEmail">Email</label>
                  <input
                    id="intakeEmail"
                    name="email"
                    type="email"
                    value={intake.email}
                    onChange={handleIntakeChange}
                    required
                  />
                </div>
                <div className="forms__field">
                  <label htmlFor="phone">Phone</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={intake.phone}
                    onChange={handleIntakeChange}
                  />
                </div>
              </div>

              <div className="forms__field">
                <label htmlFor="skinType">Skin Type</label>
                <select
                  id="skinType"
                  name="skinType"
                  value={intake.skinType}
                  onChange={handleIntakeChange}
                >
                  <option value="">Select...</option>
                  <option value="dry">Dry</option>
                  <option value="oily">Oily</option>
                  <option value="combination">Combination</option>
                  <option value="sensitive">Sensitive</option>
                  <option value="normal">Normal</option>
                </select>
              </div>

              <div className="forms__field">
                <label htmlFor="concerns">Skin Concerns &amp; Goals</label>
                <textarea
                  id="concerns"
                  name="concerns"
                  rows={3}
                  value={intake.concerns}
                  onChange={handleIntakeChange}
                  placeholder="Tell Kristin about your skin goals..."
                />
              </div>

              <div className="forms__field">
                <label htmlFor="allergies">Allergies or Sensitivities</label>
                <textarea
                  id="allergies"
                  name="allergies"
                  rows={2}
                  value={intake.allergies}
                  onChange={handleIntakeChange}
                  placeholder="List any known allergies..."
                />
              </div>

              <div className="forms__field">
                <label htmlFor="medications">Current Medications / Treatments</label>
                <textarea
                  id="medications"
                  name="medications"
                  rows={2}
                  value={intake.medications}
                  onChange={handleIntakeChange}
                  placeholder="Retinoids, Accutane, etc."
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary forms__submit"
                disabled={sending === 'intake'}
              >
                {sending === 'intake' ? 'Sending…' : 'Submit Intake Form'}
              </button>

              {submitted === 'intake' && (
                <p className="forms__success" role="status">
                  Thank you! Your intake form has been received. Kristin will review it before your visit.
                </p>
              )}
              {error === 'intake' && (
                <p className="forms__error" role="alert">
                  Something went wrong submitting your form. Please email
                  yourgoodskingal@gmail.com or try again.
                </p>
              )}
            </form>
          )}

          {activeTab === 'waiver' && (
            <form className="forms__form" onSubmit={handleWaiverSubmit}>
              <div className="forms__waiver-text">
                <p>
                  I understand that esthetic services involve certain risks. I acknowledge
                  that I have disclosed all relevant medical history, allergies, and
                  medications. I release GoodSkinGal and Kristin from liability for any
                  adverse reactions not resulting from negligence.
                </p>
                <p>
                  I consent to photography for internal records only, unless otherwise
                  agreed upon in writing.
                </p>
              </div>

              <div className="forms__row">
                <div className="forms__field">
                  <label htmlFor="fullName">Full Legal Name</label>
                  <input
                    id="fullName"
                    name="fullName"
                    value={waiver.fullName}
                    onChange={handleWaiverChange}
                    required
                  />
                </div>
                <div className="forms__field">
                  <label htmlFor="waiverEmail">Email</label>
                  <input
                    id="waiverEmail"
                    name="email"
                    type="email"
                    value={waiver.email}
                    onChange={handleWaiverChange}
                    required
                  />
                </div>
              </div>

              <div className="forms__field">
                <label htmlFor="date">Date</label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  value={waiver.date}
                  onChange={handleWaiverChange}
                  required
                />
              </div>

              <div className="forms__field">
                <label htmlFor="signature">Electronic Signature</label>
                <input
                  id="signature"
                  name="signature"
                  value={waiver.signature}
                  onChange={handleWaiverChange}
                  placeholder="Type your full name to sign"
                  required
                />
              </div>

              <label className="forms__checkbox">
                <input
                  type="checkbox"
                  name="agreed"
                  checked={waiver.agreed}
                  onChange={handleWaiverChange}
                  required
                />
                <span>I have read and agree to the terms above</span>
              </label>

              <button
                type="submit"
                className="btn btn-primary forms__submit"
                disabled={sending === 'waiver'}
              >
                {sending === 'waiver' ? 'Sending…' : 'Sign & Submit Waiver'}
              </button>

              {submitted === 'waiver' && (
                <p className="forms__success" role="status">
                  Waiver signed successfully. You're all set for your appointment!
                </p>
              )}
              {error === 'waiver' && (
                <p className="forms__error" role="alert">
                  Something went wrong submitting your waiver. Please email
                  yourgoodskingal@gmail.com or try again.
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
