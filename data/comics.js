// 만화 목록. 새 만화는 맨 아래 `];` 바로 위에 추가해요.
//
//   id         : 영어/숫자 고유 이름 (주소에 쓰여요)
//   title      : 제목
//   artist     : 그린 사람
//   date       : 날짜 (YYYY-MM-DD)
//   cover      : 표지 파일 경로
//   pages      : 페이지 파일 경로 목록 (순서대로)
//   characters : 나온 캐릭터 id 목록
//   tags       : 자유 태그
//   desc       : (선택) 설명
window.COMICS = [
  // ↓ 샘플이에요. 지워도 돼요.
  {
    id: "sample",
    title: "샘플 만화",
    artist: "시은",
    date: "2026-10-21",
    cover: "images/comics/sample/1.svg",
    pages: [
      "images/comics/sample/1.svg",
      "images/comics/sample/2.svg",
      "images/comics/sample/3.svg",
    ],
    characters: ["sieun-ruti", "sieun-vanilla"],
    tags: ["샘플"],
    desc: "만화 뷰어 샘플이에요. 페이지 넘기기 / 스크롤 보기를 바꿀 수 있어요.",
  },
];
