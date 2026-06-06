import { error } from '@sveltejs/kit';
import { marked } from 'marked';

const raw = import.meta.glob('../../../../content/sayings/*.md', {
  eager: true,
  query: '?raw',
  import: 'default'
});

function parseMatter(text) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, body: text.trim() };
  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const kv = line.match(/^([\w-]+):\s*(.*)$/);
    if (kv) data[kv[1]] = kv[2].trim().replace(/^["']|["']$/g, '');
  }
  return { data, body: match[2].trim() };
}

function fileToSlug(filePath) {
  const name = filePath.split('/').pop().replace(/\.md$/, '');
  return name.replace(/^\d+-/, '');
}

const posts = Object.entries(raw).map(([filePath, content]) => {
  const { data, body } = parseMatter(content);
  return { slug: fileToSlug(filePath), data, body };
});

marked.setOptions({ gfm: true, breaks: false });

export const prerender = true;

export function entries() {
  return posts.map((p) => ({ slug: p.slug }));
}

function buildDescription(post) {
  if (post.data.subtitle) return post.data.subtitle;
  const firstPara = post.body.split(/\n\s*\n/)[0] || '';
  const plain = firstPara.replace(/[*_`#>\[\]\(\)]/g, '').replace(/\s+/g, ' ').trim();
  return plain.length > 160 ? plain.slice(0, 157).trimEnd() + '…' : plain;
}

export function load({ params }) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) throw error(404, 'Topilmadi');

  return {
    slug: post.slug,
    title: post.data.title,
    subtitle: post.data.subtitle ?? '',
    date: post.data.date ?? '',
    description: buildDescription(post),
    html: marked.parse(post.body)
  };
}
