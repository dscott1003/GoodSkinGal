// Admin dashboard access.
//
// IMPORTANT: This is a *client-side* passcode. It keeps the dashboard out of
// casual view, but because this site is fully static (no server), anyone who
// really wants to read the code could find it. Do NOT treat this as real
// security for anything sensitive. When we connect a backend (see Admin.jsx
// notes), this is replaced by a proper login.
//
// Change this to whatever Kristin wants:
export const ADMIN_PASSCODE = 'goodskin2026';

// Where the "log in" flag is remembered for the current browser tab session.
export const ADMIN_SESSION_KEY = 'gsg_admin_ok';
