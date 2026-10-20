(function () {
  // Scroll reveal (same motion as the other pages). Added by JS so the page is fully visible without it.
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var sections = Array.prototype.slice.call(document.querySelectorAll('main section'));
  if (!reduce && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.06 });
    sections.forEach(function (s) { s.classList.add('reveal'); io.observe(s); });
  }

  // Lightbox: click, arrow keys, Escape, and swipe.
  var links = Array.prototype.slice.call(document.querySelectorAll('a.lb'));
  var box = document.querySelector('.lbx');
  if (!box || !links.length) return;
  var img = box.querySelector('img'), cap = box.querySelector('.cap'), stage = box.querySelector('.stage'), i = 0, lastFocus;
  function show(n) {
    i = (n + links.length) % links.length;
    var a = links[i];
    img.src = a.getAttribute('href');
    img.alt = a.dataset.caption || '';
    cap.textContent = (a.dataset.caption || '') + '  (' + (i + 1) + ' / ' + links.length + ')';
    stage.scrollTop = 0;
  }
  function open(n) { lastFocus = document.activeElement; show(n); box.classList.add('open'); document.body.style.overflow = 'hidden'; box.querySelector('.close').focus(); }
  function close() { box.classList.remove('open'); document.body.style.overflow = ''; img.src = ''; if (lastFocus) lastFocus.focus(); }
  links.forEach(function (a, n) { a.addEventListener('click', function (e) { e.preventDefault(); open(n); }); });
  box.querySelector('.close').onclick = close;
  box.querySelector('.prev').onclick = function () { show(i - 1); };
  box.querySelector('.nextb').onclick = function () { show(i + 1); };
  stage.addEventListener('click', function (e) { if (e.target === stage) close(); });
  document.addEventListener('keydown', function (e) {
    if (!box.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(i - 1);
    if (e.key === 'ArrowRight') show(i + 1);
  });
  var x0 = null;
  stage.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  stage.addEventListener('touchend', function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 60) show(i + (dx < 0 ? 1 : -1));
    x0 = null;
  });
})();
