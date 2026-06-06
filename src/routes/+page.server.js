import fs from 'node:fs';
import path from 'node:path';

const workRaw = import.meta.glob('../../content/work/*.md', {
  eager: true,
  query: '?raw',
  import: 'default'
});

const sayingsRaw = import.meta.glob('../../content/sayings/*.md', {
  eager: true,
  query: '?raw',
  import: 'default'
});

const bioRaw = import.meta.glob('../../content/bio.md', {
  eager: true,
  query: '?raw',
  import: 'default'
});

function parseMatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, body: raw.trim() };
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

function parseEntries(raw) {
  return Object.entries(raw)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([filePath, content]) => {
      const { data, body } = parseMatter(content);
      return { slug: fileToSlug(filePath), ...data, body };
    });
}

const FALLBACK_HOBBIES = [
  'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&q=80',
  'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=80',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&q=80',
  'https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&q=80'
];

function loadHobbies() {
  const dir = path.join(process.cwd(), 'static', 'hobbies');
  if (!fs.existsSync(dir)) return FALLBACK_HOBBIES;
  const files = fs
    .readdirSync(dir)
    .filter((f) => /\.(jpe?g|png|webp|gif)$/i.test(f))
    .sort();
  return files.length ? files.map((f) => `/hobbies/${f}`) : FALLBACK_HOBBIES;
}

export const prerender = true;

export function load() {
  const bioFile = Object.values(bioRaw)[0] ?? '';
  const bio = parseMatter(bioFile);

  return {
    bio: { ...bio.data, body: bio.body },
    work: parseEntries(workRaw),
    sayings: parseEntries(sayingsRaw),
    hobbies: loadHobbies()
  };
}
