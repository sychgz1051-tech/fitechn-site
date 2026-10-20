(() => {
  'use strict';

  const root = document.getElementById('productDetail');
  if (!root) return;
  const products = window.FITECHN_PRODUCTS || [];
  const id = new URLSearchParams(window.location.search).get('id');
  const product = products.find(item => item.id === id);
  const escape = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
  const productLink = item => `product.html?id=${encodeURIComponent(item.id)}`;
  const amazonLink = item => `https://www.amazon.com/dp/${encodeURIComponent(item.asin)}`;

  if (!product) {
    root.innerHTML = '<section class="pd-empty pd-wrap"><p class="pd-eyebrow">Our products</p><h1>Find your FITECHN formula.</h1><p>Explore our supplements, with ingredient and serving details in one place.</p><a class="button primary" href="products.html">Explore the products</a></section>';
    return;
  }

  const themes = {
    creatine: {
      shortName: 'Creatine Gummies',
      intro: 'Your creatine routine.\nIn a blueberry gummy.',
      tags: ['Blueberry flavor', 'Chewable gummies'],
      stats: [['5g', 'creatine per serving'], ['4 gummies', 'one daily serving'], ['30 servings', 'in every bottle']],
      formulaTitle: 'Know what goes into your routine.',
      formulaIntro: 'A measured serving of creatine monohydrate in a chewable format. Find the serving details below and check your bottle for the complete label.',
      videoTitle: 'The gummies, up close.',
      videoDescription: 'See the bottle and gummy format in a short product close-up.',
      photoTitle: 'A closer look at the bottle',
      artwork: 'assets/creatine-aplus-3.jpg',
      artworkTitle: 'Made for an active routine.',
      artworkAlt: 'FITECHN creatine gummies product artwork showing 120 gummies, 4 gummies per serving and 30 servings',
      useHeading: 'Four gummies. One serving.',
      ingredients: 'Creatine monohydrate, taurine, vitamin B12, potassium, magnesium and sodium are listed in this formula. Review the complete Supplement Facts and other ingredients on your bottle, particularly if you have dietary restrictions.'
    },
    oregano: {
      shortName: 'Oregano Oil Softgels',
      intro: 'Botanical ingredients.\nA simple softgel routine.',
      tags: ['Vegan softgels', 'Oregano + black seed oil'],
      stats: [['300mg', 'oregano oil per serving'], ['2 softgels', 'one daily serving'], ['60 servings', 'in every bottle']],
      formulaTitle: 'Four ingredients. Clearly explained.',
      formulaIntro: 'Oregano oil and black seed oil, paired with zinc and vitamin D3. Each amount below is for a serving of two softgels.',
      videoTitle: 'Meet the softgel format.',
      videoDescription: 'See the bottle and softgels in a short product close-up.',
      photoTitle: 'The bottle in everyday detail',
      artwork: 'assets/oregano-aplus-1.jpg',
      artworkTitle: 'The formula at a glance.',
      artworkAlt: 'Four-ingredient FITECHN formula: oregano oil 300mg, black seed oil 200mg, zinc 10mg and vitamin D3 25mcg per serving',
      useHeading: 'Two softgels. One serving.',
      ingredients: product.ingredients
    }
  };
  const theme = themes[product.id];
  const other = products.find(item => item.id !== product.id);
  const gallery = ['main', 'gallery-1', 'gallery-2', 'gallery-3', 'gallery-4', 'gallery-5'].map((suffix, index) => ({
    src: `assets/${product.id}-${suffix}.jpg`,
    alt: index === 0 ? `FITECHN ${product.name} bottle` : `FITECHN ${product.name}, product image ${index + 1}`
  }));
  document.title = `${product.name} | FITECHN`;
  root.className = `pd-page pd-${product.id}`;
  document.querySelector('meta[name="description"]')?.setAttribute('content', product.description);

  root.innerHTML = `
    <div class="pd-topline pd-wrap">
      <nav class="pd-breadcrumb" aria-label="Breadcrumb"><a href="index.html">Home</a><span aria-hidden="true">/</span><a href="products.html">Products</a><span aria-hidden="true">/</span><span>${escape(theme.shortName)}</span></nav>
      <nav class="pd-product-nav" aria-label="Choose a formula">${products.map(item => `<a href="${productLink(item)}" ${item.id === product.id ? 'aria-current="page"' : ''}>${item.id === 'creatine' ? 'Creatine gummies' : 'Oregano softgels'}</a>`).join('')}</nav>
    </div>

    <section class="pd-hero pd-wrap" aria-labelledby="pd-title">
      <div class="pd-gallery">
        <button type="button" class="pd-gallery-main" data-pd-enlarge="${gallery[0].src}" data-pd-alt="${escape(gallery[0].alt)}" aria-label="Enlarge ${escape(product.name)} product image">
          <img id="pd-main-image" src="${gallery[0].src}" alt="${escape(gallery[0].alt)}" fetchpriority="high" width="1500" height="1500">
          <span class="pd-zoom-hint" aria-hidden="true">＋ View larger</span>
        </button>
        <div class="pd-thumbnails" role="group" aria-label="Product image gallery">${gallery.map((image, index) => `<button type="button" data-pd-gallery="${index}" aria-label="View product image ${index + 1}" aria-pressed="${index === 0}"><img src="${image.src}" alt="" width="80" height="80" loading="lazy"></button>`).join('')}</div>
      </div>
      <div class="pd-hero-copy">
        <p class="pd-eyebrow">FITECHN / ${escape(product.category)}</p>
        <h1 id="pd-title">${escape(product.name)}</h1>
        <p class="pd-intro">${escape(theme.intro).replace('\n', '<br>')}</p>
        <p class="pd-description">${escape(product.description)}</p>
        <ul class="pd-tags">${theme.tags.map(tag => `<li>${escape(tag)}</li>`).join('')}<li>120 count</li></ul>
        <div class="pd-buy-actions"><a class="button primary" href="${amazonLink(product)}" target="_blank" rel="noopener">Shop on Amazon <span aria-hidden="true">↗</span></a><a class="pd-inline-link" href="#pd-formula">Explore the formula <span aria-hidden="true">↓</span></a></div>
        <p class="pd-buy-note">Price, availability and delivery options are shown on Amazon.</p>
        <div class="pd-support-note"><span aria-hidden="true">✉</span><p>Questions before you choose?<br><a href="support.html">We respond within 24 hours.</a></p></div>
      </div>
    </section>

    <div class="pd-stat-band"><dl class="pd-stats pd-wrap">${theme.stats.map(([amount, label]) => `<div><dt>${escape(label)}</dt><dd>${escape(amount)}</dd></div>`).join('')}</dl></div>

    <section class="pd-section pd-wrap pd-real-life" id="in-use" aria-labelledby="pd-real-title">
      <div class="pd-section-heading"><div><p class="pd-eyebrow">A real-world look</p><h2 id="pd-real-title">${escape(theme.videoTitle)}</h2></div><p>${escape(theme.videoDescription)} Take a closer look at the packaging before choosing your formula.</p></div>
      <div class="pd-media-grid">
        <figure class="pd-video-figure"><video class="pd-video" controls playsinline preload="none" poster="assets/${product.id}-video-poster.jpg" aria-label="${escape(theme.videoTitle)} Muted product video excerpt"><source src="assets/${product.id}-customer-clip.mp4" type="video/mp4">Your browser does not support embedded video. <a href="assets/${product.id}-customer-clip.mp4">Open the product video</a>.</video><figcaption><span>Product video excerpt</span><span>Sound removed</span></figcaption></figure>
        <figure class="pd-photo-figure"><button type="button" data-pd-enlarge="assets/${product.id}-customer-1.jpg" data-pd-alt="Customer photograph of FITECHN ${escape(product.name)}" aria-label="Enlarge customer product photograph"><img src="assets/${product.id}-customer-1.jpg" alt="Customer photograph of FITECHN ${escape(product.name)}" loading="lazy"></button><figcaption>${escape(theme.photoTitle)}<span>Customer photo from Amazon product reviews</span></figcaption></figure>
      </div>
    </section>

    <section class="pd-formula-band" id="pd-formula" aria-labelledby="pd-formula-title"><div class="pd-wrap pd-section">
      <div class="pd-section-heading"><div><p class="pd-eyebrow">Know your formula</p><h2 id="pd-formula-title">${escape(theme.formulaTitle)}</h2></div><p>${escape(theme.formulaIntro)}</p></div>
      <div class="pd-formula-layout">
        <div><table class="pd-facts"><caption>Product information per labeled serving</caption><tbody>${product.facts.map(([label, amount]) => `<tr><th scope="row">${escape(label)}</th><td>${escape(amount)}</td></tr>`).join('')}</tbody></table><p class="pd-fine-print">${product.id === 'oregano' ? 'Daily Values (DV) are not established for oregano oil or black seed oil. ' : ''}This summary does not replace the complete label on your package.</p></div>
        <div class="pd-formula-notes"><div><h3>Ingredients</h3><p>${escape(theme.ingredients)}</p></div><div><p class="pd-eyebrow">How to use</p><h3>${escape(theme.useHeading)}</h3><p>${escape(product.use.replace('The product artwork specifies', 'Suggested use:'))}</p><p>Do not exceed label directions. Keep out of reach of children and follow the storage instructions on your package.</p></div><a class="pd-inline-link" href="guide.html">Read our supplement guide <span aria-hidden="true">↗</span></a></div>
      </div>
    </div></section>

    <section class="pd-section pd-wrap pd-artwork-section" aria-labelledby="pd-artwork-title"><div class="pd-section-heading"><div><p class="pd-eyebrow">In focus</p><h2 id="pd-artwork-title">${escape(theme.artworkTitle)}</h2></div></div><button class="pd-artwork" type="button" data-pd-enlarge="${theme.artwork}" data-pd-alt="${escape(theme.artworkAlt)}" aria-label="Enlarge ${escape(theme.artworkTitle)}"><img src="${theme.artwork}" alt="${escape(theme.artworkAlt)}" width="1464" height="600" loading="lazy"><span>View product artwork <span aria-hidden="true">＋</span></span></button></section>

    <section class="pd-section pd-wrap pd-faq-section" aria-labelledby="pd-faq-title"><div><p class="pd-eyebrow">Product questions</p><h2 id="pd-faq-title">A little more clarity.</h2><p>Get to know your formula before making it part of your routine.</p><a class="pd-inline-link" href="faq.html">View all FAQs <span aria-hidden="true">↗</span></a></div><div class="pd-faqs">${product.faqs.map(([question, answer]) => `<details><summary>${escape(question)}</summary><p>${escape(answer)}</p></details>`).join('')}</div></section>

    ${other ? `<section class="pd-other-band"><div class="pd-wrap pd-other"><a class="pd-other-image" href="${productLink(other)}"><img src="assets/${other.id}-main.jpg" alt="FITECHN ${escape(other.name)} bottle" loading="lazy" width="280" height="280"></a><div><p class="pd-eyebrow">Also in the FITECHN collection</p><h2>${escape(other.name)}</h2><p>A different formula for a different routine. Explore the ingredients, format and serving details.</p><a class="pd-inline-link" href="${productLink(other)}">Explore ${other.id === 'creatine' ? 'creatine gummies' : 'oregano softgels'} <span aria-hidden="true">→</span></a></div></div></section>` : ''}

    <section class="pd-wrap pd-contact"><div><p class="pd-eyebrow">Here to help</p><h2>Questions about your product?</h2><p>We respond to all inquiries within 24 hours.</p></div><a class="button primary" href="support.html">Contact FITECHN</a></section>
    <aside class="pd-wrap pd-disclaimer"><strong>Dietary supplement notice:</strong> These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease. Follow your package label. Ask a healthcare professional before use if pregnant, nursing, taking medication or managing a medical condition, and before combining supplements.</aside>
  `;

  const mainImage = root.querySelector('#pd-main-image');
  const mainButton = root.querySelector('.pd-gallery-main');
  const thumbnails = [...root.querySelectorAll('[data-pd-gallery]')];
  let currentImage = 0;
  const selectImage = (index, focus = false) => {
    currentImage = (index + gallery.length) % gallery.length;
    const image = gallery[currentImage];
    mainImage.src = image.src;
    mainImage.alt = image.alt;
    mainButton.dataset.pdEnlarge = image.src;
    mainButton.dataset.pdAlt = image.alt;
    thumbnails.forEach((thumbnail, thumbIndex) => thumbnail.setAttribute('aria-pressed', String(thumbIndex === currentImage)));
    if (focus) thumbnails[currentImage].focus();
  };
  thumbnails.forEach((button, index) => {
    button.addEventListener('click', () => selectImage(index));
    button.addEventListener('keydown', event => {
      let destination;
      if (event.key === 'ArrowRight') destination = currentImage + 1;
      if (event.key === 'ArrowLeft') destination = currentImage - 1;
      if (event.key === 'Home') destination = 0;
      if (event.key === 'End') destination = gallery.length - 1;
      if (destination !== undefined) { event.preventDefault(); selectImage(destination, true); }
    });
  });

  const dialog = document.createElement('dialog');
  dialog.className = 'pd-lightbox';
  dialog.setAttribute('aria-label', 'Enlarged product image');
  dialog.innerHTML = '<button type="button" class="pd-lightbox-close" aria-label="Close enlarged image">Close ×</button><img alt="">';
  document.body.append(dialog);
  let returnFocus;
  const closeDialog = () => {
    dialog.close();
  };
  dialog.querySelector('.pd-lightbox-close').addEventListener('click', closeDialog);
  dialog.addEventListener('click', event => { if (event.target === dialog) closeDialog(); });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('pd-image-open');
    returnFocus?.focus();
  });
  root.querySelectorAll('[data-pd-enlarge]').forEach(button => button.addEventListener('click', () => {
    returnFocus = button;
    dialog.querySelector('img').src = button.dataset.pdEnlarge;
    dialog.querySelector('img').alt = button.dataset.pdAlt || '';
    dialog.showModal();
    document.body.classList.add('pd-image-open');
  }));
})();
