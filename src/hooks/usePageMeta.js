import { useEffect } from 'react';

const SITE_NAME = 'MakTech';
const SITE_URL = import.meta.env.VITE_SITE_URL ?? 'https://maktech.io';
const DEFAULT_OG_IMAGE = `${SITE_URL}/maktech_logo.webp`;

/**
 * usePageMeta — dynamically updates <title>, <meta name="description">,
 * and Open Graph/Twitter Card tags on each public page.
 *
 * Call at the top of any public page component:
 *
 *   usePageMeta({
 *     title: 'Home',
 *     description: 'MakTech builds scalable digital products...',
 *     canonicalPath: '/',
 *   });
 *
 * Requires the static OG placeholder tags in index.html to already exist
 * (added in the index.html update). React overwrites their `content` on mount.
 */
export const usePageMeta = ({
  title,
  description = '',
  ogImage = DEFAULT_OG_IMAGE,
  canonicalPath,
} = {}) => {
  useEffect(() => {
    const fullTitle = title ? `${title} — ${SITE_NAME}` : SITE_NAME;

    // Document title
    document.title = fullTitle;

    // Helper — updates a single meta/link tag without throwing if absent
    const setMeta = (selector, attr, value) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute(attr, value);
    };

    setMeta('meta[name="description"]', 'content', description);

    // Open Graph
    setMeta('meta[property="og:title"]', 'content', fullTitle);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:image"]', 'content', ogImage);
    if (canonicalPath) {
      const canonicalUrl = `${SITE_URL}${canonicalPath}`;
      setMeta('meta[property="og:url"]', 'content', canonicalUrl);
      setMeta('link[rel="canonical"]', 'href', canonicalUrl);
    }

    // Twitter Card
    setMeta('meta[name="twitter:title"]', 'content', fullTitle);
    setMeta('meta[name="twitter:description"]', 'content', description);
    setMeta('meta[name="twitter:image"]', 'content', ogImage);
  }, [title, description, ogImage, canonicalPath]);
};
