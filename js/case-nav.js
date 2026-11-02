// Case study nav: "back" link and a header that hides on scroll down and returns on scroll up.
(function () {
  // Back: return to the previous page (and its scroll position) when it was on this site;
  // otherwise follow the link's href to the page this one belongs to.
  var link = document.querySelector('.nav__back');
  if (link) {
    link.addEventListener('click', function (e) {
      try {
        if (document.referrer && new URL(document.referrer).origin === location.origin && history.length > 1) {
          e.preventDefault();
          history.back();
        }
      } catch (err) {}
    });
  }

  // Header hides while scrolling down and comes back after a small scroll up.
  var siteHeader = document.querySelector('.site-header');
  if (!siteHeader) return;
  var lastScrollY = window.scrollY;
  var upDistance = 0;
  var ignoreScrollUntil = 0;
  var SHOW_AFTER_UP = 10;
  var setHidden = function (hidden) {
    siteHeader.classList.toggle('is-hidden', hidden);
  };
  window.addEventListener('scroll', function () {
    var y = window.scrollY;
    var delta = y - lastScrollY;
    lastScrollY = y;
    siteHeader.classList.toggle('is-stuck', y > 0);
    if (y <= siteHeader.offsetHeight) { upDistance = 0; setHidden(false); return; }
    if (Date.now() < ignoreScrollUntil) return;
    if (delta > 0) { upDistance = 0; setHidden(true); }
    else if (delta < 0) {
      upDistance -= delta;
      if (upDistance >= SHOW_AFTER_UP) setHidden(false);
    }
  }, { passive: true });
  // In-page links scroll the page themselves: keep the header out of the way of the target.
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function () {
      ignoreScrollUntil = Date.now() + 1000;
      setHidden(true);
    });
  });
  siteHeader.addEventListener('focusin', function () { setHidden(false); });
})();
