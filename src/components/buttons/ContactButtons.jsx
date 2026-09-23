import { Mail, MessageCircle, Phone } from 'lucide-react';
import { Button } from './Button';
import {
  buildWhatsAppLink,
  buildMailtoLink,
  buildTelLink,
  hasWhatsApp,
  hasEmail,
  hasPhone,
} from '@/config/site';
import { trackWhatsApp, trackEmail, trackPhone } from '@/services/analytics.service';

/**
 * Channel buttons.
 *
 * Each returns `null` when its channel is not configured, so an unfinished
 * deployment never renders a dead link. Callers can therefore drop them in
 * unconditionally.
 */

export const WhatsAppButton = ({
  message,
  context = 'general',
  children = 'WhatsApp Us',
  variant = 'outline',
  ...rest
}) => {
  const href = buildWhatsAppLink(message);
  if (!href) return null;

  return (
    <Button
      href={href}
      external
      variant={variant}
      icon={MessageCircle}
      iconPosition="left"
      onClick={() => trackWhatsApp(context)}
      {...rest}
    >
      {children}
    </Button>
  );
};

export const EmailButton = ({
  subject,
  body,
  context = 'general',
  children = 'Email Us',
  variant = 'outline',
  ...rest
}) => {
  const href = buildMailtoLink({ subject, body });
  if (!href) return null;

  return (
    <Button
      href={href}
      variant={variant}
      icon={Mail}
      iconPosition="left"
      onClick={() => trackEmail(context)}
      {...rest}
    >
      {children}
    </Button>
  );
};

export const PhoneButton = ({
  context = 'general',
  children = 'Call Us',
  variant = 'outline',
  ...rest
}) => {
  const href = buildTelLink();
  if (!href) return null;

  return (
    <Button
      href={href}
      variant={variant}
      icon={Phone}
      iconPosition="left"
      onClick={() => trackPhone(context)}
      {...rest}
    >
      {children}
    </Button>
  );
};

/** True when at least one direct channel exists — used to hide empty rows. */
export const hasAnyContactChannel = () => hasWhatsApp() || hasEmail() || hasPhone();

export default WhatsAppButton;
