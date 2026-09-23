import { useId, useState } from 'react';
import { ImagePlus, RotateCcw } from 'lucide-react';
import { OptimizedImage } from '@/components/common/OptimizedImage';
import { WhatsAppButton, EmailButton } from '@/components/buttons/ContactButtons';
import { SIZES } from '@/utils/images';
import { cn } from '@/utils/cn';

const MAX_NAME = 28;
const MAX_MESSAGE = 90;

/**
 * Frontend-only personalization preview.
 *
 * Renders the customer's name, message and date over the product image so
 * they can see the shape of the finished piece before enquiring. Nothing is
 * uploaded or stored — the photo field is a local `objectURL` that exists
 * only for this page view, which is why it needs no backend and carries no
 * privacy implication.
 *
 * The values also flow into the WhatsApp / email enquiry, so the studio
 * receives exactly what the customer typed.
 */
export const CustomizePreview = ({ gift }) => {
  const id = useId();
  const [values, setValues] = useState({ name: '', message: '', date: '' });
  const [photoUrl, setPhotoUrl] = useState(null);
  const [photoName, setPhotoName] = useState('');

  const fields = gift.personalization.fields ?? [];
  const image = gift.images[0];

  const update = (key) => (event) => {
    const { value } = event.target;
    const limit = key === 'name' ? MAX_NAME : key === 'message' ? MAX_MESSAGE : 64;
    setValues((current) => ({ ...current, [key]: value.slice(0, limit) }));
  };

  const onPhoto = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    // Release the previous URL before replacing it, or the blob leaks.
    if (photoUrl) URL.revokeObjectURL(photoUrl);
    setPhotoUrl(URL.createObjectURL(file));
    setPhotoName(file.name);
  };

  const reset = () => {
    if (photoUrl) URL.revokeObjectURL(photoUrl);
    setPhotoUrl(null);
    setPhotoName('');
    setValues({ name: '', message: '', date: '' });
  };

  const hasValues = Boolean(values.name || values.message || values.date || photoUrl);

  const enquiryMessage = [
    `Hello Studioz D, I would like to customize the ${gift.name}.`,
    values.name && `Name: ${values.name}`,
    values.message && `Message: ${values.message}`,
    values.date && `Date: ${values.date}`,
    photoName && `I have a photograph ready to share (${photoName}).`,
  ]
    .filter(Boolean)
    .join('\n');

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12">
      {/* ------------------------------------------------------- Preview */}
      <div className="flex flex-col gap-3">
        <p className="eyebrow">Preview</p>

        <div className="relative w-full bg-ivory-100">
          <OptimizedImage
            src={photoUrl ?? image?.src}
            alt={
              photoUrl
                ? 'Your uploaded photograph, previewed on this creation'
                : (image?.alt ?? gift.name)
            }
            aspect="1/1"
            sizes={SIZES.half}
            className="w-full"
          />

          {/* Overlay only appears once there is something to show, so an
              untouched preview shows the product cleanly. */}
          {hasValues && (
            <div
              className="pointer-events-none absolute inset-0 flex flex-col items-center justify-end gap-2 bg-gradient-to-t from-ink-950/70 via-ink-950/10 to-transparent p-6 text-center sm:p-8"
              aria-hidden="true"
            >
              {values.name && (
                <p className="max-w-full break-anywhere font-display text-[clamp(1.4rem,1rem+2vw,2.4rem)] leading-tight text-ivory-50">
                  {values.name}
                </p>
              )}
              {values.message && (
                <p className="max-w-[34ch] break-anywhere text-fluid-sm italic text-ivory-200/90">
                  “{values.message}”
                </p>
              )}
              {values.date && (
                <p className="text-[0.66rem] uppercase tracking-widest-xl text-champagne-400">
                  {values.date}
                </p>
              )}
            </div>
          )}
        </div>

        <p className="text-[0.68rem] leading-relaxed text-ink-300">
          An indication of layout, not a production proof. Nothing here is uploaded or stored —
          the preview lives only in your browser. A full proof is shared with you before anything
          is made.
        </p>
      </div>

      {/* -------------------------------------------------------- Inputs */}
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between gap-4">
          <p className="eyebrow">Make it yours</p>
          {hasValues && (
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-1.5 text-[0.64rem] uppercase tracking-widest text-ink-400 transition-colors hover:text-ink-900"
            >
              <RotateCcw className="h-3 w-3" strokeWidth={1.8} aria-hidden="true" />
              Reset
            </button>
          )}
        </div>

        {fields.includes('name') && (
          <div>
            <label htmlFor={`${id}-name`} className="field-label">
              Name
            </label>
            <input
              id={`${id}-name`}
              type="text"
              value={values.name}
              onChange={update('name')}
              maxLength={MAX_NAME}
              placeholder="The name to engrave"
              className="field-control"
            />
            <p className="mt-1.5 text-[0.66rem] text-ink-300">
              {values.name.length}/{MAX_NAME}
            </p>
          </div>
        )}

        {fields.includes('message') && (
          <div>
            <label htmlFor={`${id}-message`} className="field-label">
              Message
            </label>
            <textarea
              id={`${id}-message`}
              value={values.message}
              onChange={update('message')}
              maxLength={MAX_MESSAGE}
              rows={3}
              placeholder="A line only the two of you will understand"
              className="field-control min-h-[96px]"
            />
            <p className="mt-1.5 text-[0.66rem] text-ink-300">
              {values.message.length}/{MAX_MESSAGE}
            </p>
          </div>
        )}

        {fields.includes('date') && (
          <div>
            <label htmlFor={`${id}-date`} className="field-label">
              Date
            </label>
            <input
              id={`${id}-date`}
              type="text"
              value={values.date}
              onChange={update('date')}
              placeholder="e.g. 14 February 2026"
              className="field-control"
            />
          </div>
        )}

        {fields.includes('photo') && (
          <div>
            <span className="field-label">Photograph</span>
            <label
              htmlFor={`${id}-photo`}
              className={cn(
                'flex min-h-[64px] cursor-pointer items-center gap-3 border border-dashed border-ink-200 px-4 py-3 transition-colors hover:border-ink-400',
                photoName && 'border-solid border-champagne-600'
              )}
            >
              <ImagePlus className="h-5 w-5 shrink-0 text-ink-400" strokeWidth={1.4} aria-hidden="true" />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-fluid-sm text-ink-700">
                  {photoName || 'Choose a photograph to preview'}
                </span>
                <span className="block text-[0.66rem] text-ink-300">
                  Previewed locally. Send the full-resolution file with your enquiry.
                </span>
              </span>
            </label>
            <input
              id={`${id}-photo`}
              type="file"
              accept="image/*"
              onChange={onPhoto}
              className="sr-only"
            />
          </div>
        )}

        <div className="mt-2 flex flex-col gap-3 border-t border-ink-100 pt-5">
          <p className="text-fluid-sm text-ink-500">
            Happy with it? Send the details across and we will come back with options, a proof
            and a timeline.
          </p>
          <div className="flex flex-wrap gap-3">
            <WhatsAppButton
              message={enquiryMessage}
              context={`gift-customize:${gift.slug}`}
              variant="solid"
            >
              Ask About This Gift
            </WhatsAppButton>
            <EmailButton
              subject={`Customize enquiry — ${gift.name}`}
              body={enquiryMessage}
              context={`gift-customize:${gift.slug}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizePreview;
