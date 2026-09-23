import { Seo } from '@/components/seo/Seo';
import { PageHero } from '@/components/hero/PageHero';
import { siteConfig, hasEmail } from '@/config/site';
import { breadcrumbSchema } from '@/utils/seo';

/**
 * Privacy Policy and Terms.
 *
 * ⚠️ These are honest, accurate descriptions of what this frontend actually
 * does — which is the only thing that can be written without knowing the
 * studio's jurisdiction, entity details or commercial terms. They are NOT
 * legal advice and are not a substitute for a lawyer reviewing them before
 * launch. Placeholders are marked in the copy rather than quietly invented.
 */

const Prose = ({ children }) => (
  <div className="shell-narrow flex flex-col gap-10 py-section">{children}</div>
);

const Section = ({ heading, children }) => (
  <section className="flex flex-col gap-4">
    <h2 className="font-display text-fluid-xl text-ink-900">{heading}</h2>
    {children}
  </section>
);

const P = ({ children }) => (
  <p className="max-w-prose text-fluid-base leading-relaxed text-ink-500">{children}</p>
);

const List = ({ items }) => (
  <ul className="flex flex-col gap-2">
    {items.map((item) => (
      <li key={item} className="flex items-start gap-3 text-fluid-base text-ink-500">
        <span className="mt-[0.7em] h-1 w-1 shrink-0 rounded-full bg-champagne-600" aria-hidden="true" />
        <span className="min-w-0">{item}</span>
      </li>
    ))}
  </ul>
);

const ReviewNotice = () => (
  <div className="border border-champagne-300 bg-champagne-200/40 p-5">
    <p className="text-fluid-sm leading-relaxed text-ink-600">
      <strong className="font-semibold">Before launch:</strong> this document describes what the
      website itself does, accurately and in plain language. It has not been reviewed by a
      lawyer and does not cover jurisdiction-specific obligations, company registration details
      or commercial terms. Have it reviewed and completed before going live.
    </p>
  </div>
);

export const PrivacyPolicy = () => {
  const trail = [
    { name: 'Home', path: '/' },
    { name: 'Privacy Policy', path: '/privacy-policy' },
  ];

  return (
    <>
      <Seo
        title="Privacy Policy"
        description="How Studioz D handles the information you share through this website — what is collected, why, and how long it is kept."
        path="/privacy-policy"
        schemas={[breadcrumbSchema(trail)]}
      />

      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        lede="What this website collects, why it collects it, and what happens to it afterwards."
        breadcrumbs={trail}
        variant="plain"
      />

      <Prose>
        <ReviewNotice />

        <Section heading="What we collect">
          <P>
            When you send an enquiry through this website, we receive the details you type into
            the form: your name, phone number, email address, what you are interested in, any
            preferred date or budget you choose to share, and your message.
          </P>
          <P>
            We also receive basic attribution data with the enquiry — which page you were on,
            where you came from, and any campaign parameters in the URL. This tells us which
            parts of the site are doing their job.
          </P>
        </Section>

        <Section heading="How the form works">
          <P>
            This website has no backend and no database. Enquiries are delivered by EmailJS, a
            third-party service that sends the form contents to our inbox. Your details pass
            through EmailJS on the way to us and are subject to their handling of that data.
          </P>
          <P>
            Two quiet anti-spam checks run on submission: a hidden field that only automated
            scripts fill in, and a check that the form was not completed impossibly fast.
            Neither collects anything about you.
          </P>
        </Section>

        <Section heading="Personalization previews">
          <P>
            If you use the customize preview on a gift page, anything you type and any image you
            choose stays in your browser. Nothing is uploaded, nothing is transmitted, and
            nothing is stored by us. Closing the page discards it entirely.
          </P>
        </Section>

        <Section heading="Analytics">
          <P>
            {siteConfig.analytics.ga4MeasurementId || siteConfig.analytics.clarityProjectId
              ? 'This site uses analytics to understand which pages are useful and where people get stuck. IP addresses are anonymised. We do not use analytics to identify individual visitors.'
              : 'Analytics are not currently enabled on this deployment. If they are switched on later, this section will describe exactly what is measured.'}
          </P>
          <List
            items={[
              'Pages visited and how long they were open',
              'Which works, services and gift categories are viewed',
              'Clicks on WhatsApp, email and enquiry buttons',
              'Device type, browser and approximate region',
            ]}
          />
        </Section>

        <Section heading="What we do not do">
          <List
            items={[
              'We do not sell or rent your details to anyone.',
              'We do not add you to a mailing list because you sent an enquiry.',
              'We do not use your enquiry for anything other than replying to it.',
              'We do not publish your photographs without your permission.',
            ]}
          />
        </Section>

        <Section heading="Your photographs">
          <P>
            Photographs taken for you are yours to share, print and keep. They are only shown
            publicly — on this website, in our portfolio or on social media — with your
            permission. If you would rather they stayed private, tell us and they will not
            appear anywhere.
          </P>
        </Section>

        <Section heading="How long we keep things">
          <P>
            Enquiries are kept for as long as they are commercially useful — typically while a
            project is being planned, delivered, and for a reasonable period afterwards. Ask us
            to delete your details and we will.
          </P>
        </Section>

        <Section heading="Your rights">
          <P>
            You can ask us what we hold about you, ask for it to be corrected, or ask for it to
            be deleted. Specific statutory rights depend on where you live; this section should
            be completed with the applicable jurisdiction before launch.
          </P>
        </Section>

        <Section heading="Contact">
          <P>
            {hasEmail()
              ? `Questions about any of this can go to ${siteConfig.contact.email}.`
              : 'Questions about any of this can be sent through the contact form. A dedicated privacy contact address should be added here before launch.'}
          </P>
        </Section>
      </Prose>
    </>
  );
};

export const Terms = () => {
  const trail = [
    { name: 'Home', path: '/' },
    { name: 'Terms', path: '/terms' },
  ];

  return (
    <>
      <Seo
        title="Terms"
        description="Terms covering the use of the Studioz D website, its imagery, and how enquiries and quotations work."
        path="/terms"
        schemas={[breadcrumbSchema(trail)]}
      />

      <PageHero
        eyebrow="Legal"
        title="Terms"
        lede="How this website may be used, what its content means, and what an enquiry does and does not commit either of us to."
        breadcrumbs={trail}
        variant="plain"
      />

      <Prose>
        <ReviewNotice />

        <Section heading="Using this website">
          <P>
            You are welcome to browse, share links and read anything here. The website is
            provided as it is — we work hard to keep it accurate and available, but we cannot
            guarantee it will be uninterrupted or error-free.
          </P>
        </Section>

        <Section heading="Photographs and content">
          <P>
            Every photograph, film, layout and piece of writing on this site belongs to{' '}
            {siteConfig.name} or is used with permission. You may not copy, reproduce,
            redistribute or use any of it commercially without written permission.
          </P>
          <P>
            Sharing a link to a page is always fine. Downloading an image and reposting it as
            your own is not.
          </P>
        </Section>

        <Section heading="Enquiries and quotations">
          <P>
            Sending an enquiry starts a conversation. It is not a booking, and it does not
            reserve a date. A date is only held once it is confirmed in writing and any agreed
            booking terms are met.
          </P>
          <P>
            Nothing on this website is a price. Every project is quoted individually based on
            coverage, deliverables, team size and travel. Where the site shows a range label, it
            is an indicative planning band and not an offer.
          </P>
        </Section>

        <Section heading="Personalized creations">
          <P>
            Every gift is made to order. Layouts and engraving text are proofed with you before
            production begins — once you approve a proof, that is what gets made. Please check
            spelling and dates carefully, because a custom piece cannot be remade for a typo that
            was approved.
          </P>
          <P>
            By sending us photographs to use in a creation, you confirm you have the right to use
            them.
          </P>
        </Section>

        <Section heading="Third-party services">
          <P>
            The enquiry form is delivered by EmailJS, and WhatsApp links open WhatsApp. Those
            services have their own terms, which apply when you use them.
          </P>
        </Section>

        <Section heading="Commercial terms">
          <P>
            Booking terms, payment schedules, cancellation, rescheduling, delivery timelines,
            usage rights and liability are agreed per project and set out in writing before work
            begins. Those agreed terms take precedence over anything on this page.
          </P>
          <P>
            The governing law, company registration details and dispute-resolution process should
            be completed here before launch.
          </P>
        </Section>

        <Section heading="Changes">
          <P>
            These terms may be updated as the studio&rsquo;s services change. The version in
            force is the one published here at the time you use the site.
          </P>
        </Section>
      </Prose>
    </>
  );
};

export default PrivacyPolicy;
