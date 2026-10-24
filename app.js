/* 공통 기능 — 보통은 건드릴 필요 없어요 */
(function () {
  const SITE = window.SITE || { title: "세계관", members: [], memberColors: {} };
  const CHARS = window.CHARACTERS || [];
  const GALLERY = window.GALLERY || [];
  const COMICS = window.COMICS || [];
  const GUILDS = window.GUILDS || [];

  const esc = (s) =>
    String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const param = (k) => new URLSearchParams(location.search).get(k);
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} },
  };
  const tagText = (s) => String(s).trim().replace(/\s+/g, "_"); // 띄어쓰기 → _ (검색용)
  const color = (owner) => (SITE.memberColors || {})[owner] || "#98a2b6";

  // 이름이 겹치는 캐릭터는 "이름(주인)" 으로 구분
  const nameCount = {};
  CHARS.forEach((c) => { nameCount[c.name] = (nameCount[c.name] || 0) + 1; });
  const byId = {};
  CHARS.forEach((c) => {
    c.label = nameCount[c.name] > 1 ? c.name + "(" + c.owner + ")" : c.name;
    byId[c.id] = c;
  });

  // ── 태그 ──
  // 작가: "예나, 시은" 처럼 쉼표로 적으면 사람마다 따로 태그가 돼요. 멤버(data/site.js 의 members)만 태그로 인정해요.
  function artistsOf(item) {
    const members = SITE.members || [];
    const out = [];
    String(item.artist || "").split(/[,，、/·&]/).forEach((s) => {
      const n = s.trim();
      if (members.includes(n) && !out.includes(n)) out.push(n);
    });
    return out;
  }
  function tagsOf(item) {
    const out = [];
    (item.characters || []).forEach((id) => {
      const c = byId[id];
      if (c) out.push({ type: "character", text: tagText(c.label), alias: tagText(c.name), show: c.label });
    });
    artistsOf(item).forEach((n) => out.push({ type: "artist", text: "작가:" + tagText(n), show: n }));
    (item.tags || []).forEach((t) => out.push({ type: "general", text: tagText(t), show: t }));
    return out;
  }

  // 검색: 공백으로 AND, -태그 는 제외, 태그* 는 앞부분 일치
  function matches(item, query) {
    const terms = String(query || "").trim().split(/\s+/).filter(Boolean);
    if (!terms.length) return true;
    const tags = tagsOf(item);
    const has = (term) => {
      const wild = term.endsWith("*");
      const t = (wild ? term.slice(0, -1) : term).toLowerCase();
      return tags.some((g) =>
        [g.text, g.alias].filter(Boolean).some((x) => (wild ? x.toLowerCase().startsWith(t) : x.toLowerCase() === t))
      );
    };
    return terms.every((term) => (term.length > 1 && term[0] === "-" ? !has(term.slice(1)) : has(term)));
  }

  function tagCounts(items) {
    const map = new Map();
    items.forEach((it) =>
      tagsOf(it).forEach((g) => {
        const e = map.get(g.text) || { type: g.type, text: g.text, show: g.show, n: 0 };
        e.n++;
        map.set(g.text, e);
      })
    );
    return [...map.values()];
  }

  function sidebarHTML(items) {
    const counts = tagCounts(items);
    if (!counts.length) return '<p class="muted small">태그가 없어요</p>';
    return [["character", "캐릭터"], ["artist", "작가"], ["general", "태그"]]
      .map(([type, title]) => {
        const list = counts
          .filter((t) => t.type === type)
          .sort((a, b) => b.n - a.n || a.show.localeCompare(b.show, "ko"));
        if (!list.length) return "";
        return (
          '<h3 class="side-h">' + title + "</h3>" +
          list.map((t) => '<button class="tag-row t-' + type + '" data-tag="' + esc(t.text) + '"><span>' + esc(t.show) + '</span><span class="n">' + t.n + "</span></button>").join("")
        );
      })
      .join("");
  }

  // ── 이미지 ──
  // 파일 이름에 한글/띄어쓰기가 있어도 돼요. 주소를 깨뜨리는 글자(% # ?)만 안전하게 바꿔요.
  const fileUrl = (p) => String(p == null ? "" : p).replace(/[%#?]/g, (c) => encodeURIComponent(c));
  function img(src, alt, cls) {
    const miss = '<div class="img-miss">이미지를 찾을 수 없어요<br><small>' + esc(src || "") + "</small></div>";
    if (!src) return miss;
    return '<img ' + (cls ? 'class="' + cls + '" ' : "") + 'src="' + esc(fileUrl(src)) + '" alt="' + esc(alt || "") +
      '" loading="lazy" onerror="this.outerHTML=this.dataset.miss" data-miss="' + esc(miss) + '">';
  }
  function avatar(c) {
    const fb = '<div class="avatar-fb" style="--mc:' + guildOf(c).color + '">' + esc([...c.name][0]) + "</div>";
    if (!c.image) return fb;
    return '<img src="' + esc(fileUrl(c.image)) + '" alt="' + esc(c.name) + '" loading="lazy" onerror="this.outerHTML=this.dataset.fb" data-fb="' + esc(fb) + '">';
  }

  // ── 글자 꾸미기 ──  [무지개:S랭크]  [금색:글자]  [굵게:글자]  [반짝:글자]  [빨강:글자]  [#ff00aa:글자]
  const DECO_CLASS = { "무지개": "rainbow", "금색": "gold", "굵게": "bold", "반짝": "glow" };
  const DECO_COLOR = { "빨강": "#e5484d", "파랑": "#3b82f6", "초록": "#22a06b", "보라": "#9b6bff", "분홍": "#ff6fa8", "노랑": "#e8b400", "주황": "#f97316" };
  const reEsc = (w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const words = (SITE.rainbowWords || []).slice().sort((a, b) => b.length - a.length);
  const DECO_RE = new RegExp("\\[([^\\[\\]:]+):([^\\[\\]]+)\\]" + (words.length ? "|(" + words.map(reEsc).join("|") + ")" : ""), "g");
  function wrap(style, inner) {
    if (DECO_CLASS[style]) return '<span class="' + DECO_CLASS[style] + '">' + inner + "</span>";
    const col = DECO_COLOR[style] || (/^#[0-9a-fA-F]{3,8}$/.test(style) ? style : null);
    return col ? '<span style="color:' + col + ';font-weight:700">' + inner + "</span>" : null;
  }
  // esc() 한 글자에 꾸밈 적용
  function deco(html) {
    return html.replace(DECO_RE, (m, style, inner, word, off) => {
      if (word) return /[A-Za-z]/.test(html[off - 1] || "") ? m : wrap("무지개", word);
      return wrap(style, inner) || m;
    });
  }
  const fmt = (s) => deco(esc(s));
  // 정보표 값: 등급/랭크 칸에 S, SS, SSS 만 써도 자동 무지개
  const infoVal = (k, v) => (/등급|랭크|급/.test(k) && /^\s*S{1,3}\+?\s*$/i.test(String(v)) ? '<span class="rainbow">' + esc(String(v).trim()) + "</span>" : fmt(v));

  // 글 → HTML (빈 줄 = 문단, "- " = 목록)
  function text(s) {
    return String(s || "")
      .split(/\n\s*\n/)
      .filter((b) => b.trim())
      .map((b) => {
        const lines = b.trim().split("\n");
        if (lines.every((l) => /^\s*-\s+/.test(l)))
          return "<ul>" + lines.map((l) => "<li>" + fmt(l.replace(/^\s*-\s+/, "")) + "</li>").join("") + "</ul>";
        return "<p>" + lines.map((l) => fmt(l)).join("<br>") + "</p>";
      })
      .join("");
  }

  // ── 길드 ──
  const UNKNOWN_GUILD = { id: "unknown", name: "소속 미정", main: false, color: "#6b7385", summary: "아직 소속이 정해지지 않은 캐릭터들" };
  const guildOf = (c) => GUILDS.find((g) => g.name === c.guild) || UNKNOWN_GUILD;
  const charsOfGuild = (g) => CHARS.filter((c) => guildOf(c) === g);
  // 길드 목록 (소속 미정 캐릭터가 있으면 맨 뒤에 "소속 미정" 추가)
  const guildList = () => (CHARS.some((c) => guildOf(c) === UNKNOWN_GUILD) ? GUILDS.concat([UNKNOWN_GUILD]) : GUILDS);
  const guildById = (id) => guildList().find((g) => g.id === id);

  function charCard(c) {
    const n = galleryOf(c.id).length;
    return '<a class="card" style="--mc:' + guildOf(c).color + '" href="character.html?id=' + encodeURIComponent(c.id) + '">' +
      '<div class="pic">' + avatar(c) + "</div>" +
      '<div class="body"><div class="nm">' + esc(c.name) + '</div><div class="sub">' + fmt(c.summary || "") + "</div>" +
      '<div class="cnt">' + esc([c.owner, n ? "그림 " + n : ""].filter(Boolean).join(" · ")) + "</div></div></a>";
  }

  const galleryOf = (id) => GALLERY.filter((g) => (g.characters || []).includes(id));
  const comicsOf = (id) => COMICS.filter((c) => (c.characters || []).includes(id));
  // 갤러리 = 그림 + 만화 (kind: "image" | "comic")
  const galleryAll = () =>
    GALLERY.map((g) => Object.assign({ kind: "image" }, g))
      .concat(COMICS.map((c) => Object.assign({ kind: "comic", file: "comic:" + c.id, thumb: c.cover || (c.pages || [])[0] }, c)))
      .sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));
  const byDateDesc = (a, b) => String(b.date || "").localeCompare(String(a.date || ""));

  // ── 헤더 / 푸터 ──
  function nav(active, pageTitle) {
    const links = [
      ["index.html", "홈", "home"],
      ["world.html", "세계관", "world"],
      ["characters.html", "캐릭터", "characters"],
      ["gallery.html", "갤러리", "gallery"],
      ["playground.html", "놀이터", "playground"],
      ["couple.html", "커플", "couple"],
    ];
    const h = document.getElementById("site-header");
    if (h)
      h.innerHTML =
        '<div class="wrap"><a class="brand" href="index.html">' + esc(SITE.title) + '</a><nav class="nav">' +
        links.map((l) => '<a href="' + l[0] + '"' + (l[2] === active ? ' class="on"' : "") + ">" + l[1] + "</a>").join("") +
        "</nav>" +
        '<button class="theme-btn" id="theme-btn" type="button"></button></div>';
    const tb = document.getElementById("theme-btn");
    if (tb) {
      const paint = () => (tb.textContent = window.Theme && Theme.get() === "light" ? "☾ 다크" : "☀ 라이트");
      paint();
      tb.addEventListener("click", () => { if (window.Theme) { Theme.toggle(); paint(); } });
    }
    const f = document.getElementById("site-footer");
    if (f) f.innerHTML = esc(SITE.title) + ' · <a class="link" href="add.html">그림 추가 도우미</a>';
    document.title = pageTitle ? pageTitle + " · " + SITE.title : SITE.title;
  }

  // ── 캐릭터 시트 (표 + 팝업) ──
  // 표에 나오는 순서예요. 주인/소속은 owner/guild 칸에서 자동으로 가져오고, 나머지는 info 칸에서 가져와요.
  const SHEET_FIELDS = ["주인", "성별", "나이", "키", "소속", "MBTI", "무기", "포지션", "능력", "등급", "눈 색", "머리색"];
  const COLOR_FIELDS = ["눈 색", "머리색"];
  // info 에 비슷한 이름으로 써도 알아봐요 (예: "랭크" → "등급")
  const FIELD_ALIAS = { "능력 등급": "등급", "능력등급": "등급", "랭크": "등급", "mbti": "MBTI", "눈색": "눈 색", "눈": "눈 색", "머리": "머리색", "머리 색": "머리색", "신장": "키" };

  function infoOf(c) {
    const raw = c.info || {};
    const out = {};
    Object.keys(raw).forEach((k) => { out[FIELD_ALIAS[k.trim().toLowerCase()] || FIELD_ALIAS[k.trim()] || k.trim()] = raw[k]; });
    return out;
  }
  function fieldValue(c, key) {
    if (key === "주인") return c.owner || "";
    if (key === "소속") return c.guild || "";
    const v = infoOf(c)[key];
    return v == null ? "" : String(v);
  }
  // 색 찾기: #ff00aa / #f0a / rgb(255,0,170) / 255,0,170
  function parseColor(s) {
    s = String(s || "");
    let m = s.match(/#([0-9a-f]{6}|[0-9a-f]{3})\b/i);
    let rgb = null, text = s;
    if (m) {
      let h = m[1];
      if (h.length === 3) h = h.split("").map((x) => x + x).join("");
      rgb = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
      text = s.replace(m[0], "");
    } else if ((m = s.match(/(?:rgb\(?\s*)?(\d{1,3})\s*[,\s]\s*(\d{1,3})\s*[,\s]\s*(\d{1,3})\s*\)?/i))) {
      rgb = [m[1], m[2], m[3]].map((x) => Math.min(255, +x));
      text = s.replace(m[0], "");
    }
    if (!rgb) return null;
    const hex = "#" + rgb.map((x) => x.toString(16).padStart(2, "0")).join("");
    return { rgb, hex, label: text.replace(/[()\/·,]+/g, " ").trim(), css: "rgb(" + rgb.join(",") + ")", rgbText: "RGB(" + rgb.join(", ") + ")" };
  }
  function colorHTML(v) {
    const p = parseColor(v);
    if (!p) return v ? fmt(v) : '<span class="muted">-</span>';
    return '<span class="swatch" style="background:' + p.css + '"></span>' +
      (p.label ? esc(p.label) + " " : "") + '<span class="rgb-txt">' + p.rgbText + " · " + p.hex + "</span>";
  }
  function sheetRowsHTML(c) {
    const used = new Set(SHEET_FIELDS);
    const extra = Object.keys(infoOf(c)).filter((k) => !used.has(k));
    return SHEET_FIELDS.concat(extra).map((k) => {
      const v = fieldValue(c, k);
      let cell;
      if (COLOR_FIELDS.includes(k)) cell = colorHTML(v);
      else if (k === "소속" && v) cell = esc(v);
      else if (k === "등급" && v) cell = infoVal(k, v);
      else cell = v ? fmt(v) : '<span class="muted">-</span>';
      return "<tr><th>" + esc(k) + "</th><td>" + cell + "</td></tr>";
    }).join("");
  }
  // 챗봇용 캐릭터 시트: 직접 쓴 글(sheet 칸) 그대로
  function sheetText(c) { return String(c.sheet || "").trim(); }
  function copyText(t) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(t);
    return new Promise((ok, no) => {
      const ta = document.createElement("textarea");
      ta.value = t; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy") ? ok() : no(); } catch (e) { no(e); }
      ta.remove();
    });
  }
  function openSheet(c) {
    closeSheet();
    const gd = guildOf(c);
    const m = document.createElement("div");
    m.className = "modal"; m.id = "sheet-modal";
    m.innerHTML =
      '<div class="modal-box" role="dialog" aria-modal="true" style="--mc:' + gd.color + '">' +
        '<div class="modal-head"><h2>' + esc(c.label) + ' <small>캐릭터 시트</small></h2>' +
        '<button type="button" class="modal-x" data-close aria-label="닫기">✕</button></div>' +
        (sheetText(c)
          ? '<pre class="sheet-text" id="sheet-text"></pre>'
          : '<p class="muted sheet-empty">아직 비어 있음. data/characters.js 의 이 캐릭터 줄 <b>sheet</b> 칸에 채우기.</p>') +
        '<div class="modal-foot"><button type="button" class="btn" data-copy' + (sheetText(c) ? "" : " disabled") + '>📋 시트 복사</button><span class="copied" aria-live="polite"></span></div>' +
      "</div>";
    document.body.appendChild(m);
    const pre = m.querySelector("#sheet-text"); if (pre) pre.textContent = sheetText(c);
    document.body.classList.add("modal-open");
    m.addEventListener("click", (e) => {
      if (e.target === m || e.target.closest("[data-close]")) closeSheet();
      if (e.target.closest("[data-copy]")) {
        const msg = m.querySelector(".copied");
        copyText(sheetText(c)).then(() => { msg.textContent = "복사했어요!"; }, () => { msg.textContent = "복사 실패 — 표를 드래그해서 복사해 주세요"; });
        setTimeout(() => { msg.textContent = ""; }, 2200);
      }
    });
    const cb = m.querySelector("[data-copy]:not([disabled])"); if (cb) cb.focus({ preventScroll: true });
  }
  function closeSheet() {
    const m = document.getElementById("sheet-modal");
    if (m) m.remove();
    document.body.classList.remove("modal-open");
  }
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeSheet(); });

  window.App = {
<<<<<<< HEAD
    SHEET_FIELDS, parseColor, colorHTML, sheetRowsHTML, sheetText, openSheet, closeSheet,
    SITE, CHARS, GALLERY, COMICS, byId,
=======
    SHEET_FIELDS, parseColor, colorHTML, sheetRowsHTML, relationsHTML, sheetText, openSheet, closeSheet,
    SITE, CHARS, GALLERY, COMICS, byId, artistsOf, videoOf, gradeOf, gradeRank, ageOf, debutDate, bdayOf, birthdayHTML, noteFor, SORTS, sortChars,
>>>>>>> parent of 07db66b (오류 패치)
    esc, param, store, tagText, color, tagsOf, matches, tagCounts, sidebarHTML,
    img, avatar, text, fmt, deco, infoVal, galleryAll, galleryOf, comicsOf, byDateDesc, nav,
    GUILDS, guildOf, charsOfGuild, guildList, guildById, charCard,
  };
})();
