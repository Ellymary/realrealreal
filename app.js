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

  // ── 영상 ──  갤러리 항목에 video: "구글 드라이브 공유 링크" (또는 mp4 파일 경로) 를 쓰면 영상이 돼요
  //   드라이브: 공유 → "링크가 있는 모든 사용자" 로 바꾼 뒤 링크를 붙여넣어요. 표지는 thumb 로 따로 지정하거나, 없으면 드라이브 미리보기를 써요.
  function videoOf(it) {
    const v = it && it.video ? String(it.video).trim() : "";
    if (!v) return null;
    if (/drive\.google\.com/.test(v)) {
      const m = v.match(/\/file\/d\/([\w-]+)/) || v.match(/[?&]id=([\w-]+)/);
      if (m) return { type: "drive", id: m[1], open: v, embed: "https://drive.google.com/file/d/" + m[1] + "/preview", thumb: "https://lh3.googleusercontent.com/d/" + m[1] + "=w480" };
    }
    if (/\.(mp4|webm|mov)$/i.test(v)) return { type: "file", open: v, src: v };
    return null;
  }
  GALLERY.forEach((g) => {
    const vd = videoOf(g);
    if (!vd) return;
    if (!g.file) g.file = "video:" + g.video;          // 다른 곳에서 그림을 구별하는 이름표
    if (!g.thumb && vd.thumb) g.thumb = vd.thumb;
  });

  // ── 그린 사람 ──
  //   artist: "시은"  /  artist: ["시은", "하린"] (공동)  /  artist: "" 또는 "없음" 또는 생략 (그린 사람 없음 → 태그도 안 생겨요)
  function artistsOf(item) {
    const a = item && item.artist;
    return (Array.isArray(a) ? a : [a]).map((x) => String(x == null ? "" : x).trim()).filter((x) => x && x !== "없음");
  }

  // ── 태그 ──
  function tagsOf(item) {
    const out = [];
    (item.characters || []).forEach((id) => {
      const c = byId[id];
      if (c) out.push({ type: "character", text: tagText(c.label), alias: tagText(c.name), show: c.label });
    });
    artistsOf(item).forEach((a) => out.push({ type: "artist", text: "작가:" + tagText(a), show: a }));
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
  const GRADE_COLOR = { B: "#aeb6c2", C: "#22a06b", D: "#3b82f6", E: "#9b6bff", F: "#111111" };
  function gradeSpan(t) {
    const m = String(t).trim().match(/^([A-FS]{1,3})\s*[+\-]?$/i);
    if (!m) return esc(t);
    const g = m[1][0].toUpperCase();
    if (g === "S") return '<span class="rainbow">' + esc(t) + "</span>";
    if (g === "A") return '<span class="gold">' + esc(t) + "</span>";
    const glow = g === "F" ? ";text-shadow:0 0 2px rgba(255,255,255,.7)" : ""; // 어두운 테마에서도 보이게 살짝 테두리
    return '<span style="color:' + GRADE_COLOR[g] + ";font-weight:700" + glow + '">' + esc(t) + "</span>";
  }
  const reEsc = (w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const words = (SITE.rainbowWords || []).slice().sort((a, b) => b.length - a.length);
  // 본문에 적힌 등급(F급, D~C급, A급 이상 …)도 자동으로 등급 색이 돼요. (S 계열은 무지개)
  const GRADE_TEXT = "[A-FS]{1,3}\\+?(?:\\s*[~\\-]\\s*[A-FS]{1,3}\\+?)*(?:급|랭크)";
  const DECO_RE = new RegExp("\\[([^\\[\\]:]+):([^\\[\\]]+)\\]|(" + (words.length ? words.map(reEsc).join("|") : "(?!)") + ")|(" + GRADE_TEXT + ")", "g");
  function wrap(style, inner) {
    if (DECO_CLASS[style]) return '<span class="' + DECO_CLASS[style] + '">' + inner + "</span>";
    const col = DECO_COLOR[style] || (/^#[0-9a-fA-F]{3,8}$/.test(style) ? style : null);
    return col ? '<span style="color:' + col + ';font-weight:700">' + inner + "</span>" : null;
  }
  // esc() 한 글자에 꾸밈 적용
  function deco(html) {
    return html.replace(DECO_RE, (m, style, inner, word, grade, off) => {
      if (word) return /[A-Za-z]/.test(html[off - 1] || "") ? m : wrap("무지개", word);
      if (grade) return /[A-Za-z]/.test(html[off - 1] || "") ? m : grade.replace(/[A-FS]{1,3}\+?/g, (g) => gradeSpan(g));
      return wrap(style, inner) || m;
    });
  }
  const fmt = (s) => deco(esc(s));
  // 정보표 값: 등급/랭크 칸 색
  //   S, SS, SSS → 무지개 / A → 금색 / B → 은색 / C → 초록 / D → 파랑 / E → 보라 / F → 검정   (A-, B+ 처럼 +/- 가 붙어도 같은 색)
  //   색을 바꾸고 싶으면 아래 GRADE_COLOR 의 색코드만 고치면 돼요.
  const infoVal = (k, v) => {
    if (!/등급|랭크|급/.test(k)) return fmt(v);
    return /^\s*(S{1,3}|[A-F])\s*[+\-]?\s*$/i.test(String(v)) ? gradeSpan(String(v).trim()) : fmt(v);
  };

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
  // 갤러리 = 그림 + 만화/시리즈 (kind: "image" | "comic").  시리즈는 comics.js 에 series: true 로 적은 것
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
  // 색 하나를 그리는 부분 (색이 하나일 때는 예전과 똑같이 나와요)
  function colorOne(v) {
    const p = parseColor(v);
    if (!p) return v ? fmt(v) : '<span class="muted">-</span>';
    return '<span class="swatch" style="background:' + p.css + '"></span>' +
      (p.label ? esc(p.label) + " " : "") + '<span class="rgb-txt">' + p.rgbText + " · " + p.hex + "</span>";
  }
  // 색이 여러 개면 "/" 로 나눠서 한 줄에 하나씩 보여줘요. 예) "보라 #a020f0 / 파랑 #3050ff / 노랑 #ffe000"
  // (색코드가 2개 이상 있을 때만 나눠요. 색이 하나뿐이면 위와 똑같이 한 줄로 나와요)
  function colorHTML(v) {
    const parts = String(v == null ? "" : v).split("/").map((x) => x.trim()).filter(Boolean);
    if (parts.length > 1 && parts.filter((x) => parseColor(x)).length > 1) return parts.map(colorOne).join("<br>");
    return colorOne(v);
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
  // ── 관계 (캐릭터 페이지 맨 아래) ──
  // relations: [{ who, rel, dir, color, main, text }]
  //   상대(who)는 왼쪽, 이 캐릭터는 오른쪽에 나오고 그 사이에 화살표가 그려져요. rel 은 화살표 위에 작은 글씨로 나와요.
  //   dir: "<>" 서로(↔)  /  "<" 이 캐릭터 → 상대(←)  /  ">" 상대 → 이 캐릭터(→)
  const REL_COLOR = { "빨강": "red", "주황": "orange", "초록": "green", "파랑": "blue", "검정": "black" };
  function relDir(d) {
    d = String(d == null ? "<>" : d).replace(/\s/g, "");
    if (["<", "←", "<-", "left"].includes(d)) return "left";
    if ([">", "→", "->", "right"].includes(d)) return "right";
    return "both";
  }
  function relArrow(dir) {
    return '<svg class="rel-arrow" viewBox="0 0 64 16" width="64" height="16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M4 8H60"/>' +
      (dir !== "right" ? '<path d="M12 2L4 8l8 6"/>' : "") +
      (dir !== "left" ? '<path d="M52 2l8 6-8 6"/>' : "") + "</svg>";
  }
  function relationsHTML(c) {
    const list = Array.isArray(c.relations) ? c.relations : [];
    const head = '<h2 class="sec-h rel-h">관계 <small>' + list.length + "</small></h2>";
    if (!list.length) return '<section class="rels-wrap">' + head + '<p class="muted">아직 적은 관계가 없어요. data/characters.js 의 이 캐릭터 줄 <b>relations</b> 칸에 써 주세요.</p></section>';
    return '<section class="rels-wrap">' + head + '<div class="rels">' + list.map((r) => {
      const whoOne = (w) => {
        const t = byId[w] || CHARS.find((x) => x.name === w || x.label === w);
        return t
          ? '<a class="rel-name" href="character.html?id=' + encodeURIComponent(t.id) + '">' + esc(t.label) + "</a>"
          : '<span class="rel-name">' + esc(w || "?") + "</span>";
      };
      // who 는 한 명 "id" 도 되고, 여러 명 ["id1", "id2"] 도 돼요
      const whos = Array.isArray(r.who) ? r.who : [r.who];
      const who = whos.length > 1 ? '<span class="rel-group">' + whos.map(whoOne).join("") + "</span>" : whoOne(whos[0]);
      const key = REL_COLOR[String(r.color || "").trim()];
      const hex = /^#[0-9a-fA-F]{3,8}$/.test(String(r.color || "").trim()) ? String(r.color).trim() : "";
      const cls = "rel" + (key ? " c-" + key : hex ? "" : " c-none") + (r.main ? " main" : "");
      return '<div class="' + cls + '"' + (hex ? ' style="--rc:' + hex + '"' : "") + ">" +
        '<div class="rel-line">' + who +
          '<span class="rel-mid">' + (r.rel ? '<span class="rel-kind">' + esc(r.rel) + "</span>" : "") + relArrow(relDir(r.dir)) + "</span>" +
          '<span class="rel-name self">' + esc(c.label) + "</span>" +
          (r.main ? '<span class="rel-star" title="주요 관계">★</span>' : "") + "</div>" +
        (r.text ? '<div class="rel-text">' + text(r.text) + "</div>" : "") + "</div>";
    }).join("") + "</div></section>";
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
    SHEET_FIELDS, parseColor, colorHTML, sheetRowsHTML, relationsHTML, sheetText, openSheet, closeSheet,
    SITE, CHARS, GALLERY, COMICS, byId, artistsOf, videoOf,
    esc, param, store, tagText, color, tagsOf, matches, tagCounts, sidebarHTML,
    img, avatar, text, fmt, deco, infoVal, galleryAll, galleryOf, comicsOf, byDateDesc, nav,
    GUILDS, guildOf, charsOfGuild, guildList, guildById, charCard,
  };
})();
