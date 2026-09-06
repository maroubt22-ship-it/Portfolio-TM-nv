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
  const formStatus = document.getElementById('formStatus');
  const submitBtn = form.querySelector('button[type="submit"]');

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

  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    formStatus.textContent = 'Envoi en cours...';
    formStatus.className = 'form-status is-visible';
    submitBtn.disabled = true;

    try{
      const response = await fetch(form.action, {
        method:'POST',
        body:new FormData(form),
        headers:{Accept:'application/json'}
      });
      if(!response.ok) throw new Error('Submission failed');
      form.reset();
      formStatus.textContent = 'Message envoyé. Merci pour votre message.';
      formStatus.className = 'form-status is-visible is-success';
    }catch(error){
      formStatus.textContent = 'Impossible d\'envoyer le message. Veuillez réessayer.';
      formStatus.className = 'form-status is-visible is-error';
    }finally{
      submitBtn.disabled = false;
    }
  });

