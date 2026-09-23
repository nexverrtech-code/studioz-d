import { z } from 'zod';

/**
 * Enquiry validation.
 *
 * Messages are written to be read by a person under mild frustration —
 * specific about what is wrong, never scolding, never just "Invalid".
 */

/**
 * Permissive on purpose. International numbers vary wildly in length and
 * formatting, and rejecting a valid number is far more damaging than
 * accepting a slightly malformed one the studio can still dial.
 */
const phonePattern = /^[+]?[\d\s()-]{7,20}$/;

export const INTEREST_OPTIONS = [
  { value: 'photography', label: 'Photography (general)' },
  { value: 'wedding', label: 'Wedding' },
  { value: 'pre-wedding', label: 'Pre-Wedding' },
  { value: 'event', label: 'Event' },
  { value: 'portrait', label: 'Portrait' },
  { value: 'product', label: 'Product / Commercial' },
  { value: 'film', label: 'Film or Reels' },
  { value: 'gift', label: 'Customized Gift' },
  { value: 'other', label: 'Something else' },
];

/** Interests that route the enquiry to the gifting side of the studio. */
export const GIFT_INTERESTS = new Set(['gift']);

export const BUDGET_OPTIONS = [
  { value: '', label: 'Prefer not to say' },
  { value: 'exploring', label: 'Still exploring' },
  { value: 'have-range', label: 'I have a range in mind' },
  { value: 'budget-agreed', label: 'Budget is agreed' },
  { value: 'flexible', label: 'Flexible for the right fit' },
];

export const enquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Please enter your name.')
    .max(80, 'That name is longer than we can store — please shorten it.'),

  phone: z
    .string()
    .trim()
    .min(7, 'Please enter a phone number we can reach you on.')
    .max(20, 'That number looks too long — please check it.')
    .regex(phonePattern, 'Please use digits, spaces, brackets, + or - only.'),

  email: z
    .string()
    .trim()
    .min(1, 'Please enter your email address.')
    .email('That email address does not look right — please check it.'),

  interest: z
    .string()
    .min(1, 'Let us know what this is about.')
    .refine(
      (value) => INTEREST_OPTIONS.some((option) => option.value === value),
      'Please choose one of the listed options.'
    ),

  giftCategory: z.string().optional().default(''),

  /** Free text rather than a date input: many enquiries have no fixed date. */
  preferredDate: z.string().trim().max(60, 'Please keep this short.').optional().default(''),

  budget: z.string().optional().default(''),

  message: z
    .string()
    .trim()
    .min(10, 'Tell us a little more — even one or two sentences helps.')
    .max(2000, 'That is longer than the form accepts. Please trim it slightly.'),

  /** Honeypot. Humans never see it, so anything here is a bot. */
  website: z.string().max(0).optional().default(''),

  consent: z.literal(true, {
    errorMap: () => ({ message: 'Please confirm we can reply to your enquiry.' }),
  }),
});

export const enquiryDefaults = {
  name: '',
  phone: '',
  email: '',
  interest: '',
  giftCategory: '',
  preferredDate: '',
  budget: '',
  message: '',
  website: '',
  consent: false,
};
