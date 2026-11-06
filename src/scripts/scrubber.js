// 7-day journey: one day value drives the rail, the stage (CVs and clip), the day card and its deliverables.
(function () {
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var frame = document.getElementById('bs'), play = document.getElementById('bsPlay');
  if (!frame) return;
  var DAYS = JSON.parse(frame.getAttribute('data-days'));
  var rail = document.getElementById('bsRail'), fill = document.getElementById('bsFill'), swap = document.getElementById('bsSwap');
  var btns = [].slice.call(rail.querySelectorAll('button')), timer = null, day = -1;
  // The clip plays in step with the build: each day from 3 to 7 runs its own stretch of the recording (seconds).
  var vid = document.getElementById('bsVid'), tag = document.getElementById('bsTag'), segTimer = null;
  var SEG = { 3: [0, 6], 4: [6, 12], 5: [24, 27.2], 6: [12, 24], 7: [0, 3] }, RATE = { 6: 1.5 };
  function dwell(d) { var s = SEG[d]; return Math.max(3200, s ? (s[1] - s[0]) / (RATE[d] || 1) * 1000 + 400 : 0); }
  // Still frames of the clip sit under the video. They cross-fade from the start to the end of each day's stretch,
  // so the stage always moves, even where the phone blocks video playback (Low Power Mode, data saver).
  var stills = [].slice.call(document.querySelectorAll('.bs-stills img'));
  function still(t) { for (var i = 0; i < stills.length; i++) if (+stills[i].getAttribute('data-t') === Math.round(t)) return stills[i]; return null; }
  function runStills(d) {
    var s = SEG[d]; stills.forEach(function (im) { im.style.transition = 'none'; im.style.opacity = 0; im.style.zIndex = 0; });
    if (!s) return;
    var a = still(s[0]), b = still(s[1]); if (!a || !b) return;
    if (reduce) { b.style.opacity = 1; return; }
    a.style.opacity = 1; void a.offsetWidth;
    b.style.zIndex = 1; b.style.transition = 'opacity ' + Math.round(dwell(d) * 0.8) + 'ms linear'; b.style.opacity = 1;
  }
  if (vid) {
    vid.addEventListener('playing', function () { vid.classList.add('on'); });
    vid.addEventListener('error', function () { vid.classList.remove('on'); });
  }
  function runClip(d) {
    clearTimeout(segTimer); runStills(d); if (!vid) return;
    vid.classList.remove('on');
    var s = SEG[d]; if (!s) { try { vid.pause(); } catch (e) {} return; }
    if (reduce) return;
    try { vid.playbackRate = RATE[d] || 1; vid.currentTime = s[0]; } catch (e) {}
    var p = vid.play(); if (p && p.catch) p.catch(function () { vid.classList.remove('on'); });
    segTimer = setTimeout(function () { try { vid.pause(); } catch (e) {} }, (s[1] - s[0]) / (RATE[d] || 1) * 1000);
  }
  // While playing, the rail line grows steadily toward the next day over this day's dwell time.
  function setFill(d, playing) {
    var to = (playing && d < 7 ? d + 1 : d) / 7;
    fill.style.transition = playing && d < 7 ? 'transform ' + dwell(d) + 'ms linear' : 'transform .45s ease';
    fill.style.transform = 'scaleX(' + to + ')';
  }
  function render(d) {
    var D = DAYS[d];
    document.getElementById('bsDay').textContent = 'Day ' + d;
    document.getElementById('bsPhase').textContent = D.phase;
    document.getElementById('bsTitle').textContent = D.title;
    document.getElementById('bsText').textContent = D.text;
    document.getElementById('bsCount').textContent = 'Day ' + d + ' of 7';
    var ul = document.getElementById('bsGot'); ul.textContent = '';
    D.got.forEach(function (g, i) { var li = document.createElement('li'); li.textContent = g; li.style.setProperty('--i', i); ul.appendChild(li); });
    swap.classList.remove('in'); void swap.offsetWidth; swap.classList.add('in');
  }
  function set(d, playing) {
    d = Math.max(0, Math.min(7, d));
    if (d !== day) {
      day = d;
      var cls = 'bs-frame'; for (var i = 1; i <= d; i++) cls += ' ge' + i; frame.className = cls; frame.setAttribute('data-d', d);
      if (tag) tag.textContent = d <= 2 ? 'Base CV · page ' + (d + 1) + ' of 4' : '';
      runClip(d); render(d);
      btns.forEach(function (b, i) { b.className = i < d ? 'done' : (i === d ? 'cur' : ''); if (i === d) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current'); });
    }
    setFill(d, !!playing);
  }
  function label() { play.textContent = timer ? 'Pause' : (day >= 7 ? 'Replay' : 'Play'); play.setAttribute('aria-label', timer ? 'Pause the 7-day build' : (day >= 7 ? 'Replay the 7-day build' : 'Play the 7-day build')); }
  function stop() { if (timer) { clearTimeout(timer); timer = null; } clearTimeout(segTimer); if (vid) { try { vid.pause(); } catch (e) {} } setFill(day, false); label(); }
  function start() {
    if (day >= 7) set(0, false);
    var tick = function () {
      if (day >= 7) { timer = null; setFill(7, false); label(); return; }
      set(day + 1, true); timer = setTimeout(tick, dwell(day));
    };
    timer = setTimeout(tick, dwell(day)); setFill(day, true); label();
  }
  btns.forEach(function (b) { b.addEventListener('click', function () { stop(); set(+b.getAttribute('data-d'), false); label(); }); });
  play.addEventListener('click', function () { if (timer) stop(); else start(); });
  set(0, false); label();
  if (!reduce && 'IntersectionObserver' in window) {
    var seen = false, io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting && !seen) { seen = true; setTimeout(function () { if (!timer && day === 0) start(); }, 600); io.disconnect(); } }); }, { threshold: 0.5 });
    io.observe(frame);
  }
})();
