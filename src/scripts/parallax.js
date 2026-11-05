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
    var w = stage.clientWidth, sc = clamp(w / 1000, 0.42, 1), e = ease(p), dy = function (speed) { return (0.5 - p) * speed * 240; };
    el.ghost.style.transform = 'translate3d(' + (-50 + (0.5 - p) * 30) + '%,calc(-50% + ' + dy(0.25) + 'px),0)';
    el.glow.style.transform = 'translate3d(0,' + dy(0.3) + 'px,-140px) scale(' + (0.8 + p * 0.5) + ')';
    el.laptop.style.transform = 'translate3d(0,' + dy(0.55) + 'px,0) rotateX(' + (14 - 14 * e) + 'deg) scale(' + sc + ')';
    var spread = Math.min(300, w * 0.24), fan = [-1, 0, 1];
    ['c0', 'c1', 'c2'].forEach(function (k, i) {
      var f = fan[i], mid = i === 1;
      el[k].style.transform = 'translate3d(' + (f * spread * e * 1.15) + 'px,' + (dy(0.9) + (mid ? 40 : 70) * (1 - e) + (mid ? 0 : 30) * e + 40 * e) + 'px,' + (mid ? 120 : 60) * e + 'px) rotate(' + (f * 9 * e) + 'deg) scale(' + sc * (0.82 + 0.18 * e) + ')';
      el[k].style.opacity = String(clamp(0.2 + p * 2.2, 0, 1));
    });
    el.phone.style.transform = 'translate3d(' + (sc * 270 * (1 - 0.35 * e)) + 'px,' + (dy(1.25) + 30) + 'px,30px) scale(' + sc + ')';
    el.chip.style.transform = 'translate3d(' + (-sc * 250) + 'px,' + (dy(1.5) - 30 * sc) + 'px,220px) scale(' + sc + ')';
    bar.style.width = (p * 100) + '%';
    px.classList.add('moving'); clearTimeout(moveTimer); moveTimer = setTimeout(function () { if (p < 0.02) px.classList.remove('moving'); }, 400);
  }
  addEventListener('scroll', function () { requestAnimationFrame(update); }, { passive: true });
  addEventListener('resize', function () { cp = -1; update(); });
  update();
})();
