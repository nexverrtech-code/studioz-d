import { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Seo } from '@/components/seo/Seo';
import { PageHero } from '@/components/hero/PageHero';
import { SectionHeading } from '@/components/common/SectionHeading';
import { GalleryFilters } from '@/components/gallery/GalleryFilters';
import { MasonryGallery } from '@/components/gallery/MasonryGallery';
import { GalleryLightbox } from '@/components/gallery/GalleryLightbox';
import { GalleryEmptyState } from '@/components/common/States';
import { CtaSection } from '@/components/sections/CtaSection';
import { FeaturedProjects } from '@/components/sections/FeaturedProjects';
import { WorkCard } from '@/components/cards/WorkCard';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';
import {
  workCategories,
  getAllPhotos,
  filterWorks,
  getCategoryBySegment,
  getCategoryById,
  routableWorkCategories,
} from '@/data/works';
import { breadcrumbSchema, collectionPageSchema } from '@/utils/seo';
import { trackFilter, trackLightboxOpen } from '@/services/analytics.service';
import { useMediaQuery } from '@/hooks/useMediaQuery';

/** Smaller first page on phones — fewer images downloaded before interaction. */
const PAGE_SIZE_DESKTOP = 12;
const PAGE_SIZE_MOBILE = 8;
const LOAD_MORE_STEP = 12;

/**
 * `categorySegment` arrives as a prop from the generated category routes
 * (see router.jsx). The `useParams` fallback keeps the component usable if it
 * is ever mounted on a dynamic path.
 */
export const Works = ({ categorySegment: segmentProp }) => {
  const params = useParams();
  const categorySegment = segmentProp ?? params.category;
  const navigate = useNavigate();
  const isMobile = !useMediaQuery('(min-width: 768px)');

  const routeCategory = categorySegment ? getCategoryBySegment(categorySegment) : null;
  const [activeId, setActiveId] = useState(routeCategory?.id ?? 'all');
  const [visible, setVisible] = useState(isMobile ? PAGE_SIZE_MOBILE : PAGE_SIZE_DESKTOP);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Keep the chip selection in step with the URL when navigating between
  // category routes directly.
  useEffect(() => {
    setActiveId(routeCategory?.id ?? 'all');
    setVisible(isMobile ? PAGE_SIZE_MOBILE : PAGE_SIZE_DESKTOP);
  }, [routeCategory?.id, isMobile]);

  const photos = useMemo(() => getAllPhotos(activeId), [activeId]);
  const projects = useMemo(() => filterWorks(activeId), [activeId]);

  // Counts drive the number beside each chip, so the UI never offers a filter
  // that would return nothing.
  const counts = useMemo(() => {
    const entries = {};
    for (const category of workCategories) {
      entries[category.id] = getAllPhotos(category.id).length;
    }
    return entries;
  }, []);

  const shown = photos.slice(0, visible);
  const hasMore = visible < photos.length;

  // Hero uses the strongest frame from the current view, so a category page
  // leads with its own work rather than a generic cover.
  const heroPhoto = photos[0];
  const heroImage = heroPhoto?.src;
  const heroAlt = heroPhoto?.alt ?? '';

  // Two projects, presented large. Never more — this is a feature, not a grid.
  const featuredProjects = projects.filter((project) => project.featured).slice(0, 2);

  /**
   * Hero signposts: the categories actually represented in the current view,
   * so the strip describes the work on screen rather than an aspiration.
   */
  const heroFacets = useMemo(
    () => [...new Set(photos.map((photo) => photo.category))].slice(0, 6),
    [photos]
  );

  const onFilterChange = (id) => {
    trackFilter('works', id);
    const category = getCategoryById(id);
    // Categories that own a URL navigate; the rest filter in place.
    if (category?.segment) navigate(`/works/${category.segment}`);
    else if (categorySegment) navigate('/works');
    else {
      setActiveId(id);
      setVisible(isMobile ? PAGE_SIZE_MOBILE : PAGE_SIZE_DESKTOP);
    }
  };

  const openLightbox = (index) => {
    trackLightboxOpen('works-gallery');
    setLightboxIndex(index);
  };

  // An unrecognised category segment is a 404.
  if (categorySegment && !routeCategory) return <Navigate to="/404" replace />;

  const isFiltered = activeId !== 'all';
  const activeCategory = getCategoryById(activeId);

  const trail = [
    { name: 'Home', path: '/' },
    { name: 'Works', path: '/works' },
    ...(routeCategory ? [{ name: routeCategory.label, path: `/works/${routeCategory.segment}` }] : []),
  ];

  const title = routeCategory?.heroTitle ?? 'Our Visual Stories';

  const description = routeCategory
    ? `${routeCategory.seoTitle} by Studioz D. ${routeCategory.lede}`
    : 'A collection of moments, people, celebrations and creations captured by Studioz D. Weddings, portraits, events, products, films and personalized gifts.';

  const lede =
    routeCategory?.lede ??
    'A collection of moments, people, celebrations and creations captured by Studioz D.';

  return (
    <>
      <Seo
        title={routeCategory ? `${routeCategory.seoTitle} — Our Work` : 'Our Work'}
        description={description}
        path={routeCategory ? `/works/${routeCategory.segment}` : '/works'}
        image={projects[0]?.coverImage}
        schemas={[
          breadcrumbSchema(trail),
          collectionPageSchema({
            name: title,
            description,
            path: routeCategory ? `/works/${routeCategory.segment}` : '/works',
            items: projects.map((project) => ({
              name: project.title,
              path: `/works/${project.slug}`,
            })),
          }),
        ]}
      />

      {/* Compact image hero. Kept short on purpose — the photography is the
          point, and it should not sit below the fold. */}
      <PageHero
        eyebrow={routeCategory ? routeCategory.label : 'The Portfolio'}
        title={title}
        lede={lede}
        breadcrumbs={trail}
        image={heroImage}
        imageAlt={heroAlt}
        layout="immersive"
        railLabel={routeCategory ? routeCategory.label : 'Portfolio'}
        railIndex={String(photos.length).padStart(2, '0')}
        facets={heroFacets}
        minHeight="clamp(19rem, 42svh, 30rem)"
      />

      {/* Category navigation */}
      <div
        className="sticky z-sticky border-y border-ink-100 bg-ivory-50/95 backdrop-blur-md"
        style={{ top: 'var(--sd-header-h)' }}
      >
        <div className="shell py-3">
          <GalleryFilters
            categories={workCategories}
            active={activeId}
            onChange={onFilterChange}
            counts={counts}
            label="Filter photographs by category"
          />
        </div>
      </div>

      {/* Featured work — two real projects, presented large. Only on the
          unfiltered view, where it is an overview rather than a duplicate of
          the grid below. */}
      {!isFiltered && featuredProjects.length > 0 && (
        <section className="section-sm" aria-labelledby="works-featured-title">
          <div className="shell">
            <SectionHeading
              eyebrow="Featured Work"
              title="Start here"
              id="works-featured-title"
              className="mb-7"
              titleClassName="text-fluid-2xl"
            />
          </div>
          <FeaturedProjects projects={featuredProjects} />
        </section>
      )}

      {/* Full gallery */}
      <section className="section-sm" aria-labelledby="works-gallery-title">
        <div className="shell">
          <SectionHeading
            eyebrow={isFiltered ? activeCategory?.label : 'Full Gallery'}
            title={isFiltered ? `Every frame in ${activeCategory?.label}` : 'Everything, in one place'}
            id="works-gallery-title"
            className="mb-7"
            titleClassName="text-fluid-2xl"
          />

          {photos.length === 0 ? (
            <GalleryEmptyState />
          ) : (
            <>
              <MasonryGallery photos={shown} onOpen={openLightbox} />

              {hasMore && (
                <div className="mt-14 flex flex-col items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setVisible((value) => value + LOAD_MORE_STEP)}
                    className="btn btn-outline"
                  >
                    <Plus className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
                    Load More
                  </button>
                  <p className="text-[0.68rem] tabular-nums uppercase tracking-widest text-ink-300">
                    Showing {shown.length} of {photos.length}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Projects behind the photographs */}
      {projects.length > 0 && (
        <section className="bleed bg-ivory-100 section" aria-labelledby="works-projects-title">
          <div className="shell">
            <SectionHeading
              eyebrow="The Projects"
              title="Every frame came from a story"
              id="works-projects-title"
              lede="Open a project to see the full set, the context and how the day unfolded."
              className="mb-8"
              titleClassName="text-fluid-2xl"
            />

            <RevealGroup className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <RevealItem key={project.slug} className="min-w-0">
                  <WorkCard work={project} aspect="3/2" />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}

      <CtaSection
        eyebrow="Your Turn"
        headingLines={['You have seen our stories.', 'Now let us create yours.']}
        copy="Your moment could be the next story on this wall."
        primary={{ label: 'Start a Conversation', to: '/contact' }}
        secondary={{ label: 'Explore Services', to: '/services' }}
      />

      <GalleryLightbox
        photos={photos}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </>
  );
};

/** Used by the sitemap generator and the router. */
export const workCategoryRoutes = routableWorkCategories.map((category) => category.segment);

export default Works;
