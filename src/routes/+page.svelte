<script>
  export let data;
  $: ({ bio, work, sayings, hobbies } = data);
</script>

<main class="page">
  <header class="intro">
    <div class="avatar">
      <img src={bio.avatar ?? '/avatar.png'} alt={bio.name} width="64" height="64" />
    </div>
    <h1>{bio.name}</h1>
    {#if bio.role}<p class="role">{bio.role}</p>{/if}
    {#if bio.body}<p class="bio">{bio.body}</p>{/if}
    {#if bio.cta_label && bio.cta_href}
      <a class="cta" href={bio.cta_href} target="_blank" rel="noopener noreferrer">
        <span>{bio.cta_label}</span>
        <svg
          class="cta-arrow"
          width="11"
          height="11"
          viewBox="0 0 10 10"
          aria-hidden="true"
          fill="none"
        >
          <path d="M2 8 L8 2 M3.5 2 H8 V6.5" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </a>
    {/if}
  </header>

  <hr class="rule" />

  <section class="work">
    {#each work as item}
      <article class="work-row">
        <div class="years">{item.years}</div>
        <div class="entry">
          <a class="company" href={item.href} target="_blank" rel="noopener noreferrer">{item.company}</a>
          <p class="desc">{item.body}</p>
        </div>
      </article>
    {/each}
  </section>

  <hr class="rule" />

  <section class="block">
    <h2>Chala Hobbim</h2>
    <div class="hobbies">
      {#each hobbies as src, i}
        <div class="hobby">
          <img src={src} alt="Hobby {i + 1}" loading="lazy" />
        </div>
      {/each}
    </div>
  </section>

  <hr class="rule" />

  <section class="block sayings">
    <h2>Safsatalarim</h2>
    {#each sayings as item}
      <a class="saying" href="/safsatalarim/{item.slug}">
        <h3>{item.title}</h3>
        {#if item.subtitle}<p>{item.subtitle}</p>{/if}
      </a>
    {/each}
  </section>
</main>

<style>
  .page {
    max-width: var(--max-w);
    margin: 0 auto;
    padding: 64px var(--space-6) 96px;
    display: flex;
    flex-direction: column;
    gap: var(--space-10);
  }

  .intro {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
  }

  .intro h1 {
    margin-top: var(--space-3);
  }

  .role {
    color: var(--muted-2);
    font-size: 13px;
  }

  .bio {
    margin-top: var(--space-2);
    font-size: 14px;
    color: var(--fg);
    max-width: 46ch;
  }

  .cta {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    align-self: flex-start;
    margin-top: var(--space-3);
    font-size: 14px;
    font-weight: 500;
    color: var(--muted-2);
    text-decoration: none;
    transition: color var(--dur-base) var(--ease);
  }

  .cta:hover {
    color: var(--fg);
  }

  .cta span {
    background-image: linear-gradient(currentColor, currentColor);
    background-repeat: no-repeat;
    background-position: 0 100%;
    background-size: 100% 1px;
    padding-bottom: 2px;
    transition: background-size var(--dur-base) var(--ease);
  }

  .cta:hover span {
    background-size: 100% 2px;
  }

  .cta-arrow {
    transition: transform var(--dur-base) var(--ease);
  }

  .cta:hover .cta-arrow {
    transform: translate(2px, -2px);
  }

  .avatar {
    width: 64px;
    height: 64px;
    overflow: hidden;
    -webkit-mask-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><path d='M50,0 C8,0 0,8 0,50 C0,92 8,100 50,100 C92,100 100,92 100,50 C100,8 92,0 50,0 Z' fill='black'/></svg>");
    mask-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><path d='M50,0 C8,0 0,8 0,50 C0,92 8,100 50,100 C92,100 100,92 100,50 C100,8 92,0 50,0 Z' fill='black'/></svg>");
    -webkit-mask-size: 100% 100%;
    mask-size: 100% 100%;
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
  }

  .avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
    transform: scale(1.35);
    transform-origin: 50% 0%;
  }

  .intro h1 {
    font-size: 14px;
    font-weight: 600;
    letter-spacing: -0.01em;
  }

  .rule {
    border: 0;
    border-top: 1px solid var(--rule);
    margin: 0;
  }

  .work {
    display: flex;
    flex-direction: column;
    gap: var(--space-5);
  }

  .work-row {
    display: grid;
    grid-template-columns: 88px 1fr;
    gap: var(--space-6);
    align-items: baseline;
  }

  .company {
    transition: text-decoration-color var(--dur-fast) var(--ease);
  }

  .years {
    color: var(--muted);
    font-variant-numeric: tabular-nums;
    font-size: 13px;
  }

  .entry {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .company {
    font-weight: 500;
    font-size: 14px;
    text-decoration-color: var(--muted);
  }

  .desc {
    color: var(--muted-2);
    font-size: 13px;
    line-height: 1.5;
  }

  .block {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  .block h2 {
    font-size: 14px;
    font-weight: 600;
  }

  .hobbies {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--space-2);
  }

  .hobby {
    aspect-ratio: 3 / 4;
    border-radius: 8px;
    overflow: hidden;
    background: #1a1b1d;
    transition: transform var(--dur-base) var(--ease);
  }

  .hobby:hover {
    transform: translateY(-2px);
  }

  .hobby img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .sayings {
    gap: var(--space-5);
  }

  .saying {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    text-decoration: none;
    color: inherit;
  }

  .saying h3 {
    font-size: 14px;
    font-weight: 600;
    background-image: linear-gradient(currentColor, currentColor);
    background-repeat: no-repeat;
    background-position: 0 100%;
    background-size: 0 1px;
    padding-bottom: 2px;
    transition: background-size var(--dur-base) var(--ease);
    width: max-content;
    max-width: 100%;
  }

  .saying:hover h3 {
    background-size: 100% 1px;
  }

  .saying p {
    color: var(--muted-2);
    font-size: 13px;
    transition: color var(--dur-base) var(--ease);
  }

  .saying:hover p {
    color: var(--fg);
  }

  @media (max-width: 480px) {
    .page {
      padding: 48px var(--space-5) 72px;
    }

    .work-row {
      grid-template-columns: 76px 1fr;
      gap: var(--space-4);
    }

    .hobbies {
      grid-template-columns: repeat(2, 1fr);
      gap: var(--space-3);
    }
  }
</style>
