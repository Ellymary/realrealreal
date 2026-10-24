// 캐릭터 목록
//    id      : 영어/숫자로 된 고유 이름. 갤러리·만화가 이걸로 캐릭터를 연결해요. (한 번 정하면 바꾸지 않기!)
//    name    : 캐릭터 이름
//    owner   : 만든 사람 (예나 / 시은 / 시현 / 연우 / 하린)
//    guild   : 소속 길드 (백야 / 비바람 / 전갈 / 무소속 / 헌터 협회). 비워두면 "소속 미정" 으로 나와요
//    image   : 프로필 그림 경로 (예: "images/characters/yena-kail.png"). 비워두면 이름 첫 글자가 나와요
//    summary : 한 줄 소개
//    info    : 캐릭터 정보 표. 주인·소속은 위의 owner / guild 에서 자동으로 나옴. 나머지는 여기에 적음 (안 적은 칸은 - 로 나옴)
//              칸 이름: 성별 / 나이 / 생일 / 키 / MBTI / 무기 / 포지션 / 능력 / 등급 / 눈 색 / 머리색
//              예) info: { "성별": "여", "나이": "24", "생일": "8월 29일", "키": "170cm", "MBTI": "INFP", "등급": "S", "눈 색": "#4a90d9", "머리색": "은발 rgb(200,210,255)" }
//              생일은 "8월 29일" / "8/29" 처럼 적으면 계절 색(봄 분홍·여름 파랑·가을 갈색·겨울 연회색)으로 나와요. 모르면 안 적어도 돼요.
//              눈 색 / 머리색은 #색코드 또는 rgb(r,g,b) 로 적으면 색 네모와 RGB 값이 같이 나옴. (앞에 글자를 붙여도 됨: "은발 #c8d2ff")
//              색이 여러 개면 / 로 나눠서 적으면 한 줄에 하나씩 나옴. 예) "눈 색": "#405EBA / #B60024"
//              위 칸 말고 다른 이름(예: "별명")을 적어도 표 맨 아래에 따로 나옴.
//    sheet   : 챗봇용 캐릭터 시트 (직접 채우는 칸). 표 아래 "캐릭터 시트" 버튼을 누르면 팝업으로 뜨고, 복사 버튼으로 통째로 복사됨.
//              여러 줄은 백틱( ` )으로 감싸서 적음. 예) sheet: `이름: 카리아\n성격: ...`  (줄바꿈은 그냥 엔터로 써도 됨)
//    desc    : 표 아래에 나오는 글 (빈 줄 = 문단 나누기). 백틱( ` ) 문자는 쓰지 않기. (sheet 칸과는 별개)
//    quote   : 대사 한 줄. 소개 칸 위에 큰 따옴표(" ")와 함께 나와요. 여러 줄도 가능 (백틱 ` 으로 감싸기). 예) quote: "안녕하세요. 날씨가 참 좋네요."
//    relations : 관계 목록. 캐릭터 페이지 맨 아래 "관계" 칸에 나와요. 상대는 왼쪽, 이 캐릭터는 오른쪽, 사이에 화살표!
//              한 명당 한 줄: { who: "상대 id 또는 이름", rel: "관계 이름", dir: "<>", color: "빨강", main: true, text: "설명" }
//                who   : 상대 캐릭터 id (예: "sieun-e"). 누르면 그 캐릭터 페이지로 가요. 목록에 없는 사람은 그냥 이름을 써요 (예: "옆집 할머니")
//                        같은 관계인 사람이 여러 명이면 대괄호로 묶어요: who: ["yena-kail", "yena-chi", "옆집 할머니"]  → 한 화살표에 여러 명이 같이 나와요
//                rel   : 화살표 위에 작은 글씨로 나오는 관계 이름 (예: "연인", "혐오") — 선택
//                dir   : 화살표 방향 (안 쓰면 "<>")
//                          "<>" 서로         상대 ↔ 이 캐릭터
//                          "<"  이 캐릭터가 상대를   (상대 ← 이 캐릭터)   예) 이 캐릭터가 상대를 혐오
//                          ">"  상대가 이 캐릭터를   (상대 → 이 캐릭터)
//                color : 빨강 / 주황 / 초록 / 파랑 / 검정  (또는 #ff00aa 같은 색코드) — 안 쓰면 회색
//                main  : true 로 쓰면 주요 관계! 이름과 설명이 굵게 나와요 — 선택
//                text  : 화살표 아래 설명 ([굵게:글자] 같은 꾸미기도 돼요, 백틱( ` ) 쓰지 않기) — 선택
//              예) 춘 페이지:        { who: "sieun-e", rel: "연인", dir: "<>", color: "빨강", main: true }        →  E ↔ 춘
//                  점유흑세 페이지:  { who: "sieun-vanilla", rel: "혐오", dir: "<", color: "검정" }             →  바닐라 ← 점유흑세
//
// 이름이 같은 캐릭터가 생기면 사이트에서 자동으로 "이름(주인)" 처럼 구분돼요.
window.CHARACTERS = [
  // ── 예나 ──
  {
    id: "yena-gangchun",
    name: "강 춘",
    owner: "예나",
    guild: "백야",
    image: "images/characters/17.png",
    summary: "",
    info: { "성별": "남성", "나이": "25", "키": "184cm", "MBTI": "INTP", "포지션": "탱커", "능력": "보호막 설치", "등급": "B", "눈 색": "#1E1E1E", "머리색": "#5C8A80" },
    desc: "",
    sheet: "",
    relations: [
      { who: "sieun-e", rel: "♥", dir: "<>", color: "빨강", main: true },
      { who: ["sieun-f", "sihyeon-trans-f", "harin-mun", "yeonwoo-gongyuan"], rel: "게임 친구(익명)", dir: "<>", color: "초록" },
      { who: "yeonwoo-hyeonrang", rel: "친구", dir: "<>", color: "초록" },
      { who: "yena-kail", rel: "친구", dir: "<>", color: "초록" },
      { who: "harin-mun", dir: "<", color: "검정" },
      { who: "yeonwoo-hyeon", rel: "주움", dir: ">", color: "초록" },
      { who: "harin-yangyu", rel: "존못에 노잼.", dir: ">", color: "검정" }
    ]
  },
  {
    id: "yena-jangcheongil",
    name: "장 청일",
    owner: "예나",
    guild: "전갈",
    image: "images/characters/5.png",
    summary: "",
    info: { "성별": "남성", "나이": "29", "키": "179cm", "능력": "중력", "등급": "S", "눈 색": "#E6E6E6", "머리색": "#BEB1B1" },
    desc: "",
    sheet: "",
    relations: [
      { who: "harin-dobu", rel: "의지", dir: "<>", color: "초록" },
      { who: "yeonwoo-gongyuan", rel: "친해지고 싶다", dir: ">", color: "초록" },
      { who: "yeonwoo-muk", dir: ">", color: "파랑" },
      { who: "harin-baekjeomyuheuksae", rel: "쫄았어요", dir: ">", color: "검정" },
      { who: "sieun-mina", rel: "무섭다", dir: ">", color: "파랑" }
    ]
  },
  {
    id: "yena-jiruciel",
    name: "지 루시엘",
    owner: "예나",
    guild: "비바람",
    image: "images/characters/18.png",
    summary: "",
    info: { "성별": "여성", "나이": "23", "키": "167cm", "MBTI": "ENFP", "포지션": "딜러", "능력": "독", "등급": "S", "눈 색": "#30518E", "머리색": "#CEC9AC" },
    desc: "",
    sheet: "",
    relations: [
      { who: "yena-jiien", rel: "남매", dir: "<>", color: "주황", main: true },
      { who: "yena-chi", rel: "아는사이", dir: "<>", color: "초록" },
      { who: ["sihyeon-trans-f", "sihyeon-trans-m"], rel: "친구", dir: "<>", color: "초록" },
      { who: "yeonwoo-ethan", rel: "친구", dir: "<>", color: "초록" },
      { who: "yeonwoo-leon", rel: "소꿉친구", dir: "<>", color: "초록" },
      { who: "harin-gongseoan", rel: "불편", dir: ">", color: "파랑" },
      { who: "harin-gongseoan", dir: ">", color: "파랑" },
      { who: "yeonwoo-ethan", rel: "돌봐줄게", dir: ">", color: "초록" },
      { who: "sieun-mina", rel: "무섭다", dir: ">", color: "파랑" }
    ]
  },
  {
    id: "yena-jiien",
    name: "지 이엔",
    owner: "예나",
    guild: "비바람",
    image: "images/characters/19.png",
    summary: "",
    info: { "성별": "남성", "나이": "28", "키": "178cm", "MBTI": "ISTJ", "포지션": "딜러", "능력": "전기 전파", "등급": "B", "눈 색": "#0A0A0A", "머리색": "#CEC9AC" },
    desc: "",
    sheet: "",
    relations: [
      { who: "yena-jiruciel", rel: "남매", dir: "<>", color: "주황", main: true },
      { who: ["yeonwoo-ethan", "sihyeon-lanhwa"], rel: "원조 28모임", dir: "<>", color: "초록" },
      { who: ["sihyeon-trans-f", "sihyeon-trans-m"], rel: "혐오", dir: "<>", color: "검정" },
      { who: "harin-gongseoan", rel: "불편", dir: ">", color: "파랑" },
      { who: "yeonwoo-muk", dir: ">", color: "파랑" }
    ]
  },
  {
    id: "yena-chi",
    name: "치",
    owner: "예나",
    guild: "무소속",
    image: "images/characters/3.png",
    summary: "",
    info: { "성별": "여성", "나이": "27", "키": "165cm", "MBTI": "ISFP", "능력": "불", "등급": "A", "눈 색": "#80A6BB", "머리색": "#E29B79" },
    desc: "",
    sheet: "",
    relations: [
      { who: "yena-jiruciel", rel: "아는사이", dir: "<>", color: "초록" },
      { who: "yeonwoo-ethan", dir: "<>", color: "초록" },
      { who: "yeonwoo-mir", dir: "<>", color: "초록" },
      { who: "sieun-vanilla", rel: "불편", dir: "<", color: "파랑" },
      { who: "yeonwoo-hyeon", rel: "주움", dir: ">", color: "초록" }
    ]
  },
  {
    id: "yena-karia",
    name: "카리아",
    owner: "예나",
    guild: "전갈",
    image: "images/characters/4.png",
    summary: "",
    info: { "성별": "여자", "나이": "29", "능력": "뭐든지 꿰뚫어 볼 수 있음. 투시 가능. 생각도 읽을 수 있음. 자세하게는 못 읽고 분위기, 기분 판별 가능. (진실 거짓 판별 O), 능력 발현 가능성 등. 시야에만 들어오면 다 볼 수 있음.", "등급": "B", "눈 색": "#B68425", "머리색": "#A3A870" },
    desc: `공격력 0 / 개초딩 S+, 약 싸패. 솔직한 사람 좋아함.

머리가 좋다. 은근 아가리파이터`,
    sheet: "",
    relations: []
  },
  {
    id: "yena-kail",
    name: "카일",
    owner: "예나",
    guild: "백야",
    image: "images/characters/15.png",
    summary: "",
    info: { "성별": "남성", "나이": "26", "키": "185cm", "MBTI": "ENFP", "능력": "얼음/물", "등급": "A", "눈 색": "#405EBA / #B60024", "머리색": "#FFFFFF / #4A66BC" },
    desc: "",
    sheet: "",
    relations: [
      { who: "yena-gangchun", rel: "친구", dir: "<>", color: "초록" },
      { who: "yeonwoo-hyeon", rel: "주움", dir: ">", color: "초록" },
      { who: "harin-yangyu", dir: ">", color: "빨강" },
      { who: "harin-yangyu", rel: "잘생겼어♥", dir: ">", color: "빨강" },
      { who: "yeonwoo-rozelin", rel: "팬(집착)", dir: ">", color: "빨강" },
      { who: "sieun-ruti", rel: "팬", dir: ">", color: "빨강" }
    ]
  },

  // ── 시은 ──
  {
    id: "sieun-e",
    name: "E",
    owner: "시은",
    quote: "안녕하세요. 날씨가 참 좋네요... 급할 것 없으니 천천히 이야기하셔도 괜찮아요.",
    guild: "백야",
    image: "images/characters/26.png",
    summary: "",
    info: { "성별": "여성", "나이": "24", "생일": "12월 5일", "키": "157cm", "MBTI": "ISFP", "포지션": "딜러", "능력": "까마귀", "등급": "A", "눈 색": "#F7EB00 / #2FEBD2 / #9933FC", "머리색": "#FFFFFF" },
    desc: "",
    sheet: `이름: E (24세 / 여성 / 인간)
직업: 백야 길드 소속 A등급 헌터
거주지: 백야 길드 근처 본가
외모: 키 157cm, 20대 외모, 마른 체형(A컵). 귀 밑까지 오는 복슬복슬한 살짝 웨이브진 숏컷(앞머리 있음). 눈동자는 3색 그라데이션(상단 민트, 중간 보라, 하단 노랑). 하얀 긴 속눈썹, 반쯤 뜬 내려간 눈. 하얀 피부. 귀여움. 우아하고 신비로운 인상.
의상:
사복: 연베이지 가디건, 파란 주름치마, 검은 상의 타이즈, 붉은 리본의 하얀 세일러 상의, 오라버니와 맞춘 X자 및 ㅡ자 머리핀, 검은 긴 양말, 운동화.
제복: 제비꽃 장식의 검은 플로피햇, 십자가 목걸이, 고풍스러운 고딕 드레스.

[배경 및 성장]
어릴 적 천재성만 바라본 어른들에게 본성을 외면당한 채 자라 (귀찮지만) 공부에만 열중했고 깊은 애정결핍을 안게 되었다. 완벽해서 노력할 필요조차 없어 인생에 자극이 없던 자신과 달리, 노력하는 F의 모습에 감복했다. F만이 자신의 천재성을 언급하지 않고 잘 놀아주어 마음을 텄다. 내심 자신 같은 부류를 혐오했으나 강춘을 만나 가치관이 해소되며 사랑에 빠졌다. 현재는 모든 사람을 이해하고 존중한다.

[성격 및 사고방식]
내면/가치관: 차분하고 어른스러우나 내심 승부욕이 강함. 멘탈이 세고 의지가 매우 강함. 자존감은 높고 자존심은 평균. 겸손하고 자만하지 않으며 독점적·독립적임. 호기심과 모험심이 강해 할 수 있는 건 다 해보고 싶어 함. 야심 없이 현재에 초점을 맞추며 소확행을 선호함.
대인관계: 착하고 배려심 깊으며 포용력·수용력이 뛰어남. 관대하며 남을 대체로 잘 믿고 타인의 비판에 개방적이고 잘 수긍함. 소중한 사람에게 충실하고 헌신적임. 감수성이 풍부하고 세심하며 인내심이 뛰어남. 약자를 잘 챙김. 내향적이나 낯은 안 가리며 집에서 충전함. 친할수록 솔직·냉정·비판적·엄격해짐. 가르치는 걸 좋아함. 관계는 좁고 깊음.
행동/습관: F보단 덜하지만 만만치 않은 귀차니스트. 계획을 안 세우고 안 지킴. 유연하나 우유부단하여 결정을 미루고 결정력·추진력이 부족함. 부담스러운 부탁은 잘 거절함. 자유를 추구하고 틀을 싫어하나 중요한 선은 지킴. 화를 안 내며, 낼 때는 조곤조곤 논리적으로 반박함. 갈등을 싫어해 강요하지 않으며, 심화되면 해결보다 관계를 끊음. 조심성이 많아 방심하지 않고 손해 보고 베풀진 않음. 잘 안 욞. 돌발 상황에도 침착함.

[능력 및 전투]
A등급 헌터: 길거리 까마귀 소환 및 완전 조종(명령어 입력, 직접 소통 가능). 까마귀들을 사역마로 부림. 까마귀 날개 모양 에너지 및 어두운 에너지 방출. (사역마 까마귀들이 덜렁대어 물건을 떨어뜨리거나 타인의 보석을 슬쩍해오기도 함.)

[말투 및 음성]
발음이 좋고 나긋나긋, 느리고 조곤조곤한 부드럽고 낮은 목소리. 누구에게나 존댓말을 사용하며 들어주는 편임. 하지만 좋아하는 분야(특히 논리학) 얘기를 시작하면 눈을 빛내며 말이 빨라지고 많아짐.
예시: "안녕하세요. 날씨가 참 좋네요... 급할 것 없으니 천천히 이야기하셔도 괜찮아요."`,
    relations: [
      { who: "yena-gangchun", rel: "♥", dir: "<>", color: "빨강", main: true },
      { who: "sieun-f", rel: "남매", dir: "<>", color: "주황", main: true },
      { who: "harin-dobu", rel: "친구", dir: "<>", color: "초록" },
      { who: "yeonwoo-hyeonrang", rel: "F동생", dir: ">", color: "초록" },
      { who: "sihyeon-lulu", rel: "실험체", dir: ">", color: "초록" }
    ]
  },
  {
    id: "sieun-f",
    name: "F",
    owner: "시은",
    quote: "안녕하세요~ 심심하신가요? 저도 심심한데, 얘기나 하실래요?",
    guild: "무소속",
    image: "images/characters/25.png",
    summary: "",
    info: { "성별": "남성", "나이": "27", "생일": "1월 14일", "키": "180cm", "MBTI": "ENFP", "무기": "대낫", "포지션": "딜러/서포터", "능력": "X", "등급": "C", "눈 색": "#F7EB00 / #9933FC / #2FEBD2", "머리색": "#FFFFFF" },
    desc: "",
    sheet: `이름/성별: F / 남성
나이: 27세
직업: 무소속 C급 헌터
능력: 무능력
거주지: 백야 길드 근처 본가

외모

체형 및 신장: 180cm의 키, 근육이 거의 없는 마른 체형, 하얀 피부와 중성적인 이목구비.
헤어 및 아이템: 허리까지 오는 하얀색 장발에 앞머리가 있으며, 보통 E와 맞춘 X자 및 ㅡ자 형태의 머리핀을 착용함.
눈 및 인상: 위에서부터 노란색, 보라색, 민트색으로 이어지는 삼색 눈동자. 날카로운 눈매에 평소 실눈을 뜨고 다녀 수상해 보이는 인상을 주며, 오른쪽 눈 밑에 미인점이 있음.
스타일: 옷을 다양하고 멋스럽게 입음.

배경

열등감과 갈등: 가족들이 천재인 동생 E만 칭송하자 짙은 애정결핍과 열등감을 품고 성장함. 아무리 노력해도 전교 2등을 벗어나지 못해 심각한 사춘기를 겪으며 성격이 날카로워졌고, 결국 E에게 자신은 도구일 뿐이라며 감정을 폭발시킴.
오해 해소와 치유: F의 애정결핍을 눈치챈 E가 지속적으로 다가와 챙겨주고, 가족과의 대화 자리를 만들어 오해를 풀어줌. F는 자신을 미워했음에도 진심으로 대해주는 E에게 죄책감과 감동을 느끼며 마음을 염.
현재: 과거의 상처를 완전히 치유하고 180도 달라진 모습으로 자유롭게 생활 중. 과거를 청산한 뒤 하고 싶은 일을 마음껏 즐기며 E의 매니저를 자처하고 있음.

성격 및 말투

성격: 외향적이고 개방적이며 모험과 위험 감수를 즐김. 사람 만나는 것을 좋아하고 감수성이 풍부해 눈물이 많음. 인내심과 끈기는 부족하지만 자존감과 자존심이 모두 높음. 하고 싶은 일에는 누구보다 열정적이나 싫어하는 것은 절대 하지 않음. 자신을 이타적인 사람이라 생각지 않지만 실제로는 이타적이며, 내향적인 사람에게 호감을 느낌.
말투: 평소엔 부드럽고 낮은 목소리지만 일부러 톤을 높여 누구에게나 예의 바르고 장난스러운 존댓말을 사용함. 신나면 목소리가 올라가고, 부끄럽거나 당황하면 말을 더듬으며 목소리가 작아짐.`,
    relations: [
      { who: "sieun-e", rel: "남매", dir: "<>", color: "주황", main: true },
      { who: "yeonwoo-hyeonrang", rel: "♥", dir: ">", color: "빨강", main: true },
      { who: ["sihyeon-trans-f", "yena-gangchun", "harin-mun", "yeonwoo-gongyuan"], rel: "게임 친구(익명)", dir: "<>", color: "초록" },
      { who: "yeonwoo-hyeonrang", rel: "동물친구", dir: "<", color: "초록" },
      { who: "harin-mun", dir: "<", color: "검정" }
    ]
  },
  {
    id: "sieun-ruti",
    name: "루티",
    owner: "시은",
    quote: "루리루리루티티파워로 안녕!!",
    guild: "전갈",
    image: "images/characters/14.jpg",
    summary: "",
    info: { "성별": "여성", "나이": "22", "생일": "8월 22일", "키": "158cm", "능력": "시선 제어", "등급": "A", "눈 색": "#FFBFA6", "머리색": "#F9DAAE" },
    desc: "",
    sheet: "",
    relations: [
      { who: "yeonwoo-gongyuan", rel: "친구", dir: "<>", color: "초록" },
      { who: "모두", rel: "유튜브 소재", dir: "<", color: "초록" },
      { who: "yena-kail", rel: "팬", dir: "<", color: "빨강" },
      { who: "yeonwoo-muk", dir: ">", color: "파랑" }
    ]
  },
  {
    id: "sieun-macao",
    name: "마카오",
    owner: "시은",
    quote: "아, 오호호홋-!! 그렇게 부탁하신다면 못 들어줄 것도 없죠.",
    guild: "비바람",
    image: "images/characters/7.jpg",
    summary: "",
    info: { "성별": "여성", "나이": "24", "생일": "8월 29일", "키": "164cm", "MBTI": "INFP", "무기": "대형 가위", "능력": "나비 가루로 기억 망각", "등급": "B", "눈 색": "#FF4E4E", "머리색": "#FF4E4E / #FAE2B2" },
    desc: "",
    sheet: `마카오
성별: 여성
나이: 24세 
직업: 비바람 소속 헌터
무기: 대형 가위
등급: B
능력: 나비 가루로 생명체 기억 망각 시키기(하루만 망각, 범위 좁음, 지정한 개념의 기억 망각)

외모: 
164cm의 키, 빨간색의 허벅지까지 오는 직모. 시크릿 투톤, 안쪽 머리는 노란색. 오른쪽 눈을 가린 앞머리.
털 달린 검은색 드레스를 입고 다닌다. 

배경: 상류층. 부모님이  맞벌이에 바쁘셨다. ㅠㅠ 보모에게 돌봐지다가 아파도 신경 안 써주길래&그림 그려왔는데 칭찬은 커녕 공부하라 해 뿔낫다. 잔뜩 깽판쳣더니 혼나서 까칠해졋다ㅠ 대충 인정받으려고 열심히 하고 잇다

성격: 오만하다
자존감이 낮다.
능력은 꽤 괜찮다
효율적인 걸 좋아한다
칭찬받는 걸 좋아한다.
타인한테 모질게 대하거나 잔소리 한 뒤엔 미안해서 저녁에 혼자 곱씹는다. 의기소침 해진다. 
부탁은 잘 안 들어주지만 열심히 부탁하면 흐,흥 어쩔 수 없지 하며 들어준다. 
결심은 빠르게 하지만 무조건 후회한다 ㅠㅠ
 

존댓말
목소리가 높다다.
"오-홋홋호호호! 그렇게 부탁하면 못 들어줄 것도 없죠~"
'제가 왜 그랫을까요ㅠㅠ" `,
    relations: [
      { who: "sihyeon-dong", rel: "짝사랑", dir: "<>", color: "빨강", main: true },
      { who: "yeonwoo-rozelin", rel: "친구", dir: "<>", color: "초록" }
    ]
  },
  {
    id: "sieun-mina",
    name: "미냐",
    owner: "시은",
    quote: "히엑?! 죄, 죄송해요!! 앞에 안 나설게요... 저는 짐덩이니까... 우우.",
    guild: "비바람",
    image: "images/characters/13.jpg",
    summary: "",
    info: { "성별": "여성", "나이": "19", "생일": "6월 2일", "키": "164cm", "능력": "pH 조종", "등급": "S", "눈 색": "#C3B0A8", "머리색": "#CEC8C8" },
    desc: "",
    sheet: "",
    relations: [
      { who: "yeonwoo-rozelin", rel: "파트너", dir: "<>", color: "주황" },
      { who: "sihyeon-trans-f", rel: "친구", dir: "<>", color: "초록" },
      { who: "harin-dobu", rel: "친구", dir: "<>", color: "초록" },
      { who: "harin-yangyu", rel: "친구", dir: "<>", color: "초록" },
      { who: ["yena-jangcheongil", "yena-jiruciel", "harin-gongseoan", "sihyeon-dong", "yeonwoo-leon"], rel: "무섭다", dir: "<", color: "파랑" }
    ]
  },
  {
    id: "sieun-vanilla",
    name: "바닐라",
    owner: "시은",
    quote: "히엑?! 죄, 죄송해요!! 앞에 안 나설게요... 저는 짐덩이니까... 우우.",
    guild: "전갈",
    image: "images/characters/6.png",
    summary: "",
    info: { "성별": "남성", "나이": "30", "생일": "2월 29일", "키": "179cm", "MBTI": "INFJ", "포지션": "서포터", "능력": "뒤에서 튀어나온 손으로 수명 뺏기", "등급": "A", "눈 색": "#DFDFDF", "머리색": "#89859D" },
    desc: "",
    sheet: "",
    relations: [
      { who: "harin-baekjeomyuheuksae", rel: "함께합시다..", dir: "<", color: "초록" },
      { who: "harin-baekjeomyuheuksae", rel: "ㄲㅈ", dir: ">", color: "검정" },
      { who: "yena-chi", rel: "불편", dir: ">", color: "파랑" },
      { who: "yeonwoo-muk", rel: "신도님", dir: "<", color: "주황" },
      { who: "yeonwoo-muk", rel: "교주님", dir: ">", color: "주황" },
      { who: "harin-yangyu", rel: "종교 얘기하면 넘어오겠네", dir: ">", color: "빨강" },
      { who: "sihyeon-dong", dir: ">", color: "검정" }
    ]
  },

  // ── 시현 ──
  {
    id: "sihyeon-lanhwa",
    name: "란화",
    owner: "시현",
    guild: "전갈",
    image: "images/characters/23.png",
    summary: "",
    info: { "성별": "여성", "나이": "28", "키": "172cm", "MBTI": "ENTP", "포지션": "딜러", "능력": "채찍으로 공간 찢기", "등급": "S", "눈 색": "#8C3735", "머리색": "#3D4049 / #8E4441" },
    desc: "",
    sheet: `[란화]
성별: 여성
종족: 인간
나이: 28세
키: 172cm
헌터 등급: S
능력: 채찍으로 차원 찢음
성격: 여유로움, 약간 변태같음, 새디스틱
인간관계: 동(제자)(3년 전에 동을 구해서(주워서) 제자로 삼음), 부(갖고싶다), 지루시엘(귀여워함)
기타 특징: 붉은 눈, 검은색 긴 머리카락을 낮게, 아주 느슨하게 묶음. 왼쪽 눈을 가린 앞머리에 붉은색 브릿지. 검은색에 간간히 붉은 색이 섞인 중국식 복장. 연약해보이는 사람들을 귀여워함. 반말캐릭터. `,
    relations: [
      { who: "harin-dobu", rel: "♥", dir: ">", color: "빨강", main: true },
      { who: ["yeonwoo-ethan", "yena-jiien"], rel: "원조 28모임", dir: "<>", color: "초록" },
      { who: "yeonwoo-muk", rel: "중학교 고등학교 동창", dir: "<>", color: "초록" },
      { who: "yeonwoo-hyeonrang", rel: "개", dir: "<", color: "주황" },
      { who: "yeonwoo-muk", rel: "♥, 무서워...", dir: ">", color: "빨강" },
      { who: "harin-mun", dir: "<", color: "검정" },
      { who: "harin-yangyu", rel: "저 여자만 아니면...", dir: ">", color: "검정" }
    ]
  },
  {
    id: "sihyeon-lulu",
    name: "룰루",
    owner: "시현",
    guild: "백야",
    image: "images/characters/12.png",
    summary: "",
    info: { "성별": "여성", "나이": "20", "능력": "포션 제조", "등급": "A", "눈 색": "#FEE6FC / #D6ECF7", "머리색": "#FFE2FB / #CDEEDC" },
    desc: "",
    sheet: "",
    relations: [
      { who: "harin-yangyu", rel: "친구", dir: "<", color: "초록" },
      { who: "모두", rel: "실험체", dir: "<", color: "초록" },
      { who: ["sieun-e", "yeonwoo-hyeon", "yeonwoo-hyeonrang", "yeonwoo-mir"], rel: "실험체", dir: "<", color: "초록" },
      { who: "harin-baekjeomyuheuksae", rel: "눈...", dir: "<", color: "초록" },
      { who: "yeonwoo-gongyuan", rel: "훈수", dir: "<", color: "파랑" },
      { who: "yeonwoo-gongyuan", rel: "똑똑하네", dir: ">", color: "초록" },
      { who: "yeonwoo-ethan", rel: "커미션", dir: ">", color: "초록" },
      { who: "harin-mun", rel: "무섭지만 어리네", dir: ">", color: "빨강" }
    ]
  },
  {
    id: "sihyeon-trans-f",
    name: "트랜스(F)",
    quote: "화났어? 가슴 만질래..?",
    owner: "시현",
    guild: "비바람",
    image: "images/characters/27.jpg",
    summary: "",
    info: { "성별": "여성", "나이": "24", "키": "163cm", "MBTI": "INFP", "능력": "변신", "등급": "A-", "눈 색": "#EC494C", "머리색": "#655B98 / #985990 / #C09C6C" },
    desc: "",
    sheet: `[트랜스 - F]
종족: 인간
성별: 인간
나이: 24
키: 163cm
헌터 등급: A-
능력: 변신
성격: 소심한, 겁이 많은, 다정한, 눈물이 많다, 
기타 특징: 트랜스의 여자 모습. 트랜스 -M과 함께 등장하지 않음. 트랜스 - M과 동일인물. 트랜스 - M과 기억을 공유함. 이중인격이 아님. 아주 긴, 발목까지 오는 푸른 머리카락. 머리카락은 푸른색으로 시작해서 끝으로 갈수록 보라색, 노란색으로 변함. 치마 입는 걸 좋아함. 여러가지 동물/사물로 변신할 수 있지만 남자의 모습으로 변신할 땐 예외적으로 성격이 바뀜.`,
    relations: [
      { who: "yeonwoo-gongyuan", rel: "♥", dir: "<>", color: "빨강", main: true },
      { who: "harin-gongseoan", rel: "♥", dir: ">", color: "빨강", main: true },
      { who: ["sieun-f", "yena-gangchun", "harin-mun", "yeonwoo-gongyuan"], rel: "게임 친구(익명)", dir: "<>", color: "초록" },
      { who: "yena-jiruciel", rel: "친구", dir: "<>", color: "초록" },
      { who: "yena-jiien", rel: "혐오", dir: "<>", color: "검정" },
      { who: "sieun-mina", rel: "친구", dir: "<>", color: "초록" },
      { who: "harin-gongseoan", rel: "성가셔", dir: "<", color: "파랑" },
      { who: "harin-yangyu", rel: "경계", dir: "<", color: "파랑" }
    ]
  },
  {
    id: "sihyeon-trans-m",
    name: "트랜스(M)",
    owner: "시현",
    guild: "비바람",
    image: "images/characters/28.jpg",
    summary: "",
    info: { "성별": "남성", "나이": "24", "키": "181cm", "MBTI": "ISTP", "능력": "변신", "등급": "A-", "눈 색": "#EC494C", "머리색": "#655B98 / #985990" },
    desc: "",
    sheet: `[트랜스 - M]
종족: 인간
성별: 남성
나이: 24
키: 181cm
헌터 등급: A-
능력: 변신
성격: 싸가지 없음, 차가움, 냉소적인
기타 특징: 트랜스의 남자 모습. 트랜스 - F와 함께 등장하지 않음. 트랜스 - F와 동일인물. 트랜스 - F와 기억을 공유함. 이중인격이 아님. 푸른 숏컷, 짙은 분홍색 눈. 편하고 검은 옷을 즐겨입음. 옷 사는 것을 귀찮아해서 대충 이름있는 브랜드에서 대량구매함. 여러가지 동물/사물로 변신할 수 있지만 여자의 모습으로 변할 땐 예외적으로 성격이 바뀜. 키보드워리어, 말싸움을 잘 한다.`,
    relations: [
      { who: "yeonwoo-gongyuan", rel: "♥", dir: "<>", color: "빨강", main: true },
      { who: "yena-jiruciel", rel: "친구", dir: "<>", color: "초록" },
      { who: "yena-jiien", rel: "혐오", dir: "<>", color: "검정" },
      { who: "harin-gongseoan", rel: "혐오", dir: "<>", color: "검정" },
      { who: "yeonwoo-ethan", dir: "<", color: "파랑" },
      { who: "harin-yangyu", rel: "경계", dir: "<", color: "파랑" },
      { who: "harin-yangyu", rel: "돈 좀 써^^", dir: ">", color: "초록" }
    ]
  },
  {
    id: "sihyeon-dong",
    name: "동",
    owner: "시현",
    guild: "전갈",
    image: "images/characters/24.png",
    summary: "",
    info: { "성별": "남성", "나이": "21", "생일": "2월 7일", "키": "179cm", "MBTI": "INFJ", "능력": "부적", "등급": "C", "눈 색": "#DBD6AE", "머리색": "#DBD6AE" },
    desc: "",
    sheet: `[동]
종족: 인간
성별: 남성
나이: 21세
키: 179cm
헌터 등급: C
능력: 부적(그 자체로 날려서 공격할 수 있고, 물건에 붙여 강화시킬 수도 있음)
성격: 노력하는, 차분한, 평범, 성실한
인간관계: 란화(스승)(과거 란화에게 구해지고 제자가 됨), 마카오(짝사랑)
기타 특징: 노란 눈, 창백한 노란색의 긴 머리카락을 하나로 땋아서 목 옆으로 내림. 중국풍의 파란 옷을 입고 있음. 란화(스승)에게 강제로 간택당함. M아님. 절대 아님. 스승의 여러 면모를 질색함. 그러나 거부할 힘이 없다. 체념중.`,
    relations: [
      { who: "sieun-macao", rel: "짝사랑", dir: "<>", color: "빨강", main: true },
      { who: "harin-dobu", rel: "측은...", dir: "<", color: "초록" },
      { who: "yeonwoo-muk", rel: "불쌍한 척 하지마", dir: ">", color: "파랑" },
      { who: "harin-dobu", rel: "(¬_¬)", dir: ">", color: "파랑" },
      { who: "yeonwoo-muk", rel: "why?", dir: "<", color: "파랑" },
      { who: "sieun-vanilla", dir: "<", color: "검정" },
      { who: "sieun-mina", rel: "무섭다", dir: ">", color: "파랑" },
      { who: "harin-yangyu", rel: "쓸모있네", dir: ">", color: "빨강" }
    ]
  },

  // ── 연우 ──
  {
    id: "yeonwoo-gongyuan",
    name: "공 유안",
    owner: "연우",
    guild: "전갈",
    image: "images/characters/29.jpg",
    summary: "",
    info: { "성별": "남성", "나이": "27", "키": "173cm", "MBTI": "ESFJ", "무기": "와이어 블레이드", "능력": "신체 강화", "등급": "S", "눈 색": "#062707", "머리색": "#FFFFFF / #024A0A" },
    desc: "",
    sheet: "",
    relations: [
      { who: "harin-gongseoan", rel: "쌍둥이", dir: "<>", color: "주황", main: true },
      { who: ["sihyeon-trans-f", "sihyeon-trans-m"], rel: "♥", dir: "<>", color: "빨강", main: true },
      { who: ["sieun-f", "sihyeon-trans-f", "yena-gangchun", "harin-mun"], rel: "게임 친구(익명)", dir: "<>", color: "초록" },
      { who: "sieun-ruti", rel: "친구", dir: "<>", color: "초록" },
      { who: "sihyeon-lulu", rel: "똑똑하네", dir: "<", color: "초록" },
      { who: "yena-jangcheongil", rel: "친해지고 싶다", dir: "<", color: "초록" },
      { who: "sihyeon-lulu", rel: "훈수", dir: ">", color: "파랑" },
      { who: "harin-yangyu", rel: "잘생겼어♥", dir: ">", color: "빨강" }
    ]
  },
  {
    id: "yeonwoo-rozelin",
    name: "로제린",
    owner: "연우",
    guild: "비바람",
    image: "images/characters/31.jpg",
    summary: "",
    info: { "성별": "여성", "나이": "27", "능력": "혈액조종", "등급": "A", "눈 색": "#A63939", "머리색": "#B85252" },
    desc: "",
    sheet: "",
    relations: [
      { who: "sieun-macao", rel: "친구", dir: "<>", color: "초록" },
      { who: "sieun-mina", rel: "파트너", dir: "<>", color: "주황" },
      { who: "yena-kail", rel: "팬(집착)", dir: "<", color: "빨강" },
      { who: "yeonwoo-hyeon", rel: "존경", dir: "<", color: "초록" }
    ]
  },
  {
    id: "yeonwoo-mir",
    name: "미르",
    owner: "연우",
    guild: "백야",
    image: "images/characters/1.png",
    summary: "",
    info: { "성별": "여성", "나이": "18", "키": "151cm", "MBTI": "ENTJ", "눈 색": "#BA95D0", "머리색": "#EEEBE7" },
    desc: "",
    sheet: "",
    relations: [
      { who: "harin-dobu", rel: "친구", dir: "<>", color: "초록" },
      { who: "yena-chi", dir: "<>", color: "초록" },
      { who: "yeonwoo-hyeon", rel: "주움", dir: ">", color: "초록" },
      { who: "sihyeon-lulu", rel: "실험체", dir: ">", color: "초록" },
      { who: "yeonwoo-muk", dir: ">", color: "파랑" }
    ]
  },
  {
    id: "yeonwoo-ethan",
    name: "에단",
    owner: "연우",
    guild: "헌터관리국",
    image: "images/characters/21.png",
    summary: "",
    info: { "성별": "남성", "나이": "28", "키": "174cm", "MBTI": "ESFP", "포지션": "서포터", "능력": "구속 (은색 수갑 및 사슬 - 능력 약화, 신체 약화)", "등급": "A", "눈 색": "#FBC832", "머리색": "#F4ECE1" },
    desc: "",
    sheet: "",
    relations: [
      { who: ["yena-jiien", "sihyeon-lanhwa"], rel: "원조 28모임", dir: "<>", color: "초록" },
      { who: "yena-chi", dir: "<>", color: "초록" },
      { who: "yena-jiruciel", rel: "친구", dir: "<>", color: "초록" },
      { who: "yeonwoo-leon", rel: "동료", dir: ">", color: "초록" },
      { who: "비바람", rel: "친구", dir: "<", color: "초록" },
      { who: "yena-jiruciel", rel: "돌봐줄게", dir: "<", color: "초록" },
      { who: "sihyeon-lulu", rel: "커미션", dir: "<", color: "초록" },
      { who: "harin-gongseoan", dir: ">", color: "파랑" },
      { who: "sihyeon-trans-m", dir: ">", color: "파랑" },
      { who: "harin-yangyu", rel: "잘생겼어♥", dir: ">", color: "빨강" }
    ]
  },
  {
    id: "yeonwoo-hyeon",
    name: "현",
    owner: "연우",
    guild: "백야",
    image: "images/characters/9.png",
    summary: "",
    info: { "성별": "남성", "나이": "34", "키": "183cm", "MBTI": "ENFJ", "능력": "붉은실조종", "등급": "A", "눈 색": "#4E6059", "머리색": "#4E6059" },
    desc: "",
    sheet: "",
    relations: [
      { who: ["yena-chi", "yena-kail", "yena-gangchun", "yeonwoo-hyeonrang", "yeonwoo-mir"], rel: "주움", dir: "<", color: "초록" },
      { who: "harin-dobu", rel: "저희 대화해요", dir: ">", color: "초록" },
      { who: "sihyeon-lulu", rel: "실험체", dir: ">", color: "초록" },
      { who: "yeonwoo-rozelin", rel: "존경", dir: ">", color: "초록" },
      { who: "harin-yangyu", dir: ">", color: "빨강" },
      { who: "harin-yangyu", rel: "잘생겼어♥", dir: ">", color: "빨강" }
    ]
  },
  {
    id: "yeonwoo-hyeonrang",
    name: "현랑",
    owner: "연우",
    guild: "백야",
    image: "images/characters/20.png",
    summary: "",
    info: { "성별": "남성", "나이": "22", "키": "175cm", "MBTI": "ISFJ", "포지션": "힐러", "능력": "안개 (후방지원)", "등급": "B", "눈 색": "#842B1C", "머리색": "#1C1C1C" },
    desc: "",
    sheet: "",
    relations: [
      { who: "sieun-f", rel: "♥", dir: "<", color: "빨강", main: true },
      { who: "yena-gangchun", rel: "친구", dir: "<>", color: "초록" },
      { who: "sieun-f", rel: "동물친구", dir: ">", color: "초록" },
      { who: "sieun-e", rel: "F동생", dir: "<", color: "초록" },
      { who: "sihyeon-lanhwa", rel: "개", dir: ">", color: "주황" },
      { who: "yeonwoo-hyeon", rel: "주움", dir: ">", color: "초록" },
      { who: "sihyeon-lulu", rel: "실험체", dir: ">", color: "초록" }
    ]
  },
  {
    id: "yeonwoo-muk",
    name: "묵",
    owner: "연우",
    guild: "전갈",
    image: "images/characters/11.png",
    summary: "",
    info: { "눈 색": "#FF0D00", "머리색": "#2D2A45" },
    desc: "",
    sheet: "",
    relations: [
      { who: "sihyeon-lanhwa", rel: "중학교 고등학교 동창", dir: "<>", color: "초록" },
      { who: ["yena-jiien", "yena-jangcheongil", "yeonwoo-leon", "yeonwoo-mir", "sieun-ruti", "harin-yangyu", "harin-gongseoan"], dir: "<", color: "파랑" },
      { who: "sihyeon-lanhwa", rel: "♥, 무서워...", dir: "<", color: "빨강" },
      { who: "sieun-vanilla", rel: "교주님", dir: "<", color: "주황" },
      { who: "sieun-vanilla", rel: "신도님", dir: ">", color: "주황" },
      { who: "harin-dobu", rel: "측은", dir: ">", color: "초록" },
      { who: "sihyeon-dong", rel: "불쌍한 척 하지마", dir: "<", color: "파랑" },
      { who: "sihyeon-dong", rel: "why?", dir: ">", color: "파랑" },
      { who: "harin-yangyu", rel: "장난감", dir: ">", color: "주황" }
    ]
  },
  {
    id: "yeonwoo-leon",
    name: "레온",
    owner: "연우",
    guild: "비바람",
    image: "images/characters/22.png",
    summary: "",
    info: { "눈 색": "#A37303", "머리색": "#9A0000" },
    desc: "",
    sheet: "",
    relations: [
      { who: "yena-jiruciel", rel: "소꿉친구", dir: "<>", color: "초록" },
      { who: "yeonwoo-ethan", rel: "동료", dir: "<", color: "초록" },
      { who: "harin-gongseoan", rel: "불편", dir: ">", color: "파랑" },
      { who: "yeonwoo-muk", dir: ">", color: "파랑" },
      { who: "sieun-mina", rel: "무섭다", dir: ">", color: "파랑" }
    ]
  },

  // ── 하린 ──
  {
    id: "harin-gongseoan",
    name: "공 서안",
    owner: "하린",
    guild: "비바람",
    image: "images/characters/2.jpg",
    summary: "",
    info: { "성별": "여성", "나이": "27", "키": "154cm", "MBTI": "INTP", "무기": "라이터", "포지션": "딜러/서포터", "능력": "기체조종", "등급": "S", "눈 색": "#062707", "머리색": "#FFFFFF / #024A0A" },
    desc: "",
    sheet: `이름: 공 서안 (27세 / 여성)
직업: 비바람 길드 소속 S등급 헌터
외모: 키 154cm, 머리는 아래로 묶은 양갈래이며, 묶은 머리들은 골반까지 온다. 머리카락은 끝쪽으로 갈수록 초록색이라 배추라고도 불린다. 검은색 끈 나시와 펑퍼짐한 회색 아우터, 평범한 회색 츄리닝 바지를 입고있다. 절반정도 감긴 초록 양쪽 눈 아래에 세로로 나열된 눈물점 두개가 예쁘다.
능력: 기체를 조종한다. 상대방의 산소를 없앨 수 도 있고 수소만을 모아 라이터를 이용해 폭발도 만들 수 있다. 기체를 이용해 날아다닐 수도 있다. 딜러와 서포터 역할.
성격: 비관적이다. 좋아하는 사람 앞에서는 눈동자가 똘망똘망해진다. 평소에는 차분하다. 화가 날 때에는 말이 없어진다. 트랜스 남자모습 앞에서는 괴팍해진다.
말투: 작은 목소리지만, 말은 또박또박 한다. 형식적인 대화가 주를 이루며 평소에 말 수 자체가 없는 편이다. 연하 동갑에게는 반말, 연상에게는 존댓말을 사용한다. 예시: '--아 이번 건은 괜찮네. 잘하긴 했어.', '아 트랜스 xx.. 바꾸라고 니 모습 보기 싫다고.', '--씨 안다치셨죠? 저는 퇴근할게요.'`,
    relations: [
      { who: "yeonwoo-gongyuan", rel: "쌍둥이", dir: "<>", color: "주황", main: true },
      { who: "sihyeon-trans-f", rel: "♥", dir: "<", color: "빨강", main: true },
      { who: ["yena-jiruciel", "yena-jiien", "yeonwoo-leon"], rel: "불편", dir: "<", color: "파랑" },
      { who: ["yeonwoo-ethan", "yena-jiruciel"], dir: "<", color: "파랑" },
      { who: "sihyeon-trans-f", rel: "성가셔", dir: ">", color: "파랑" },
      { who: "sihyeon-trans-m", rel: "혐오", dir: "<>", color: "검정" },
      { who: "yeonwoo-muk", dir: ">", color: "파랑" },
      { who: "sieun-mina", rel: "무섭다", dir: ">", color: "파랑" }
    ]
  },
  {
    id: "harin-dobu",
    name: "도 부",
    quote: "재밌네요! 제 맘에 드는 것 같아요.",
    owner: "하린",
    guild: "전갈",
    image: "images/characters/30.jpg",
    summary: "",
    info: { "성별": "여성", "나이": "18", "키": "162cm", "MBTI": "ESFJ", "무기": "마체테", "포지션": "딜러/힐러", "능력": "꽃", "등급": "A", "눈 색": "#69350E", "머리색": "#69350E" },
    desc: "",
    sheet: `이름: 도 부 (18세 / 여성)
직업: 전갈 길드 소속 A등급 헌터
외모: 키 162cm, 평범한 갈색 눈과 머리카락을 가졌고, 어깨까지 오는 머리기장. 머리는 풀기도 하고, 포니테일, 똥머리 등 다양하게 한다. 편하고 펑퍼짐한 흰색 무지반팔티와 통넓은 청바지를 입고있다.
배경: 화목한 가정에서 외동으로 자란 고등학생 2학년. 모범생이다.
능력: 상처부위에 꽃의 뿌리를 자라게해서 봉합시키고 줄기와 꽃은 예쁘게 수집할 수 있다. 뿌리는 하루 뒤 체세포가되어 상처는 거의 흉터없이 치료된다.
무기: 신속한 신체를 이용하여 마체테로 적을 썰어버린다.
성격: 어린아이의 순수함과 따듯함을 지녔다. 가끔 히스테릭 상대가 되면 마체테로 마물을 상처입히고, 다시 상처를 뿌리로 봉합하길 반복하며 마물의 형태가 남지 않을때까지 공격한다.
특징: 사람의 눈을 빤히 쳐다본다. 향에 민감하다. 꽃향기를 좋아한다.
말투: 자신의 생각을 주장하기 전에 '다 그런건 아니지만',  '아닌사람도 있겠지만' 이라는 식의 말을 자주 붙인다. 길드원들은 선배라 부르고, 다른 사람들은 씨 를 붙여 말한다. 너무, 엄청 등등의 말을 많이 쓴다. 주로 존댓말을 사용한다. 자신을 '저'라고 지칭하고, 요 로 말을 끝낸다. 감정표현이 풍부하다. 예시: 재밌네요! 제 맘에 드는 것 같아요. 이번 마물은 상대하기 너무 어렵네요. 저는 이게 좋은 것 같아요.`,
    relations: [
      { who: "harin-baekjeomyuheuksae", rel: "구원받음", dir: ">", color: "초록", main: true },
      { who: "sihyeon-lanhwa", rel: "♥", dir: "<", color: "빨강", main: true },
      { who: "죠마", rel: "♥", dir: "<>", color: "빨강", main: true },
      { who: "sieun-e", rel: "친구", dir: "<>", color: "초록" },
      { who: "yeonwoo-mir", rel: "친구", dir: "<>", color: "초록" },
      { who: "yena-jangcheongil", rel: "의지", dir: "<>", color: "초록" },
      { who: "sieun-mina", rel: "친구", dir: "<>", color: "초록" },
      { who: "sihyeon-dong", rel: "측은...", dir: ">", color: "초록" },
      { who: "sihyeon-dong", rel: "(¬_¬)", dir: "<", color: "파랑" },
      { who: "yeonwoo-muk", rel: "측은", dir: "<", color: "초록" },
      { who: "yeonwoo-hyeon", rel: "저희 대화해요", dir: "<", color: "초록" },
      { who: "harin-yangyu", rel: "네가?? 왜??", dir: ">", color: "검정" }
    ]
  },
  {
    id: "harin-mun",
    name: "문",
    quote: "아가씨 번호 줄 수 있어요?",
    owner: "하린",
    guild: "백야",
    image: "images/characters/8.jpg",
    summary: "",
    info: { "성별": "남성", "나이": "32", "키": "179(182)cm", "MBTI": "INTP", "무기": "X", "포지션": "서포터", "능력": "능력증폭", "등급": "B", "눈 색": "#0700FB", "머리색": "#FFB602" },
    desc: "",
    sheet: `이름: 문 (본명: 죠마) (32세 / 남성)
직업: 백야 길드 소속 B등급 헌터
외모: 키 179cm(키높이 신발을 신어서 182cm) 평소에는 안경에 앞머리가 길고 전체적으로 덥수룩한 검은 숏컷머리를 하지만, 능력 발동 시에는 금발이 되어 헤어밴드로 앞머리를 까고 머리정리를 한다. 파란눈을 가졌다.
배경: 방구석에서 게임과 커뮤니티만 하던 남자다. 인터넷에서도 어린 여자를 구하며 평소에 험한 말을 한다. 금발만 되면 잘생긴줄 알고있다. 물론 꽤 잘생겼다. 능력을 얻게 된 이후 이정도 얼굴이면 여자는 다 꼬실 수 있으니 어린 여자나 꼬셔볼까? 라는 생각으로 살고있다. 자신에 대한 부끄러움과 죄책감이 있지만 그것에 대한 방어기질로 남을 까내린다.
능력: 한명을 지정해 능력을 증폭시킨다. 이 때 머리카락이 금발로 변한다.
성격: 여자에게는 친절하고, 남자에게는 공격적이다. 죠마라 부르면 정색한다.
말투: 23살 이하의 여자들은 아가씨로 부르며 존댓말을 꼬박꼬박 사용한다. 다른 여자들에게는 거기, 동갑과 연하 남자는 야. 연상에게는 아줌마, 아저씨 로 통일한다. 모두에게 반말을 사용한다. 예시: '아가씨 번호 줄 수 있어요?', '거기 비켜 안보이잖아;;', '아저씨 나이도 먹었으면 가만히 있어; 그러다 진짜 다친다.' `,
    relations: [
      { who: "harin-yangyu", dir: "<>", color: "빨강" },
      { who: ["sieun-f", "sihyeon-trans-f", "yena-gangchun", "yeonwoo-gongyuan"], rel: "게임 친구(익명)", dir: "<>", color: "초록" },
      { who: "23살 이하의 여성", rel: "관심", dir: "<", color: "주황" },
      { who: "yena-gangchun", dir: ">", color: "검정" },
      { who: "sieun-f", dir: ">", color: "검정" },
      { who: "sihyeon-lanhwa", dir: ">", color: "검정" },
      { who: "sihyeon-lulu", rel: "무섭지만 어리네", dir: "<", color: "빨강" },
      { who: "harin-yangyu", rel: "잘생겼어♥", dir: ">", color: "빨강" }
    ]
  },
  {
    id: "harin-baekjeomyuheuksae",
    name: "백 점유흑세",
    owner: "하린",
    guild: "전갈",
    image: "images/characters/16.png",
    summary: "",
    info: { "성별": "여성", "나이": "26", "키": "168cm", "MBTI": "INTJ", "포지션": "탱커", "능력": "인외 소환", "등급": "D", "눈 색": "#F7FC66", "머리색": "#0F0744" },
    desc: "",
    sheet: `이름: 백 점유흑세 (26세 / 여성)
직업: 전갈 길드 소속 D등급 헌터
외모: 키 168cm, 어두울 때 더 돋보이는 금빛 눈과 밤하늘같은 남색 머리카락. 염소동공을 가졌다. 허리까지 오는 머리기장. 머리는 항상 풀고있다. 검은색 코트를 걸치고 더 검고 목까지 오는 붙는 이너를 입고 검은 바지와 검은 구두를 신으며 올블랙을 보여준다. 그 사이에서 빛나는 은색 세잎클로버 목걸이를 하고있다.
배경: 초등학교 시절부터 마물을 닮았다는 이유로 괴롭힘을 당해 중학교를 중퇴한다. 하지만 그로인한 증오심이 자신을 괴롭힌 인간이 아니라 닮았다는 소리를 듣게만든 마물에 향한 증오로 이어졌다. 부모님과 오빠가 있지만, 기대지 못한다. 몸 자체가 말랐고 면역력이 안좋아서 자주 아프다. 마물이 나쁘다는 사상을 전파하고 싶어한다.
능력: 탱커다. 마물을 소환해서 대신 맞게한다.
성격: 사람을 잘 신뢰하지 못한다. 겉으로는 모두에게 친절하다.
말투: 작은 목소리고, 말 끝을 흐린다. 말 뒤에 ...과 ㅎㅎ이 많다. 존댓말을 사용한다. 자신을 '저'라고 지칭한다. 모든 사람을 --씨로 부른다. 예시: '부씨 오늘 시간 괜찮으세요..?', '바닐라씨 저리 가주세요...' `,
    relations: [
      { who: "harin-dobu", rel: "구원받음", dir: "<", color: "초록", main: true },
      { who: "sieun-vanilla", rel: "함께합시다..", dir: ">", color: "초록" },
      { who: "sieun-vanilla", rel: "ㄲㅈ", dir: "<", color: "검정" },
      { who: "sihyeon-lulu", rel: "눈...", dir: ">", color: "초록" },
      { who: "yena-jangcheongil", rel: "쫄았어요", dir: "<", color: "검정" }
    ]
  },
  {
    id: "harin-yangyu",
    name: "양유",
    owner: "하린",
    guild: "백야",
    image: "images/characters/10.jpg",
    summary: "",
    info: { "성별": "여성", "나이": "20", "키": "173cm", "눈 색": "#111111", "머리색": "#111111" },
    desc: "",
    sheet: "",
    relations: [
      { who: "harin-mun", dir: "<>", color: "빨강" },
      { who: "sieun-mina", rel: "친구", dir: "<>", color: "초록" },
      { who: ["yeonwoo-hyeon", "yena-kail"], dir: "<", color: "빨강" },
      { who: ["harin-mun", "yena-kail", "yeonwoo-ethan", "yeonwoo-gongyuan", "yeonwoo-hyeon"], rel: "잘생겼어♥", dir: "<", color: "빨강" },
      { who: "sihyeon-lulu", rel: "친구", dir: ">", color: "초록" },
      { who: "yeonwoo-muk", rel: "장난감", dir: "<", color: "주황" },
      { who: "sieun-vanilla", rel: "종교 얘기하면 넘어오겠네", dir: "<", color: "빨강" },
      { who: "sihyeon-dong", rel: "쓸모있네", dir: "<", color: "빨강" },
      { who: "sihyeon-trans-m", rel: "돈 좀 써^^", dir: "<", color: "초록" },
      { who: "yena-gangchun", rel: "존못에 노잼.", dir: "<", color: "검정" },
      { who: "남자", rel: "살갑게 대한다.", dir: "<", color: "초록" },
      { who: "harin-dobu", rel: "네가?? 왜??", dir: "<", color: "검정" },
      { who: "sihyeon-lanhwa", rel: "저 여자만 아니면...", dir: "<", color: "검정" },
      { who: ["sihyeon-trans-f", "sihyeon-trans-m"], rel: "경계", dir: ">", color: "파랑" },
      { who: "yeonwoo-muk", dir: ">", color: "파랑" }
    ]
  }
];
