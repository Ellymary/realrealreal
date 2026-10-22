// 플레이리스트 (브금)
//   카테고리마다 곡을 자유롭게 넣어요. 한 곡은 이렇게 써요:
//
//   ① 유튜브 곡 (제일 쉬움)
//      { title: "곡 제목", artist: "가수", youtube: "dQw4w9WgXcQ" }
//      → youtube 칸에는 주소 전체가 아니라 "영상 ID" 만!
//        https://www.youtube.com/watch?v=dQw4w9WgXcQ  ← v= 뒤의 글자
//        https://youtu.be/dQw4w9WgXcQ                 ← 슬래시 뒤의 글자
//
//   ② mp3 파일 (직접 만든 곡 등)
//      { title: "곡 제목", artist: "만든 사람", file: "music/my-song.mp3" }
//      → music 폴더를 만들어서 mp3 를 올려요. (파일 이름은 영어/숫자로, 25MB 이하)
//
//   카테고리(칸)는 아래 categories 안의 { id, name, tracks } 한 덩어리예요. 칸을 더 만들려면 한 덩어리를 복사해서 이름만 바꾸세요.
//   곡은 칸마다 7개씩 자리가 있어요. 곡을 더 넣고 싶으면 한 줄을 복사해서 이어 붙이면 돼요.
//
//   youtube 도 file 도 비워두면 "비어있음" 으로 나오고 건너뛰어요.
window.MUSIC = {
  categories: [
    {
      id: "otaku",
      name: "씹덕",
      tracks: [
        { title: "ロウワー", artist: "ぬゆり", youtube: "3sEptl-psU0" },
        { title: "東京テディベア", artist: "Neru", youtube: "eSI7RsjZy1" },
        { title: "ドラマツルギ一", artist: "Eve", youtube: "jJzw1h5CR" },
        { title: "このふざけた素晴らしき世界は、僕の為にある", artist: "n.k", youtube: "FtYXNCFkFGI" },
        { title: "起死開戦", artist: "millsage", youtube: "FOfAu3lW1qg" },
        { title: "KiLLKiSS", artist: "Ave Mujica", youtube: "RexyoaXaQ1o" },
        { title: "えれくとりっく・えんじぇぅ", artist: "ヤスオ", youtube: "jVp91z9fEMo" },
      ],
    },
    {
      id: "classic",
      name: "클래식",
      tracks: [
        { title: "곡 제목 1", artist: "", youtube: "" },
        { title: "곡 제목 2", artist: "", youtube: "" },
        { title: "곡 제목 3", artist: "", youtube: "" },
        { title: "곡 제목 4", artist: "", youtube: "" },
        { title: "곡 제목 5", artist: "", youtube: "" },
        { title: "곡 제목 6", artist: "", youtube: "" },
        { title: "곡 제목 7", artist: "", youtube: "" },
      ],
    },
    {
      id: "kpop",
      name: "K POP",
      tracks: [
        { title: "곡 제목 1", artist: "", youtube: "" },
        { title: "곡 제목 2", artist: "", youtube: "" },
        { title: "곡 제목 3", artist: "", youtube: "" },
        { title: "곡 제목 4", artist: "", youtube: "" },
        { title: "곡 제목 5", artist: "", youtube: "" },
        { title: "곡 제목 6", artist: "", youtube: "" },
        { title: "곡 제목 7", artist: "", youtube: "" },
      ],
    },
    {
      id: "bgm",
      name: "배경음악",
      tracks: [
        { title: "사이키 클럽", artist: "Awesomepiece", youtube: "i9HRu-hC69c" },
        { title: "곡 제목 2", artist: "", youtube: "" },
        { title: "곡 제목 3", artist: "", youtube: "" },
        { title: "곡 제목 4", artist: "", youtube: "" },
        { title: "곡 제목 5", artist: "", youtube: "" },
        { title: "곡 제목 6", artist: "", youtube: "" },
        { title: "곡 제목 7", artist: "", youtube: "" },
      ],
    },
  ],
};
