// 캐릭터가 나온 순서 (먼저 나온 것부터 위에서 아래로)
//   한 덩어리 { date, who } 는 "같이 나온" 캐릭터들이에요. date 는 아는 만큼만 (모르면 생략).
//   who 는 캐릭터 id (data/characters.js 의 id). 새 캐릭터는 맨 아래에 덩어리를 추가해요.
//   아직 여기 없는 캐릭터는 정렬할 때 맨 뒤에 가요.
window.DEBUT = [
  { date: "7월 29일", who: [
    "yena-jiruciel",            // 루시엘
    "yena-jiien",               // 이엔
    "yena-gangchun",            // 춘
    "sieun-f",                  // F
    "sieun-e",                  // E
    "sihyeon-lanhwa",           // 란화
    "sihyeon-dong",             // 동
    "yeonwoo-leon",             // 레온
    "yeonwoo-hyeonrang",        // 현랑
    "yeonwoo-ethan",            // 에단
    "harin-baekjeomyuheuksae",  // 유흑세
    "harin-dobu",               // 부
  ] },
  { who: ["yeonwoo-mir"] },                                          // 미르
  { who: ["yena-chi", "yena-kail"] },                                // 치, 카일
  { date: "8월 27일", who: ["sihyeon-trans-f", "sihyeon-trans-m", "yeonwoo-gongyuan", "harin-gongseoan"] },   // 트랜스(F/M), 유안, 서안
  { date: "8월 28일", who: ["sieun-vanilla", "sieun-macao", "yeonwoo-hyeon", "harin-mun"] },                  // 바닐라, 마카오, 현, 문
  { date: "9월 6일", who: ["yena-jangcheongil"] },                   // 청일
  { date: "9월 13일", who: ["yeonwoo-rozelin"] },                    // 로제린
  { date: "10월 17일", who: ["sieun-ruti", "sieun-mina", "sihyeon-lulu", "yeonwoo-muk", "harin-yangyu"] },    // 루티, 미냐, 룰루, 묵, 양유
  { date: "10월 21일", who: ["yena-karia"] },                        // 카리아
];
