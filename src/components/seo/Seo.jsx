import { useLayoutEffect, useMemo, useRef } from 'react';
import { siteConfig, absoluteUrl } from '@/config/site';
import { pushHead } from './head-manager';

/**
 * Per-route metadata.
 *
 * Every page passes its own title and description — nothing is inherited by
 * accident, which is what stops a site shipping twenty pages with identical
 * meta. `noindex` is used for the admin surface and the 404.
 *
 * Renders no DOM of its own; it drives `head-manager`, which owns the
 * document head. See that file for why this is not react-helmet-async.
 */
export const Seo = ({
  title,
  description,
  path = '/',
  image,
  type = 'website',
  noindex = false,
  publishedTime,
  modifiedTime,
  /** JSON-LD objects; nulls are filtered so callers can pass conditionals. */
  schemas = [],
}) => {
  const fullTitle = title
    ? `${title} | ${siteConfig.name}`
    : `${siteConfig.name} — ${siteConfig.tagline}`;

  const metaDescription = description || siteConfig.description;
  const canonical = absoluteUrl(path);
  const ogImage = absoluteUrl(image || siteConfig.seo.defaultOgImage);

  // Serialised so the descriptor is only rebuilt when the output would
  // actually differ — schemas are fresh object literals on every render.
  const schemaJson = useMemo(
    () => schemas.filter(Boolean).map((schema) => JSON.stringify(schema)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(schemas.filter(Boolean))]
  );

  const descriptor = useMemo(() => {
    const tags = [
      { tag: 'meta', attrs: { name: 'description', content: metaDescription } },
      { tag: 'link', attrs: { rel: 'canonical', href: canonical } },
      {
        tag: 'meta',
        attrs: {
          name: 'robots',
          content: noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large',
        },
      },

      /* Open Graph */
      { tag: 'meta', attrs: { property: 'og:site_name', content: siteConfig.name } },
      { tag: 'meta', attrs: { property: 'og:type', content: type } },
      { tag: 'meta', attrs: { property: 'og:title', content: fullTitle } },
      { tag: 'meta', attrs: { property: 'og:description', content: metaDescription } },
      { tag: 'meta', attrs: { property: 'og:url', content: canonical } },
      { tag: 'meta', attrs: { property: 'og:image', content: ogImage } },
      { tag: 'meta', attrs: { property: 'og:image:alt', content: title || siteConfig.name } },
      { tag: 'meta', attrs: { property: 'og:locale', content: siteConfig.locale } },

      /* Twitter / X */
      { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
      { tag: 'meta', attrs: { name: 'twitter:title', content: fullTitle } },
      { tag: 'meta', attrs: { name: 'twitter:description', content: metaDescription } },
      { tag: 'meta', attrs: { name: 'twitter:image', content: ogImage } },
    ];

    if (publishedTime) {
      tags.push({ tag: 'meta', attrs: { property: 'article:published_time', content: publishedTime } });
    }
    if (modifiedTime) {
      tags.push({ tag: 'meta', attrs: { property: 'article:modified_time', content: modifiedTime } });
    }
    if (siteConfig.seo.twitterHandle) {
      tags.push({ tag: 'meta', attrs: { name: 'twitter:site', content: siteConfig.seo.twitterHandle } });
    }
    if (siteConfig.analytics.searchConsoleVerification) {
      tags.push({
        tag: 'meta',
        attrs: {
          name: 'google-site-verification',
          content: siteConfig.analytics.searchConsoleVerification,
        },
      });
    }

    for (const json of schemaJson) {
      tags.push({ tag: 'script', attrs: { type: 'application/ld+json' }, text: json });
    }

    return { title: fullTitle, lang: siteConfig.language, tags };
  }, [
    fullTitle,
    metaDescription,
    canonical,
    ogImage,
    type,
    noindex,
    title,
    publishedTime,
    modifiedTime,
    schemaJson,
  ]);

  const handleRef = useRef(null);

  // Layout effect so the head is correct before the browser paints, and so
  // the analytics page_view (which reads document.title) sees the right value.
  useLayoutEffect(() => {
    handleRef.current = pushHead(descriptor);
    return () => {
      handleRef.current?.release();
      handleRef.current = null;
    };
    // Mount/unmount only — updates are pushed below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    handleRef.current?.update(descriptor);
  }, [descriptor]);

  return null;
};

export default Seo;
