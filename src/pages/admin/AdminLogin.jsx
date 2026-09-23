import { useState } from 'react';
import { Navigate, useNavigate, useLocation, Link } from 'react-router-dom';
import { Loader2, Lock, ShieldAlert } from 'lucide-react';
import { Seo } from '@/components/seo/Seo';
import { signIn, isAuthenticated } from '@/services/auth.service';
import { siteConfig } from '@/config/site';

/**
 * Demo gate for the admin console.
 *
 * Says plainly what it is. A passcode that ships in the bundle is not
 * security, and pretending otherwise would be worse than the gate itself.
 */
export const AdminLogin = () => {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from ?? '/admin/analytics';

  if (isAuthenticated()) return <Navigate to={from} replace />;

  const onSubmit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError('');

    const result = await signIn(passcode);
    setBusy(false);

    if (result.ok) navigate(from, { replace: true });
    else setError(result.error);
  };

  return (
    <>
      <Seo
        title="Studio Console"
        description="Internal console for Studioz D."
        path="/admin/login"
        noindex
      />

      <div
        data-surface="admin"
        className="flex min-h-svh items-center justify-center bg-[color:var(--sd-surface-sunken)] px-gutter py-16"
      >
        <div className="w-full max-w-md">
          <div className="mb-8 flex flex-col items-center gap-2 text-center">
            <span className="font-display text-fluid-xl uppercase tracking-[0.2em] text-ivory-100">
              Studioz<span className="text-champagne-500"> D</span>
            </span>
            <span className="text-[0.62rem] uppercase tracking-widest-xl text-ink-400">
              Studio console
            </span>
          </div>

          <form
            onSubmit={onSubmit}
            className="flex flex-col gap-5 border border-ivory-100/10 bg-[color:var(--sd-surface-raised)] p-7"
          >
            <div className="flex items-start gap-3 border border-champagne-600/30 bg-champagne-600/10 p-4">
              <ShieldAlert
                className="mt-0.5 h-4 w-4 shrink-0 text-champagne-500"
                strokeWidth={1.7}
                aria-hidden="true"
              />
              <p className="min-w-0 text-[0.72rem] leading-relaxed text-ivory-200/80">
                This is a <strong className="font-semibold text-ivory-100">demo gate</strong>, not
                authentication. The passcode ships in the browser bundle. Replace{' '}
                <code className="break-anywhere text-champagne-400">auth.service.js</code> with a
                real provider before this console holds anything real.
              </p>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="admin-passcode"
                className="mb-2 block text-[0.66rem] font-semibold uppercase tracking-widest-xl text-ink-300"
              >
                Passcode
              </label>
              <div className="relative">
                <Lock
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400"
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
                <input
                  id="admin-passcode"
                  type="password"
                  value={passcode}
                  onChange={(event) => setPasscode(event.target.value)}
                  autoComplete="current-password"
                  aria-invalid={error ? 'true' : undefined}
                  aria-describedby={error ? 'admin-passcode-error' : 'admin-passcode-hint'}
                  className="w-full min-h-[50px] border border-ivory-100/15 bg-[color:var(--sd-surface-sunken)] py-3 pl-10 pr-4 text-ivory-100 outline-none transition-colors placeholder:text-ink-400 focus:border-champagne-500"
                  placeholder="Enter the demo passcode"
                />
              </div>

              {error ? (
                <p id="admin-passcode-error" role="alert" className="mt-2 text-[0.78rem] text-terracotta-400">
                  {error}
                </p>
              ) : (
                <p id="admin-passcode-hint" className="mt-2 text-[0.7rem] text-ink-400">
                  Set by <code className="text-champagne-400">VITE_ADMIN_DEMO_PASSCODE</code>.
                  {import.meta.env.DEV && siteConfig.admin.demoPasscode && (
                    <>
                      {' '}
                      Development default:{' '}
                      <code className="break-anywhere text-champagne-400">
                        {siteConfig.admin.demoPasscode}
                      </code>
                    </>
                  )}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={busy || passcode.length === 0}
              className="btn btn-accent w-full"
            >
              {busy ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.8} aria-hidden="true" />
                  Checking…
                </>
              ) : (
                'Enter Console'
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-[0.7rem] text-ink-400">
            <Link to="/" className="link-underline">
              Back to the website
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
