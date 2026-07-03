// ============================================================
//  EMAIL DELIVERY CONFIGURATION  (EmailJS)
// ============================================================
//  Sends the Client Intake and Consent & Waiver form submissions
//  to your Gmail inbox (yourgoodskingal@gmail.com) — right from
//  the visitor's browser, with no server required.
//
//  The free EmailJS plan allows 2 templates, so the site uses
//  exactly two: intake + waiver.
//
//  ---------------------------------------------------------
//  STATUS: LIVE
//  ---------------------------------------------------------
//  Service ID, both Template IDs, and the Public Key are all set,
//  so the Intake and Waiver forms send real email to your Gmail.
//  (If you ever rotate these values, update them here.)
//
//  Template variables in use (match the form fields):
//    INTAKE (template_a5diov7):
//      {{firstName}} {{lastName}} {{email}} {{phone}}
//      {{skinType}} {{concerns}} {{allergies}} {{medications}}
//    WAIVER (template_6ejk5hm):
//      {{fullName}} {{email}} {{date}} {{signature}} {{agreed}}
// ============================================================

export const EMAILJS_PUBLIC_KEY = 'gUX-SPGB3Rd-A6FIR';
export const EMAILJS_SERVICE_ID = 'service_s0x2krn';

export const EMAILJS_TEMPLATES = {
  intake: 'template_a5diov7',
  waiver: 'template_6ejk5hm',
};

// True only when the shared credentials AND the specific template exist.
export function isEmailConfigured(templateKey) {
  return Boolean(
    EMAILJS_PUBLIC_KEY &&
      EMAILJS_SERVICE_ID &&
      EMAILJS_TEMPLATES[templateKey],
  );
}
