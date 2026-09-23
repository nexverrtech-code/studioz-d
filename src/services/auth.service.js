/**
 * Admin demo gate.
 *
 * ⚠️ THIS IS NOT AUTHENTICATION.
 *
 * The passcode ships inside the JavaScript bundle, so anyone who opens
 * DevTools can read it. It exists for exactly one reason: to keep the
 * frontend admin surface out of casual view during review, and to give a real
 * auth provider a clearly-marked seam to drop into.
 *
 * Before this goes anywhere near real customer data, replace the three
 * functions below with a provider that verifies server-side (Auth0, Clerk,
 * Firebase Auth, or your own API issuing an httpOnly session cookie). Nothing
 * else in the admin UI needs to change — it only calls this module.
 */

import { siteConfig } from '@/config/site';

const STORAGE_KEY = 'studiozd.admin.demo-session';
const SESSION_TTL_MS = 1000 * 60 * 60 * 8; // 8 hours

const readStorage = () => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    // Private mode, blocked storage, or corrupt JSON — treat as signed out.
    return null;
  }
};

const writeStorage = (value) => {
  if (typeof window === 'undefined') return;
  try {
    if (value) window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    else window.sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    /* Non-fatal: the session simply will not survive a reload. */
  }
};

/** True while an unexpired demo session exists. */
export const isAuthenticated = () => {
  const session = readStorage();
  if (!session?.issuedAt) return false;
  if (Date.now() - session.issuedAt > SESSION_TTL_MS) {
    writeStorage(null);
    return false;
  }
  return true;
};

/**
 * Verifies the demo passcode.
 * Replace with a real credential exchange — the signature is deliberately
 * async so swapping in a network call requires no caller changes.
 */
export const signIn = async (passcode) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 320);
  });

  const expected = siteConfig.admin.demoPasscode;
  if (!expected) {
    return { ok: false, error: 'No demo passcode is configured for this deployment.' };
  }
  if (String(passcode).trim() !== expected) {
    return { ok: false, error: 'That passcode is not correct.' };
  }

  writeStorage({ issuedAt: Date.now(), mode: 'demo' });
  return { ok: true };
};

export const signOut = () => {
  writeStorage(null);
};

/** Placeholder identity. A real provider would return the signed-in user. */
export const getCurrentUser = () =>
  isAuthenticated() ? { name: 'Studio', role: 'demo', isDemo: true } : null;

export default { isAuthenticated, signIn, signOut, getCurrentUser };
