import { useEffect, useId, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, Loader2, Send, AlertTriangle } from 'lucide-react';
import { FormField } from './FormField';
import {
  enquirySchema,
  enquiryDefaults,
  INTEREST_OPTIONS,
  BUDGET_OPTIONS,
  GIFT_INTERESTS,
} from './enquirySchema';
import {
  WhatsAppButton,
  EmailButton,
  hasAnyContactChannel,
} from '@/components/buttons/ContactButtons';
import { giftCategoryOptions } from '@/data/gifts';
import { submitEnquiry, SUBMIT_RESULT, buildEnquiryMessage } from '@/services/form.service';
import { trackFormStart, trackFormSubmit, trackFormError } from '@/services/analytics.service';
import { hasEmailJs } from '@/config/site';
import { cn } from '@/utils/cn';

/**
 * Enquiry form.
 *
 * States covered: idle → submitting → success / error / not-configured.
 * The submit button is disabled while in flight, and the result is announced
 * in a live region so it is not a visual-only change.
 *
 * Spam handling is deliberately quiet: a honeypot field plus a minimum
 * time-on-form. Neither asks the visitor to prove anything, and neither
 * blocks assistive technology the way a CAPTCHA does.
 *
 * If EmailJS is unconfigured the form does not pretend to send. It says so
 * plainly and offers WhatsApp / email instead, with the message pre-filled.
 */
export const EnquiryForm = ({ defaultInterest = '', defaultGiftCategory = '', className }) => {
  const formId = useId();
  const startedAt = useRef(Date.now());
  const hasStarted = useRef(false);
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      ...enquiryDefaults,
      interest: defaultInterest,
      giftCategory: defaultGiftCategory,
    },
    mode: 'onBlur',
  });

  const interest = watch('interest');
  const isGiftEnquiry = GIFT_INTERESTS.has(interest);
  const values = watch();

  /**
   * Whether there is any direct channel to fall back to. When a deployment
   * has neither EmailJS nor WhatsApp/email configured, promising "send it on
   * WhatsApp instead" would be a lie — so the failure copy adapts.
   */
  const hasDirectChannel = hasAnyContactChannel();

  // Report form_start once, on first meaningful interaction.
  const markStarted = () => {
    if (hasStarted.current) return;
    hasStarted.current = true;
    startedAt.current = Date.now();
    trackFormStart('enquiry');
  };

  // Move focus to the first invalid control so keyboard users are not left
  // hunting for the error.
  useEffect(() => {
    const firstError = Object.keys(errors)[0];
    if (firstError && status === 'idle') setFocus(firstError);
  }, [errors, setFocus, status]);

  const onSubmit = async (formValues) => {
    setStatus('submitting');
    setErrorMessage('');

    const result = await submitEnquiry(formValues, {
      honeypot: formValues.website,
      startedAt: startedAt.current,
    });

    if (result.status === SUBMIT_RESULT.SUCCESS) {
      trackFormSubmit('enquiry', { interest: formValues.interest, isGift: isGiftEnquiry });
      setStatus('success');
      reset({ ...enquiryDefaults, interest: defaultInterest });
      return;
    }

    if (result.status === SUBMIT_RESULT.NOT_CONFIGURED) {
      trackFormError('enquiry', 'not-configured');
      setStatus('not-configured');
      return;
    }

    if (result.status === SUBMIT_RESULT.SPAM) {
      // Deliberately generic — a bot learns nothing from this.
      trackFormError('enquiry', 'spam');
      setStatus('error');
      setErrorMessage('That did not go through. Please try again, or reach us directly.');
      return;
    }

    trackFormError('enquiry', 'send-failed');
    setStatus('error');
    setErrorMessage(result.reason ?? 'The enquiry could not be sent.');
  };

  const prefilledMessage = buildEnquiryMessage({
    name: values.name,
    interest: INTEREST_OPTIONS.find((option) => option.value === values.interest)?.label,
    giftCategory: values.giftCategory,
    preferredDate: values.preferredDate,
    message: values.message,
  });

  /* ------------------------------------------------------------ Success */
  if (status === 'success') {
    return (
      <div
        className={cn(
          'flex flex-col items-center gap-5 border border-olive-300 bg-olive-300/10 px-6 py-14 text-center',
          className
        )}
        role="status"
        aria-live="polite"
      >
        <CheckCircle2 className="h-9 w-9 text-olive-500" strokeWidth={1.2} aria-hidden="true" />
        <h3 className="font-display text-fluid-2xl text-ink-900">That is with us.</h3>
        <p className="max-w-prose-sm text-fluid-base text-ink-500">
          Thank you — we have your enquiry and will come back to you personally. If it is
          time-sensitive, a message on WhatsApp will always reach us faster.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <WhatsAppButton context="form-success" variant="solid">
            Message Us
          </WhatsAppButton>
          <button
            type="button"
            onClick={() => setStatus('idle')}
            className="btn btn-outline"
          >
            Send Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onFocus={markStarted}
      noValidate
      className={cn('flex flex-col gap-6', className)}
      aria-label="Enquiry form"
    >
      {/* Honeypot. Hidden from sight AND from assistive technology, so no
          real user can ever be caught by it. */}
      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden opacity-0">
        <label htmlFor={`${formId}-website`}>Website (leave blank)</label>
        <input
          id={`${formId}-website`}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register('website')}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField id={`${formId}-name`} label="Name" required error={errors.name?.message}>
          {(props) => (
            <input
              {...props}
              {...register('name')}
              type="text"
              autoComplete="name"
              placeholder="Your name"
              className="field-control"
            />
          )}
        </FormField>

        <FormField id={`${formId}-phone`} label="Phone" required error={errors.phone?.message}>
          {(props) => (
            <input
              {...props}
              {...register('phone')}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="Include the country code"
              className="field-control"
            />
          )}
        </FormField>
      </div>

      <FormField id={`${formId}-email`} label="Email" required error={errors.email?.message}>
        {(props) => (
          <input
            {...props}
            {...register('email')}
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@example.com"
            className="field-control"
          />
        )}
      </FormField>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField
          id={`${formId}-interest`}
          label="Interested in"
          required
          error={errors.interest?.message}
        >
          {(props) => (
            <select {...props} {...register('interest')} className="field-control">
              <option value="">Choose one…</option>
              {INTEREST_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}
        </FormField>

        {/* Only asked when it is relevant — a conditional field beats a form
            full of options that do not apply. */}
        {isGiftEnquiry ? (
          <FormField
            id={`${formId}-gift`}
            label="Gift category"
            error={errors.giftCategory?.message}
            hint="Optional — helps us point you at the right creations."
          >
            {(props) => (
              <select {...props} {...register('giftCategory')} className="field-control">
                <option value="">Not sure yet</option>
                {giftCategoryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}
          </FormField>
        ) : (
          <FormField
            id={`${formId}-date`}
            label="Preferred date"
            error={errors.preferredDate?.message}
            hint="A month or a season is fine if the date is not fixed."
          >
            {(props) => (
              <input
                {...props}
                {...register('preferredDate')}
                type="text"
                placeholder="e.g. late November 2026"
                className="field-control"
              />
            )}
          </FormField>
        )}
      </div>

      <FormField
        id={`${formId}-budget`}
        label="Budget"
        error={errors.budget?.message}
        hint="Entirely optional. It just helps us suggest something realistic."
      >
        {(props) => (
          <select {...props} {...register('budget')} className="field-control">
            {BUDGET_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
      </FormField>

      <FormField
        id={`${formId}-message`}
        label="Message"
        required
        error={errors.message?.message}
        hint="What are you picturing? Dates, places, people, the feeling you are after."
      >
        {(props) => (
          <textarea
            {...props}
            {...register('message')}
            rows={5}
            placeholder="Tell us what you have in mind…"
            className="field-control"
          />
        )}
      </FormField>

      {/* Consent */}
      <div className="flex min-w-0 flex-col gap-2">
        <label
          htmlFor={`${formId}-consent`}
          className="flex cursor-pointer items-start gap-3 text-fluid-sm text-ink-500"
        >
          <input
            id={`${formId}-consent`}
            type="checkbox"
            {...register('consent')}
            aria-invalid={errors.consent ? 'true' : undefined}
            aria-describedby={errors.consent ? `${formId}-consent-error` : undefined}
            className="mt-1 h-4 w-4 shrink-0 accent-ink-900"
          />
          <span className="min-w-0">
            I am happy for Studioz D to use these details to reply to my enquiry.
          </span>
        </label>
        {errors.consent && (
          <p id={`${formId}-consent-error`} role="alert" className="field-error">
            <AlertTriangle className="mt-[0.15rem] h-3.5 w-3.5 shrink-0" strokeWidth={1.8} aria-hidden="true" />
            <span>{errors.consent.message}</span>
          </p>
        )}
      </div>

      {/* Result messaging */}
      <div aria-live="polite" className="min-w-0">
        {status === 'error' && (
          <div
            role="alert"
            className="flex items-start gap-3 border border-terracotta-300 bg-terracotta-300/10 p-4"
          >
            <AlertTriangle
              className="mt-0.5 h-4 w-4 shrink-0 text-terracotta-500"
              strokeWidth={1.7}
              aria-hidden="true"
            />
            <div className="flex min-w-0 flex-col gap-2">
              <p className="text-fluid-sm text-ink-700">{errorMessage}</p>
              {hasDirectChannel && (
                <div className="flex flex-wrap gap-2">
                  <WhatsAppButton
                    size="sm"
                    context="form-error"
                    message={prefilledMessage}
                    variant="outline"
                  >
                    Send on WhatsApp
                  </WhatsAppButton>
                  <EmailButton
                    size="sm"
                    context="form-error"
                    subject="Enquiry — Studioz D"
                    body={prefilledMessage}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {status === 'not-configured' && (
          <div
            role="alert"
            className="flex items-start gap-3 border border-champagne-300 bg-champagne-200/40 p-4"
          >
            <AlertTriangle
              className="mt-0.5 h-4 w-4 shrink-0 text-champagne-700"
              strokeWidth={1.7}
              aria-hidden="true"
            />
            <div className="flex min-w-0 flex-col gap-2">
              <p className="text-fluid-sm text-ink-700">
                {hasDirectChannel
                  ? 'Email delivery is not connected on this deployment yet, so this form cannot send your enquiry. Your message is ready to go on WhatsApp or email instead — both reach us directly.'
                  : 'This deployment has no delivery channel connected yet, so nothing was sent. Nothing you typed has been lost — copy it below and we will get it working shortly.'}
              </p>

              {hasDirectChannel ? (
                <div className="flex flex-wrap gap-2">
                  <WhatsAppButton
                    size="sm"
                    context="form-fallback"
                    message={prefilledMessage}
                    variant="solid"
                  >
                    Send on WhatsApp
                  </WhatsAppButton>
                  <EmailButton
                    size="sm"
                    context="form-fallback"
                    subject="Enquiry — Studioz D"
                    body={prefilledMessage}
                  />
                </div>
              ) : (
                /* Nothing to link to, so at least make the message recoverable. */
                <div className="flex flex-col gap-2">
                  <label htmlFor={`${formId}-recovery`} className="sr-only">
                    Your enquiry, ready to copy
                  </label>
                  <textarea
                    id={`${formId}-recovery`}
                    readOnly
                    rows={5}
                    value={prefilledMessage}
                    onFocus={(event) => event.target.select()}
                    className="field-control text-[0.82rem]"
                  />
                  <p className="text-[0.68rem] text-ink-400">
                    Setup note: add <code>VITE_EMAILJS_*</code> and a contact channel to
                    <code> .env.local</code> to enable delivery.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={isSubmitting || status === 'submitting'}
          className="btn btn-solid w-full sm:w-auto"
        >
          {isSubmitting || status === 'submitting' ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.8} aria-hidden="true" />
              Sending…
            </>
          ) : (
            <>
              Send Enquiry
              <Send className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
            </>
          )}
        </button>

        {!hasEmailJs() && status === 'idle' && (
          <p className="text-[0.68rem] leading-relaxed text-ink-300 sm:max-w-[28ch] sm:text-right">
            Email delivery is not yet connected on this deployment.
          </p>
        )}
      </div>
    </form>
  );
};

export default EnquiryForm;
