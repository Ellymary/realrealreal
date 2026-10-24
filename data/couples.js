// 커플 목록
//   members : 두 캐릭터의 id (data/characters.js 의 id). 순서대로 "A × B" 로 나와요.
//             변신처럼 한 캐릭터가 여러 모습이면 { name: "트랜스", ids: ["id1", "id2"] } 로 묶어요. (이름 하나로 나오고, 각 모습 페이지로 가는 링크가 같이 나와요)
//   summary : 한 줄 소개 (비워두면 안 나와요)
//   info    : 커플 정보 표. 적은 칸만 나와요. 칸 이름은 아무거나 써도 돼요.
//             추천 칸: 관계 / 호칭 / 만난 계기 / 시작 / 분위기 / 데이트 / 키워드 / 노래
//             예) info: { "관계": "연인", "호칭": "춘→E 야, E→춘 형", "만난 계기": "백야 합동 임무" }
//   desc    : 표 아래 글 (빈 줄 = 문단 나누기, [굵게:글자] [빨강:글자] 같은 꾸미기도 돼요. 백틱( ` ) 쓰지 않기)
//
// 두 캐릭터가 같이 태그된 그림은 자동으로 이 커플 밑에 나와요. (갤러리에서 두 캐릭터를 같이 태그하면 돼요)
window.COUPLES = [
  { members: ["yena-gangchun", "sieun-e"],            summary: "", info: {}, desc: "" },
  { members: ["yeonwoo-gongyuan", { name: "트랜스", ids: ["sihyeon-trans-f", "sihyeon-trans-m"] }], summary: "", info: {}, desc: "" },
  { members: ["harin-mun", "harin-dobu"],             summary: "", info: {}, desc: "" },
];

// 2차 커플링 (커플 페이지의 "2차 커플링" 란에 나와요. 적는 방법은 위 COUPLES 와 똑같아요)
window.COUPLES2 = [
  { members: ["harin-dobu", "sihyeon-lanhwa"],        summary: "", info: {}, desc: "" },
  { members: ["yeonwoo-hyeon", "yena-chi"],           summary: "", info: {}, desc: "" },
];
