import { CONTACT } from '../../config/milestoneStops';

const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink';
const btnGold = `inline-flex min-h-11 items-center rounded-full bg-accent px-5 text-[15px] font-semibold text-[#1a1405] transition-opacity hover:opacity-90 ${focusRing}`;
const btnGhost = `inline-flex min-h-11 items-center rounded-full border border-ink/25 px-5 text-[15px] font-semibold transition-colors hover:border-ink ${focusRing}`;

/** Renders a title with one italic emphasised phrase, as on the live site. */
function Title({ text, emphasis }) {
  if (!emphasis || !text.includes(emphasis)) return text;
  const [before, after] = text.split(emphasis);
  return (
    <>
      {before}
      <em className="font-bold italic">{emphasis}</em>
      {after}
    </>
  );
}

/**
 * OverlayPanel — the readable card for one milestone stop.
 * Kinds: intro · samples · stage · offer · contact
 */
export default function OverlayPanel({ stop, active = true, mode = 'journey', compact = false }) {
  const headingId = `${stop.id}-title`;
  const isIntro = stop.kind === 'intro';
  const Heading = isIntro ? 'h1' : 'h2';
  const visible = mode === 'static' || active;

  return (
    <article
      aria-labelledby={headingId}
      className={[
        'w-full rounded-lg bg-panel text-ink shadow-[0_24px_60px_-20px_rgba(0,0,0,0.7)]',
        'p-5 sm:p-7',
        mode === 'journey'
          ? `${stop.kind === 'sample' ? 'md:w-[min(340px,26vw)]' : 'md:w-[min(470px,42vw)]'} transition-[opacity,translate] duration-500 ease-out motion-reduce:transition-none`
          : 'max-w-2xl',
        visible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0',
      ].join(' ')}
    >
      <p className="flex items-center gap-2 text-sm font-medium text-ink-muted">
        <span aria-hidden="true" className="size-2.5 shrink-0 rounded-full bg-accent ring-1 ring-ink/20" />
        {stop.period}
      </p>

      <Heading
        id={headingId}
        className={
          isIntro
            ? 'mt-3 text-[clamp(2.2rem,4.6vw,3.2rem)] leading-[1.03] font-extrabold tracking-tight'
            : 'mt-3 text-[clamp(1.55rem,3vw,2.1rem)] leading-[1.08] font-bold tracking-tight'
        }
      >
        <Title text={stop.title} emphasis={stop.emphasis} />
      </Heading>

      {stop.role && <p className="mt-1.5 text-[15px] font-medium text-ink-muted">{stop.role}</p>}

      {!(compact && stop.kind === 'sample') && (
        <p className="mt-3 text-[15px] leading-relaxed sm:mt-4 sm:text-base">{stop.summary}</p>
      )}

      {stop.kind === 'stage' &&
        (compact ? (
          <details className="mt-3 text-[14px]">
            <summary className="min-h-11 cursor-pointer content-center font-semibold underline decoration-ink/25 underline-offset-4">
              What you send, what you get
            </summary>
            <StageDetail stop={stop} />
          </details>
        ) : (
          <StageDetail stop={stop} />
        ))}

      {stop.sites && !compact && <SiteList sites={stop.sites} />}
      {stop.kind === 'offer' && <Offer stop={stop} compact={compact} />}

      {stop.kind === 'sample' && (
        <dl className="mt-4 grid gap-2 border-t border-line pt-4">
          {stop.metrics.map((m) => (
            <div key={m.label} className="grid grid-cols-[6.5rem_minmax(0,1fr)] items-baseline gap-3">
              <dt className="col-start-2 row-start-1 text-[13px] leading-tight text-ink-muted">{m.label}</dt>
              <dd className="col-start-1 row-start-1 font-[family-name:var(--font-display)] text-[1.2rem] leading-none font-bold tracking-tight whitespace-nowrap">{m.value}</dd>
            </div>
          ))}
        </dl>
      )}

      {stop.kind !== 'sample' && !(isIntro && compact) && stop.metrics?.length > 0 && (
        <dl className="mt-5 grid grid-cols-3 gap-3 border-t border-line pt-4 sm:mt-6 sm:gap-4 sm:pt-5">
          {stop.metrics.map((m) => (
            <div key={m.label} className="flex flex-col-reverse gap-1">
              <dt className="text-[13px] leading-tight text-ink-muted">{m.label}</dt>
              <dd className="font-[family-name:var(--font-display)] text-[clamp(1.25rem,2.4vw,1.65rem)] leading-none font-bold tracking-tight whitespace-nowrap">
                {m.value}
              </dd>
            </div>
          ))}
        </dl>
      )}

      {isIntro && (
        <div className="mt-6 flex flex-wrap gap-3">
          <a href="#samples" className={btnGold}>See live samples</a>
          <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className={btnGhost}>
            {compact ? 'WhatsApp' : 'Chat on WhatsApp'}
          </a>
        </div>
      )}

      {stop.kind === 'sample' && (
        <a href={stop.site.url} target="_blank" rel="noopener noreferrer" className={`mt-5 ${btnGold}`}>
          Open live site ↗
        </a>
      )}

      {stop.kind === 'media' && <MediaBlock stop={stop} />}
      {stop.kind === 'faq' && <FaqList items={stop.faq} />}

      {stop.kind === 'contact' && <ContactBlock />}
    </article>
  );
}

function StageDetail({ stop }) {
  return (
    <>
      <div className="mt-4 grid gap-4 text-[14px] leading-snug sm:grid-cols-2 sm:text-[15px]">
        {[['You send', stop.send], ['You get', stop.get]].map(([label, list]) => (
          <div key={label}>
            <h3 className="text-[13px] font-semibold text-ink-muted">{label}</h3>
            <ul className="mt-1.5 grid gap-1.5">
              {list.map((item) => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden="true" className="mt-[0.45em] size-1.5 shrink-0 rounded-full bg-ink/40" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <ol className="mt-4 grid gap-2 border-t border-line pt-4 text-[14px] leading-snug">
        {stop.days.map((d) => (
          <li key={d.label} className="grid grid-cols-[3.75rem_minmax(0,1fr)] gap-2">
            <span className="font-semibold whitespace-nowrap">{d.label}</span>
            <span className="text-ink-muted">{d.text}</span>
          </li>
        ))}
      </ol>
    </>
  );
}

function SiteList({ sites }) {
  return (
    <ul className="mt-5 divide-y divide-line border-y border-line">
      {sites.map((s) => (
        <li key={s.url}>
          <a
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex min-h-14 items-center justify-between gap-4 py-2 ${focusRing}`}
          >
            <span className="min-w-0">
              <span className="block font-semibold">{s.name}</span>
              <span className="block truncate text-[13px] text-ink-muted">{s.host}</span>
            </span>
            <span className="shrink-0 text-[15px] font-semibold underline decoration-ink/25 underline-offset-4">Open ↗</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

function Offer({ stop, compact }) {
  return (
    <>
      <ul className={`mt-4 grid gap-1.5 text-[14px] leading-snug sm:text-[15px] ${compact ? 'hidden' : ''}`}>
        {stop.items.map(([title, text]) => (
          <li key={title} className="flex gap-2">
            <span aria-hidden="true" className="mt-[0.45em] size-1.5 shrink-0 rounded-full bg-accent ring-1 ring-ink/20" />
            <span>
              <span className="font-semibold">{title}.</span> <span className="text-ink-muted">{text}</span>
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {stop.plans.map((p) => (
          <div key={p.label} className="rounded-md border border-line bg-white px-3 py-3">
            <p className="text-[13px] text-ink-muted">{p.label}</p>
            <p className="mt-1 font-[family-name:var(--font-display)] text-[clamp(1rem,1.5vw,1.12rem)] leading-tight font-bold whitespace-nowrap">{p.price}</p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-[13px] text-ink-muted">{stop.terms}</p>
    </>
  );
}

function MediaBlock({ stop }) {
  return (
    <>
      <ul className="mt-4 flex flex-wrap gap-2" aria-label="What the profile includes">
        {stop.parts.map((p) => (
          <li key={p} className="rounded-full border border-ink/15 bg-white px-3 py-1.5 text-[14px] font-medium">
            {p}
          </li>
        ))}
      </ul>
      <p className="mt-4 font-[family-name:var(--font-display)] text-[1.15rem] font-bold">{stop.priceNote}</p>
      <a href={stop.quoteUrl} target="_blank" rel="noopener noreferrer" className={`mt-4 ${btnGold}`}>
        Request a quote
      </a>
      <p className="mt-4 text-[13px] text-ink-muted">{stop.caption}</p>
    </>
  );
}

function FaqList({ items }) {
  return (
    <div className="mt-4 divide-y divide-line border-y border-line">
      {items.map(([q, a], i) => (
        <details key={q} open={i === 0} className="group">
          <summary
            className={`flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 py-2.5 text-[15px] font-semibold [&::-webkit-details-marker]:hidden ${focusRing}`}
          >
            {q}
            <span aria-hidden="true" className="grid size-6 shrink-0 place-items-center rounded-full bg-ink/5 text-ink-muted transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="pb-3 text-[14px] leading-snug text-ink-muted sm:text-[15px]">{a}</p>
        </details>
      ))}
    </div>
  );
}

function ContactBlock() {
  return (
    <>
      <div className="mt-6 flex flex-wrap gap-3">
        <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className={btnGold}>
          Chat on WhatsApp
        </a>
        <a href={`mailto:${CONTACT.email}`} className={btnGhost}>Email us</a>
      </div>
      <dl className="mt-5 grid gap-2 border-t border-line pt-4 text-[14px]">
        <div className="flex justify-between gap-4">
          <dt className="text-ink-muted">WhatsApp</dt>
          <dd className="font-semibold whitespace-nowrap">{CONTACT.whatsapp}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-ink-muted">Email</dt>
          <dd className="font-semibold break-all">{CONTACT.email}</dd>
        </div>
      </dl>
    </>
  );
}
