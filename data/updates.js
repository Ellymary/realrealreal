// 홈 맨 위에 흘러가는 "업데이트" 알림 줄
//   ver  : 버전 이름 (예: "v0.9")
//   text : 업데이트 내용
//   date : 날짜 (비워도 돼요)
//   href : 누르면 갈 페이지 (비워도 돼요)
// 맨 위 줄이 가장 최근이에요. 새 업데이트는 `window.UPDATES = [` 바로 아래에 한 줄 추가!
window.UPDATES_DIR = "right";   // 흐르는 방향: "right" (오른쪽으로) / "left" (왼쪽으로)
window.UPDATES = [
  { ver: "v1.0", text: "테마 추가: 제우스 밤의 울음 · 헌터 관리국 / 퀴즈 색 코드 문제에 색 표시", date: "11/07", href: "trivia.html" },
  { ver: "v0.9", text: "캐릭터 퀴즈 추가 (객관식 · 주관식 · 서술형 · 관계 퀴즈)", date: "11/06", href: "trivia.html" },
  { ver: "v0.8", text: "주관적 순위 매기기 + 순위 캡쳐하기", date: "11/06", href: "ranking.html" },
  { ver: "v0.7", text: "엑스트라 칸 추가 · 영상 폰 가로 전체화면", date: "11/06", href: "guild.html?id=extra" },
  { ver: "v0.6", text: "캐릭터 정보에 배경/과거 · 대사 예시 접기 칸", date: "11/06", href: "characters.html" },
  { ver: "v0.5", text: "이상형 월드컵을 놀이터에 연결", date: "11/06", href: "worldcup.html" },
];
