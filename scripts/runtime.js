/* Bunpot Wittaya — single-file runtime (hash router + interactive widgets, no dependencies) */
(function () {
  "use strict";
  var NAV = __NAV__;
  var main = document.getElementById("main");
  var pages = {};
  document.querySelectorAll("template[data-route]").forEach(function (t) { pages[t.getAttribute("data-route")] = t; });
  var current = null;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function parse() {
    var h = decodeURIComponent(location.hash || "");
    if (h.indexOf("#/") !== 0) return null;
    var rest = h.slice(1), anchor = "", ai = rest.indexOf("#");
    if (ai >= 0) { anchor = rest.slice(ai + 1); rest = rest.slice(0, ai); }
    var qi = rest.indexOf("?");
    var path = qi >= 0 ? rest.slice(0, qi) : rest;
    var query = new URLSearchParams(qi >= 0 ? rest.slice(qi + 1) : "");
    path = path.replace(/\/+$/, "") || "/";
    return { path: path, query: query, anchor: anchor };
  }

  function render() {
    var r = parse() || { path: "/", query: new URLSearchParams() };
    if (current === r.path) { initEvidence(r.query, true); if (r.anchor) { var a = document.getElementById(r.anchor); if (a) a.scrollIntoView(); } return; }
    var tpl = pages[r.path] || pages["/404"];
    current = r.path;
    main.innerHTML = tpl.innerHTML;
    document.title = tpl.getAttribute("data-title") || document.title;
    window.scrollTo(0, 0);
    setNavActive(r.path);
    setPortalActive(r.path);
    closeDropdowns();
    closeMobile();
    initNews(); initEvidence(r.query, false); initCalendar(); initToday(); initSearchForms(); animate();
    if (r.anchor) { var el = document.getElementById(r.anchor); if (el) setTimeout(function () { el.scrollIntoView(); }, 0); }
  }

  /* ---------- navigation ---------- */
  var ACTIVE = ["bg-lavender-100", "text-purple-700"], IDLE = ["text-ink", "hover:bg-lavender-100/70"];
  function isActive(path, item) {
    if (item.href === "/") return path === "/";
    if (path.indexOf(item.href) === 0) return true;
    return (item.children || []).some(function (c) { return path.indexOf(c.href) === 0; });
  }
  function setNavActive(path) {
    var top = document.querySelectorAll('header nav[aria-label="เมนูหลัก"] > ul > li');
    top.forEach(function (li, i) {
      var el = li.firstElementChild, item = NAV[i];
      if (!el || !item) return;
      var on = isActive(path, item);
      ACTIVE.forEach(function (c) { el.classList.toggle(c, on); });
      IDLE.forEach(function (c) { el.classList.toggle(c, !on); });
      if (el.tagName === "A") { if (path === item.href) el.setAttribute("aria-current", "page"); else el.removeAttribute("aria-current"); }
    });
  }
  function setPortalActive(path) {
    main.querySelectorAll('nav[aria-label="เมนูศูนย์คุณภาพ"] a').forEach(function (a) {
      var href = a.getAttribute("href").slice(1), base = href.split("#")[0], on;
      if (href.indexOf("#") > 0) on = path.indexOf("/projects") === 0;
      else if (base === "/quality") on = path === "/quality";
      else if (base.indexOf("/quality/standard-") === 0) { var n = base.slice(-1); on = path === base || path.indexOf("/quality/indicator/" + n + ".") === 0; }
      else on = path.indexOf(base) === 0;
      ["bg-white", "text-purple-700", "shadow-soft"].forEach(function (c) { a.classList.toggle(c, on); });
      ["text-ink", "hover:bg-white/60"].forEach(function (c) { a.classList.toggle(c, !on); });
      if (on) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });
  }
  function closeDropdowns() {
    document.querySelectorAll("[data-dd]").forEach(function (d) { d.remove(); });
    document.querySelectorAll('header button[aria-haspopup="true"]').forEach(function (b) { b.setAttribute("aria-expanded", "false"); });
  }
  function initDropdowns() {
    var lis = document.querySelectorAll('header nav[aria-label="เมนูหลัก"] > ul > li');
    lis.forEach(function (li, i) {
      var btn = li.querySelector("button[aria-haspopup]"), item = NAV[i];
      if (!btn || !item) return;
      function open() {
        if (li.querySelector("[data-dd]")) return;
        closeDropdowns();
        var wrap = document.createElement("div");
        wrap.setAttribute("data-dd", "");
        wrap.className = "absolute left-0 top-full z-50 pt-2";
        var ul = document.createElement("ul");
        ul.className = "min-w-60 rounded-[var(--radius-md)] border border-line bg-card p-2 shadow-lift";
        item.children.forEach(function (c) {
          var a = document.createElement("a");
          a.href = "#" + c.href; a.textContent = c.label;
          a.className = "flex min-h-11 items-center rounded-xl px-3 text-[15px] hover:bg-lavender-100";
          var l = document.createElement("li"); l.appendChild(a); ul.appendChild(l);
        });
        wrap.appendChild(ul); li.appendChild(wrap);
        btn.setAttribute("aria-expanded", "true");
      }
      var hoverAt = 0;
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        if (li.querySelector("[data-dd]") && Date.now() - hoverAt > 400) closeDropdowns(); else open();
      });
      btn.addEventListener("mouseenter", function () { if (!li.querySelector("[data-dd]")) hoverAt = Date.now(); open(); });
      li.addEventListener("mouseleave", closeDropdowns);
    });
    document.addEventListener("click", closeDropdowns);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") { closeDropdowns(); closeMobile(); } });
  }

  var mobile = null;
  function closeMobile() { if (mobile) { mobile.remove(); mobile = null; document.body.style.overflow = ""; } }
  function openMobile() {
    closeMobile();
    var path = (parse() || { path: "/" }).path;
    var o = document.createElement("div");
    o.setAttribute("role", "dialog"); o.setAttribute("aria-modal", "true"); o.setAttribute("aria-label", "เมนู");
    var html = '<div class="fixed inset-0 z-50 bg-ink/30 backdrop-blur-sm" data-close></div>' +
      '<div class="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-page shadow-lift">' +
      '<div class="flex h-[72px] items-center justify-between border-b border-line px-4"><h2 class="text-lg font-bold">เมนู</h2>' +
      '<button type="button" data-close class="inline-flex size-11 items-center justify-center rounded-full bg-lavender-100 text-purple-700" aria-label="ปิดเมนู">✕</button></div>' +
      '<nav aria-label="เมนูหลัก (มือถือ)" class="flex-1 overflow-y-auto p-4"><ul class="space-y-1">';
    NAV.forEach(function (it, i) {
      var on = isActive(path, it);
      var cls = "flex min-h-12 w-full items-center justify-between rounded-2xl px-4 text-left text-base font-medium " + (on ? "bg-lavender-100 text-purple-700" : "hover:bg-lavender-100/70");
      if (it.children) {
        html += '<li><button type="button" class="' + cls + '" aria-expanded="false" data-acc="' + i + '">' + it.label + '<span aria-hidden>▾</span></button>' +
          '<ul class="mb-2 ml-4 mt-1 hidden space-y-1 border-l-2 border-lavender-300 pl-3" data-accp="' + i + '">' +
          it.children.map(function (c) { return '<li><a href="#' + c.href + '" class="flex min-h-11 items-center rounded-xl px-3 text-[15px] hover:bg-lavender-100">' + c.label + "</a></li>"; }).join("") + "</ul></li>";
      } else {
        html += '<li><a href="#' + it.href + '" class="' + cls + '">' + it.label + "</a></li>";
      }
    });
    html += '</ul></nav><div class="border-t border-line p-4"><a href="#/quality" class="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-purple-600 px-7 font-medium text-white">ดูข้อมูลคุณภาพการศึกษา</a></div></div>';
    o.innerHTML = html;
    o.addEventListener("click", function (e) {
      var t = e.target.closest("[data-close],[data-acc],a");
      if (!t) return;
      if (t.hasAttribute("data-close") || t.tagName === "A") { closeMobile(); return; }
      var p = o.querySelector('[data-accp="' + t.getAttribute("data-acc") + '"]');
      var open = p.classList.toggle("hidden") === false;
      t.setAttribute("aria-expanded", String(open));
    });
    document.body.appendChild(o); document.body.style.overflow = "hidden"; mobile = o;
    o.querySelector("[data-close][aria-label]").focus();
  }

  /* ---------- widgets ---------- */
  function initNews() {
    main.querySelectorAll("[data-newsboard]").forEach(function (board) {
      var limit = parseInt(board.getAttribute("data-newsboard"), 10) || 0;
      var tabs = board.querySelectorAll("[data-newstab]"), items = board.querySelectorAll("[data-news]");
      function apply(cat) {
        var shown = 0;
        items.forEach(function (li) {
          var ok = (cat === "all" || li.getAttribute("data-news") === cat) && (!limit || shown < limit);
          if (ok) shown++;
          li.classList.toggle("hidden", !ok);
        });
        tabs.forEach(function (b) {
          var on = b.getAttribute("data-newstab") === cat;
          b.setAttribute("aria-pressed", String(on));
          ["border-purple-600", "bg-purple-600", "text-white"].forEach(function (c) { b.classList.toggle(c, on); });
          ["border-line", "bg-card", "hover:bg-lavender-100"].forEach(function (c) { b.classList.toggle(c, !on); });
        });
      }
      tabs.forEach(function (b) { b.addEventListener("click", function () { apply(b.getAttribute("data-newstab")); }); });
    });
  }

  function norm(s) { return (s || "").toLowerCase().replace(/\s+/g, ""); }
  function initEvidence(query, reapply) {
    var items = main.querySelectorAll("[data-ev]");
    if (!items.length) return;
    var input = main.querySelector('form[role="search"] input');
    var sel = {}; ["s", "i", "y", "t", "p", "c"].forEach(function (k) { sel[k] = main.querySelector("#f-" + k); });
    var count = main.querySelector("p[aria-live]");
    var list = items[0].parentElement;
    var empty = main.querySelector("[data-ev-empty]");
    if (!empty) {
      empty = document.createElement("div");
      empty.setAttribute("data-ev-empty", "");
      empty.className = "mt-4 hidden rounded-[var(--radius-md)] border border-dashed border-line bg-card p-10 text-center";
      empty.innerHTML = '<p class="font-semibold">ไม่พบหลักฐานที่ตรงกับเงื่อนไข</p><p class="mt-1 text-ink-muted">ลองใช้คำค้นอื่น หรือล้างตัวกรอง</p>';
      list.after(empty);
    }
    function state() {
      var st = { q: input ? input.value.trim() : "" };
      Object.keys(sel).forEach(function (k) { st[k] = sel[k] ? sel[k].value : ""; });
      return st;
    }
    function write(st) {
      var p = new URLSearchParams();
      Object.keys(st).forEach(function (k) { if (st[k]) p.set(k, st[k]); });
      var qs = p.toString();
      history.replaceState(null, "", "#/evidence" + (qs ? "?" + qs : ""));
    }
    function apply(push) {
      var st = state();
      if (sel.i) Array.prototype.forEach.call(sel.i.options, function (o) {
        o.hidden = !!(st.s && o.value && o.value.split(".")[0] !== st.s);
      });
      if (st.s && st.i && st.i.split(".")[0] !== st.s) { sel.i.value = ""; st.i = ""; }
      var nq = norm(st.q), n = 0;
      items.forEach(function (li) {
        var ok = (!nq || norm(li.getAttribute("data-q")).indexOf(nq) >= 0) &&
          (!st.s || li.getAttribute("data-s").split(" ").indexOf(st.s) >= 0) &&
          (!st.i || li.getAttribute("data-i").split(" ").indexOf(st.i) >= 0) &&
          (!st.y || li.getAttribute("data-y") === st.y) &&
          (!st.t || li.getAttribute("data-t") === st.t) &&
          (!st.p || li.getAttribute("data-p") === st.p) &&
          (!st.c || li.getAttribute("data-c") === st.c);
        li.classList.toggle("hidden", !ok); if (ok) n++;
      });
      if (count) count.innerHTML = "พบ <strong>" + n + "</strong> รายการ" + (st.q ? " สำหรับ “" + st.q.replace(/</g, "&lt;") + "”" : "");
      empty.classList.toggle("hidden", n !== 0);
      if (push) write(st);
    }
    // load from query
    if (input) input.value = query.get("q") || "";
    Object.keys(sel).forEach(function (k) { if (sel[k]) sel[k].value = query.get(k) || ""; });
    apply(false);
    if (reapply) return;
    var form = input && input.closest("form");
    if (form) form.addEventListener("submit", function (e) { e.preventDefault(); e.stopPropagation(); apply(true); });
    Object.keys(sel).forEach(function (k) { if (sel[k]) sel[k].addEventListener("change", function () { apply(true); }); });
    var toggle = main.querySelector('[aria-controls="evidence-filters"]'), panel = main.querySelector("#evidence-filters");
    if (toggle && panel) toggle.addEventListener("click", function () {
      var open = panel.classList.toggle("hidden") === false; toggle.setAttribute("aria-expanded", String(open));
    });
    if (panel && !panel.querySelector("[data-clear]")) {
      var b = document.createElement("button");
      b.type = "button"; b.setAttribute("data-clear", "");
      b.className = "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-[15px] font-medium text-purple-700 hover:bg-lavender-100";
      b.textContent = "ล้างตัวกรองทั้งหมด";
      b.addEventListener("click", function () { if (input) input.value = ""; Object.keys(sel).forEach(function (k) { if (sel[k]) sel[k].value = ""; }); apply(true); });
      panel.querySelector(".grid").appendChild(b);
    }
  }

  function initSearchForms() {
    main.querySelectorAll('form[data-action="/evidence"]').forEach(function (f) {
      f.addEventListener("submit", function (e) {
        e.preventDefault();
        var q = (f.querySelector('input[name="q"]') || {}).value || "";
        location.hash = "#/evidence" + (q.trim() ? "?q=" + encodeURIComponent(q.trim()) : "");
      });
    });
  }

  var TH_DOW = 0;
  function initCalendar() {
    var box = main.querySelector('aside[aria-label="ปฏิทินโรงเรียน"]');
    if (!box) return;
    var grid = box.querySelector(".grid-cols-7"), title = box.querySelector("p[aria-live]");
    var btns = box.querySelectorAll("button"), today = new Date(), offset = 0;
    var heads = Array.prototype.slice.call(grid.children, 0, 7);
    function draw() {
      var first = new Date(today.getFullYear(), today.getMonth() + offset, 1);
      var days = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate();
      var lead = (first.getDay() + 6) % 7;
      title.textContent = first.toLocaleDateString("th-TH", { month: "long", year: "numeric" });
      grid.innerHTML = ""; heads.forEach(function (h) { grid.appendChild(h); });
      for (var i = 0; i < lead + days; i++) {
        var cell = document.createElement("span");
        cell.className = "grid place-items-center py-0.5";
        var d = i - lead + 1;
        if (d >= 1) {
          var isToday = offset === 0 && d === today.getDate(), weekend = i % 7 >= 5;
          var s = document.createElement("span");
          s.className = "relative grid size-9 place-items-center rounded-full text-sm" +
            (isToday ? " bg-purple-600 font-semibold text-white shadow-[0_6px_14px_-4px_rgba(122,95,168,.6)]" : weekend ? " text-pink-700" : "");
          if (isToday) s.setAttribute("aria-current", "date");
          s.textContent = d; cell.appendChild(s);
        }
        grid.appendChild(cell);
      }
    }
    btns[0].addEventListener("click", function () { offset--; draw(); });
    btns[1].addEventListener("click", function () { offset++; draw(); });
    draw();
  }

  function initToday() {
    var ph = main.querySelector("span.inline-block.h-8.w-56");
    if (!ph) return;
    var now = new Date(), h = now.getHours();
    var greet = h < 12 ? "สวัสดีตอนเช้า" : h < 17 ? "สวัสดีตอนบ่าย" : "สวัสดีตอนเย็น";
    var date = now.toLocaleDateString("th-TH", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    var el = document.createElement("span");
    el.className = "inline-flex min-h-8 items-center gap-2 rounded-full bg-white/70 px-3 text-[13px] text-ink";
    el.innerHTML = '<span aria-hidden="true" class="text-yellow-700">☀</span><span class="font-semibold">' + greet + '</span><span class="text-ink-muted">· ' + date + "</span>";
    ph.replaceWith(el);
  }

  function animate() {
    if (reduce || !("IntersectionObserver" in window)) return;
    var els = main.querySelectorAll("section, article");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.style.transition = "opacity .35s ease-out, transform .35s ease-out"; en.target.style.opacity = "1"; en.target.style.transform = "none"; io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -40px 0px" });
    els.forEach(function (el) {
      if (el.getBoundingClientRect().top > window.innerHeight) { el.style.opacity = "0"; el.style.transform = "translateY(12px)"; io.observe(el); }
    });
  }

  /* ---------- global link handling ---------- */
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a[href^='#']");
    if (!a) return;
    var href = a.getAttribute("href");
    if (href.indexOf("#/") === 0) return; // router link
    var el = document.getElementById(decodeURIComponent(href.slice(1)));
    if (el) { e.preventDefault(); el.scrollIntoView({ behavior: reduce ? "auto" : "smooth" }); if (el.tabIndex < 0 || el.id === "main") el.focus({ preventScroll: true }); }
  });

  initDropdowns();
  var mbtn = document.querySelector('header button[aria-label="เปิดเมนู"]');
  if (mbtn) mbtn.addEventListener("click", openMobile);
  window.addEventListener("hashchange", render);
  render();
})();
