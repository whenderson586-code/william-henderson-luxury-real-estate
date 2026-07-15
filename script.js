const navItems = [
  ['Home', 'index.html'], ['About Us', 'about.html'], ['Buyers', 'buyers.html'],
  ['Sellers', 'sellers.html'], ['Rentals', 'rentals.html'], ['Commercial', 'commercial.html'],
  ['Agents', 'agents.html'], ['Blog', 'blog.html'], ['Contact Us', 'contact.html']
];

function injectLayout() {
  const current = location.pathname.split('/').pop() || 'index.html';
  const header = document.querySelector('[data-header]');
  const footer = document.querySelector('[data-footer]');
  if (header) {
    header.innerHTML = `
      <header class="site-header">
        <div class="container nav-wrap">
          <a class="brand" href="index.html">William Henderson<span>South Florida Real Estate</span></a>
          <button class="menu-toggle" aria-label="Open navigation">☰</button>
          <nav class="nav-links">${navItems.map(([label, url]) => `<a class="${current === url ? 'active' : ''}" href="${url}">${label}</a>`).join('')}</nav>
        </div>
      </header>`;
    document.querySelector('.menu-toggle').addEventListener('click', () => document.querySelector('.nav-links').classList.toggle('open'));
  }
  if (footer) {
    footer.innerHTML = `
      <footer class="site-footer">
        <div class="container footer-wrap">
          <div>
            <strong>William Henderson Real Estate Broker</strong>
            <p>William Henderson Real Estate</p>
            <p class="disclaimer">Property information is presented for illustrative purposes. Replace sample listings with your IDX feed and brokerage-approved disclosures before launch.</p>
          </div>
          <a class="footer-phone" href="tel:17863465611">786-346-5611</a>
        </div>
      </footer>`;
  }
}

document.addEventListener('DOMContentLoaded', injectLayout);

const sampleListings = [
  {title:'Oceanfront Residence', area:'Miami-Dade', type:'Condo', price:2450000, beds:3, baths:3, image:'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80'},
  {title:'Palm Beach Estate', area:'Palm Beach', type:'Single Family', price:3950000, beds:5, baths:6, image:'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80'},
  {title:'Fort Lauderdale Waterfront', area:'Broward', type:'Single Family', price:1850000, beds:4, baths:4, image:'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80'},
  {title:'Florida Keys Retreat', area:'Monroe', type:'Single Family', price:2895000, beds:4, baths:3, image:'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=900&q=80'},
  {title:'Brickell Luxury Rental', area:'Miami-Dade', type:'Rental', price:7800, beds:2, baths:2, image:'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=80'},
  {title:'Downtown Office Suite', area:'Broward', type:'Commercial', price:1250000, beds:0, baths:2, image:'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=80'}
];

function listingCard(item) {
  return `<article class="property-card"><img src="${item.image}" alt="${item.title}"><div class="card-body"><span class="tag">${item.area}</span><h3>${item.title}</h3><div class="price">$${item.price.toLocaleString()}</div><div class="property-meta"><span>${item.beds || '—'} Beds</span><span>${item.baths} Baths</span><span>${item.type}</span></div></div></article>`;
}

function runSearch(formId, resultsId, allowedType) {
  const form = document.getElementById(formId);
  const results = document.getElementById(resultsId);
  if (!form || !results) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    const area = data.get('area');
    const maxPrice = Number(data.get('maxPrice')) || Infinity;
    const type = data.get('type');
    const matches = sampleListings.filter(x =>
      (!allowedType || x.type === allowedType) &&
      (!area || x.area === area) &&
      (!type || x.type === type) &&
      x.price <= maxPrice
    );
    results.innerHTML = matches.length ? matches.map(listingCard).join('') : '<div class="empty-state">No sample properties match those filters. Connect your IDX provider to display live inventory.</div>';
  });
}

function calculateMortgage() {
  const price = Number(document.getElementById('homePrice').value);
  const down = Number(document.getElementById('downPayment').value);
  const rate = Number(document.getElementById('interestRate').value) / 100 / 12;
  const years = Number(document.getElementById('loanTerm').value);
  const principal = Math.max(price - down, 0);
  const payments = years * 12;
  const monthly = rate === 0 ? principal / payments : principal * rate * Math.pow(1 + rate, payments) / (Math.pow(1 + rate, payments) - 1);
  const box = document.getElementById('mortgageResult');
  box.style.display = 'block';
  box.innerHTML = `<strong>Estimated principal & interest:</strong><br><span class="price">$${isFinite(monthly) ? monthly.toLocaleString(undefined,{maximumFractionDigits:0}) : 0}/month</span><p>Taxes, insurance, HOA fees, mortgage insurance and closing costs are not included.</p>`;
}
