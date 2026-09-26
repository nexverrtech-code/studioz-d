import { Link } from 'react-router-dom';
import { Seo } from '@/components/seo/Seo';
import { PageHero } from '@/components/hero/PageHero';
import { services } from '@/data/services';
import { works, routableWorkCategories } from '@/data/works';
import { gifts, routableGiftCategories } from '@/data/gifts';
import { journal } from '@/data/journal';
import { breadcrumbSchema } from '@/utils/seo';

/**
 * Human-readable sitemap.
 *
 * Built from the same data files that `scripts/generate-sitemap.mjs` reads,
 * so this page and `sitemap.xml` cannot drift apart.
 */
const Group = ({ heading, links }) => (
  <section className="flex min-w-0 flex-col gap-4">
    <h2 className="text-[0.66rem] font-semibold uppercase tracking-widest-xl text-champagne-700">
      {heading}
    </h2>
    <ul className="flex flex-col gap-2">
      {links.map((link) => (
        <li key={link.to}>
          <Link
            to={link.to}
            className="link-underline text-fluid-sm text-ink-500 transition-colors hover:text-ink-900"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </section>
);

export const SitemapPage = () => {
  const trail = [
    { name: 'Home', path: '/' },
    { name: 'Sitemap', path: '/sitemap' },
  ];

  const groups = [
    {
      heading: 'Main',
      links: [
        { label: 'Home', to: '/' },
        { label: 'About', to: '/about' },
        { label: 'Services', to: '/services' },
        { label: 'Works', to: '/works' },
        { label: 'Gifts', to: '/gifts' },
        { label: 'Journal', to: '/journal' },
        { label: 'Contact', to: '/contact' },
        { label: 'FAQ', to: '/faq' },
      ],
    },
    {
      heading: 'Photography & Film',
      links: services.map((service) => ({
        label: service.title,
        to: `/services/${service.slug}`,
      })),
    },
    {
      heading: 'Work Categories',
      links: routableWorkCategories.map((category) => ({
        label: category.label,
        to: `/works/${category.segment}`,
      })),
    },
    {
      heading: 'Projects',
      links: works.map((work) => ({ label: work.title, to: `/works/${work.slug}` })),
    },
    {
      heading: 'Gift Collections',
      links: routableGiftCategories.map((category) => ({
        label: category.label,
        to: `/gifts/${category.slug}`,
      })),
    },
    {
      heading: 'Gift Creations',
      links: gifts.map((gift) => ({ label: gift.name, to: `/gifts/product/${gift.slug}` })),
    },
    {
      heading: 'Journal',
      links: journal.map((article) => ({
        label: article.title,
        to: `/journal/${article.slug}`,
      })),
    },
    {
      heading: 'Legal',
      links: [
        { label: 'Privacy Policy', to: '/privacy-policy' },
        { label: 'Terms', to: '/terms' },
        { label: 'Sitemap', to: '/sitemap' },
      ],
    },
  ];

  const totalPages = groups.reduce((sum, group) => sum + group.links.length, 0);

  return (
    <>
      <Seo
        title="Sitemap"
        description="Every page on the Studioz D website — services, projects, gift collections, creations and journal articles."
        path="/sitemap"
        schemas={[breadcrumbSchema(trail)]}
      />

      <PageHero
        eyebrow="Sitemap"
        title="Everything, in one list."
        lede={`All ${totalPages} pages on this site, grouped by section.`}
        railLabel="Sitemap"
        breadcrumbs={trail}
        variant="plain"
      />

      <section className="section">
        <div className="shell grid grid-cols-1 gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
          {groups.map((group) => (
            <Group key={group.heading} heading={group.heading} links={group.links} />
          ))}
        </div>
      </section>
    </>
  );
};

export default SitemapPage;
