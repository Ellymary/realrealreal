// 캐릭터 목록
//   id      : 영어/숫자로 된 고유 이름. 갤러리·만화가 이걸로 캐릭터를 연결해요. (한 번 정하면 바꾸지 않기!)
//   name    : 캐릭터 이름
//   owner   : 만든 사람 (예나 / 시은 / 시현 / 연우 / 하린)
//   guild   : 소속 길드 (백야 / 비바람 / 전갈 / 무소속 / 헌터 협회). 비워두면 "소속 미정" 으로 나와요
//   image   : 프로필 그림 경로 (예: "images/characters/yena-kail.png"). 비워두면 이름 첫 글자가 나와요
//   summary : 한 줄 소개
//   info    : 캐릭터 정보 표. 주인·소속은 위의 owner / guild 에서 자동으로 나옴. 나머지는 여기에 적음 (안 적은 칸은 - 로 나옴)
//             칸 이름: 성별 / 나이 / 키 / MBTI / 무기 / 포지션 / 능력 / 등급 / 눈 색 / 머리색
//             예) info: { "성별": "여", "나이": "24", "키": "170cm", "MBTI": "INFP", "등급": "S", "눈 색": "#4a90d9", "머리색": "은발 rgb(200,210,255)" }
//             눈 색 / 머리색은 #색코드 또는 rgb(r,g,b) 로 적으면 색 네모와 RGB 값이 같이 나옴. (앞에 글자를 붙여도 됨: "은발 #c8d2ff")
//             위 칸 말고 다른 이름(예: "별명")을 적어도 표 맨 아래에 따로 나옴.
//   sheet   : 챗봇용 캐릭터 시트 (직접 채우는 칸). 표 아래 "캐릭터 시트" 버튼을 누르면 팝업으로 뜨고, 복사 버튼으로 통째로 복사됨.
//             여러 줄은 백틱( ` )으로 감싸서 적음. 예) sheet: `이름: 카리아\n성격: ...`  (줄바꿈은 그냥 엔터로 써도 됨)
//   desc    : 표 아래에 나오는 글 (빈 줄 = 문단 나누기). 백틱( ` ) 문자는 쓰지 않기. (sheet 칸과는 별개)
//
// 이름이 같은 캐릭터가 생기면 사이트에서 자동으로 "이름(주인)" 처럼 구분돼요.
window.CHARACTERS = [
  // ── 예나 ──
  { id: "yena-gangchun", name: "강 춘", owner: "예나", guild: "백야", image: "", summary: "", info: {}, desc: "", sheet: "" },
  { id: "yena-jangcheongil", name: "장 청일", owner: "예나", guild: "전갈", image: "", summary: "", info: {}, desc: "", sheet: "" },
  { id: "yena-jiruciel", name: "지 루시엘", owner: "예나", guild: "비바람", image: "", summary: "", info: {}, desc: "", sheet: "" },
  { id: "yena-jiien", name: "지 이엔", owner: "예나", guild: "비바람", image: "", summary: "", info: {}, desc: "", sheet: "" },
  { id: "yena-chi", name: "치", owner: "예나", guild: "무소속", image: "", summary: "", info: {}, desc: "", sheet: "" },
  { id: "yena-karia", name: "카리아", owner: "예나", guild: "전갈", image: "", summary: "", info: {}, desc: "", sheet: "" },
  { id: "yena-kail", name: "카일", owner: "예나", guild: "백야", image: "", summary: "", info: {}, desc: "", sheet: "" },

  // ── 시은 ──
  { id: "sieun-e", name: "E", owner: "시은", guild: "백야", image: "", summary: "", info: {}, desc: "", sheet: "" },
  { id: "sieun-f", name: "F", owner: "시은", guild: "무소속", image: "", summary: "", info: {}, desc: "", sheet: "" },
  { id: "sieun-ruti", name: "루티", owner: "시은", guild: "전갈", image: "", summary: "", info: {}, desc: "", sheet: "" },
  { id: "sieun-macao", name: "마카오", owner: "시은", guild: "비바람", image: "", summary: "", info: {}, desc: "", sheet: "" },
  { id: "sieun-mina", name: "미냐", owner: "시은", guild: "비바람", image: "", summary: "", info: {}, desc: "", sheet: "" },
  { id: "sieun-vanilla", name: "바닐라", owner: "시은", guild: "전갈", image: "", summary: "", info: {}, desc: "", sheet: "" },

  // ── 시현 ──
  { id: "sihyeon-lanhwa", name: "란화", owner: "시현", guild: "전갈", image: "", summary: "", info: {}, desc: "", sheet: "" },
  { id: "sihyeon-lulu", name: "룰루", owner: "시현", guild: "백야", image: "", summary: "", info: {}, desc: "", sheet: "" },
  { id: "sihyeon-trans-f", name: "트랜스(F)", owner: "시현", guild: "비바람", image: "", summary: "", info: {}, desc: "", sheet: "" },
  { id: "sihyeon-trans-m", name: "트랜스(M)", owner: "시현", guild: "비바람", image: "", summary: "", info: {}, desc: "", sheet: "" },
  { id: "sihyeon-dong", name: "동", owner: "시현", guild: "전갈", image: "", summary: "", info: {}, desc: "", sheet: "" },

  // ── 연우 ──
  { id: "yeonwoo-gongyuan", name: "공 유안", owner: "연우", guild: "전갈", image: "", summary: "", info: {}, desc: "", sheet: "" },
  { id: "yeonwoo-rozelin", name: "로제린", owner: "연우", guild: "백야", image: "", summary: "", info: {}, desc: "", sheet: "" },
  { id: "yeonwoo-mir", name: "미르", owner: "연우", guild: "백야", image: "", summary: "", info: {}, desc: "", sheet: "" },
  { id: "yeonwoo-ethan", name: "에단", owner: "연우", guild: "헌터 협회", image: "", summary: "", info: {}, desc: "", sheet: "" },
  { id: "yeonwoo-hyeon", name: "현", owner: "연우", guild: "백야", image: "", summary: "", info: {}, desc: "", sheet: "" },
  { id: "yeonwoo-hyeonrang", name: "현랑", owner: "연우", guild: "백야", image: "", summary: "", info: {}, desc: "", sheet: "" },
  { id: "yeonwoo-muk", name: "묵", owner: "연우", guild: "전갈", image: "", summary: "", info: {}, desc: "", sheet: "" },
  { id: "yeonwoo-leon", name: "레온", owner: "연우", guild: "비바람", image: "", summary: "", info: {}, desc: "", sheet: "" },

  // ── 하린 ──
  { id: "harin-gongseoan", name: "공 서안", owner: "하린", guild: "비바람", image: "", summary: "", info: {}, desc: "", sheet: "" },
  { id: "harin-dobu", name: "도 부", owner: "하린", guild: "전갈", image: "", summary: "", info: {}, desc: "", sheet: "" },
  { id: "harin-mun", name: "문", owner: "하린", guild: "백야", image: "", summary: "", info: {}, desc: "", sheet: "" },
  { id: "harin-baekjeomyuheuksae", name: "백 점유흑세", owner: "하린", guild: "전갈", image: "", summary: "", info: {}, desc: "", sheet: "" },
  { id: "harin-yangyu", name: "양유", owner: "하린", guild: "백야", image: "", summary: "", info: {}, desc: "", sheet: "" },
];
