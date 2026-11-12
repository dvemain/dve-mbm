import { useEffect, useState } from "react";
import { org, nav, hero, about, services, testimonials, faqs, team, contact } from "./data/content.js";
import ContactForm from "./components/ContactForm.jsx";

const img = (k) => `/img/${k}.${k === "logo" ? "png" : "jpg"}`;

function Header() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open]);
  return (
    <header className="site">
      <div className="wrap">
        <button type="button" className="menu-btn" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((v) => !v)}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
            {open ? <path d="M5 5l14 14M19 5L5 19" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
          </svg>
        </button>
        <a href="#top" className="brand" aria-label={`${org.name} home`}><img src={img("logo")} alt={org.name} width="200" height="60" /></a>
        <nav className="primary" aria-label="Primary">{nav.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}</nav>
        <a href="#contact" className="btn btn-green hdr-cta">{hero.cta}</a>
      </div>
      {open && <div className="menu-backdrop" onClick={() => setOpen(false)} />}
      <nav className={"menu-panel" + (open ? " is-open" : "")} aria-label="Mobile" aria-hidden={!open}>
        {nav.map((n) => <a key={n.href} href={n.href} onClick={() => setOpen(false)}>{n.label}</a>)}
        <a href="#contact" className="btn btn-green" onClick={() => setOpen(false)}>{hero.cta}</a>
      </nav>
    </header>
  );
}

function Faq({ item, open, onToggle }) {
  return (
    <li className={"faq" + (open ? " is-open" : "")}>
      <button type="button" className="faq-q" aria-expanded={open} onClick={onToggle}>
        <span>{item.q}</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
      </button>
      <div className="faq-a" hidden={!open}><p>{item.a}</p></div>
    </li>
  );
}

export default function App() {
  const [openFaq, setOpenFaq] = useState(0);
  return (
    <>
      <a href="#main" className="skip">Skip to content</a>
      <Header />
      <main id="main">
        <section id="top" className="hero">
          <img className="hero-bg" src={img("hero")} alt="" fetchPriority="high" />
          <div className="wrap hero-inner">
            <h1>{hero.title}</h1>
            <p className="lede">{hero.sub}</p>
            <div className="ctas"><a href="#contact" className="btn btn-green">{hero.cta}</a><a href="#services" className="btn btn-ghost">Our Services</a></div>
          </div>
        </section>

        <section id="about" className="about">
          <div className="wrap two-col">
            <figure className="photo"><img src={img("about")} alt="Team collaborating around a laptop" loading="lazy" /></figure>
            <div>
              <p className="eyebrow">{about.eyebrow}</p>
              <h2>{about.title}</h2>
              <p>{about.body}</p>
              <a href="#contact" className="btn btn-navy">{about.cta}</a>
            </div>
          </div>
        </section>

        <section id="services" className="services">
          <div className="wrap">
            <p className="eyebrow light">{services.eyebrow}</p>
            <h2>{services.title}</h2>
            <ul className="svc-grid">
              {services.items.map((s) => (
                <li key={s.title}>
                  <img src={img(s.img)} alt="" loading="lazy" />
                  <div><h3>{s.title}</h3><p>{s.body}</p><a href="#contact" className="btn btn-green">{s.cta}</a></div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="testimonials">
          <div className="wrap">
            <p className="eyebrow">{testimonials.eyebrow}</p>
            <h2>{testimonials.title}</h2>
            <ul className="quotes">
              {testimonials.items.map((t) => <li key={t.name}><blockquote>“{t.quote}”</blockquote><footer>– {t.name}</footer></li>)}
            </ul>
            <p className="center"><a href="#contact" className="btn btn-navy">{hero.cta}</a></p>
          </div>
        </section>

        <section id="faq" className="faqs">
          <div className="wrap">
            <h2>FAQS</h2>
            <ul className="faq-list">{faqs.map((f, i) => <Faq key={f.q} item={f} open={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? -1 : i)} />)}</ul>
          </div>
        </section>

        <section id="team" className="team">
          <div className="wrap">
            <p className="eyebrow">{team.eyebrow}</p>
            <h2>{team.title}</h2>
            <ul className="people">
              {team.people.map((p) => (
                <li key={p.name}><img src={img(p.img)} alt={p.name} loading="lazy" /><h3>{p.name}</h3><a href={p.phoneHref}>{p.phone}</a></li>
              ))}
            </ul>
          </div>
        </section>

        <section id="contact" className="contact">
          <div className="wrap contact-grid">
            <div>
              <h2>{contact.title}</h2>
              <dl className="info">
                <dt>Email</dt><dd><a href={`mailto:${org.email}`}>{org.email}</a></dd>
                <dt>Call/Text</dt><dd><a href={org.phoneHref}>{org.phone}</a></dd>
                <dt>Address</dt><dd><a href={org.mapsHref} target="_blank" rel="noopener">{org.address}</a></dd>
                <dt>Assistance Hours</dt><dd>{org.hours[0]}<br />{org.hours[1]}</dd>
              </dl>
              <a href={org.mapsHref} target="_blank" rel="noopener" className="map"><img src={img("map")} alt="Map of Grand Traverse County, MI" loading="lazy" /></a>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="site-foot">
        <div className="wrap foot-grid">
          <div><img src={img("logo")} alt={org.name} width="220" height="66" className="foot-logo" /><p>Part of <a href="https://thedveproject.com/" target="_blank" rel="noopener">The DVE Project</a> · funding <a href="https://dveministries.com/" target="_blank" rel="noopener">DVE Ministries</a></p></div>
          <div><h4>Quick Links</h4><ul>{nav.map((n) => <li key={n.href}><a href={n.href}>{n.label}</a></li>)}</ul></div>
          <div><h4>Contact</h4><ul><li>Email: <a href={`mailto:${org.email}`}>{org.email}</a></li><li>Call/Text: <a href={org.phoneHref}>{org.phone}</a></li><li>Address: {org.address}</li></ul></div>
        </div>
        <div className="foot-base"><div className="wrap">© {new Date().getFullYear()} {org.name} · Made with ❤ by DVE Media</div></div>
      </footer>
    </>
  );
}
