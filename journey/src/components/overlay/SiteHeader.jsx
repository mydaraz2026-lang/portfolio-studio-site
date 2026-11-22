import { CONTACT } from '../../config/milestoneStops';

/** Fixed header: Portfolio Studio wordmark, view toggle and WhatsApp shortcut. */
export default function SiteHeader({ intro, show3D, canToggle, onToggle }) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between gap-3 bg-gradient-to-b from-bg via-bg/80 to-transparent px-4 py-3 sm:px-6 md:px-8">
      <a
        href={`#${intro.id}`}
        className="flex min-w-0 items-center gap-2.5 font-[family-name:var(--font-display)] text-[17px] font-bold text-on-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        <img src={`${import.meta.env.BASE_URL}logo/ps-mark-dark.webp`} width="34" height="35" alt="" className="size-[34px]" />
        <span className="truncate">Portfolio Studio</span>
      </a>
      <div className="flex shrink-0 items-center gap-2">
        {canToggle && (
          <button
            type="button"
            onClick={onToggle}
            className="hidden min-h-10 rounded-full border border-on-dark/25 px-4 text-sm font-medium text-on-dark transition-colors hover:border-on-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:block"
          >
            {show3D ? 'Simple view' : '3D view'}
          </button>
        )}
        <a
          href={CONTACT.classicUrl}
          className="hidden min-h-10 items-center rounded-full px-3 text-sm font-semibold text-on-dark-muted transition-colors hover:text-on-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:inline-flex"
        >
          ← Classic site
        </a>
        <a
          href="#pricing"
          className="hidden min-h-10 items-center rounded-full px-3 text-sm font-semibold text-on-dark transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:inline-flex"
        >
          Pricing
        </a>
        <a
          href={CONTACT.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-10 items-center rounded-full bg-accent px-4 text-sm font-semibold text-[#1a1405] transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-dark"
        >
          WhatsApp
        </a>
      </div>
    </header>
  );
}
