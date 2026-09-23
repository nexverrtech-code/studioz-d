import { AlertCircle } from 'lucide-react';
import { cn } from '@/utils/cn';

/**
 * Accessible field wrapper.
 *
 * Wires up the three things hand-rolled forms usually get wrong:
 *  - `htmlFor` / `id` actually match
 *  - `aria-invalid` and `aria-describedby` point at the live error
 *  - the error is announced (`role="alert"`) rather than only shown
 *
 * The error slot always occupies its row when present, so validating a field
 * pushes the layout by a known, small amount instead of jumping unpredictably.
 */
export const FormField = ({
  id,
  label,
  required = false,
  error,
  hint,
  children,
  className,
}) => {
  const errorId = error ? `${id}-error` : undefined;
  const hintId = hint ? `${id}-hint` : undefined;
  const describedBy = [errorId, hintId].filter(Boolean).join(' ') || undefined;

  return (
    <div className={cn('flex min-w-0 flex-col', className)}>
      <label htmlFor={id} className="field-label">
        {label}
        {required && (
          <>
            <span aria-hidden="true" className="ml-1 text-terracotta-500">
              *
            </span>
            <span className="sr-only"> (required)</span>
          </>
        )}
      </label>

      {children({
        id,
        'aria-invalid': error ? 'true' : undefined,
        'aria-describedby': describedBy,
        'aria-required': required || undefined,
      })}

      {hint && !error && (
        <p id={hintId} className="mt-1.5 text-[0.7rem] text-ink-300">
          {hint}
        </p>
      )}

      {error && (
        <p id={errorId} role="alert" className="field-error">
          <AlertCircle
            className="mt-[0.15rem] h-3.5 w-3.5 shrink-0"
            strokeWidth={1.8}
            aria-hidden="true"
          />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};

export default FormField;
