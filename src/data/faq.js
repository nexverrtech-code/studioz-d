/**
 * Site-wide FAQ, grouped by topic.
 *
 * Answers stay deliberately non-committal on anything the studio has not
 * confirmed (pricing, turnaround, travel radius). Every such answer points to
 * a conversation rather than inventing a number.
 */

export const faqGroups = [
  {
    id: 'booking',
    label: 'Booking & Planning',
    items: [
      {
        q: 'How do we start?',
        a: 'Send an enquiry with the date, the kind of session and roughly what you are picturing. We reply with availability and a few questions, then talk properly before anything is confirmed.',
      },
      {
        q: 'How far in advance should we book?',
        a: 'For weddings and large events, as soon as the date is fixed — season dates go early. Portrait, product and family sessions usually need less notice. If your date is close, ask anyway; availability changes.',
      },
      {
        q: 'What does it cost?',
        a: 'Pricing depends on coverage, team size, deliverables and travel, so we quote per project rather than publishing a list. Tell us what you need and you will get a clear, itemised figure with nothing hidden in it.',
      },
      {
        q: 'Do you travel for shoots?',
        a: 'Yes. Travel and accommodation are worked out transparently as part of the quote, and agreed before anything is booked.',
      },
      {
        q: 'Can we book photography and film together?',
        a: 'Yes, and it is the better way to do it. One team planning both means the two sides never end up in each other’s frames.',
      },
    ],
  },
  {
    id: 'shoot',
    label: 'On the Day',
    items: [
      {
        q: 'How many photographers will be there?',
        a: 'It depends on the event. A portrait session is one person; a full wedding day is usually a team. The crew is sized to the coverage and confirmed in writing beforehand.',
      },
      {
        q: 'Will you direct us?',
        a: 'For portraits, yes — gentle direction so you look like yourselves at your best. For ceremonies and celebrations, no. We observe rather than stage.',
      },
      {
        q: 'What happens if the weather turns?',
        a: 'Every outdoor shoot is planned with an alternative. Overcast light is genuinely excellent for portraits, and rain has produced some of our favourite frames.',
      },
      {
        q: 'Can we give you a shot list?',
        a: 'For family groups and specific people, absolutely — please do, it speeds everything up. For the candid coverage, a long prescriptive list tends to work against the photographs rather than for them.',
      },
    ],
  },
  {
    id: 'delivery',
    label: 'Editing & Delivery',
    items: [
      {
        q: 'When will we get our photographs?',
        a: 'A preview set comes first, while the event is still fresh. The full edited gallery follows on a timeline we confirm in writing before the shoot, so you always know what to expect.',
      },
      {
        q: 'How much retouching is included?',
        a: 'Every delivered frame is colour-corrected and finished. Detailed retouching on selected images is included where it suits the work, and can be extended on request.',
      },
      {
        q: 'Do we get the raw files?',
        a: 'We deliver finished, edited photographs rather than raw files. The edit is part of the work — unfinished files do not represent it.',
      },
      {
        q: 'How do we receive everything?',
        a: 'Through a private online gallery you can download from and share. Physical delivery of albums, frames and prints is arranged separately.',
      },
    ],
  },
  {
    id: 'gifts',
    label: 'Personalized Gifts',
    items: [
      {
        q: 'Can you use photographs we already have?',
        a: 'Yes. Most gifting projects start from photographs the client already owns. Phone photographs are usually fine — we will tell you honestly if one will not print well at the size you want.',
      },
      {
        q: 'What can be personalized?',
        a: 'Depending on the piece: a name, a message, a date and the photograph itself. Each product page lists exactly which fields it accepts and how much text works.',
      },
      {
        q: 'Will we see it before it is made?',
        a: 'Yes. Every printed, framed or engraved piece is proofed with you before production starts. Nothing gets cut or printed until you have approved it.',
      },
      {
        q: 'How long do gifts take?',
        a: 'Everything is made to order, so it depends on the piece and the finish. Timelines are confirmed at enquiry — start earlier than feels necessary if there is a fixed date.',
      },
      {
        q: 'Do you handle bulk and corporate orders?',
        a: 'Yes — return gifts, festive sets and corporate gifting are all produced at volume with per-recipient personalization where needed.',
      },
      {
        q: 'Can you build something that is not on the site?',
        a: 'Often, yes. Describe what you are picturing and we will tell you honestly whether it can be built and what it would involve.',
      },
    ],
  },
  {
    id: 'practical',
    label: 'Practical',
    items: [
      {
        q: 'Who owns the photographs?',
        a: 'Copyright stays with the studio, and you receive full personal usage rights to share, print and keep your photographs. Commercial usage is agreed separately and in writing.',
      },
      {
        q: 'Will our photographs be posted publicly?',
        a: 'Only with your permission. If you would rather your photographs stayed private, say so and they will not appear anywhere.',
      },
      {
        q: 'How is our data handled?',
        a: 'Enquiry details are used to respond to you and nothing else. The privacy policy sets out exactly what is collected and how long it is kept.',
      },
    ],
  },
];

/** Flattened list used for FAQPage structured data and search. */
export const allFaqs = faqGroups.flatMap((group) =>
  group.items.map((item) => ({ ...item, groupId: group.id, groupLabel: group.label }))
);

export default faqGroups;
