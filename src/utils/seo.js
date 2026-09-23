/**
 * JSON-LD builders.
 *
 * Rule followed throughout: emit only what the page genuinely represents, and
 * only from data the studio has actually supplied. Nothing here fabricates a
 * review, rating, price, award or address. Fields resolve to `undefined` when
 * unconfigured and are stripped before output.
 */

import { siteConfig, absoluteUrl, socialProfiles, hasAddress } from '@/config/site';

/** Recursively removes undefined/null/empty values so no hollow keys ship. */
const prune = (value) => {
  if (Array.isArray(value)) {
    const cleaned = value.map(prune).filter((item) => item !== undefined);
    return cleaned.length ? cleaned : undefined;
  }
  if (value && typeof value === 'object') {
    const entries = Object.entries(value)
      .map(([key, val]) => [key, prune(val)])
      .filter(([, val]) => val !== undefined);
    return entries.length ? Object.fromEntries(entries) : undefined;
  }
  if (typeof value === 'string') return value.trim() ? value : undefined;
  return value === null ? undefined : value;
};

/** Only emitted when the studio has supplied a locality and country. */
const postalAddress = () => {
  if (!hasAddress()) return undefined;
  const { street, locality, region, postalCode, country } = siteConfig.address;
  return prune({
    '@type': 'PostalAddress',
    streetAddress: street,
    addressLocality: locality,
    addressRegion: region,
    postalCode,
    addressCountry: country,
  });
};

export const organizationSchema = () =>
  prune({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    description: siteConfig.description,
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl('/assets/brand/studioz-d-logo-512.png'),
      width: 512,
      height: 512,
    },
    email: siteConfig.contact.email || undefined,
    telephone: siteConfig.contact.phone || undefined,
    address: postalAddress(),
    sameAs: socialProfiles().length ? socialProfiles() : undefined,
  });

/**
 * LocalBusiness is only meaningful with a physical address, so it is skipped
 * entirely until one is configured — an empty LocalBusiness is worse than none.
 */
export const localBusinessSchema = () => {
  if (!hasAddress()) return null;
  return prune({
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${siteConfig.url}/#localbusiness`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    image: absoluteUrl(siteConfig.seo.defaultOgImage),
    email: siteConfig.contact.email || undefined,
    telephone: siteConfig.contact.phone || undefined,
    address: postalAddress(),
    sameAs: socialProfiles().length ? socialProfiles() : undefined,
  });
};

export const websiteSchema = () =>
  prune({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    publisher: { '@id': `${siteConfig.url}/#organization` },
    inLanguage: siteConfig.language,
  });

/** `trail` is [{ name, path }], ordered root-first. */
export const breadcrumbSchema = (trail = []) => {
  if (trail.length < 2) return null;
  return prune({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  });
};

/** Service schema — no `offers`, because no pricing has been supplied. */
export const serviceSchema = (service) => {
  if (!service) return null;
  return prune({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    serviceType: service.title,
    description: service.summary,
    url: absoluteUrl(`/services/${service.slug}`),
    image: absoluteUrl(service.heroImage),
    provider: { '@id': `${siteConfig.url}/#organization` },
    areaServed: hasAddress() ? siteConfig.address.country : undefined,
  });
};

export const articleSchema = (article) => {
  if (!article) return null;
  return prune({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: absoluteUrl(article.coverImage),
    datePublished: article.date,
    dateModified: article.date,
    url: absoluteUrl(`/journal/${article.slug}`),
    author: { '@id': `${siteConfig.url}/#organization` },
    publisher: { '@id': `${siteConfig.url}/#organization` },
    articleSection: article.categoryLabel,
    inLanguage: siteConfig.language,
  });
};

/** ImageGallery for a project page — describes the work without claiming more. */
export const imageGallerySchema = (work) => {
  if (!work) return null;
  return prune({
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: `${work.title} — ${work.category} by ${siteConfig.name}`,
    description: work.description,
    url: absoluteUrl(`/works/${work.slug}`),
    dateCreated: work.year || undefined,
    author: { '@id': `${siteConfig.url}/#organization` },
    image: work.images.slice(0, 8).map((image) =>
      prune({
        '@type': 'ImageObject',
        contentUrl: absoluteUrl(image.src),
        width: image.width,
        height: image.height,
        caption: image.caption || image.alt,
      })
    ),
  });
};

/**
 * Product schema WITHOUT `offers` or `aggregateRating`.
 * Both require real data; omitting them is correct, not a gap.
 */
export const giftProductSchema = (gift) => {
  if (!gift) return null;
  return prune({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: gift.name,
    description: gift.description,
    category: gift.category,
    url: absoluteUrl(`/gifts/product/${gift.slug}`),
    image: gift.images.map((image) => absoluteUrl(image.src)),
    material: gift.material,
    brand: { '@type': 'Brand', name: siteConfig.name },
    manufacturer: { '@id': `${siteConfig.url}/#organization` },
  });
};

export const faqSchema = (items = []) => {
  const valid = items.filter((item) => item?.q && item?.a);
  if (!valid.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: valid.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
};

export const collectionPageSchema = ({ name, description, path, items = [] }) =>
  prune({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url: absoluteUrl(path),
    isPartOf: { '@id': `${siteConfig.url}/#website` },
    mainEntity: items.length
      ? {
          '@type': 'ItemList',
          numberOfItems: items.length,
          itemListElement: items.slice(0, 20).map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            url: absoluteUrl(item.path),
          })),
        }
      : undefined,
  });

/** Combines schemas into a single graph, dropping any that returned null. */
export const combineSchemas = (...schemas) => schemas.filter(Boolean);
