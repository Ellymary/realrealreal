// "다른 캐릭터와 같이 하기!" 사분면. 같이 한 사분면 사진을 판 배경에 깔고 그 위에 캐릭터를 올려요.
//   name : 버튼에 나오는 이름
//   bg   : 배경 사진 경로. images/quadrant/ 폴더에 올려요.
//          확장자를 빼고 적어도 돼요 → 예) "images/quadrant/voice.webp"  (png / jpg / webp 를 알아서 찾아요)
//   (새로 같이 한 사분면이 생기면 아래에 한 줄만 추가!)
// 각 사분면마다 캐릭터를 놓은 자리가 따로 저장돼요. (내가 자유롭게 쓰는 판이랑 섞이지 않아요)
window.QUADRANT_TOGETHER = [
  { name: "목소리", bg: "images/quadrant/voice.webp" },
  { name: "등급", bg: "images/quadrant/grade.webp" },
  { name: "환경/멘탈", bg: "images/quadrant/mental.webp" },
  { name: "싸움(물리)", bg: "images/quadrant/fight.webp" },
  { name: "술", bg: "images/quadrant/drink.webp" },
];
