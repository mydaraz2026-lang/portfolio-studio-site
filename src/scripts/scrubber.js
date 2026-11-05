// 7-day build scrubber: drives the stage, the panel and the checklist from one day value.
(function () {
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var frame = document.getElementById('bs'), range = document.getElementById('bsRange'), play = document.getElementById('bsPlay');
  if (!frame) return;
  var STEPS = JSON.parse(frame.getAttribute('data-steps'));
  var lis = [].slice.call(document.querySelectorAll('#bsSteps li')), timer = null, day = -1;
  // The clip plays in step with the build: each day from 3 to 7 runs its own stretch of the recording (seconds).
  var vid = document.getElementById('bsVid'), tag = document.getElementById('bsTag'), segTimer = null;
  var SEG = { 3: [0, 6], 4: [6, 12], 5: [24, 27.2], 6: [12, 24], 7: [0, 3] }, RATE = { 6: 1.5 };
  function dwell(d) { var s = SEG[d]; return s ? (s[1] - s[0]) / (RATE[d] || 1) * 1000 + 400 : 1100; }
  function runClip(d) {
    clearTimeout(segTimer); if (!vid) return;
    var s = SEG[d]; if (!s) { try { vid.pause(); } catch (e) {} return; }
    try { vid.playbackRate = RATE[d] || 1; vid.currentTime = reduce ? (s[0] + s[1]) / 2 : s[0]; } catch (e) {}
    if (reduce) return;
    var p = vid.play(); if (p && p.catch) p.catch(function () {});
    segTimer = setTimeout(function () { try { vid.pause(); } catch (e) {} }, (s[1] - s[0]) / (RATE[d] || 1) * 1000);
  }
  function set(d) {
    d = Math.max(0, Math.min(7, d)); if (d === day) return; day = d;
    var cls = 'bs-frame'; for (var i = 1; i <= d; i++) cls += ' ge' + i; frame.className = cls; frame.setAttribute('data-d', d);
    document.getElementById('bsDay').textContent = 'Day ' + d;
    if (tag) tag.textContent = d <= 2 ? 'Base CV · page ' + (d + 1) + ' of 4' : '';
    runClip(d);
    document.getElementById('bsTitle').textContent = STEPS[d][0];
    document.getElementById('bsText').textContent = STEPS[d][1];
    range.value = d; range.style.setProperty('--fill', (d / 7 * 100) + '%');
    range.setAttribute('aria-valuetext', 'Day ' + d + ': ' + STEPS[d][0]);
    lis.forEach(function (li) { var f = +li.getAttribute('data-from'), t = +li.getAttribute('data-to'); li.className = (d > t || (d >= 7 && t >= 7)) ? 'done' : (d >= f ? 'cur' : ''); });
  }
  function stop() { if (timer) { clearTimeout(timer); timer = null; } clearTimeout(segTimer); if (vid) { try { vid.pause(); } catch (e) {} } play.textContent = day >= 7 ? 'Replay' : 'Play'; play.setAttribute('aria-label', day >= 7 ? 'Replay the 7-day build' : 'Play the 7-day build'); }
  function start() {
    if (day >= 7) set(0);
    play.textContent = 'Pause'; play.setAttribute('aria-label', 'Pause the 7-day build');
    var tick = function () {
      if (day >= 7) { stop(); return; }
      set(day + 1); timer = setTimeout(tick, dwell(day));
    };
    timer = setTimeout(tick, dwell(day));
  }
  range.addEventListener('input', function () { stop(); set(+range.value); });
  play.addEventListener('click', function () { if (timer) stop(); else start(); });
  set(0);
  if (!reduce && 'IntersectionObserver' in window) {
    var seen = false, io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting && !seen) { seen = true; setTimeout(function () { if (!timer && day === 0) start(); }, 600); io.disconnect(); } }); }, { threshold: 0.5 });
    io.observe(frame);
  }
})();
