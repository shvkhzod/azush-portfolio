import { site } from '$lib/site.js';

const raw = import.meta.glob('../../../content/sayings/*.md', {
  eager: true,
  query: '?raw',
  import: 'default'
});

function fileToSlug(filePath) {
  return filePath.split('/').pop().replace(/\.md$/, '').replace(/^\d+-/, '');
}

function parseDate(text) {
  const m = text.match(/^date:\s*(.*)$/m);
  return m ? m[1].trim() : '';
}

export const prerender = true;

export function GET() {
  const posts = Object.entries(raw).map(([file, content]) => ({
    slug: fileToSlug(file),
    lastmod: parseDate(content)
  }));

  const urls = [
    { loc: `${site.url}/`, priority: '1.0', changefreq: 'monthly' },
    ...posts.map((p) => ({
      loc: `${site.url}/safsatalarim/${p.slug}`,
      lastmod: p.lastmod || undefined,
      priority: '0.8',
      changefreq: 'monthly'
    }))
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ''}
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'max-age=0, s-maxage=3600'
    }
  });
}
