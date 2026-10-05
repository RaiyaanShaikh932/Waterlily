'use client';
import { useState, useEffect } from 'react';
import { useCollection } from './collection-context';

export default function Header() {
  const { setSelected } = useCollection();
  const [menuOpen, setMenuOpen] = useState(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Close menu on Escape key
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const handleNavClick = (collection) => {
    if (collection) setSelected(collection);
    setMenuOpen(false);
  };

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>

      <div className="announcement">
        <span>FROM INDIA WITH LOVE</span>
        <span>FROM INDIA WITH LOVE</span>
        <span>FROM INDIA WITH LOVE</span>
        <span>FROM INDIA WITH LOVE</span>
        <span>FROM INDIA WITH LOVE</span>
        <span>FROM INDIA WITH LOVE</span>
        <span>FROM INDIA WITH LOVE</span>
      </div>

      <header>
        {/* Hamburger button — visible on mobile only */}
        <button
          className={`hamburger${menuOpen ? ' hamburger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          <span className="hamburger__bar hamburger__bar--top" />
          <span className="hamburger__bar hamburger__bar--mid" />
          <span className="hamburger__bar hamburger__bar--bot" />
        </button>

        <a className="brand" href="#" aria-label="Water Lily Atelier home">
          WATER LILY<span>ATELIER</span>
        </a>

        {/* Desktop nav */}
        <nav aria-label="Main navigation">
          <a href="#pieces" data-collection="necklace" onClick={() => setSelected('necklace')}>NECKLACE</a>
          <a href="#pieces" data-collection="bracelet" onClick={() => setSelected('bracelet')}>BRACELET</a>
          <a href="#pieces" data-collection="pearl"    onClick={() => setSelected('pearl')}>PEARL</a>
          <a href="#pieces" data-collection="agate"    onClick={() => setSelected('agate')}>AGATE</a>
          <a href="#pieces" data-collection="geode"    onClick={() => setSelected('geode')}>GEODE</a>
          <a href="#philosophy">OUR STORY</a>
          <a href="#visit">ATELIER</a>
        </nav>
      </header>

      {/* ── Mobile full-screen overlay nav ── */}
      <div
        id="mobile-nav"
        className={`mobile-nav${menuOpen ? ' mobile-nav--open' : ''}`}
        aria-hidden={!menuOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Dim backdrop */}
        <div
          className="mobile-nav__backdrop"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />

        {/* Slide-in panel */}
        <nav className="mobile-nav__panel" aria-label="Mobile navigation">
          <p className="mobile-nav__eyebrow">MENU</p>

          <a className="mobile-nav__link" href="#pieces" data-collection="necklace"
             onClick={() => handleNavClick('necklace')}>Necklace</a>
          <a className="mobile-nav__link" href="#pieces" data-collection="bracelet"
             onClick={() => handleNavClick('bracelet')}>Bracelet</a>
          <a className="mobile-nav__link" href="#pieces" data-collection="pearl"
             onClick={() => handleNavClick('pearl')}>Pearl</a>
          <a className="mobile-nav__link" href="#pieces" data-collection="agate"
             onClick={() => handleNavClick('agate')}>Agate</a>
          <a className="mobile-nav__link" href="#pieces" data-collection="geode"
             onClick={() => handleNavClick('geode')}>Geode</a>

          <div className="mobile-nav__divider" />

          <a className="mobile-nav__link mobile-nav__link--secondary" href="#philosophy"
             onClick={() => setMenuOpen(false)}>Our Story</a>
          <a className="mobile-nav__link mobile-nav__link--secondary" href="#visit"
             onClick={() => setMenuOpen(false)}>Atelier</a>
        </nav>
      </div>
    </>
  );
}
