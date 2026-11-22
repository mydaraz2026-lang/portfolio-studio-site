import { CONTACT } from '../../config/milestoneStops';

const LINKEDIN = 'https://www.linkedin.com/in/sadman-rayan-shuvo-sales-bd';

/** Slim footer: who runs Portfolio Studio and how to reach them. */
export default function SiteFooter() {
  const link = 'underline decoration-on-dark/30 underline-offset-4 hover:decoration-on-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent';
  return (
    <footer className="relative z-10 border-t border-on-dark/10 bg-bg/85 px-4 py-8 text-sm text-on-dark-muted backdrop-blur-sm sm:px-6 md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <img src={`${import.meta.env.BASE_URL}logo/ps-mark-dark.webp`} width="34" height="35" alt="" className="size-[34px]" />
          <p>
            <span className="font-semibold text-on-dark">Portfolio Studio</span> · Executive portfolio websites
            <br />
            Founded by Sadman Rayan Shuvo · Dhaka, Bangladesh
          </p>
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-3">
          <li><a className={link} href={CONTACT.classicUrl}>Classic site</a></li>
          <li><a className={link} href={LINKEDIN} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          <li><a className={link} href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer">WhatsApp {CONTACT.whatsapp}</a></li>
          <li><a className={link} href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></li>
        </ul>
      </div>
      <p className="mx-auto mt-6 max-w-6xl text-xs">© {new Date().getFullYear()} Portfolio Studio</p>
    </footer>
  );
}
