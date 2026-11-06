// Vertical build timeline: the line draws as you scroll, dots light up when it reaches them,
// cards fade in once, and the sample previews scale to fit their card.
(function () {
  var tl = document.getElementById('tl');
  if (!tl) return;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var progress = tl.querySelector('.tl-progress'), dots = [].slice.call(tl.querySelectorAll('.tl-dot')), cards = [].slice.call(tl.querySelectorAll('.tl-card'));
  var scales = [].slice.call(tl.querySelectorAll('.tl-prev'));

  function fit() {
    scales.forEach(function (box) {
      var inner = box.firstElementChild, s = box.clientWidth / 560;
      inner.style.transform = 'scale(' + s + ')'; box.style.height = (392 * s) + 'px';
    });
  }
  var ticking = false;
  function update() {
    ticking = false;
    var r = tl.getBoundingClientRect(), trigger = innerHeight * 0.6;
    var pct = Math.max(0, Math.min(100, ((trigger - r.top) / r.height) * 100));
    progress.style.height = pct + '%';
    var bottom = progress.getBoundingClientRect().bottom;
    dots.forEach(function (d) { var b = d.getBoundingClientRect(); d.classList.toggle('active', bottom >= b.top + b.height / 2); });
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }

  if (!reduce && 'IntersectionObserver' in window) {
    tl.classList.add('anim');
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } }); }, { threshold: 0.15 });
    cards.forEach(function (c) { io.observe(c); });
  }
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', function () { fit(); update(); });
  fit(); update();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { fit(); update(); });
})();
