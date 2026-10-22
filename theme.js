// 다크 / 라이트 모드 — 페이지가 그려지기 전에 먼저 적용해서 깜빡임을 막아요
(function () {
  var t = null;
  try { t = localStorage.getItem("theme"); } catch (e) {}
  if (t !== "light" && t !== "dark") t = "dark"; // 기본은 다크
  document.documentElement.setAttribute("data-theme", t);
  window.Theme = {
    get: function () { return document.documentElement.getAttribute("data-theme"); },
    set: function (v) {
      document.documentElement.setAttribute("data-theme", v);
      try { localStorage.setItem("theme", v); } catch (e) {}
    },
    toggle: function () { this.set(this.get() === "dark" ? "light" : "dark"); },
  };
})();
