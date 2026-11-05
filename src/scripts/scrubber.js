// 7-day build scrubber: drives the stage, the panel and the checklist from one day value.
(function () {
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var frame = document.getElementById('bs'), range = document.getElementById('bsRange'), play = document.getElementById('bsPlay');
  if (!frame) return;
  var STEPS = JSON.parse(frame.getAttribute('data-steps'));
  var lis = [].slice.call(document.querySelectorAll('#bsSteps li')), timer = null, day = -1;
  function set(d) {
    d = Math.max(0, Math.min(7, d)); if (d === day) return; day = d;
    var cls = 'bs-frame'; for (var i = 1; i <= d; i++) cls += ' ge' + i; frame.className = cls; frame.setAttribute('data-d', d);
    document.getElementById('bsDay').textContent = 'Day ' + d;
    document.getElementById('bsTitle').textContent = STEPS[d][0];
    document.getElementById('bsText').textContent = STEPS[d][1];
    range.value = d; range.style.setProperty('--fill', (d / 7 * 100) + '%');
    range.setAttribute('aria-valuetext', 'Day ' + d + ': ' + STEPS[d][0]);
    lis.forEach(function (li) { var f = +li.getAttribute('data-from'), t = +li.getAttribute('data-to'); li.className = (d > t || (d >= 7 && t >= 7)) ? 'done' : (d >= f ? 'cur' : ''); });
  }
  function stop() { if (timer) { clearInterval(timer); timer = null; } play.textContent = day >= 7 ? 'Replay' : 'Play'; play.setAttribute('aria-label', day >= 7 ? 'Replay the 7-day build' : 'Play the 7-day build'); }
  function start() {
    if (day >= 7) set(0);
    play.textContent = 'Pause'; play.setAttribute('aria-label', 'Pause the 7-day build');
    timer = setInterval(function () { if (day >= 7) { stop(); return; } set(day + 1); if (day >= 7) stop(); }, 1100);
  }
  range.addEventListener('input', function () { stop(); set(+range.value); });
  play.addEventListener('click', function () { if (timer) stop(); else start(); });
  set(0);
  if (!reduce && 'IntersectionObserver' in window) {
    var seen = false, io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting && !seen) { seen = true; setTimeout(function () { if (!timer && day === 0) start(); }, 600); io.disconnect(); } }); }, { threshold: 0.5 });
    io.observe(frame);
  }
})();
