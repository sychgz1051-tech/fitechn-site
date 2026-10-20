(() => {
'use strict';
const ps=window.FITECHN_PRODUCTS||[];
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const url=p=>'https://www.amazon.com/dp/'+p.asin;
const link=p=>'product.html?id='+p.id;
const card=p=>'<article class="product-card '+p.id+'"><a class="product-photo-wrap" href="'+link(p)+'"><img class="product-photo" src="assets/'+p.id+'-main.jpg" alt="FITECHN '+esc(p.name)+' bottle" loading="lazy"></a><div class="product-card-body"><p class="category">'+esc(p.category)+'</p><h3><a href="'+link(p)+'">'+esc(p.name)+'</a></h3><p class="product-meta">'+esc(p.tag)+'</p><p>'+esc(p.description)+'</p><div class="card-actions"><a class="button primary" href="'+link(p)+'">View Product</a><a class="button secondary" href="'+url(p)+'" target="_blank" rel="noopener">Shop on Amazon</a></div></div></article>';
['featuredProducts','productList'].forEach(id=>{const el=document.getElementById(id);if(el)el.innerHTML=ps.map(card).join('');});
const select=document.getElementById('productSelect');
if(select)ps.forEach(p=>{const o=document.createElement('option');o.value=p.name;o.textContent=p.name;select.append(o);});
const common=[['Where can I buy FITECHN products?','Use the Amazon shopping link on each product page. Price, availability and delivery options are shown on Amazon.'],['How soon will you reply?','We respond to all inquiries within 24 hours. Email service@fitechn.com or use our support form.'],['Can you help with an Amazon order?','Include your product name, Amazon order number and a short description of the issue so our team can help.'],['Can I request a return or replacement?','Contact us with your order details. Eligibility depends on the order and Amazon’s applicable policies.'],['Can I combine supplements?','Ask a healthcare professional about using supplements together, especially if you take medicines or other supplements. Follow the directions for each product.']];
const faq=rows=>rows.map(([q,a])=>'<details><summary>'+esc(q)+'</summary><p>'+esc(a)+'</p></details>').join('');
const all=document.getElementById('allFaqs');
if(all)all.innerHTML=ps.map(p=>'<section class="faq-group" id="'+p.id+'-faq"><p class="eyebrow">'+esc(p.category)+'</p><h2>'+esc(p.name)+'</h2><div class="faq-list">'+faq(p.faqs)+'</div></section>').join('')+'<section class="faq-group" id="orders-faq"><h2>Orders and support</h2><div class="faq-list">'+faq(common)+'</div></section>';
const footer=document.querySelector('.site-footer');
if(footer)footer.innerHTML='<p>© '+new Date().getFullYear()+' FITECHN. All rights reserved.</p><a href="mailto:service@fitechn.com">service@fitechn.com</a><a href="privacy.html">Privacy</a>';
const supportForm=document.getElementById('supportForm');
if(supportForm && window.fetch && window.FormData){
  const submitButton=supportForm.querySelector('button[type="submit"]');
  const status=document.createElement('p');
  status.className='form-note';
  status.setAttribute('role','status');
  status.setAttribute('aria-live','polite');
  submitButton.insertAdjacentElement('afterend',status);
  let sending=false;
  supportForm.addEventListener('submit',async event=>{
    event.preventDefault();
    if(sending)return;
    sending=true;
    submitButton.disabled=true;
    submitButton.textContent='Sending…';
    status.textContent='Please keep this page open while we send your request.';
    const controller=new AbortController();
    const timeout=setTimeout(()=>controller.abort(),20000);
    try{
      const response=await fetch('https://formsubmit.co/ajax/service@fitechn.com',{
        method:'POST',
        headers:{'Content-Type':'application/json','Accept':'application/json'},
        body:JSON.stringify(Object.fromEntries(new FormData(supportForm))),
        signal:controller.signal
      });
      const result=await response.json();
      if(!response.ok || ![true,'true'].includes(result.success) || /activat/i.test(result.message||''))throw new Error('Submission not confirmed');
      status.textContent='Your request was submitted. Opening your confirmation…';
      window.location.assign('thank-you.html');
    }catch(error){
      status.textContent='We could not confirm your submission. Your message is still here. Please try again or email service@fitechn.com.';
      sending=false;
      submitButton.disabled=false;
      submitButton.textContent='Submit Support Request';
    }finally{
      clearTimeout(timeout);
    }
  });
}
document.addEventListener('play',event=>{if(event.target.tagName==='VIDEO')document.querySelectorAll('video').forEach(v=>{if(v!==event.target)v.pause();});},true);
})();
