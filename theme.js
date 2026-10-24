// 테마 (다크 / 라이트 / 파스텔 / 헌터) — 페이지가 그려지기 전에 먼저 적용해서 깜빡임을 막아요
// 새 테마를 추가하려면: 아래 LIST 에 한 줄 + style.css 에 :root[data-theme="이름"] { ... } 를 추가해요.
(function () {
  var LIST = [["dark", "다크"], ["light", "라이트"], ["pastel", "파스텔"], ["hunter", "헌터"], ["baekya", "백야"], ["bibaram", "비바람"], ["scorpion", "전갈"]];
  var ok = function (v) { return LIST.some(function (x) { return x[0] === v; }); };
  var t = null;
  try { t = localStorage.getItem("theme"); } catch (e) {}
  if (!ok(t)) t = "dark"; // 기본은 다크
  document.documentElement.setAttribute("data-theme", t);
  window.Theme = {
    list: LIST,
    get: function () { return document.documentElement.getAttribute("data-theme"); },
    set: function (v) {
      if (!ok(v)) return;
      document.documentElement.setAttribute("data-theme", v);
      try { localStorage.setItem("theme", v); } catch (e) {}
    },
    // 예전 다크/라이트 버튼을 쓰는 곳을 위해 남겨 둠
    toggle: function () { this.set(this.get() === "dark" ? "light" : "dark"); },
  };
})();
