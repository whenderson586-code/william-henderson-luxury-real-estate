const navItems = [
  ['Home','index.html'], ['About Us','about.html'], ['Buyers','buyers.html'],
  ['Sellers','sellers.html'], ['Rentals','rentals.html'], ['Commercial','commercial.html'],
  ['Neighborhoods','neighborhoods.html'], ['Buildings','buildings.html'],
  ['Agents','agents.html'], ['Blog','blog.html'], ['Contact Us','contact.html']
];

function injectLayout(){
  const current = location.pathname.split('/').pop() || 'index.html';
  const header = document.querySelector('[data-header]');
  const footer = document.querySelector('[data-footer]');
  if(header){
    header.innerHTML = `<div class="container nav-wrap">
      <a class="brand" href="index.html">William Henderson<span>South Florida Real Estate</span></a>
      <button class="menu-toggle" aria-label="Open navigation">☰</button>
      <nav class="nav-links">${navItems.map(([label,url]) =>
        `<a class="${current===url?'active':''}" href="${url}">${label}</a>`).join('')}</nav>
    </div>`;
    header.querySelector('.menu-toggle').addEventListener('click',()=>header.querySelector('.nav-links').classList.toggle('open'));
  }
  if(footer){
    footer.innerHTML = `<div class="container">
      <div class="footer-grid">
        <div>
          <h3>William Henderson Real Estate</h3>
          <p>Luxury homes, rentals, investments and commercial real estate across South Florida.</p>
          <a class="footer-phone" href="tel:+17863465611">786-346-5611</a>
        </div>
        <div>
          <h3>Quick Links</h3>
          <div class="footer-links"><a href="buyers.html">Buyers</a><a href="sellers.html">Sellers</a><a href="rentals.html">Rentals</a><a href="commercial.html">Commercial</a><a href="contact.html">Contact</a></div>
        </div>
        <div>
          <h3>Explore</h3>
          <div class="footer-links"><a href="neighborhoods.html">Neighborhoods</a><a href="buildings.html">Luxury Buildings</a><a href="blog.html">Market Insights</a><a href="about.html">About William</a></div>
        </div>
      </div>
      <p class="disclaimer">William Henderson Real Estate Broker. Property information shown on this demonstration website is illustrative and should be replaced with brokerage-approved data, disclosures, Equal Housing language and IDX attribution before public launch.</p>
    </div>`;
  }
}
document.addEventListener('DOMContentLoaded',injectLayout);

const sampleListings = [
 {title:'Oceanfront Residence',area:'Miami Beach',type:'Condo',price:2450000,beds:3,baths:3,image:'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=82'},
 {title:'Palm Beach Estate',area:'Palm Beach',type:'Single Family',price:3950000,beds:5,baths:6,image:'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=82'},
 {title:'Fort Lauderdale Waterfront',area:'Fort Lauderdale',type:'Single Family',price:1850000,beds:4,baths:4,image:'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=82'},
 {title:'Florida Keys Retreat',area:'Islamorada',type:'Single Family',price:2895000,beds:4,baths:3,image:'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=900&q=82'},
 {title:'Brickell Luxury Rental',area:'Brickell',type:'Rental',price:7800,beds:2,baths:2,image:'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=82'},
 {title:'Las Olas Office Suite',area:'Las Olas',type:'Commercial',price:1250000,beds:0,baths:2,image:'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=82'}
];

function listingCard(item){
  return `<article class="property-card">
    <img src="${item.image}" alt="${item.title}">
    <div class="card-body"><span class="tag">${item.area}</span><h3>${item.title}</h3>
    <div class="price">$${item.price.toLocaleString()}</div>
    <div class="property-meta"><span>${item.beds||'—'} Beds</span><span>${item.baths} Baths</span><span>${item.type}</span></div></div>
  </article>`;
}
function renderFeaturedListings(){
  const target=document.getElementById('featuredListings');
  if(target) target.innerHTML=sampleListings.slice(0,4).map(listingCard).join('');
}
function runSearch(formId,resultsId,allowedType){
  const form=document.getElementById(formId),results=document.getElementById(resultsId);
  if(!form||!results)return;
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const data=new FormData(form),area=data.get('area'),type=data.get('type');
    const maxPrice=Number(data.get('maxPrice'))||Infinity,beds=Number(data.get('beds'))||0;
    const matches=sampleListings.filter(x=>(!allowedType||x.type===allowedType)&&(!area||x.area===area)&&(!type||x.type===type)&&x.price<=maxPrice&&x.beds>=beds);
    results.innerHTML=matches.length?matches.map(listingCard).join(''):'<div class="empty-state">No sample properties match those filters. Live inventory will appear here after an IDX provider is connected.</div>';
    results.scrollIntoView({behavior:'smooth',block:'nearest'});
  });
}
function calculateMortgage(){
  const price=Number(document.getElementById('homePrice').value),down=Number(document.getElementById('downPayment').value);
  const rate=Number(document.getElementById('interestRate').value)/100/12,years=Number(document.getElementById('loanTerm').value);
  const principal=Math.max(price-down,0),payments=years*12;
  const monthly=rate===0?principal/payments:principal*rate*Math.pow(1+rate,payments)/(Math.pow(1+rate,payments)-1);
  const box=document.getElementById('mortgageResult');
  box.style.display='block';
  box.innerHTML=`<strong>Estimated principal & interest:</strong><br><span class="price">$${isFinite(monthly)?monthly.toLocaleString(undefined,{maximumFractionDigits:0}):0}/month</span><p>Taxes, insurance, HOA fees, mortgage insurance and closing costs are not included.</p>`;
}