// 음악 플레이어 — 화면 오른쪽 아래에 떠 있어요. 보통은 건드릴 필요 없어요.
// 곡 목록은 data/music.js 에서 고쳐요.
// 페이지를 옮기면 곡 위치를 기억했다가 이어서 틀어요 (브라우저가 자동재생을 막으면 ▶ 를 한 번 눌러야 해요).
(function () {
  const M = window.MUSIC;
  if (!M || !M.categories || !M.categories.length) return;
  const cats = M.categories;
  const KEY = "mp-state";
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  let st = { cat: 0, idx: 0, t: 0, playing: false, vol: 70, open: false };
  try { Object.assign(st, JSON.parse(localStorage.getItem(KEY) || "{}")); } catch (e) {}
  if (!cats[st.cat]) st.cat = 0;
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };

  const track = (c, i) => (cats[c] && cats[c].tracks[i]) || null;
  const playable = (t) => !!(t && (t.youtube || t.file));

  // ── 화면 ──
  const root = document.createElement("div");
  root.className = "mp" + (st.open ? "" : " closed");
  root.innerHTML =
    '<div class="mp-panel">' +
      '<div class="mp-tabs" id="mp-tabs"></div>' +
      '<div class="mp-yt" id="mp-ytbox" style="display:none"><div id="mp-yt"></div></div>' +
      '<div class="mp-err" id="mp-err" style="display:none"></div>' +
      '<ul class="mp-list" id="mp-list"></ul>' +
      '<div class="mp-ctrl"><button type="button" id="mp-prev" aria-label="이전">⏮</button><button type="button" id="mp-next" aria-label="다음">⏭</button>' +
      '<span aria-hidden="true">🔈</span><input type="range" id="mp-vol" min="0" max="100" aria-label="볼륨"></div>' +
    "</div>" +
    '<div class="mp-bar"><button type="button" id="mp-toggle"></button>' +
    '<span class="mp-now" id="mp-now"></span><button type="button" id="mp-play" aria-label="재생/일시정지">▶</button></div>';
  document.body.appendChild(root);
  const $ = (id) => root.querySelector("#" + id);
  $("mp-vol").value = st.vol;

  // 접기 / 펼치기 버튼: 지금 상태에 맞게 글자와 화살표가 바뀌어요
  function setOpen(v) {
    st.open = !!v;
    root.classList.toggle("closed", !st.open);
    const b = $("mp-toggle");
    b.textContent = st.open ? "▼ 접기" : "▲ 펼치기";
    b.setAttribute("aria-label", st.open ? "플레이리스트 접기" : "플레이리스트 펼치기");
    b.setAttribute("aria-expanded", st.open ? "true" : "false");
    save();
  }

  function paint() {
    const t = track(st.cat, st.idx);
    $("mp-now").textContent = playable(t) ? t.title + (t.artist ? " · " + t.artist : "") : "♪ 플레이리스트";
    $("mp-play").textContent = st.playing ? "⏸" : "▶";
    $("mp-tabs").innerHTML = cats.map((c, i) => '<button type="button" data-c="' + i + '" class="' + (i === st.cat ? "on" : "") + '">' + esc(c.name) + "</button>").join("");
    $("mp-list").innerHTML = cats[st.cat].tracks.map((t, i) =>
      '<li class="' + (i === st.idx ? "cur " : "") + (playable(t) ? "" : "blank") + '"><button type="button" data-i="' + i + '">' +
      (i + 1) + ". " + esc(t.title || "(제목 없음)") + (playable(t) ? "" : " (비어있음)") + (t.artist ? "<small>" + esc(t.artist) + "</small>" : "") + "</button></li>").join("");
    const yt = track(st.cat, st.idx);
    $("mp-ytbox").style.display = yt && yt.youtube ? "block" : "none";
  }

  // ── 재생 엔진 (유튜브 / mp3) ──
  const audio = new Audio();
  audio.addEventListener("ended", () => step(1, true));
  audio.addEventListener("play", () => setPlaying(true));
  audio.addEventListener("pause", () => { if (!audio.ended) setPlaying(false); });
  let yt = null, ytReady = false, ytWant = null, ytLoading = false;
  const mode = () => { const t = track(st.cat, st.idx); return t && t.file && !t.youtube ? "file" : "yt"; };

  function setPlaying(v) { st.playing = v; save(); paint(); }

  function loadYTApi(cb) {
    if (window.YT && YT.Player) return cb();
    if (ytLoading) { ytWant = cb; return; }
    ytLoading = true; ytWant = cb;
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => { if (prev) prev(); const f = ytWant; ytWant = null; f && f(); };
    const s = document.createElement("script");
    s.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(s);
  }

  // ── 유튜브 오류 안내 ──
  let errSkips = 0;
  const ERR = {
    2: "영상 ID 가 올바르지 않음 (주소 전체가 아니라 ID 만 입력)",
    5: "이 브라우저에서 재생할 수 없는 영상",
    100: "삭제되었거나 비공개인 영상",
    101: "영상 주인이 사이트 안에서 재생을 막아 둠 (다른 영상으로 교체 필요)",
    150: "영상 주인이 사이트 안에서 재생을 막아 둠 (다른 영상으로 교체 필요)",
    153: "이 주소에서는 유튜브 재생이 안 됨. 파일로 열지 말고 사이트 주소(https://)로 열기",
  };
  function showErr(msg, id) {
    const b = $("mp-err");
    if (!msg) { b.style.display = "none"; b.textContent = ""; return; }
    b.style.display = "block";
    b.innerHTML = "⚠ " + esc(msg) + (id ? ' · <a href="https://www.youtube.com/watch?v=' + encodeURIComponent(id) + '" target="_blank" rel="noopener">유튜브에서 열기</a>' : "");
  }
  function onYtError(code) {
    const t = track(st.cat, st.idx);
    showErr((ERR[code] || "재생 오류 (코드 " + code + ")") + " [" + ((t && t.title) || "") + "]", t && t.youtube);
    // 영상 하나만 문제인 경우(삭제·재생 금지)에만 다음 곡으로 넘김. 환경 문제(153 등)는 멈춤.
    const n = cats[st.cat].tracks.filter(playable).length;
    if ([2, 100, 101, 150].includes(code) && ++errSkips < n) step(1);
    else setPlaying(false);
  }

  function playTrack(start, autoplay) {
    const t = track(st.cat, st.idx);
    if (!playable(t)) return;
    audio.pause();
    if (yt && ytReady) { try { yt.pauseVideo(); } catch (e) {} }
    if (t.file && !t.youtube) {
      showErr("");
      audio.src = t.file;
      audio.volume = st.vol / 100;
      audio.addEventListener("loadedmetadata", function once() { audio.removeEventListener("loadedmetadata", once); if (start) audio.currentTime = start; });
      if (autoplay) audio.play().catch(() => setPlaying(false));
      paint();
      return;
    }
    paint();
    loadYTApi(() => {
      const opts = { videoId: t.youtube, startSeconds: start || 0 };
      if (yt && ytReady) {
        autoplay ? yt.loadVideoById(opts) : yt.cueVideoById(opts);
        yt.setVolume(st.vol);
        return;
      }
      yt = new YT.Player("mp-yt", {
        videoId: t.youtube,
        width: "100%", height: "170",
        playerVars: Object.assign({ start: Math.floor(start || 0), autoplay: autoplay ? 1 : 0, playsinline: 1, rel: 0, modestbranding: 1 },
          /^https?:$/.test(location.protocol) ? { origin: location.origin } : {}),
        events: {
          onReady: (e) => { ytReady = true; e.target.setVolume(st.vol); },
          onStateChange: (e) => {
            if (e.data === 1) { errSkips = 0; showErr(""); setPlaying(true); }
            else if (e.data === 2) setPlaying(false);
            else if (e.data === 0) step(1, true);
            else if (e.data === 5 || e.data === -1) { if (st.playing && !autoplayOk()) setPlaying(false); }
          },
          onError: (e) => onYtError(e.data),
        },
      });
    });
  }
  const autoplayOk = () => false;

  function togglePlay() {
    if (mode() === "file") {
      if (!audio.src) { playTrack(st.t, true); return; }
      audio.paused ? audio.play().catch(() => {}) : audio.pause();
      return;
    }
    if (yt && ytReady && yt.getVideoUrl && /[?&]v=/.test(yt.getVideoUrl() || "")) {
      const s = yt.getPlayerState();
      if (s === 1 || s === 3) yt.pauseVideo(); else yt.playVideo();
      return;
    }
    playTrack(st.t, true);
  }

  function select(c, i, auto) {
    st.cat = c; st.idx = i; st.t = 0; save();
    const t = track(c, i);
    if (!playable(t)) { paint(); return; }
    setPlaying(true);
    playTrack(0, true);
  }

  // 다음/이전 곡 (비어있는 곡은 건너뜀)
  function step(d) {
    const n = cats[st.cat].tracks.length;
    for (let k = 1; k <= n; k++) {
      const i = (st.idx + d * k + n * k) % n;
      if (playable(track(st.cat, i))) { select(st.cat, i); return; }
    }
    setPlaying(false);
  }

  // ── 이벤트 ──
  $("mp-toggle").addEventListener("click", () => setOpen(!st.open));
  $("mp-play").addEventListener("click", () => {
    if (!playable(track(st.cat, st.idx))) { const i = cats[st.cat].tracks.findIndex(playable); if (i < 0) { setOpen(true); return; } st.idx = i; }
    togglePlay();
  });
  $("mp-prev").addEventListener("click", () => step(-1));
  $("mp-next").addEventListener("click", () => step(1));
  $("mp-vol").addEventListener("input", (e) => {
    st.vol = +e.target.value; save();
    audio.volume = st.vol / 100;
    if (yt && ytReady) yt.setVolume(st.vol);
  });
  $("mp-tabs").addEventListener("click", (e) => { const b = e.target.closest("[data-c]"); if (b) { st.cat = +b.dataset.c; paint(); } });
  $("mp-list").addEventListener("click", (e) => { const b = e.target.closest("[data-i]"); if (b) { errSkips = 0; select(st.cat, +b.dataset.i); } });

  // 1초마다 재생 위치 저장 → 다른 페이지로 가도 이어서
  setInterval(() => {
    if (!st.playing) return;
    try {
      if (mode() === "file") st.t = audio.currentTime || 0;
      else if (yt && ytReady && yt.getCurrentTime) st.t = yt.getCurrentTime() || 0;
      save();
    } catch (e) {}
  }, 1000);

  setOpen(st.open);
  paint();
  // 이전 페이지에서 틀고 있었다면 이어서 재생 시도
  if (st.playing && playable(track(st.cat, st.idx))) playTrack(st.t, true);
})();
