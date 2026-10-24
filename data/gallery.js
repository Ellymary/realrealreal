// 갤러리 그림 목록. 새 그림은 맨 아래 `];` 바로 위에 추가해요.
// (add.html 에서 코드를 만들어 붙여넣어도 돼요!)
//
//   file       : 그림 파일 경로 (images/gallery/ 폴더에 올려요)
//   thumb      : (선택) 작은 미리보기 파일. 없으면 file 을 그대로 써요
//   title      : 제목
//   artist     : 그린 사람
//   date       : 날짜 (YYYY-MM-DD)
//   characters : 나온 캐릭터 id 목록 ← 이게 "캐릭터 태그"! (data/characters.js 의 id)
//   tags       : 그 외 자유 태그 (예: "단체", "일러", "낙서")
//   desc       : (선택) 설명
window.GALLERY = [
  // ↓ 샘플이에요. 실제 그림을 올리면 지워도 돼요.
  {
    file: "images/gallery/sample-1.svg",
    title: "샘플 그림 1",
    artist: "시은",
    date: "2026-10-21",
    characters: ["sieun-ruti"],
    tags: ["샘플", "일러"],
    desc: "샘플이에요. 이런 식으로 보여요!",
  },
  {
    file: "images/gallery/sample-2.svg",
    title: "샘플 그림 2",
    artist: "시은",
    date: "2026-10-20",
    characters: ["sieun-ruti", "sieun-vanilla"],
    tags: ["샘플", "단체"],
  },
  {
    file: "images/gallery/sample-3.svg",
    title: "샘플 그림 3",
    artist: "하린",
    date: "2026-10-19",
    characters: ["harin-mun"],
    tags: ["샘플", "낙서"],
  },
  {
    video: "https://drive.google.com/file/d/1t1CWLUdpn565XtwCvGmh0NJQF1uzCXV-/view?usp=drive_link",
    title: "11",
    artist: "예나",
    date: "2026-10-23",
    characters: ["sieun-vanilla"],
    tags: [],
  },
  {
    video: "https://drive.google.com/file/d/1zPMCeOSORtP61VrO7YCqZMr1K8NnCla0/view?usp=drive_link",
    title: "22",
    artist: "연우",
    date: "2026-10-23",
    characters: ["yena-jiruciel","yena-jiien","sihyeon-dong"],
    tags: [],
  },
  {
    video: "https://drive.google.com/file/d/1dcqhguMiuQUaayY7PpWAaTvf57Gu_u4a/view?usp=sharing",
    title: "9795",
    artist: "예나",
    date: "2026-10-24",
    characters: ["yena-jangcheongil","yena-karia"],
    tags: [],
  },
];
