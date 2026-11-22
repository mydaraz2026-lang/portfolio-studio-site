// Stage tabs choose which days are offered; the day chips choose the preview and the "today" line.
(function () {
  var root = document.getElementById('bsRoot'), frame = document.getElementById('bs');
  if (!root || !frame) return;
  var stages = window.__bsStages || [];
  var tabs = [].slice.call(root.querySelectorAll('.bs-tab')), panes = [].slice.call(root.querySelectorAll('.bs-pane'));
  var dayGroups = [].slice.call(root.querySelectorAll('.bs-days')), pvs = [].slice.call(root.querySelectorAll('.pv'));
  var stage = 0, day = 0;
  function showDay(n) {
    day = n;
    pvs.forEach(function (p) { p.classList.toggle('on', +p.getAttribute('data-pv') === n); });
    frame.classList.toggle('is-live', n === 7);
    [].forEach.call(dayGroups[stage].querySelectorAll('.bs-day'), function (b) { b.setAttribute('aria-pressed', +b.getAttribute('data-day') === n ? 'true' : 'false'); });
    var info = stages[stage].filter(function (d) { return d.n === n; })[0];
    if (info) panes[stage].querySelector('.today').textContent = info.today;
  }
  function showStage(i) {
    stage = i;
    tabs.forEach(function (t, k) { t.setAttribute('aria-selected', k === i ? 'true' : 'false'); t.tabIndex = k === i ? 0 : -1; });
    panes.forEach(function (p, k) { p.hidden = k !== i; });
    dayGroups.forEach(function (g, k) { g.hidden = k !== i; });
    showDay(stages[i][0].n);
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { showStage(i); });
    t.addEventListener('keydown', function (e) {
      var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : e.key === 'Home' ? -tabs.length : e.key === 'End' ? tabs.length : 0;
      if (!d) return; var n = Math.max(0, Math.min(tabs.length - 1, i + d)); showStage(n); tabs[n].focus(); e.preventDefault();
    });
  });
  [].forEach.call(root.querySelectorAll('.bs-day'), function (b) { b.addEventListener('click', function () { showDay(+b.getAttribute('data-day')); }); });
  showStage(0);
})();
