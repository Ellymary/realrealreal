mp3 곡 파일을 이 폴더에 올려요. (파일 이름은 영어/숫자/- 만, 25MB 이하)
예) my-song.mp3
그리고 data/music.js 의 곡 줄에 이렇게 써요:
  { title: "곡 제목", artist: "만든 사람", file: "music/my-song.mp3" }

유튜브 곡은 파일을 올릴 필요 없이 영상 ID 만 쓰면 돼요:
  { title: "곡 제목", artist: "가수", youtube: "dQw4w9WgXcQ" }
