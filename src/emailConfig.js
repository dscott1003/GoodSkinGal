// ============================================================
//  EMAIL DELIVERY CONFIGURATION  (EmailJS)
// ============================================================
//  This makes the Contact, Client Intake, and Consent & Waiver
//  forms actually email their submissions to your Gmail inbox
//  (yourgoodskingal@gmail.com) — right from the visitor's browser,
//  with no server required.
//
//  ---------------------------------------------------------
//  ONE-TIME SETUP (about 10 minutes, all free):
//  ---------------------------------------------------------
//  1. Go to https://www.emailjs.com and sign up (free plan).
//
//  2. Add an Email Service:
//       Dashboard -> Email Services -> Add New Service -> Gmail
//       Connect it to  yourgoodskingal@gmail.com  and authorize.
//       Copy the SERVICE ID it gives you (looks like "service_ab12cd3").
//
//  3. Create THREE email templates:
//       Dashboard -> Email Templates -> Create New Template
//       Make one for each form below and copy each TEMPLATE ID
//       (looks like "template_xy45zz6").
//
//       In each template, set the "To Email" to yourgoodskingal@gmail.com
//       and use these variables in the subject/body so the info comes
//       through (they match what the forms send):
//
//       CONTACT template variables:
//         {{name}} {{email}} {{phone}} {{service}} {{message}}
//
//       INTAKE template variables:
//         {{firstName}} {{lastName}} {{email}} {{phone}}
//         {{skinType}} {{concerns}} {{allergies}} {{medications}}
//
//       WAIVER template variables:
//         {{fullName}} {{email}} {{date}} {{signature}} {{agreed}}
//
//  4. Get your Public Key:
//       Dashboard -> Account -> General -> Public Key
//       (looks like "AbCdEfG123456").
//
//  5. Paste all of your IDs/keys into the values below and save.
//     That's it — the forms go live the next time the site deploys.
//
//  Until these are filled in, the forms stay in "demo" mode:
//  they show a friendly confirmation but don't send email yet.
// ============================================================

export const EMAILJS_PUBLIC_KEY = '';
export const EMAILJS_SERVICE_ID = '';

export const EMAILJS_TEMPLATES = {
  contact: '',
  intake: '',
  waiver: '',
};

// True only when the shared credentials AND the specific template exist.
export function isEmailConfigured(templateKey) {
  return Boolean(
    EMAILJS_PUBLIC_KEY &&
      EMAILJS_SERVICE_ID &&
      EMAILJS_TEMPLATES[templateKey],
  );
}
