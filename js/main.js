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

  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const musicToggle = document.getElementById('musicToggle');
  const portfolioAudio = document.getElementById('portfolioAudio');
  const controlState = musicToggle.querySelector('.control-state');
  const savedTheme = localStorage.getItem('portfolio-theme');

  function applyTheme(theme){
    const isLight = theme === 'light';
    root.dataset.theme = isLight ? 'light' : 'dark';
    themeToggle.setAttribute('aria-pressed', String(isLight));
    themeToggle.setAttribute('aria-label', isLight ? 'Activer le mode sombre' : 'Activer le mode clair');
  }

  applyTheme(savedTheme === 'light' ? 'light' : 'dark');
  themeToggle.addEventListener('click', ()=>{
    const nextTheme = root.dataset.theme === 'light' ? 'dark' : 'light';
    applyTheme(nextTheme);
    localStorage.setItem('portfolio-theme', nextTheme);
  });

  const audioSource = portfolioAudio.dataset.source.trim();
  if(audioSource){
    portfolioAudio.src = audioSource;
    musicToggle.disabled = false;
    musicToggle.title = 'Activer ou mettre en pause la musique';
  }else{
    controlState.textContent = 'N/A';
    musicToggle.title = 'Ajoutez le fichier audio du portfolio pour activer la musique';
  }

  function updateMusicState(isPlaying){
    musicToggle.classList.toggle('is-playing', isPlaying);
    musicToggle.setAttribute('aria-pressed', String(isPlaying));
    controlState.textContent = isPlaying ? 'ON' : 'OFF';
    musicToggle.setAttribute('aria-label', isPlaying ? 'Mettre la musique en pause' : 'Lire la musique');
  }

  musicToggle.addEventListener('click', async ()=>{
    if(!audioSource) return;
    if(portfolioAudio.paused){
      try{
        await portfolioAudio.play();
        updateMusicState(true);
      }catch(error){
        updateMusicState(false);
      }
    }else{
      portfolioAudio.pause();
      updateMusicState(false);
    }
  });
  portfolioAudio.addEventListener('pause', ()=>updateMusicState(false));
  portfolioAudio.addEventListener('ended', ()=>updateMusicState(false));
  portfolioAudio.addEventListener('error', ()=>{
    musicToggle.disabled = true;
    controlState.textContent = 'N/A';
    musicToggle.title = 'Le fichier audio est introuvable ou incompatible';
    updateMusicState(false);
  });



