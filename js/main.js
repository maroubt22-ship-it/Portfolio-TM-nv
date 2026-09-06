const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    });
  }, {threshold:0.12, rootMargin:'0px 0px -60px 0px'});
  revealEls.forEach(el=>io.observe(el));

  // Contact modal
  const overlay = document.getElementById('contactOverlay');
  const openBtns = document.querySelectorAll('[data-open-contact-modal]');
  const closeBtn = document.getElementById('modalClose');
  const cancelBtn = document.getElementById('modalCancel');
  const form = document.getElementById('contactForm');

  function openModal(){
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
    setTimeout(()=>document.getElementById('cf-name').focus(), 250);
  }
  function closeModal(){
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  }

  openBtns.forEach(btn=>btn.addEventListener('click', openModal));
  closeBtn.addEventListener('click', closeModal);
  cancelBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e)=>{ if(e.target === overlay) closeModal(); });
  document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape' && overlay.classList.contains('is-open')) closeModal(); });

