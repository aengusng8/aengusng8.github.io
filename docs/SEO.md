# Search visibility: Anh Nguyen

## Scope and limits

This change improves crawlability and identity accuracy, not a guaranteed rank.
The unqualified name "Anh Nguyen" is shared by many people. Search results vary
by query and location. General web-search results are not a Google rank report.
Actual impressions, clicks, position, and selected canonical URLs require the
owner's Google Search Console data. No ranking improvement has been measured yet.

## Verified findings (2026-09-27)

- Production homepage, robots.txt, sitemap.xml, and cv.pdf returned HTTP 200.
  The homepage was indexable and had the correct HTTPS canonical already.
- The live sitemap contained 16 URLs, including al-folio examples and an old
  HTML CV rendering another person's Stanford/Tsinghua/OpenAI history.
- The old Person schema asserted Wisconsin-Madison alumni status without
  support from the visible profile, and was repeated on unrelated pages.
- The publications page showed only 2025, despite the homepage having six papers.
- The official JHU page confirms Anh Nguyen as a PhD Student and already links
  back to this website: https://engineering.jhu.edu/vpatel36/team/anh-nguyen/.
- Search Console ownership is unknown. An empty verification setting in the
  repository does not rule out another verification method.

## SEO changes

- Preserved the user's exact homepage title: "Anh Nguyen • phd • generative & world models".
- Consistent site name, canonical URLs, social metadata, and escaped attributes.
- Homepage-only WebSite/ProfilePage/Person identity graph with the verified JHU
  profile and existing social profiles. Removed unsupported alumni status and
  artificial alternate names. Other real pages describe themselves as WebPage.
- Retained the user's exact "Toward superhuman intelligence..." description and
  affiliation data-nosnippet settings. Neither forces Google's final snippet.
- Replaced the obsolete HTML CV with a link to the current PDF; no original CV
  data files were deleted. Existing template URLs stay accessible but noindex.
- Removed 13 legacy URLs from the sitemap; retained home, publications, cv.pdf.
  Archives consisting entirely of noindex posts inherit that policy; a future
  archive with real indexable posts remains indexable.
- Included 2026 and 2025 on Publications, with six papers and a homepage link.
- Added last_modified_at only to pages substantively updated today. Update it
  on meaningful future edits, not automatically on every build.
- Added scripts/check_seo.rb to validate built HTML, structured data and sitemap.
- Added the owner's Google HTML verification file at
  `/googled1b40b095773bc83.html`, preserving its verification text. It stays out
  of the sitemap and must remain published after ownership verification.

## Owner action: Search Console

1. Open https://search.google.com/search-console and sign in. Check whether
   https://aengusng8.github.io/ is already in the property selector.
2. If absent, choose Add property -> URL prefix and enter the complete HTTPS URL.
   Use URL prefix, not a DNS Domain property for github.io, which you don't own.
3. The owner selected HTML file verification and supplied
   `googled1b40b095773bc83.html`. Publish this file at the site's root and confirm
   its public URL returns the exact verification text without authentication.
   Do not remove it after verification. Do not share passwords or cookies.
4. After the deployment is verified live, click Verify; submit `sitemap.xml`;
   inspect the homepage URL and select Request indexing if offered. This requests
   recrawling; it does not guarantee indexing, timing, or position.
5. In Performance, inspect queries for Anh Nguyen, Anh Nguyen JHU, Anh Nguyen
   Johns Hopkins, and Anh Nguyen generative models. Compare like-for-like date
   ranges, countries and devices; exact-name results alone are not sufficient.

## Next high-value identity work

- Keep the existing JHU backlink and update LinkedIn, Scholar, OpenReview and
  ORCID homepage fields to the same HTTPS URL where those profiles actually exist.
  Do not invent profile identifiers or edit other people's profiles.
- Prefer relevant, earned links from research pages, coauthors and institutions.
  No purchased links, keyword-stuffed hidden text, fake credentials or doorway pages.
- Avoid repeated new CSS/metadata tweaks as a substitute for Search Console data
  and external recognition. Structured data is not a ranking guarantee.

## Verification command

```sh
bundle exec jekyll build --destination /path/to/build
bundle exec ruby scripts/check_seo.rb /path/to/build
```

## Primary references

- https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- https://developers.google.com/search/docs/appearance/title-link
- https://developers.google.com/search/docs/appearance/site-names
- https://developers.google.com/search/docs/appearance/structured-data/profile-page
- https://developers.google.com/search/docs/appearance/structured-data/sd-policies
- https://developers.google.com/search/docs/crawling-indexing/block-indexing
- https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- https://support.google.com/webmasters/answer/9008080
