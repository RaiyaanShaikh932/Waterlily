'use client';
import { useEffect, useRef, useState } from 'react';
import { useCollection } from './collection-context';
import { descriptions } from '../lib/collections';
import products from '../lib/products.json';

const stones = [...new Set(products.flatMap(product => product.materials))].sort();
const categories = [['necklace', 'Necklace'], ['bracelet', 'Bracelet']];
const cleanName = name => (name ? name.replace(/\s*\(variant\s*[a-z0-9]*\)/gi, '') : '');

function ProductGallery({ product, onClose }) {
  const dialog = useRef(null);
  const [index, setIndex] = useState(0);
  const photo = product.images[index];

  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const touchDeltaX = useRef(0);
  const dragStartX = useRef(0);
  const isDragging = useRef(false);

  useEffect(() => {
    dialog.current.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    touchDeltaX.current = 0;
  };

  const handleTouchMove = (e) => {
    const deltaX = e.touches[0].clientX - touchStartX.current;
    const deltaY = e.touches[0].clientY - touchStartY.current;
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      touchDeltaX.current = deltaX;
    }
  };

  const handleTouchEnd = () => {
    if (Math.abs(touchDeltaX.current) > 30 && product.images.length > 1) {
      if (touchDeltaX.current < 0) {
        setIndex((prev) => (prev + 1) % product.images.length);
      } else {
        setIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
      }
    }
    touchDeltaX.current = 0;
  };

  const handleMouseDown = (e) => {
    if (product.images.length <= 1) return;
    isDragging.current = true;
    dragStartX.current = e.clientX;
  };

  const handleMouseUp = (e) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const deltaX = e.clientX - dragStartX.current;
    if (Math.abs(deltaX) > 30 && product.images.length > 1) {
      if (deltaX < 0) {
        setIndex((prev) => (prev + 1) % product.images.length);
      } else {
        setIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
      }
    }
  };

  return (
    <dialog
      ref={dialog}
      className="product-dialog"
      aria-labelledby="product-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) dialog.current.close();
      }}
    >
      <div className="product-detail">
        <button className="gallery-close" onClick={() => dialog.current.close()} aria-label="Close product details">
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <line x1="2" y1="2" x2="12" y2="12" stroke="#4a4a4a" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="12" y1="2" x2="2" y2="12" stroke="#4a4a4a" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
        <div className="product-gallery-view">
          {product.images.length > 1 && (
            <div className="gallery-rail" aria-label="Product photographs">
              {product.images.map((image, i) => (
                <button
                  key={image.src}
                  type="button"
                  className={`gallery-rail__thumb${i === index ? ' is-active' : ''}`}
                  aria-label={`View image ${i + 1}`}
                  aria-pressed={i === index}
                  onClick={() => setIndex(i)}
                  onMouseEnter={() => setIndex(i)}
                >
                  <img src={image.src} alt="" width="58" height="72" loading="lazy" />
                </button>
              ))}
            </div>
          )}

          <div
            className={`gallery-stage${photo.width > photo.height ? ' gallery-stage--horizontal' : ''}`}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            style={{ touchAction: 'pan-y', cursor: product.images.length > 1 ? 'grab' : 'default' }}
          >
            <img
              src={photo.src}
              width={photo.width}
              height={photo.height}
              alt={`${cleanName(product.name)}, view ${index + 1}`}
              className="gallery-stage__img"
              draggable="false"
            />

            {product.images.length > 1 && (
              <>
                <button
                  type="button"
                  className="gallery-nav-btn gallery-nav-btn--prev"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIndex((index + product.images.length - 1) % product.images.length);
                  }}
                  aria-label="Previous image"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="gallery-nav-btn gallery-nav-btn--next"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIndex((index + 1) % product.images.length);
                  }}
                  aria-label="Next image"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
                <span className="gallery-counter-badge" aria-live="polite">
                  {index + 1} / {product.images.length}
                </span>
              </>
            )}
          </div>
        </div>

        <div className="detail-copy">
          <p className="eyebrow">WATER LILY ATELIER · NECKLACE</p>
          <h3 id="product-title">{cleanName(product.name)}</h3>
          {product.materials.length > 0 && <p className="detail-materials">{product.materials.join(' · ')}</p>}
          <p className="detail-tagline">One handmade piece, with its own character.</p>
        </div>
      </div>
    </dialog>
  );
}

function ProductCard({ product, onOpen }) {
  const [cardIndex, setCardIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const hasSlided = useRef(false);

  const images = product.images;
  const hasMultiple = images.length > 1;
  const currentImage = images[cardIndex] || images[0];
  const isHorizontal = currentImage?.width > currentImage?.height;

  const handleTouchStart = (e) => {
    if (!hasMultiple) return;
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    hasSlided.current = false;
  };

  const handleTouchMove = (e) => {
    if (!hasMultiple) return;
    const diffX = e.touches[0].clientX - touchStartX.current;
    const diffY = e.touches[0].clientY - touchStartY.current;
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 20) {
      hasSlided.current = true;
    }
  };

  const handleTouchEnd = (e) => {
    if (!hasMultiple || !hasSlided.current) return;
    const endX = e.changedTouches ? e.changedTouches[0].clientX : 0;
    const diffX = endX - touchStartX.current;
    if (Math.abs(diffX) > 20) {
      if (diffX < 0) {
        setCardIndex((prev) => (prev + 1) % images.length);
      } else {
        setCardIndex((prev) => (prev - 1 + images.length) % images.length);
      }
    }
  };

  const handleClick = () => {
    if (hasSlided.current) {
      hasSlided.current = false;
      return;
    }
    onOpen(product);
  };

  return (
    <article className="product-card">
      <button
        className="product-open"
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        aria-label={`View ${cleanName(product.name)}`}
      >
        <div className={`product-image${isHorizontal ? ' product-image--horizontal' : ''}`}>
          <img
            src={currentImage.src}
            alt={cleanName(product.name)}
            width={currentImage.width}
            height={currentImage.height}
            loading="lazy"
            draggable="false"
          />
          {hasMultiple && (
            <span className="image-count">
              {cardIndex + 1}/{images.length} views
            </span>
          )}
        </div>
        <h3>{cleanName(product.name)}</h3>
      </button>
    </article>
  );
}

export default function Collections() {
  const { selected, setSelected } = useCollection();
  const [page, setPage] = useState({ selection: 'necklace', limit: 24 });
  const [activeProduct, setActiveProduct] = useState(null);
  // Track the last active category so "All stones" can restore it
  const [lastCategory, setLastCategory] = useState('necklace');

  const isStone = !categories.some(([value]) => value === selected);

  const handleCategorySelect = (value) => {
    setLastCategory(value);
    setSelected(value);
  };

  const handleStoneChange = (value) => {
    if (!value) {
      // "All stones" — restore the last active category
      setSelected(lastCategory);
    } else {
      setSelected(value);
    }
  };

  const filtered = products.filter(product =>
    isStone
      ? product.materials.some(stone => stone.toLowerCase() === selected)
      : product.category === selected
  );
  const limit = page.selection === selected ? page.limit : 24;
  return <section className="pieces" id="pieces">
    <div className="section-heading"><h2>Nature never repeats itself.</h2><p className="eyebrow">NEITHER DO WE.</p></div>
    <div className="catalogue-filters">
      <div className="collection-tabs" aria-label="Explore pieces">
        {categories.map(([value, label]) => <button key={value} type="button" aria-pressed={selected === value && !isStone} onClick={() => handleCategorySelect(value)}>{label}</button>)}
      </div>
      <label className="stone-filter">Explore by stone
        <select value={isStone ? selected : ''} onChange={event => handleStoneChange(event.target.value)}>
          <option value="">All stones</option>
          {stones.map(stone => <option key={stone} value={stone.toLowerCase()}>{stone}</option>)}
          {isStone && !stones.some(stone => stone.toLowerCase() === selected) && <option value={selected}>{selected.charAt(0).toUpperCase() + selected.slice(1)}</option>}
        </select>
      </label>
    </div>
    <p className="collection-description">{descriptions[selected] || `Explore our ${selected} necklaces, each with its own natural character.`}</p>
    <p className="catalogue-count" role="status">{filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'}</p>
    <div className="catalogue-grid" id="collection-gallery">
      {filtered.slice(0, limit).map(product => (
        <ProductCard key={product.id} product={product} onOpen={setActiveProduct} />
      ))}
    </div>
    {filtered.length === 0 && selected === 'bracelet' && (
      <div className="bracelet-soon">
        <p className="bracelet-soon__tag">COMING SOON</p>
        <h3 className="bracelet-soon__heading">Good things take time.<br/>Bracelets are no exception.</h3>
        <p className="bracelet-soon__sub">Till then, our necklaces are ready and waiting for you.</p>
        <button className="button bracelet-soon__cta" onClick={() => setSelected('necklace')}>
          Explore Necklaces
        </button>
      </div>
    )}
    <div className="load-more">
      {filtered.length > limit && (
        <button className="button" onClick={() => setPage({ selection: selected, limit: limit + 24 })}>View more pieces</button>
      )}
      {limit > 24 && (
        <button className="button load-less" onClick={() => { setPage({ selection: selected, limit: 24 }); document.getElementById('pieces').scrollIntoView({ behavior: 'smooth' }); }}>View less</button>
      )}
      {(filtered.length > limit || limit > 24) && (
        <p>Showing {Math.min(limit, filtered.length)} of {filtered.length}</p>
      )}
    </div>
    <p className="pieces-note">Each necklace is a single creation. Once it finds its person, it becomes part of their story alone.</p>
    {activeProduct && <ProductGallery key={activeProduct.id} product={activeProduct} onClose={() => setActiveProduct(null)} />}
  </section>;
}
