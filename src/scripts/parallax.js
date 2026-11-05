// Scroll-driven parallax stack: each layer moves at its own rate.
(function () {
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };

  /* ---- Effect 2: parallax stack ---- */
  if (reduce) return;
  var px = document.getElementById('px'), stage = document.getElementById('stage'), bar = document.getElementById('bar');
  var el = {}; [].forEach.call(stage.querySelectorAll('[data-k]'), function (n) { el[n.getAttribute('data-k')] = n; });
  var moveTimer, cp = -1;
  function ease(t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }
  function update() {
    var r = px.getBoundingClientRect(), total = r.height - stage.offsetHeight;
    var p = total > 0 ? clamp(-(r.top - 68) / total, 0, 1) : 0;
    if (Math.abs(p - cp) < 0.0005) return; cp = p;
    var w = stage.clientWidth, e = ease(p), dy = function (speed) { return (0.5 - p) * speed * 240; };
    el.ghost.style.transform = 'translate3d(' + (-50 + (0.5 - p) * 30) + '%,calc(-50% + ' + dy(0.25) + 'px),0)';
    el.glow.style.transform = 'translate3d(0,' + dy(0.3) + 'px,-140px) scale(' + (0.8 + p * 0.5) + ')';
    var narrow = w < 700, cs = narrow ? clamp(w / 400, 0.6, 0.88) : clamp(w / 1150, 0.7, 1.05), gapX = Math.min(w * 0.33, 430), fan = [-1, 0, 1];
    ['c0', 'c1', 'c2'].forEach(function (k, i) {
      var f = fan[i], mid = i === 1;
      var x = narrow ? 0 : f * gapX * e;
      var y = dy(0.6) + 50 * (1 - e) + (narrow ? 60 * e + f * 138 * cs * e : (mid ? -14 : 8) * e);
      el[k].style.transform = 'translate3d(' + x + 'px,' + y + 'px,' + (mid ? 80 : 30) * e + 'px) rotate(' + (narrow ? 0 : f * 4 * e) + 'deg) scale(' + cs * (0.86 + 0.14 * e) + ')';
      el[k].style.opacity = String(clamp(0.2 + p * 2.2, 0, 1));
    });
    el.chip.style.transform = 'translate3d(0,' + (dy(0.4) + 215 * cs) + 'px,200px) scale(' + clamp(w / 900, 0.8, 1) + ')';
    bar.style.width = (p * 100) + '%';
    px.classList.add('moving'); clearTimeout(moveTimer); moveTimer = setTimeout(function () { if (p < 0.02) px.classList.remove('moving'); }, 400);
  }
  addEventListener('scroll', function () { requestAnimationFrame(update); }, { passive: true });
  addEventListener('resize', function () { cp = -1; update(); });
  update();
})();
