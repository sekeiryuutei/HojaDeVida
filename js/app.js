// Forzar descarga robusta (y fallback) para todos los botones con .js-download
(function () {
  const buttons = [...document.querySelectorAll('.js-download')];
  if (!buttons.length) return;

  const forceDownload = async (url) => {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error('No se encontró el archivo (' + res.status + ')');
    const blob = await res.blob();
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'Victor_Burbano_CV.pdf';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  };

  buttons.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const url = btn.getAttribute('href') || './assets/cv.pdf';
      try { await forceDownload(url); }
      catch { window.open(url, '_blank'); }
    });
  });
})();

// Scroll suave
document.documentElement.style.scrollBehavior = 'smooth';

// Scrollspy del menú móvil
(function(){
  const links = [...document.querySelectorAll('.mnav-link[data-section]')];
  if (!links.length) return;
  const map = Object.fromEntries(links.map(a => [a.dataset.section, a]));

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      const id = e.target.id;
      if (map[id] && e.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        map[id].classList.add('active');
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px', threshold: 0.1 });

  ['perfil', 'proyectos', 'experiencia', 'contacto']
    .forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
})();

// Año dinámico
(function(){
  const span = document.getElementById('y');
  if (span) span.textContent = new Date().getFullYear();
})();
