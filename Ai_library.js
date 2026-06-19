document.addEventListener("DOMContentLoaded", () => {
    window.allData = [
 {   id: 1, 
            title: "LCMS35M413", 
            type:  "이미지",
            team: "WEB팀",
            brand: "MAZZ", 
            gender: "남화", 
            category: "스니커즈", 
            season: "24 SPRING", 
           background: "스튜디오", 
            tool: "Gemini", 
            created: "2026-06-04", 
            link: "\\\\172.30.235.50\\web팀\\웹디자인\\ai 생성 이미지\\LCMS35M413",
            usage: "착화컷",
            usedIn: "자사몰 특가세일 착화 이미지", 
            reaction: "얼굴 사용 가능, 착화컷 위주 사용(레퍼런스 배경과 비슷한 이슈로 주의)", 
            prompt: "1번 이미지 속 모델 얼굴을 2번 이미지 얼굴로 바꿔주고, 옷은 3번으로 입혀줘. 신발은 4번 누끼컷 참고해서 변경해줘. 화질은 4K로 주고 사진 비율은 1:1로 생성해줘.", 
            image: "https://gi.esmplus.com/elcanto01/elcanto/ai/LCMS35M413.jpg", 
            subImage: "https://gi.esmplus.com/elcanto01/elcanto/ai/LCMS35M413_detail1.jpg", 
        },

       {   id: 2, 
            title: "LCMD08M313", 
            type:  "이미지",
            team: "WEB팀",
            brand: "MAZZ", 
            gender: "남화", 
            category: "컴포트화", 
            season: "23 SPRING", 
           background: "스튜디오", 
            tool: "Gemini", 
            created: "2026-06-04", 
            link: "\\\\172.30.235.50\\web팀\\웹디자인\\ai 생성 이미지\\LCMD08M313",
            usage: "착화컷",
            usedIn: "자사몰 특가세일 착화 이미지", 
            reaction: "", 
            prompt: "1번 이미지 신발을 2,3,4번 신발 누끼컷 상품으로 변경해주고, 바지는 정장 바지로, 다리 포즈는 상품이 잘 보이도록 변경해줘.", 
            image: "https://gi.esmplus.com/elcanto01/elcanto/ai/LCMD08M313.jpg", 
            subImage: "https://gi.esmplus.com/elcanto01/elcanto/ai/LCMD08M313_detail.jpg", 
        },

        {   id: 3, 
            title: "LCWC24M413", 
            type:  "이미지",
            team: "WEB팀",
            brand: "MAZZ", 
            gender: "여화", 
            category: "스니커즈", 
            season: "24 AUTUMN", 
           background: "스튜디오", 
            tool: "Gemini", 
            created: "2026-06-04", 
            link: "\\\\172.30.235.50\\web팀\\웹디자인\\ai 생성 이미지\\LCWC24M413",
            usage: "착화컷",
            usedIn: "자사몰 특가세일 착화 이미지", 
            reaction: "", 
            prompt: "1번 이미지 속 신발 디테일을 2~7번 신발 누끼컷, 디테일컷 참고해서 업그레이드 해줘", 
            image: "https://gi.esmplus.com/elcanto01/elcanto/ai/LCWC24M413.jpg", 
            subImage: "https://gi.esmplus.com/elcanto01/elcanto/ai/LCWC24M413_detail.jpg", 
        },
        {   id: 4, 
            title: "LCWD94I126", 
            type:  "이미지",
            team: "온라인팀",
            brand: "INTENSE", 
            gender: "여화", 
            category: "힐", 
            season: "23 SPRING", 
           background: "스튜디오", 
            tool: "Gemini", 
            created: "2026-06-04", 
            link: "\\\\172.30.235.50\온라인팀\\ONLINE\\운영관리\\24. 홈&쇼핑\\1. 홈&쇼핑_딜\\2026\홈앤쇼핑_6월딜(3)_여성 드레드 균일가(45,000원)",
            usage: "배너",
            usedIn: "홈앤쇼핑 딜 인트로 배너", 
            reaction: "", 
            prompt: "한국인 / 20대 / 여성 / 데일리로 편하게 신을수있는 비즈니스 컨셉으로 실내 스튜디오 화이트 배경으로해서 화보컷 만들어줘.", 
            image: "https://gi.esmplus.com/elcanto01/elcanto/ai/LCWD94I126.jpg", 
            subImage: "https://gi.esmplus.com/elcanto01/elcanto/ai/LCWD94I126_detail.jpg", 
        },
        {   id: 5, 
            title: "2026 선물관", 
            type:  "영상",
            team: "WEB팀",
            brand: "ELCANTO", 
            gender: "남화", 
            category: "로퍼/드레스", 
            season: "26 SUMMER", 
            background: "야외", 
            tool: "Gemini", 
            created: "2026-06-10", 
            link: "\\\\172.30.235.50\\온라인팀\\New-biz\\전략비즈\\3. 자사몰\\3. 기획전\\2026\\6월\\260602_선물관 리뉴얼\\영상",
            usage: "기획전",
            usedIn: "2026년 6월 선물관 카테고리 리뉴얼", 
            reaction: "", 
            prompt: "아무것도 없는 하늘에서 영상 시작. 아래에서 풍선 타고 부드럽게 상품이 뭉실뭉실 올라오는 듯하게 표현. 마지막엔 둥글둥실 떠있는 것으로 마무리해줘. 배경 음악은 필요 없어. 화질은 4K 이상, 크기는 16:9 유지해줘.", 
            image: "https://gi.esmplus.com/elcanto01/elcanto/ai/2026_06_gift1.jpg", 
            subImage: "https://gi.esmplus.com/elcanto01/elcanto/ai/2026_06_gift_detail.jpg", 
        },
        {   id: 6, 
            title: "WINTER BOOTS", 
            type:  "영상",
            team: "WEB팀",
            brand: "ELCANTO", 
            category: "기획전", 
            gender: "여화", 
            season: "25 WINTER", 
            background: "야외", 
            tool: "Grok", 
            created: "2025-12-17", 
            link: "\\\\172.30.235.50\\web팀\\AI생성_기획전\\251219_자사몰_WINTER BOOTS\\AI생성_영상",
            usage: "기획전",
            usedIn: "자사몰 WEB팀 WINTER BOOTS AI 기획전", 
            reaction: "", 
            prompt: "", 
            image: "https://gi.esmplus.com/elcanto01/elcanto/ai/winterboots_mv.jpg", 
        },
        {   id: 7, 
            title: "LCMD38U613", 
            type:  "이미지",
            team: "WEB팀",
            brand: "ELCANTO", 
            gender: "남화", 
            category: "로퍼/드레스", 
            season: "26 SPRING", 
           background: "스튜디오", 
            tool: "Google AI Studio", 
            created: "2026-03-24", 
            link: "\\\\172.30.235.50\\web팀\\웹디자인\\ai 생성 이미지\\LCMD38U613",
            usage: "기획전",
            usedIn: "2026 자사몰 리뉴얼 메인 시그니처 코너", 
            reaction: "", 
            prompt: "", 
            image: "https://gi.esmplus.com/elcanto01/elcanto/ai/signature.jpg", 
        },
        {   id: 8, 
            title: "LCWW91I326", 
            type:  "이미지",
            team: "WEB팀",
            brand: "INTENSE", 
            gender: "여화", 
            category: "샌들", 
            season: "23 SUMMER", 
           background: "스튜디오", 
            tool: "Gemini", 
            created: "2026-06-04", 
            link: "\\\\172.30.235.50\\web팀\\웹디자인\\ai 생성 이미지\\LCWW91I326",
            usage: "착화컷",
            usedIn: "자사몰 특가세일 착화 이미지", 
            reaction: "", 
            prompt: "", 
            image: "https://gi.esmplus.com/elcanto01/elcanto/ai/LCWW91I326.jpg", 
        },
        {   id: 9, 
            title: "LCWO38I613", 
            type:  "이미지",
            team: "WEB팀",
            brand: "INTENSE", 
            gender: "여화", 
            category: "샌들", 
            season: "23 SUMMER", 
           background: "스튜디오", 
            tool: "Gemini", 
            created: "2026-04-02", 
            link: "\\\\172.30.235.50\\web팀\\웹디자인\\ai 생성 이미지\\LCWO38I613",
            usage: "착화컷",
            usedIn: "외부몰 딜 착화 이미지", 
            reaction: "", 
            prompt: "", 
            image: "https://gi.esmplus.com/elcanto01/elcanto/ai/LCWO38I613.jpg", 
        },
        {   id: 10, 
            title: "LCWD53I613", 
            type:  "이미지",
            team: "WEB팀",
            brand: "INTENSE", 
            gender: "여화", 
            category: "샌들", 
            season: "26 SPRING", 
           background: "스튜디오", 
            tool: "Gemini", 
            created: "2026-04-06", 
            link: "\\\\172.30.235.50\\web팀\\웹디자인\\ai 생성 이미지\\LCWD53I613",
            usage: "착화컷",
            usedIn: "외부몰 딜 착화 이미지", 
            reaction: "", 
            prompt: "", 
            image: "https://gi.esmplus.com/elcanto01/elcanto/ai/LCWD53I613.jpg", 
        },
        {   id: 11, 
            title: "LCWC98M613", 
            type:  "이미지",
            team: "WEB팀",
            brand: "MAZZ", 
            gender: "여화", 
            category: "로퍼/드레스", 
            season: "26 SPRING", 
           background: "스튜디오", 
            tool: "Gemini", 
            created: "2026-03-11", 
            link: "\\\\172.30.235.50\\web팀\\웹디자인\\ai 생성 이미지\\LCWC98M613",
            usage: "착화컷",
            usedIn: "외부몰 딜 착화 이미지", 
            reaction: "", 
            prompt: "", 
            image: "https://gi.esmplus.com/elcanto01/elcanto/ai/LCWC98M613.jpg", 
        },
        {   id: 12, 
            title: "LCWC96M613", 
            type:  "이미지",
            team: "WEB팀",
            brand: "MAZZ", 
            gender: "여화", 
            category: "로퍼/드레스", 
            season: "26 SPRING", 
           background: "스튜디오", 
            tool: "Gemini", 
            created: "2026-02-27", 
            link: "\\\\172.30.235.50\\web팀\\웹디자인\\ai 생성 이미지\\LCWC96M613",
            usage: "착화컷",
            usedIn: "외부몰 딜 착화 이미지", 
            reaction: "", 
            prompt: "", 
            image: "https://gi.esmplus.com/elcanto01/elcanto/ai/LCWC96M613.jpg", 
        },
        {   id: 13, 
            title: "LCWC79M54V", 
            type:  "이미지",
            team: "WEB팀",
            brand: "MAZZ", 
            gender: "여화", 
            category: "슬리퍼/뮬", 
            season: "25 WINTER", 
            background: "야외", 
            tool: "Google AI Studio", 
            created: "2025-12-17", 
            link: "\\\\172.30.235.50\\web팀\\웹디자인\\ai 생성 이미지\\LCWC79M54V",
            usage: "기획전",
            usedIn: "자사몰 WEB팀 WINTER BOOTS AI 기획전", 
            reaction: "", 
            prompt: "", 
            image: "https://gi.esmplus.com/elcanto01/elcanto/ai/LCWC79M54V.jpg", 
        },
        {   id: 14, 
            title: "LCWC53M54V", 
            type:  "이미지",
            team: "WEB팀",
            brand: "MAZZ", 
            gender: "여화", 
            category: "부츠", 
            season: "25 WINTER", 
            background: "야외", 
            tool: "Google AI Studio", 
            created: "2025-12-17", 
            link: "\\\\172.30.235.50\\web팀\\웹디자인\\ai 생성 이미지\\LCWC53M54V",
            usage: "기획전",
            usedIn: "자사몰 WEB팀 WINTER BOOTS AI 기획전", 
            reaction: "", 
            prompt: "", 
            image: "https://gi.esmplus.com/elcanto01/elcanto/ai/LCWC53M54V.jpg", 
        },
        {   id: 15, 
            title: "LCWC03M339", 
            type:  "이미지",
            team: "WEB팀",
            brand: "MAZZ", 
            gender: "여화", 
            category: "로퍼/드레스", 
            season: "23 AUTUMN", 
           background: "스튜디오", 
            tool: "Gemini", 
            created: "2026-04-06", 
            link: "\\\\172.30.235.50\\web팀\\웹디자인\\ai 생성 이미지\\LCWC53M54V",
            usage: "착화컷",
            usedIn: "자사몰 WEB팀 WINTER BOOTS AI 기획전", 
            reaction: "", 
            prompt: "", 
            image: "https://gi.esmplus.com/elcanto01/elcanto/ai/LCWC03M339.jpg", 
        },
        {   id: 16, 
            title: "LCWA90I54V", 
            type:  "이미지",
            team: "WEB팀",
            brand: "INTENSE", 
            gender: "여화", 
            category: "부츠", 
            season: "25 AUTUMN", 
           background: "스튜디오", 
            tool: "Google AI Studio", 
            created: "2026-01-12", 
            link: "\\\\172.30.235.50\\web팀\\웹디자인\\ai 생성 이미지\\LCWA90I54V",
            usage: "착화컷",
            usedIn: "자사몰 특가세일 착화 이미지", 
            reaction: "", 
            prompt: "", 
            image: "https://gi.esmplus.com/elcanto01/elcanto/ai/LCWA90I54V.jpg", 
        },
        {   id: 17, 
            title: "LCWA76I14C", 
            type:  "이미지",
            team: "WEB팀",
            brand: "INTENSE", 
            gender: "여화", 
            category: "부츠", 
            season: "21 WINTER", 
           background: "스튜디오", 
            tool: "Google AI Studio", 
            created: "2025-12-17", 
            link: "\\\\172.30.235.50\\web팀\\웹디자인\\ai 생성 이미지\\LCWA76I14C",
            usage: "착화컷",
            usedIn: "자사몰 특가세일 착화 이미지", 
            reaction: "", 
            prompt: "", 
            image: "https://gi.esmplus.com/elcanto01/elcanto/ai/LCWA76I14C.jpg", 
        },
        {   id: 18, 
            title: "LCWA43M24V", 
            type:  "이미지",
            team: "WEB팀",
            brand: "MAZZ", 
            gender: "여화", 
            category: "부츠", 
            season: "22 WINTER", 
           background: "스튜디오", 
            tool: "Google AI Studio", 
            created: "2025-12-17", 
            link: "\\\\172.30.235.50\\web팀\\웹디자인\\ai 생성 이미지\\LCWA43M24V",
            usage: "착화컷",
            usedIn: "자사몰 특가세일 착화 이미지", 
            reaction: "", 
            prompt: "", 
            image: "https://gi.esmplus.com/elcanto01/elcanto/ai/LCWA43M24V.jpg", 
        },
        {   id: 19, 
            title: "LCWA38I14C", 
            type:  "이미지",
            team: "WEB팀",
            brand: "INTENSE", 
            gender: "여화", 
            category: "부츠", 
            season: "21 WINTER", 
           background: "스튜디오", 
            tool: "Google AI Studio", 
            created: "2025-12-17", 
            link: "\\\\172.30.235.50\\web팀\\웹디자인\\ai 생성 이미지\\LCWA38I14C",
            usage: "착화컷",
            usedIn: "자사몰 특가세일 착화 이미지", 
            reaction: "", 
            prompt: "", 
            image: "https://gi.esmplus.com/elcanto01/elcanto/ai/LCWA38I14C.jpg", 
        },
        {   id: 20, 
            title: "LCWA29M34V", 
            type:  "이미지",
            team: "WEB팀",
            brand: "MAZZ", 
            gender: "여화", 
            category: "부츠", 
            season: "23 AUTUMN", 
           background: "스튜디오", 
            tool: "Google AI Studio", 
            created: "2025-12-29", 
            link: "\\\\172.30.235.50\\web팀\\웹디자인\\ai 생성 이미지\\LCWA29M34V",
            usage: "착화컷",
            usedIn: "자사몰 특가세일 착화 이미지", 
            reaction: "", 
            prompt: "", 
            image: "https://gi.esmplus.com/elcanto01/elcanto/ai/LCWA29M34V.jpg", 
        },
        {   id: 21, 
            title: "LCWA19M54V", 
            type:  "이미지",
            team: "WEB팀",
            brand: "MAZZ", 
            gender: "여화", 
            category: "부츠", 
            season: "25 WINTER", 
            background: "야외", 
            tool: "Google AI Studio", 
            created: "2025-12-15", 
            link: "\\\\172.30.235.50\\web팀\\웹디자인\\ai 생성 이미지\\LCWA19M54V",
            usage: "기획전",
            usedIn: "자사몰 WEB팀 WINTER BOOTS AI 기획전", 
            reaction: "", 
            prompt: "", 
            image: "https://gi.esmplus.com/elcanto01/elcanto/ai/LCWA19M54V.jpg", 
            subImage: "https://gi.esmplus.com/elcanto01/elcanto/ai/LCWA19M54V_detail.jpg", 
        },
        {   id: 22, 
            title: "LCWA17M54V", 
            type:  "이미지",
            team: "WEB팀",
            brand: "MAZZ", 
            gender: "여화", 
            category: "부츠", 
            season: "25 WINTER", 
            background: "야외", 
            tool: "Google AI Studio", 
            created: "2025-12-10", 
            link: "\\\\172.30.235.50\\web팀\\웹디자인\\ai 생성 이미지\\LCWA17M54V",
            usage: "기획전",
            usedIn: "자사몰 WEB팀 WINTER BOOTS AI 기획전", 
            reaction: "", 
            prompt: "", 
            image: "https://gi.esmplus.com/elcanto01/elcanto/ai/LCWA17M54V.jpg", 
        },
        {   id: 23, 
            title: "LCWA16M54V", 
            type:  "이미지",
            team: "WEB팀",
            brand: "MAZZ", 
            gender: "여화", 
            category: "부츠", 
            season: "25 WINTER", 
            background: "야외", 
            tool: "Google AI Studio", 
            created: "2025-12-09", 
            link: "\\\\172.30.235.50\\web팀\\웹디자인\\ai 생성 이미지\\LCWA16M54V",
            usage: "기획전",
            usedIn: "자사몰 WEB팀 WINTER BOOTS AI 기획전", 
            reaction: "", 
            prompt: "", 
            image: "https://gi.esmplus.com/elcanto01/elcanto/ai/LCWA16M54V.jpg", 
        },
        {   id: 24, 
            title: "LCWA12M54V", 
            type:  "이미지",
            team: "WEB팀",
            brand: "MAZZ", 
            gender: "여화", 
            category: "부츠", 
            season: "25 WINTER", 
            background: "야외", 
            tool: "Google AI Studio", 
            created: "2025-12-15", 
            link: "\\\\172.30.235.50\\web팀\\웹디자인\\ai 생성 이미지\\LCWA12M54V",
            usage: "착화컷",
            usedIn: "착화컷 이미지", 
            reaction: "", 
            prompt: "", 
            image: "https://gi.esmplus.com/elcanto01/elcanto/ai/LCWA12M54V.jpg", 
        },
        {   id: 25, 
            title: "LCWA10M54V", 
            type:  "이미지",
            team: "WEB팀",
            brand: "MAZZ", 
            gender: "여화", 
            category: "부츠", 
            season: "25 WINTER", 
            background: "야외", 
            tool: "Google AI Studio", 
            created: "2025-12-12", 
            link: "\\\\172.30.235.50\\web팀\\웹디자인\\ai 생성 이미지\\LCWA12M54V",
            usage: "기획전",
            usedIn: "자사몰 WEB팀 WINTER BOOTS AI 기획전", 
            reaction: "", 
            prompt: "", 
            image: "https://gi.esmplus.com/elcanto01/elcanto/ai/LCWA10M54V.jpg", 
        },
        {   id: 26, 
            title: "LCWA10M54V", 
            type:  "이미지",
            team: "WEB팀",            
            brand: "MAZZ", 
            gender: "여화", 
            category: "부츠", 
            season: "25 WINTER", 
            background: "야외", 
            tool: "Google AI Studio", 
            created: "2025-12-11", 
            link: "\\\\172.30.235.50\\web팀\\웹디자인\\ai 생성 이미지\\LCWA12M54V",
            usage: "착화컷",
            usedIn: "미사용", 
            reaction: "", 
            prompt: "", 
            image: "https://gi.esmplus.com/elcanto01/elcanto/ai/LCWA10M54V_2.jpg", 
        },
        {   id: 27, 
            title: "LCWA09M54V", 
            type:  "이미지",
            team: "WEB팀",
            brand: "MAZZ", 
            gender: "여화", 
            category: "부츠", 
            season: "25 WINTER", 
            background: "야외", 
            tool: "Google AI Studio", 
            created: "2025-12-09", 
            link: "\\\\172.30.235.50\\web팀\\웹디자인\\ai 생성 이미지\\LCWA09M54V",
            usage: "기획전",
            usedIn: "자사몰 WEB팀 WINTER BOOTS AI 기획전", 
            reaction: "", 
            prompt: "", 
            image: "https://gi.esmplus.com/elcanto01/elcanto/ai/LCWA09M54V.jpg", 
        },
        {   id: 28, 
            title: "LCMD68I34V", 
            type:  "이미지",
            team: "WEB팀",
            brand: "INTENSE", 
            gender: "남화", 
            category: "부츠", 
            season: "23 WINTER", 
           background: "스튜디오", 
            tool: "Google AI Studio", 
            created: "2026-01-05", 
            link: "\\\\172.30.235.50\\web팀\\웹디자인\\ai 생성 이미지\\LCMD68I34V",
            usage: "착화컷",
            usedIn: "자사몰 특가세일 착화 이미지", 
            reaction: "얼굴 사용 불가", 
            prompt: "", 
            image: "https://gi.esmplus.com/elcanto01/elcanto/ai/LCMD68I34V.jpg", 
        },
        {   id: 29, 
            title: "LCMD29I613", 
            type:  "이미지",
            team: "WEB팀",
            brand: "INTENSE", 
            gender: "남화", 
            category: "부츠", 
            season: "26 SPRING", 
           background: "스튜디오", 
            tool: "Google AI Studio", 
            created: "2026-01-05", 
            link: "\\\\172.30.235.50\\web팀\\AI생성_기획전\\260105_무신사_단독상품\\★최종",
            usage: "기획전",
            usedIn: "무신사 단독상품 AI 요청(메인 배너, 룩북 등 활용)", 
            reaction: "웹팀+담당 MD+무신사 협업", 
            prompt: "", 
            image: "https://gi.esmplus.com/elcanto01/elcanto/ai/LCMD29I613.jpg", 
        },
        {   id: 30, 
            title: "DPMD81D339", 
            type:  "이미지",
            team: "WEB팀",
            brand: "DEEPP", 
            gender: "남화", 
            category: "부츠", 
            season: "23 AUTUMN", 
           background: "스튜디오", 
            tool: "Google AI Studio", 
            created: "2025-12-19", 
            link: "\\\\172.30.235.50\\web팀\\웹디자인\\ai 생성 이미지\\DPMD81D339",
            usage: "착화컷",
            usedIn: "자사몰 특가세일 착화 이미지", 
            reaction: "", 
            prompt: "", 
            image: "https://gi.esmplus.com/elcanto01/elcanto/ai/DPMD81D339.jpg", 
        },
        {   id: 31, 
            title: "LCWC98M613", 
            type:  "이미지",
            team: "WEB팀",
            brand: "MAZZ", 
            gender: "여화", 
            category: "로퍼/드레스", 
            season: "26 SPRING", 
           background: "스튜디오", 
            tool: "Gemini", 
            created: "2026-03-11", 
            link: "\\\\172.30.235.50\\web팀\\웹디자인\\ai 생성 이미지\\LCWC98M613",
            usage: "착화컷",
            usedIn: "외부몰 딜 착화 이미지", 
            reaction: "", 
            prompt: "", 
            image: "https://gi.esmplus.com/elcanto01/elcanto/ai/LCWC98M613_2.jpg", 
        },
        {   id: 32, 
            title: "LCWC71M54V", 
            type:  "이미지",
            team: "WEB팀",
            brand: "MAZZ", 
            gender: "여화", 
            category: "부츠", 
            season: "25 WINTER", 
           background: "스튜디오", 
            tool: "Google AI Studio", 
            created: "2025-11-10", 
            link: "\\\\172.30.235.50\\web팀\\웹디자인\\ai 생성 이미지\\LCWC71M54V",
            usage: "컨셉컷",
            usedIn: "자사몰 썸네일", 
            reaction: "", 
            prompt: "", 
            image: "https://gi.esmplus.com/elcanto01/elcanto/ai/LCWC71M54V_1.jpg", 
        },
        {   id: 33, 
            title: "LCWC71M54V", 
            type:  "이미지",
            team: "WEB팀",
            brand: "MAZZ", 
            gender: "여화", 
            category: "부츠", 
            season: "25 WINTER", 
           background: "스튜디오", 
            tool: "Google AI Studio", 
            created: "2025-11-12", 
            link: "\\\\172.30.235.50\\web팀\\웹디자인\\ai 생성 이미지\\LCWC71M54V",
            usage: "착화컷",
            usedIn: "자사몰 썸네일", 
            reaction: "", 
            prompt: "", 
            image: "https://gi.esmplus.com/elcanto01/elcanto/ai/LCWC71M54V_2.jpg", 
        },

        {   id: 34, 
            title: "LCWC66M54V", 
            type:  "이미지",
            team: "WEB팀",
            brand: "MAZZ", 
            gender: "여화", 
            category: "부츠", 
            season: "25 WINTER", 
           background: "스튜디오", 
            tool: "Google AI Studio", 
            created: "2025-11-12", 
            link: "\\\\172.30.235.50\\web팀\\웹디자인\\ai 생성 이미지\\LCWC66M54V",
            usage: "착화컷",
            usedIn: "자사몰 썸네일", 
            reaction: "", 
            prompt: "", 
            image: "https://gi.esmplus.com/elcanto01/elcanto/ai/LCWC66M54V_1.jpg", 
        },

        {   id: 35, 
            title: "LCWC66M54V", 
            type:  "이미지",
            team: "WEB팀",
            brand: "MAZZ", 
            gender: "여화", 
            category: "부츠", 
            season: "25 WINTER", 
           background: "스튜디오", 
            tool: "Google AI Studio", 
            created: "2025-11-12", 
            link: "\\\\172.30.235.50\\web팀\\웹디자인\\ai 생성 이미지\\LCWC66M54V",
            usage: "컨셉컷",
            usedIn: "자사몰 썸네일", 
            reaction: "", 
            prompt: "", 
            image: "https://gi.esmplus.com/elcanto01/elcanto/ai/LCWC66M54V_2.jpg", 
        },
        {   id: 36, 
            title: "LCWC53M54V", 
            type:  "이미지",
            team: "WEB팀",
            brand: "MAZZ", 
            gender: "여화", 
            category: "부츠", 
            season: "25 WINTER", 
            background: "야외", 
            tool: "Google AI Studio", 
            created: "2025-12-19", 
            link: "\\\\172.30.235.50\\web팀\\웹디자인\\ai 생성 이미지\\LCWC53M54V",
            usage: "기획전",
            usedIn: "자사몰 WEB팀 WINTER BOOTS AI 기획전", 
            reaction: "", 
            prompt: "", 
            image: "https://gi.esmplus.com/elcanto01/elcanto/ai/LCWC53M54V_1.jpg", 
        },
        {   id: 37, 
            title: "LCWA43M24V", 
            type:  "이미지",
            team: "WEB팀",
            brand: "MAZZ", 
            gender: "여화", 
            category: "부츠", 
            season: "22 WINTER", 
           background: "스튜디오", 
            tool: "Google AI Studio", 
            created: "2025-12-17", 
            link: "\\\\172.30.235.50\\web팀\\웹디자인\\ai 생성 이미지\\LCWA43M24V",
            usage: "착화컷",
            usedIn: "자사몰 특가세일 착화 이미지", 
            reaction: "", 
            prompt: "", 
            image: "https://gi.esmplus.com/elcanto01/elcanto/ai/LCWA43M24V_2.jpg", 
        },
        {   id: 38, 
            title: "LCWA17M54V", 
            type:  "이미지",
            team: "WEB팀",
            brand: "MAZZ", 
            gender: "여화", 
            category: "부츠", 
            season: "25 WINTER", 
            background: "야외", 
            tool: "Google AI Studio", 
            created: "2025-12-10", 
            link: "\\\\172.30.235.50\\web팀\\웹디자인\\ai 생성 이미지\\LCWA17M54V",
            usage: "기획전",
            usedIn: "자사몰 WEB팀 WINTER BOOTS AI 기획전", 
            reaction: "", 
            prompt: "", 
            image: "https://gi.esmplus.com/elcanto01/elcanto/ai/LCWA17M54V_2.jpg", 
        },
        {   id: 39, 
            title: "LCWA17M54V", 
            type:  "이미지",
            team: "WEB팀",
            brand: "MAZZ", 
            gender: "여화", 
            category: "부츠", 
            season: "25 WINTER", 
            background: "야외", 
            tool: "Google AI Studio", 
            created: "2025-12-10", 
            link: "\\\\172.30.235.50\\web팀\\웹디자인\\ai 생성 이미지\\LCWA17M54V",
            usage: "기획전",
            usedIn: "자사몰 WEB팀 WINTER BOOTS AI 기획전", 
            reaction: "", 
            prompt: "", 
            image: "https://gi.esmplus.com/elcanto01/elcanto/ai/LCWA17M54V_3.jpg", 
        },
        {   id: 40, 
            title: "LCWA10M54V", 
            type:  "이미지",
            team: "WEB팀",
            brand: "MAZZ", 
            gender: "여화", 
            category: "부츠", 
            season: "25 WINTER", 
           background: "스튜디오", 
            tool: "Google AI Studio", 
            created: "2025-11-14", 
            link: "\\\\172.30.235.50\\web팀\\웹디자인\\ai 생성 이미지\\LCWA12M54V",
            usage: "기획전",
            usedIn: "자사몰 WEB팀 WINTER BOOTS AI 기획전", 
            reaction: "", 
            prompt: "", 
            image: "https://gi.esmplus.com/elcanto01/elcanto/ai/LCWA10M54V_4.jpg", 
        },
        {   id: 41, 
            title: "LCWA09M54V", 
            type:  "이미지",
            team: "WEB팀",
            brand: "MAZZ", 
            gender: "여화", 
            category: "부츠", 
            season: "25 WINTER", 
            background: "야외", 
            tool: "Google AI Studio", 
            created: "2025-12-15", 
            link: "\\\\172.30.235.50\\web팀\\웹디자인\\ai 생성 이미지\\LCWA09M54V",
            usage: "기획전",
            usedIn: "자사몰 WEB팀 WINTER BOOTS AI 기획전", 
            reaction: "", 
            prompt: "", 
            image: "https://gi.esmplus.com/elcanto01/elcanto/ai/LCWA09M54V_2.jpg", 
        },
        {   id: 42, 
            title: "LCMS35M413", 
            type:  "이미지",
            team: "WEB팀",
            brand: "MAZZ", 
            gender: "남화", 
            category: "스니커즈", 
            season: "24 SPRING", 
           background: "스튜디오", 
            tool: "Gemini", 
            created: "2026-06-04", 
            link: "\\\\172.30.235.50\\web팀\\웹디자인\\ai 생성 이미지\\LCMS35M413",
            usage: "착화컷",
            usedIn: "자사몰 특가세일 착화 이미지", 
            reaction: "", 
            prompt: "", 
            image: "https://gi.esmplus.com/elcanto01/elcanto/ai/LCMS35M413_2.jpg", 
        },
        {   id: 43, 
            title: "LCMD29I613", 
            type:  "이미지",
            team: "WEB팀",
            brand: "INTENSE", 
            gender: "남화", 
            category: "부츠", 
            season: "26 SPRING", 
           background: "스튜디오", 
            tool: "Google AI Studio", 
            created: "2026-01-15", 
            link: "\\\\172.30.235.50\\web팀\\AI생성_기획전\\260105_무신사_단독상품\\★최종",
            usage: "기획전",
            usedIn: "무신사 단독상품 AI 요청(메인 배너, 룩북 등 활용)", 
            reaction: "웹팀+담당 MD+무신사 협업", 
            prompt: "", 
            image: "https://gi.esmplus.com/elcanto01/elcanto/ai/LCMD29I613_2.jpg", 
        },
        {   id: 44, 
            title: "LCMD29I613", 
            type:  "이미지",
            team: "WEB팀",
            brand: "INTENSE", 
            gender: "남화", 
            category: "부츠", 
            season: "26 SPRING", 
           background: "스튜디오", 
            tool: "Google AI Studio", 
            created: "2026-01-15", 
            link: "\\\\172.30.235.50\\web팀\\AI생성_기획전\\260105_무신사_단독상품\\★최종",
            usage: "기획전",
            usedIn: "무신사 단독상품 AI 요청(메인 배너, 룩북 등 활용)", 
            reaction: "웹팀+담당 MD+무신사 협업", 
            prompt: "", 
            image: "https://gi.esmplus.com/elcanto01/elcanto/ai/LCMD29I613_3.jpg", 
        },
        {   id: 45, 
            title: "LCMD29I613", 
            type:  "이미지",
            team: "WEB팀",
            brand: "INTENSE", 
            gender: "남화", 
            category: "부츠", 
            season: "26 SPRING", 
           background: "스튜디오", 
            tool: "Google AI Studio", 
            created: "2026-01-15", 
            link: "\\\\172.30.235.50\\web팀\\AI생성_기획전\\260105_무신사_단독상품\\★최종",
            usage: "기획전",
            usedIn: "무신사 단독상품 AI 요청(메인 배너, 룩북 등 활용)", 
            reaction: "웹팀+담당 MD+무신사 협업", 
            prompt: "", 
            image: "https://gi.esmplus.com/elcanto01/elcanto/ai/LCMD29I613_4.jpg", 
        },
        {   id: 46, 
            title: "LCMD29I613", 
            type:  "이미지",
            team: "WEB팀",
            brand: "INTENSE", 
            gender: "남화", 
            category: "부츠", 
            season: "26 SPRING", 
           background: "스튜디오", 
            tool: "Google AI Studio", 
            created: "2026-01-15", 
            link: "\\\\172.30.235.50\\web팀\\AI생성_기획전\\260105_무신사_단독상품\\★최종",
            usage: "기획전",
            usedIn: "무신사 단독상품 AI 요청(메인 배너, 룩북 등 활용)", 
            reaction: "웹팀+담당 MD+무신사 협업", 
            prompt: "", 
            image: "https://gi.esmplus.com/elcanto01/elcanto/ai/LCMD29I613_5.jpg", 
        },
        {   id: 47, 
            title: "LCMD29I613", 
            type:  "이미지",
            team: "WEB팀",
            brand: "INTENSE", 
            gender: "남화", 
            category: "부츠", 
            season: "26 SPRING", 
           background: "스튜디오", 
            tool: "Google AI Studio", 
            created: "2026-01-15", 
            link: "\\\\172.30.235.50\\web팀\\AI생성_기획전\\260105_무신사_단독상품\\★최종",
            usage: "기획전",
            usedIn: "무신사 단독상품 AI 요청(메인 배너, 룩북 등 활용)", 
            reaction: "웹팀+담당 MD+무신사 협업", 
            prompt: "", 
            image: "https://gi.esmplus.com/elcanto01/elcanto/ai/LCMD29I613_6.jpg", 
        },
        {   id: 48, 
            title: "LCMD29I613", 
            type:  "이미지",
            team: "WEB팀",
            brand: "INTENSE", 
            gender: "남화", 
            category: "부츠", 
            season: "26 SPRING", 
           background: "스튜디오", 
            tool: "Google AI Studio", 
            created: "2026-01-15", 
            link: "\\\\172.30.235.50\\web팀\\AI생성_기획전\\260105_무신사_단독상품\\★최종",
            usage: "기획전",
            usedIn: "무신사 단독상품 AI 요청(메인 배너, 룩북 등 활용)", 
            reaction: "웹팀+담당 MD+무신사 협업", 
            prompt: "", 
            image: "https://gi.esmplus.com/elcanto01/elcanto/ai/LCMD29I613_7.jpg", 
        },
        {   id: 49, 
            title: "LCMD29I613", 
            type:  "이미지",
            team: "WEB팀", 
            brand: "INTENSE", 
            gender: "남화", 
            category: "부츠", 
            season: "26 SPRING", 
           background: "스튜디오", 
            tool: "Google AI Studio", 
            created: "2026-01-15", 
            link: "\\\\172.30.235.50\\web팀\\AI생성_기획전\\260105_무신사_단독상품\\★최종",
            usage: "기획전",
            usedIn: "무신사 단독상품 AI 요청(메인 배너, 룩북 등 활용)", 
            reaction: "웹팀+담당 MD+무신사 협업", 
            prompt: "", 
            image: "https://gi.esmplus.com/elcanto01/elcanto/ai/LCMD29I613_9.jpg", 
        },
        {   id: 50, 
            title: "2026 상반기 결산", 
            type:  "영상",
            team: "WEB팀", 
            brand: "ELCANTO", 
            gender: "기타", 
            category: "", 
            season: "26 SUMMER", 
             background: "야외", 
            tool: "Gemini", 
            created: "2026-06-17", 
            link: "\\\\172.30.235.50\\온라인팀\\New-biz\\전략비즈\\3. 자사몰\\3. 기획전\\2026\\6월\\260622_상반기결산",
            usage: "기획전",
            usedIn: "2026 자사몰 상반기 결산", 
            reaction: "", 
            prompt: `
1. 레퍼런스
2. 시원한 여름바다와 푸른 하늘에서 시작. 투명한 트로피 이미지가 투영된 야외에서 자연스럽게 떠있는 모습 연출.
3. 바다는 없애고 푸른 하늘 배경에서 트로피의 그림과 문구는 삭제하고 양쪽에 손잡이가 있는 반짝반짝 빛나는 트로피로 변형.
4. 좀 더 맑은 구름의 시원한 느낌의 배경으로 하늘에서 트로피가 빛을 받으며 움직이는 모습을 영상으로 만들어줘.
5. 선물상자 추가이미지 생성 후 → 이 이미지 그대로 트로피와 선물상자가 하늘에 가볍게 떠있는 모습과 배경이 자연스럽게 어우러지게 영상으로 만들어줘.
6. 첫 화면에서부터 투명 트로피가 메인이 되도록 연출.
7. <최종 활용> 사물이 클로즈업 되지 않고 멀어지면서 이동하게 영상을 10초짜리로 제작 후 하단부에 구름들만 지워주고 청량하게 멀리 퍼지는 하늘만 보여줘.`,
            image: "https://gi.esmplus.com/elcanto01/elcanto/ai/first_halt_awards.jpg", 
            subImages: [
                "https://gi.esmplus.com/elcanto01/elcanto/ai/first_halt_awards_prom1.jpg",
                "https://gi.esmplus.com/elcanto01/elcanto/ai/first_halt_awards_prom2.jpg",
                "https://gi.esmplus.com/elcanto01/elcanto/ai/first_halt_awards_prom3.jpg",
                "https://gi.esmplus.com/elcanto01/elcanto/ai/first_halt_awards_prom4.jpg",
                "https://gi.esmplus.com/elcanto01/elcanto/ai/first_halt_awards_prom5.jpg",
                "https://gi.esmplus.com/elcanto01/elcanto/ai/first_halt_awards_prom6.jpg",
                "https://gi.esmplus.com/elcanto01/elcanto/ai/first_halt_awards_prom7.jpg"
            ]
        },
    ];


const seasonOrder = { 'SPRING': 1, 'SUMMER': 2, 'AUTUMN': 3, 'WINTER': 4 };

window.allData.sort((a, b) => {
    const [yearA, termA] = a.season ? a.season.split(' ') : [0, ''];
    const [yearB, termB] = b.season ? b.season.split(' ') : [0, ''];

    // 1순위: 년도
    if (parseInt(yearA) !== parseInt(yearB)) {
        return parseInt(yearA) - parseInt(yearB);
    }
    // 2순위: 계절
    if (termA !== termB) {
        return (seasonOrder[termA] || 0) - (seasonOrder[termB] || 0);
    }
    // 3순위: 생성일
    const createdA = new Date(a.created || '1900-01-01');
    const createdB = new Date(b.created || '1900-01-01');

    if (createdA.getTime() !== createdB.getTime()) {
        return createdA - createdB; 
    }
    // 4순위: 제목
    return (a.title || '').localeCompare(b.title || '');
});


    window.allData.forEach((item, index) => {
        item.id = index + 1;
    });

    renderCards(allData);
    document.querySelectorAll('.filter-area select').forEach(select => {
        select.addEventListener('change', applyFilters);
    });
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                applyFilters();
            }
        });
    }
});


function renderCards(data){
    const gallery = document.getElementById('gallery');
    const resultCount = document.getElementById('resultCount');
    
    gallery.innerHTML = '';
    resultCount.innerText = `총 ${data.length.toLocaleString()}건의 결과`;

    if (data.length === 0) {
        gallery.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 80px 0; color: #999; font-size: 14px;">검색 결과가 없습니다.</div>`;
        return;
    }

    data.forEach(item=>{
        gallery.innerHTML += `
        <div class="card" id="card-${item.id}" onclick="updateDetailPanel(${item.id})">
            <img src="${item.image}">
            <div class="card-body">
                <div class="card-title">${item.title}</div>
                <div class="card-product">${item.brand} · ${item.gender} · ${item.category}<br>${item.season} · ${item.tool}</div>
                <div class="card-tags">
                    <span>#${item.background}</span>
                    <span>#${item.tool}</span>
                </div>
            </div>
        </div>
        `;
    });
}


function applyFilters(){
    const keyword = document.getElementById('searchInput').value.toLowerCase();
    const type = document.getElementById('type').value;
    const usage = document.getElementById('usage').value;
    const team = document.getElementById('team').value;
    const brand = document.getElementById('brand').value;
    const gender = document.getElementById('gender').value;
    const category = document.getElementById('category').value;
    const season = document.getElementById('season').value;
    const background = document.getElementById('background').value;
    const tool = document.getElementById('tool') ? document.getElementById('tool').value : '';

    /*검색 필터*/
    const result = allData.filter(item=>{
        const keywordMatch = 
            (item.title && item.title.toLowerCase().includes(keyword))
            || (item.brand && item.brand.toLowerCase().includes(keyword))
            || (item.category && item.category.toLowerCase().includes(keyword))
            || (item.usedIn && item.usedIn.toLowerCase().includes(keyword))
            || (item.prompt && item.prompt.toLowerCase().includes(keyword))
            || (item.usage && item.usage.toLowerCase().includes(keyword))
            || (item.tool && item.tool.toLowerCase().includes(keyword));;

        return keywordMatch
            && (!type || item.type === type)
            && (!usage || item.usage === usage)
            && (!team || item.team === team)
            && (!brand || item.brand === brand)
            && (!gender || item.gender === gender)
            && (!category || item.category === category)
            && (!season || item.season === season)
            && (!background || item.background === background)
            && (!tool || item.tool === tool);
    });

    renderCards(result);
    document.getElementById('gallery').style.display = 'grid';
    document.getElementById('resultCount').style.display = 'block';
    showEmptyPanel(); 
}
function resetFilters(){
    document.getElementById('searchInput').value = '';
    document.querySelectorAll('.filter-area select').forEach(select => select.value = '');
    renderCards(allData); 
    
    document.getElementById('gallery').style.display = 'none';
    document.getElementById('resultCount').style.display = 'none';
    document.getElementById('detailPanel').innerHTML = `<div class="empty-panel"></div>`;
}

function updateDetailPanel(id){
    const item = window.allData.find(v => v.id === id);
    if(!item) return;

    document.querySelectorAll('.card').forEach(c => c.classList.remove('selected'));
    const targetCard = document.getElementById(`card-${id}`);
    if(targetCard) targetCard.classList.add('selected');

    const detailPanel = document.getElementById('detailPanel');
    
    detailPanel.innerHTML = `
        <div class="panel-content">
            <div class="panel-left">
                <div class="image-wrap">
                    <img src="${item.image}" class="main-image">

                    ${(() => {
                        let imgList = [];
                        if (item.subImages && Array.isArray(item.subImages)) {
                            imgList = item.subImages;
                        } else if (item.subImage) {
                            imgList = [item.subImage];
                        }

                        if (imgList.length === 0) return '';

                        return `
                        <div class="sub-image-container" id="subImageContainer">
                            <div class="sub-image-wrapper" id="subSliderWrapper" style="width: ${imgList.length * 100}%;">
                                ${imgList.map(src => `
                                    <div class="sub-slide-item" style="width: ${100 / imgList.length}%;">
                                        <img src="${src}" alt="sub-image" draggable="false">
                                    </div>
                                `).join('')}
                            </div>

                            ${imgList.length > 1 ? `
                            <div class="sub-slider-bullets" id="subSliderBullets">
                                ${imgList.map((_, idx) => `
                                    <span class="sub-bullet ${idx === 0 ? 'active' : ''}" onclick="moveSubSlide(${idx})"></span>
                                `).join('')}
                            </div>
                            ` : ''}
                        </div>
                        `;
                    })()}
                </div>
            </div>
            <div class="panel-right">
                <h2>${item.title}</h2>
                <div class="info-table">
                    <div class="info-row"><strong>브랜드</strong><span>${item.brand || '-'}</span></div>
                    <div class="info-row"><strong>성별</strong><span>${item.gender || '-'}</span></div>
                    <div class="info-row"><strong>카테고리</strong><span>${item.category || '-'}</span></div>
                    <div class="info-row"><strong>시즌</strong><span>${item.season || '-'}</span></div>
                    <div class="info-row"><strong>유형</strong><span>${item.usage || '-'}</span></div>   
                    <div class="info-row"><strong>타입</strong><span>${item.type || '-'}</span></div>
                    <div class="info-row"><strong>생성툴</strong><span>${item.tool || '-'}</span></div>
                    <div class="info-row"><strong>배경</strong><span>${item.background || '-'}</span></div>
                    <div class="info-row"><strong>생성부서</strong><span>${item.team || '-'}</span></div>
                    <div class="info-row"><strong>생성일</strong><span>${item.created || '-'}</span></div>
                    <div class="info-row"><strong>이미지 경로</strong><span>${item.link || '-'}</span></div>              
                    <div class="info-row performance"><strong>활용 내용</strong><span>${item.usedIn || '-'}</span></div>
                    <div class="info-row performance"><strong>참고사항</strong><span>${item.reaction || '-'}</span></div>
                </div>
                
                <div class="prompt-box">
                    <h3>Prompt</h3>
                    <textarea readonly id="promptText">${item.prompt || ''}</textarea>
                    <button class="copy-btn" onclick="copyPrompt()">프롬프트 복사</button>
                </div>
            </div>
        </div>
    `;

    initSubSlider();
}

window.currentSubIndex = 0;


function moveSubSlide(index) {
    const wrapper = document.getElementById('subSliderWrapper');
    const bullets = document.querySelectorAll('#subSliderBullets .sub-bullet');
    if (!wrapper) return;

    window.currentSubIndex = index;
    const totalSlides = bullets.length || 1;
    const moveX = index * (100 / totalSlides);

    wrapper.style.transition = "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)";
    wrapper.style.transform = `translateX(-${moveX}%)`;

    bullets.forEach((bullet, idx) => {
        if (idx === index) bullet.classList.add('active');
        else bullet.classList.remove('active');
    });
}

function initSubSlider() {
    const container = document.getElementById('subImageContainer');
    const wrapper = document.getElementById('subSliderWrapper');
    const bullets = document.querySelectorAll('#subSliderBullets .sub-bullet');
    if (!container || !wrapper || bullets.length <= 1) return;

    let isDragging = false;
    let startX = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;

    container.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        wrapper.style.transition = 'none'; 

        const totalSlides = bullets.length;
        prevTranslate = -window.currentSubIndex * (container.offsetWidth);
    });

    container.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const currentX = e.clientX;
        const dragDistance = currentX - startX;
        currentTranslate = prevTranslate + dragDistance;
        wrapper.style.transform = `translateX(${currentTranslate}px)`;
    });

    const handleMouseUp = (e) => {
        if (!isDragging) return;
        isDragging = false;
        
        const movedBy = e.clientX - startX;
        const triggerDistance = container.offsetWidth * 0.2; 

        if (movedBy < -triggerDistance && window.currentSubIndex < bullets.length - 1) {
            window.currentSubIndex += 1; 
        } else if (movedBy > triggerDistance && window.currentSubIndex > 0) {
            window.currentSubIndex -= 1; 
        }

        moveSubSlide(window.currentSubIndex);
    };

    container.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('mouseleave', handleMouseUp);
}



function showEmptyPanel() {
    document.getElementById('detailPanel').innerHTML = `
        <div class="empty-panel">왼쪽 리스트에서 카드를 클릭하면 상세 정보가 나타납니다.</div>
    `;
}

function copyPrompt(){
    const text = document.getElementById('promptText').value;
    navigator.clipboard.writeText(text);
    alert('프롬프트가 클립보드에 복사되었습니다.');
}

setTimeout(() => {
    const slider = document.querySelector('.sub-slides');
    const dots = document.querySelectorAll('.sub-dots .dot');

    if(!slider) return;

    slider.addEventListener('scroll', () => {
        const index = Math.round(slider.scrollLeft / slider.clientWidth);

        dots.forEach(dot => dot.classList.remove('active'));

        if(dots[index]){
            dots[index].classList.add('active');
        }
    });
},0);



    const mainWrapper = document.getElementById('mainWrapper');
    let isDown = false;
    let startX;
    let scrollLeft;

    mainWrapper.addEventListener('pointerdown', (e) => {
        if(e.target.closest('input') || e.target.closest('select') || e.target.closest('.sub-image-container') || e.target.closest('textarea')) return;
        
        isDown = true;
        mainWrapper.setPointerCapture(e.pointerId);
        startX = e.clientX;
        scrollLeft = mainWrapper.scrollLeft;
    });

    mainWrapper.addEventListener('pointerup', () => {
        isDown = false;
    });

    mainWrapper.addEventListener('pointercancel', () => {
        isDown = false;
    });

    mainWrapper.addEventListener('pointermove', (e) => {
        if (!isDown) return;
        const x = e.clientX;
        const walk = (x - startX) * 1.5; 
        mainWrapper.scrollLeft = scrollLeft - walk;
    });
