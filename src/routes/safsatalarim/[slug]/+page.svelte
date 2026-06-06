<script>
  import { site } from '$lib/site.js';
  export let data;
  $: ({ slug, title, subtitle, date, description, html } = data);

  $: pageTitle = `${title} — ${site.name}`;
  $: canonical = `${site.url}/safsatalarim/${slug}`;
  $: ogImage = site.url + site.defaultImage;

  $: jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: ogImage,
    datePublished: date || undefined,
    author: {
      '@type': 'Person',
      name: site.name,
      url: site.url
    },
    publisher: {
      '@type': 'Person',
      name: site.name,
      url: site.url
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonical
    }
  };

  function formatDate(iso) {
    if (!iso) return '';
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  }
</script>

<svelte:head>
  <title>{pageTitle}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={canonical} />

  <meta property="og:type" content="article" />
  <meta property="og:site_name" content={site.name} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content={canonical} />
  <meta property="og:image" content={ogImage} />
  <meta property="og:locale" content={site.locale} />
  {#if date}<meta property="article:published_time" content={date} />{/if}
  <meta property="article:author" content={site.name} />

  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={ogImage} />

  {@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</` + `script>`}
</svelte:head>

<main class="page">
  <a class="back" href="/">← Bosh sahifa</a>

  <header class="head">
    {#if date}<time class="date">{formatDate(date)}</time>{/if}
    <h1>{title}</h1>
    {#if subtitle}<p class="subtitle">{subtitle}</p>{/if}
  </header>

  <hr class="rule" />

  <article class="prose">{@html html}</article>
</main>

<style>
  .page {
    max-width: var(--max-w);
    margin: 0 auto;
    padding: 64px 24px 96px;
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  .back {
    align-self: flex-start;
    font-size: 13px;
    color: var(--muted-2);
    text-decoration: none;
    transition: color 180ms ease;
  }

  .back:hover {
    color: var(--fg);
  }

  .head {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .date {
    color: var(--muted);
    font-size: 13px;
    font-variant-numeric: tabular-nums;
  }

  .head h1 {
    font-size: 22px;
    font-weight: 600;
    line-height: 1.25;
    letter-spacing: -0.03em;
  }

  .subtitle {
    color: var(--muted-2);
    font-size: 15px;
    line-height: 1.5;
    max-width: 46ch;
  }

  .rule {
    border: 0;
    border-top: 1px solid var(--rule);
    margin: 0;
  }

  .prose {
    color: var(--fg);
    font-size: 14px;
    line-height: 1.7;
    max-width: 60ch;
  }

  .prose :global(p) {
    margin: 0 0 16px;
  }

  .prose :global(p:last-child) {
    margin-bottom: 0;
  }

  .prose :global(strong) {
    font-weight: 600;
    color: #f3f3f3;
  }

  .prose :global(em) {
    font-style: italic;
  }

  .prose :global(a) {
    color: var(--fg);
    text-decoration: underline;
    text-decoration-color: var(--muted);
    text-underline-offset: 3px;
  }

  .prose :global(a:hover) {
    text-decoration-color: var(--fg);
  }

  .prose :global(h2) {
    font-size: 16px;
    font-weight: 600;
    margin: 28px 0 12px;
  }

  .prose :global(h3) {
    font-size: 14px;
    font-weight: 600;
    margin: 24px 0 10px;
  }

  .prose :global(ul),
  .prose :global(ol) {
    margin: 0 0 16px;
    padding-left: 20px;
  }

  .prose :global(ul) {
    list-style: disc;
  }

  .prose :global(ol) {
    list-style: decimal;
  }

  .prose :global(li) {
    margin-bottom: 6px;
  }

  .prose :global(blockquote) {
    margin: 16px 0;
    padding-left: 16px;
    border-left: 2px solid var(--rule);
    color: var(--muted-2);
  }

  .prose :global(code) {
    background: #14161a;
    padding: 1px 6px;
    border-radius: 4px;
    font-size: 13px;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  }

  .prose :global(pre) {
    background: #0f1114;
    padding: 14px 16px;
    border-radius: 8px;
    overflow-x: auto;
    margin: 0 0 16px;
  }

  .prose :global(pre code) {
    background: transparent;
    padding: 0;
  }

  .prose :global(hr) {
    border: 0;
    border-top: 1px solid var(--rule);
    margin: 24px 0;
  }

  @media (max-width: 640px) {
    .page {
      padding: 40px 20px 64px;
      gap: 24px;
    }

    .prose {
      font-size: 15px;
      line-height: 1.65;
    }
  }

  @media (max-width: 480px) {
    .page {
      padding: 32px 16px 56px;
    }

    .head h1 {
      font-size: 20px;
    }

    .subtitle {
      font-size: 14px;
    }
  }
</style>
