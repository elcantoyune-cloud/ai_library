// 로그인 상태가 될 때까지 대기 (로그인 화면 표시/숨김 처리 포함)
function waitForAuth() {
    return new Promise((resolve) => {
        window.auth.onAuthStateChanged((user) => {
            const loadingScreen = document.getElementById('loadingScreen');
            const loginScreen = document.getElementById('loginScreen');
            const mainWrapper = document.getElementById('mainWrapper');
            loadingScreen.style.display = 'none';
            if (user) {
                loginScreen.style.display = 'none';
                mainWrapper.style.display = 'flex';
                window.currentUser = user;
                resolve(user);
            } else {
                loginScreen.style.display = 'flex';
                mainWrapper.style.display = 'none';
                window.currentUser = null;
            }
        });
    });
}

async function loginUser(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    const errorEl = document.getElementById('loginError');
    const btn = document.getElementById('loginSubmitBtn');

    errorEl.innerText = '';
    btn.disabled = true;
    btn.innerText = '로그인 중...';

    try {
        await window.auth.signInWithEmailAndPassword(email, password);
        // 성공 시 onAuthStateChanged가 감지해서 자동으로 화면 전환됨
    } catch (err) {
        errorEl.innerText = '이메일 또는 비밀번호가 올바르지 않습니다.';
        btn.disabled = false;
        btn.innerText = '로그인';
    }
}

function logoutUser() {
    window.auth.signOut().then(() => location.reload());
}

document.addEventListener("DOMContentLoaded", async () => {
    await waitForAuth();

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
            gender: "기타", 
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
            gender: "기타", 
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
            category: "기획전", 
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
        {   id: 51, 
            title: "LCWW03I626", 
            type:  "이미지",
            team: "WEB팀", 
            brand: "INTENSE", 
            gender: "여화", 
            category: "샌들", 
            season: "26 SUMMER", 
           background: "야외", 
            tool: "Gemini", 
            created: "2026-06-22", 
            link: "\\\\172.30.235.50\\web팀\\웹디자인\\ai 생성 이미지\\LCWW03I626",
            usage: "착화컷",
            usedIn: "자사몰 72H 타임세일 착화이미지", 
            reaction: "얼굴 사용 가능, 디테일 정확도 주의(굽높이 등)", 
            prompt: "1번 이미지에서 스튜디오와 분위기, 2번 이미지 속 인물의 옷 스타일링과 의자를 사용해주고, 3,4번 모델 얼굴로 바꿔줘, 5~8번 신발 누끼컷 참고해서 신발 교체해줘. 포즈는 1번 포즈 그대로 사용해줘. 9번처럼 살짝 빛이 드는 느낌으로 마무리해줘.", 
            image: "https://gi.esmplus.com/elcanto01/elcanto/ai/LCWW03I626.jpg", 
            subImage:"https://gi.esmplus.com/elcanto01/elcanto/ai/LCWW03I626_detail.jpg",
        },
        {   id: 52, 
            title: "LCWW00M426", 
            type:  "이미지",
            team: "WEB팀", 
            brand: "MAZZ", 
            gender: "여화", 
            category: "샌들", 
            season: "24 SUMMER", 
           background: "스튜디오", 
            tool: "Gemini", 
            created: "2026-06-23", 
            link: "\\\\172.30.235.50\\web팀\\웹디자인\\ai 생성 이미지\\LCWW00M426",
            usage: "착화컷",
            usedIn: "자사몰 특가세일 착화 이미지", 
            reaction: "참고이미지와 같은 포즈, 발 확대 위주로 사용", 
            prompt: "1번 이미지 속 옷을 네이비 원피스로 바꿔주고, 신발은 2~4번 누끼 이미지 참고해서 변경해줘. 스튜디오는 좀 더 밝은 배경으로 변경해줘.", 
            image: "https://gi.esmplus.com/elcanto01/elcanto/ai/LCWW00M426.jpg", 
            subImage:"https://gi.esmplus.com/elcanto01/elcanto/ai/LCWW00M426_prom.jpg",
        },
        {   id: 53, 
            title: "LCWW80M326", 
            type:  "이미지",
            team: "WEB팀", 
            brand: "MAZZ", 
            gender: "여화", 
            category: "샌들", 
            season: "23 SUMMER", 
           background: "스튜디오", 
            tool: "Gemini", 
            created: "2026-06-23", 
            link: "\\\\172.30.235.50\\web팀\\웹디자인\\ai 생성 이미지\\LCWW80M326",
            usage: "착화컷",
            usedIn: "자사몰 특가세일 착화 이미지", 
            reaction: "", 
            prompt: "1번 이미지 신발을 2~5번 신발 누끼컷 참고해서 변경해줘. 포즈와 옷이 원본과 겹치지 않도록 고급스럽고 우아한 옷으로 변경해줘. 사진 사이즈는 1:1 유지해주고, 의자에 앉아있듯이 표현해줘.", 
            image: "https://gi.esmplus.com/elcanto01/elcanto/ai/LCWW80M326.jpg", 
            subImage:"https://gi.esmplus.com/elcanto01/elcanto/ai/LCWW80M326_prom.jpg",
        },
        {   id: 54, 
            title: "시그니처 장인", 
            type:  "영상",
            team: "WEB팀", 
            brand: "ELCANTO", 
            gender: "기타", 
            category: "기획전", 
            season: "26 SPRING", 
            background: "스튜디오", 
            tool: "Google AI Studio", 
            created: "2026-04-06", 
            link: "\\\\172.30.235.50\\온라인팀\\New-biz\\전략비즈\\3. 자사몰\\3. 기획전\\2026\\3월\\260331_시그니처 기획전\\영상",
            usage: "기획전",
            usedIn: "자사몰 시그니처 카테고리 페이지 영상", 
            reaction: "", 
            prompt: "", 
            image: "https://gi.esmplus.com/elcanto01/elcanto/ai/signature_mv.jpg", 
        },
        {   id: 55, 
            title: "LCMD43M313", 
            type:  "이미지",
            team: "WEB팀", 
            brand: "MAZZ", 
            gender: "남화", 
            category: "로퍼/드레스", 
            season: "23 SPRING", 
            background: "스튜디오", 
            tool: "Gemini", 
            created: "2026-06-24", 
            link: "\\\\172.30.235.50\\web팀\\웹디자인\\ai 생성 이미지\\LCMD43M313",
            usage: "착화컷",
            usedIn: "자사몰 특가세일 착화 이미지", 
            reaction: "", 
            prompt: "1번 이미지 속 바지를 정장 바지(블랙 컬러)로 변경해주고, 양말은 블랙으로. 2~4번 누끼컷 참고해서 신발 변경해줘. 사이즈는 1:1 , 4K 화질 이상으로 제작해줘.", 
            image: "https://gi.esmplus.com/elcanto01/elcanto/ai/LCMD43M313.jpg", 
            subImage:"https://gi.esmplus.com/elcanto01/elcanto/ai/LCMD43M313_prom.jpg",
        },
        {   id: 56, 
            title: "LCWD03I226", 
            type:  "이미지",
            team: "WEB팀", 
            brand: "INTENSE", 
            gender: "여화", 
            category: "플랫", 
            season: "22 AUTUMN", 
            background: "스튜디오", 
            tool: "Gemini", 
            created: "2026-07-01", 
            link: "\\\\172.30.235.50\\web팀\\웹디자인\\ai 생성 이미지\\LCWD03I226",
            usage: "컨셉컷",
            usedIn: "자사몰 특가세일 이미지", 
            reaction: "", 
            prompt: "1~4번 신발을 2번처럼 제품 컨셉 화보 만들고 싶어. 5번이 화보컷인데 배경 이미지 따서 그 위에 자연스럽게 연출해줘.", 
            image: "https://gi.esmplus.com/elcanto01/elcanto/ai/LCWD03I226.jpg", 
            subImage:"https://gi.esmplus.com/elcanto01/elcanto/ai/LCWD03I226_prom.jpg",
        },
        {   id: 57, 
            title: "LCWW26M326", 
            type:  "이미지",
            team: "WEB팀", 
            brand: "MAZZ", 
            gender: "여화", 
            category: "슬리퍼/뮬", 
            season: "23 SUMMER", 
            background: "스튜디오", 
            tool: "Gemini", 
            created: "2026-07-01", 
            link: "\\\\172.30.235.50\\web팀\\웹디자인\\ai 생성 이미지\\LCWW26M326",
            usage: "컨셉컷",
            usedIn: "자사몰 특가세일 이미지", 
            reaction: "", 
            prompt: `
Create ONE SINGLE IMAGE.

The final image must contain TWO PAIRS OF SHOES TOGETHER IN THE SAME FRAME.

One pair is brown leather.
One pair is cream leather.
Do NOT generate separate images.
Do NOT isolate each colorway.
Do NOT create product variations.

Both pairs must be arranged together as a coordinated hero composition, styled like a luxury fashion campaign.
The brown and cream shoes should be positioned naturally next to each other with slight overlap and depth, creating a premium group product shot.
Use the exact camera angle, composition and product perspective from Reference Image 1.
Use the lighting and mood from Reference Image 1.

Create a completely different background inspired by Reference Image 2:
- warm beige sand
- minimal luxury desert aesthetic
- textured sand
- clean editorial styling

The shoes are the main focus.
Photorealistic.
Ultra realistic luxury footwear campaign.
85mm lens.
Soft depth of field.
Natural shadows.
Magazine-quality commercial photography.
8K.

Negative prompts:
multiple images, split composition, collage, separate products, product grid, isolated product, duplicate shoes, extra shoes, people, feet, text, logo, watermark. 
`,
            image: "https://gi.esmplus.com/elcanto01/elcanto/ai/LCWW26M326.jpg", 
            subImage:"https://gi.esmplus.com/elcanto01/elcanto/ai/LCWW26M326_prom.jpg",
        },


        {   id: 58, 
            title: "LCMW13I326", 
            type:  "이미지",
            team: "WEB팀", 
            brand: "INTENSE", 
            gender: "남화", 
            category: "슬리퍼/뮬", 
            season: "23 SUMMER", 
            background: "스튜디오", 
            tool: "Gemini", 
            created: "2026-07-08", 
            link: "\\\\172.30.235.50\\web팀\\웹디자인\\ai 생성 이미지\\LCMW13I326",
            usage: "착화컷",
            usedIn: "자사몰 특가세일 이미지", 
            reaction: "", 
            prompt: `
1. 1번 배경 속 남자 스타일을 2번 옷으로 변경해주고, 신발은 3,4,5번 누끼첫 참고해서 바꿔 신겨줘. 남성의 얼굴은 6번 이미지 참고해줘. 사진 비율은 1:1, 8K 이상의 고화질로 만들어줘.
2. 신발이 자세히 안보여서 앉아있는 포즈로 바꿔주고, 바닥이 더러우니 깔끔하게 변경해줘. 얼굴 필요없고 다리 꼬고 앉아서 신발 강조되게.
`,
            image: "https://gi.esmplus.com/elcanto01/elcanto/ai/LCMW13I326.jpg", 
            subImages: [
                "https://gi.esmplus.com/elcanto01/elcanto/ai/LCMW13I326_prom1.jpg",
                "https://gi.esmplus.com/elcanto01/elcanto/ai/LCMW13I326_prom2.jpg"
            ]
        },
        
        {   id: 59, 
            title: "LCMW03M326", 
            type:  "이미지",
            team: "WEB팀", 
            brand: "MAZZ", 
            gender: "남화", 
            category: "샌들", 
            season: "23 SUMMER", 
            background: "스튜디오", 
            tool: "Gemini", 
            created: "2026-07-08", 
            link: "\\\\172.30.235.50\\web팀\\웹디자인\\ai 생성 이미지\\LCMW03M326",
            usage: "착화컷",
            usedIn: "자사몰 특가세일 이미지", 
            reaction: "", 
            prompt: "1번 이미지처럼 신발 착화 이미지 제작할거야. 스타일(옷)은 2번으로 바꿔주고, 악세사리 다 빼줘. 신발은 3,4,5,6번 누끼컷 참고해서 신겨줘.", 
            image: "https://gi.esmplus.com/elcanto01/elcanto/ai/LCMW03M326.jpg", 
            subImage:"https://gi.esmplus.com/elcanto01/elcanto/ai/LCMW03M326_prom.jpg",
        },
        {   id: 60, 
            title: "LCMC21M326", 
            type:  "이미지",
            team: "WEB팀", 
            brand: "MAZZ", 
            gender: "남화", 
            category: "컴포트화", 
            season: "23 AUTUMN", 
            background: "스튜디오", 
            tool: "Gemini", 
            created: "2026-07-13", 
            link: "\\\\172.30.235.50\\web팀\\웹디자인\\ai 생성 이미지\\LCMC21M326",
            usage: "착화컷",
            usedIn: "자사몰 특가세일 이미지", 
            reaction: "", 
            prompt: "1번 이미지 착화컷 신발을 2,3,4번 누끼컷 참고해서 신발 변경해주고, 신발이 잘 보이게끔 발 포즈 변경과 바지는 정장바지로 변경해줘.", 
            image: "https://gi.esmplus.com/elcanto01/elcanto/ai/LCMC21M326.jpg", 
            subImage:"https://gi.esmplus.com/elcanto01/elcanto/ai/LCMC21M326_prom.jpg",
        },
    ];

    // Firebase(Firestore)에 사용자가 등록한 항목을 기존 데이터에 합치기
    try {
        if (window.db) {
            const snapshot = await window.db.collection('gallery_items')
                .orderBy('createdAt', 'desc')
                .get();
            snapshot.forEach(doc => {
                const d = doc.data();
                window.allData.push({ ...d, firebaseId: doc.id });
            });
        }
    } catch (err) {
        console.error('Firestore 데이터 불러오기 실패:', err);
    }

    // 모든 항목이 카드 클릭/상세보기에 쓸 고유 키를 갖도록 보장
    window.allData.forEach(v => { v._key = v.firebaseId || String(v.id); });

const seasonOrder = { 'SPRING': 1, 'SUMMER': 2, 'AUTUMN': 3, 'WINTER': 4 };

/* 일찍 생성한 것부터 
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
});*/

window.allData.sort((a, b) => {
    const [yearA, termA] = a.season ? a.season.split(' ') : [0, ''];
    const [yearB, termB] = b.season ? b.season.split(' ') : [0, ''];
    // 1순위: 년도 (최신년도가 위로)
    if (parseInt(yearA) !== parseInt(yearB)) {
        return parseInt(yearB) - parseInt(yearA);
    }
    // 2순위: 생성일 (같은 년도 내에서는 무조건 최신 날짜가 위로)
    const createdA = new Date(a.created || '1900-01-01');
    const createdB = new Date(b.created || '1900-01-01');

    if (createdA.getTime() !== createdB.getTime()) {
        return createdB - createdA; 
    }
    // 3순위: 계절
    if (termA !== termB) {
        return (seasonOrder[termA] || 0) - (seasonOrder[termB] || 0);
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
        <div class="card" id="card-${item._key}" onclick="updateDetailPanel('${item._key}')">
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

function updateDetailPanel(key){
    const item = window.allData.find(v => v._key === key);
    if(!item) return;

    document.querySelectorAll('.card').forEach(c => c.classList.remove('selected'));
    const targetCard = document.getElementById(`card-${key}`);
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
                <div style="display:flex; align-items:center; justify-content:space-between; gap:12px;">
                    <h2 style="margin-bottom:0;">${item.title}</h2>
                    ${item.firebaseId ? `
                        <div style="display:flex; gap:8px; flex-shrink:0;">
                            <button type="button" onclick="editItem('${item.firebaseId}')" style="height:36px; padding:0 14px; border:1px solid #ddd; border-radius:8px; background:#fff; cursor:pointer; font-size:13px; font-weight:600;">수정</button>
                            <button type="button" onclick="deleteItem('${item.firebaseId}')" style="height:36px; padding:0 14px; border:0; border-radius:8px; background:#ff3b30; color:#fff; cursor:pointer; font-size:13px; font-weight:600;">삭제</button>
                        </div>
                    ` : ''}
                </div>
                ${item.firebaseId && (item.createdBy || item.updatedBy) ? `
                    <div style="font-size:12px; color:#999; margin-top:2px;">
                        ${item.createdBy ? `등록자: ${item.createdBy}` : ''}${item.updatedBy ? ` · 최종 수정: ${item.updatedBy}` : ''}
                    </div>
                ` : ''}
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
    customAlert('프롬프트가 클립보드에 복사되었습니다.');
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

/* ===================================================
   신규 항목 등록 (Firebase Firestore + Storage)
=================================================== */

window.editingFirebaseId = null;

function openRegisterModal(item = null) {
    const form = document.getElementById('registerForm');
    const modalTitle = document.getElementById('registerModalTitle');
    const submitBtn = document.getElementById('registerSubmitBtn');
    const mainImageLabel = document.getElementById('mainImageLabel');
    const mainImageInput = document.getElementById('mainImageInput');
    const mainImageHint = document.getElementById('mainImageHint');
    const subImageHint = document.getElementById('subImageHint');

    form.reset();

    if (item) {
        // 수정 모드: 기존 값 채우고, 이미지 파일은 선택 안 해도 되게 변경
        window.editingFirebaseId = item.firebaseId;
        modalTitle.innerText = '항목 수정';
        submitBtn.innerText = '수정하기';
        mainImageLabel.innerText = '대표 이미지';
        mainImageInput.required = false;
        mainImageHint.style.display = 'block';
        subImageHint.style.display = 'block';

        const fields = ['title','type','team','brand','gender','category','season','background','tool','created','link','usage','usedIn','reaction','prompt'];
        fields.forEach(f => {
            if (form[f] && item[f] !== undefined) form[f].value = item[f];
        });
    } else {
        window.editingFirebaseId = null;
        modalTitle.innerText = '새 항목 등록';
        submitBtn.innerText = '등록하기';
        mainImageLabel.innerText = '대표 이미지 *';
        mainImageInput.required = true;
        mainImageHint.style.display = 'none';
        subImageHint.style.display = 'none';
    }

    document.getElementById('registerModal').style.display = 'flex';
}

function closeRegisterModal() {
    window.editingFirebaseId = null;
    document.getElementById('registerModal').style.display = 'none';
    document.getElementById('registerForm').reset();
}

// 브라우저 기본 alert()/confirm() 대신 사이트 디자인에 맞는 커스텀 팝업
function showModal({ message, okText = '확인', cancelText = null, danger = false }) {
    return new Promise((resolve) => {
        const modal = document.getElementById('confirmModal');
        const msgEl = document.getElementById('confirmMessage');
        const okBtn = document.getElementById('confirmOkBtn');
        const cancelBtn = document.getElementById('confirmCancelBtn');

        msgEl.innerText = message;
        okBtn.innerText = okText;
        okBtn.className = danger ? 'confirm-danger-btn' : 'confirm-ok-btn';

        if (cancelText) {
            cancelBtn.style.display = '';
            cancelBtn.innerText = cancelText;
        } else {
            cancelBtn.style.display = 'none';
        }

        modal.style.display = 'flex';

        const cleanup = (result) => {
            modal.style.display = 'none';
            okBtn.removeEventListener('click', onOk);
            cancelBtn.removeEventListener('click', onCancel);
            resolve(result);
        };
        const onOk = () => cleanup(true);
        const onCancel = () => cleanup(false);

        okBtn.addEventListener('click', onOk);
        cancelBtn.addEventListener('click', onCancel);
    });
}

function customAlert(message) {
    return showModal({ message, okText: '확인', cancelText: null, danger: false });
}

function customConfirm(message) {
    return showModal({ message, okText: '삭제', cancelText: '취소', danger: true });
}

function editItem(firebaseId) {
    const item = window.allData.find(v => v.firebaseId === firebaseId);
    if (!item) return;
    openRegisterModal(item);
}

async function deleteItem(firebaseId) {
    const confirmed = await customConfirm('이 항목을 삭제하시겠습니까?\n삭제한 내용은 복구할 수 없습니다.');
    if (!confirmed) return;

    try {
        await window.db.collection('gallery_items').doc(firebaseId).delete();
        window.allData = window.allData.filter(v => v.firebaseId !== firebaseId);
        applyFilters();
        showEmptyPanel();
        customAlert('삭제되었습니다.');
    } catch (err) {
        console.error(err);
        customAlert('삭제 중 오류가 발생했습니다.\n' + err.message);
    }
}

// 용량이 큰 이미지는 업로드 전에 브라우저에서 자동으로 리사이즈/압축
function compressImageIfNeeded(file, maxDimension = 900, quality = 0.6, thresholdMB = 0.3) {
    return new Promise((resolve) => {
        if (!file.type.startsWith('image/') || file.size <= thresholdMB * 1024 * 1024) {
            resolve(file); // 작은 파일은 그대로 사용
            return;
        }

        const img = new Image();
        const objectUrl = URL.createObjectURL(file);

        img.onload = () => {
            let { width, height } = img;
            if (width > maxDimension || height > maxDimension) {
                const ratio = Math.min(maxDimension / width, maxDimension / height);
                width = Math.round(width * ratio);
                height = Math.round(height * ratio);
            }

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            canvas.getContext('2d').drawImage(img, 0, 0, width, height);

            canvas.toBlob((blob) => {
                URL.revokeObjectURL(objectUrl);
                if (!blob) { resolve(file); return; }
                resolve(new File([blob], file.name, { type: 'image/jpeg' }));
            }, 'image/jpeg', quality);
        };

        img.onerror = () => {
            URL.revokeObjectURL(objectUrl);
            resolve(file); // 압축 실패 시 원본 그대로 업로드
        };

        img.src = objectUrl;
    });
}

// 파일 하나를 Cloudinary에 업로드하고 이미지 URL을 반환
async function uploadFileToStorage(file) {
    const finalFile = await compressImageIfNeeded(file);

    const formData = new FormData();
    formData.append('file', finalFile);
    formData.append('upload_preset', window.CLOUDINARY_UPLOAD_PRESET);
    formData.append('folder', 'ai_library');

    const res = await fetch(
        `https://api.cloudinary.com/v1_1/${window.CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: 'POST', body: formData }
    );

    if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error?.message || 'Cloudinary 업로드 실패');
    }

    const data = await res.json();
    return data.secure_url;
}

async function submitRegisterForm(event) {
    event.preventDefault();
    const form = event.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalLabel = submitBtn.innerText;
    const isEditing = !!window.editingFirebaseId;

    const mainFile = form.mainImage.files[0];
    if (!isEditing && !mainFile) {
        customAlert('대표 이미지를 선택해주세요.');
        return;
    }

    submitBtn.disabled = true;

    try {
        // 브라우저가 넘겨주는 파일 선택 순서가 클릭 순서와 다를 수 있어,
        // 파일명 기준으로 자연 정렬(숫자 포함)해서 항상 예측 가능한 순서로 업로드
        const subFiles = Array.from(form.subImages.files || [])
            .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' }));
        const filesToUpload = (mainFile ? 1 : 0) + subFiles.length;
        let doneCount = 0;
        const updateProgress = () => {
            submitBtn.innerText = filesToUpload > 0
                ? `업로드 중... (${doneCount}/${filesToUpload})`
                : '저장 중...';
        };
        updateProgress();

        // 새로 선택한 이미지가 있으면 업로드, 없으면(수정 모드) 기존 값 유지
        let mainImageUrl, subImageUrls;

        if (mainFile) {
            mainImageUrl = await uploadFileToStorage(mainFile);
            doneCount++; updateProgress();
        } else {
            const existing = window.allData.find(v => v.firebaseId === window.editingFirebaseId);
            mainImageUrl = existing ? existing.image : '';
        }

        if (subFiles.length > 0) {
            subImageUrls = [];
            for (const f of subFiles) {
                const url = await uploadFileToStorage(f);
                doneCount++; updateProgress();
                subImageUrls.push(url);
            }
        } else {
            const existing = window.allData.find(v => v.firebaseId === window.editingFirebaseId);
            subImageUrls = existing ? (existing.subImages || (existing.subImage ? [existing.subImage] : [])) : [];
        }

        const itemData = {
            title: form.title.value.trim(),
            type: form.type.value,
            team: form.team.value,
            brand: form.brand.value,
            gender: form.gender.value,
            category: form.category.value,
            season: form.season.value,
            background: form.background.value,
            tool: form.tool.value,
            created: form.created.value,
            link: form.link.value.trim(),
            usage: form.usage.value,
            usedIn: form.usedIn.value.trim(),
            reaction: form.reaction.value.trim(),
            prompt: form.prompt.value.trim(),
            image: mainImageUrl,
            subImages: subImageUrls,
        };

        submitBtn.innerText = '정보 저장 중...';

        const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error(
                'Firestore 응답이 30초 넘게 없습니다. 사내망 방화벽/프록시가 연결을 막고 있을 수 있습니다. 다른 네트워크(개인 핫스팟 등)에서 다시 시도해보세요.'
            )), 30000)
        );

        const editingId = window.editingFirebaseId; // closeRegisterModal이 초기화하기 전에 미리 저장

        const savePromise = isEditing
            ? window.db.collection('gallery_items').doc(editingId).update({
                  ...itemData,
                  updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                  updatedBy: window.currentUser ? window.currentUser.email : null
              })
            : window.db.collection('gallery_items').add({
                  ...itemData,
                  createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                  createdBy: window.currentUser ? window.currentUser.email : null
              });

        const result = await Promise.race([savePromise, timeoutPromise]);

        await customAlert(isEditing ? '수정이 완료되었습니다.' : '등록이 완료되었습니다.');

        if (isEditing) {
            const idx = window.allData.findIndex(v => v.firebaseId === editingId);
            if (idx !== -1) {
                window.allData[idx] = {
                    ...window.allData[idx],
                    ...itemData,
                    updatedBy: window.currentUser ? window.currentUser.email : null,
                    _key: editingId
                };
            }
            closeRegisterModal();
            applyFilters();
            updateDetailPanel(editingId);
        } else {
            const newFirebaseId = result.id;
            const newItem = {
                ...itemData,
                firebaseId: newFirebaseId,
                _key: newFirebaseId,
                createdBy: window.currentUser ? window.currentUser.email : null
            };
            window.allData.unshift(newItem);
            closeRegisterModal();
            applyFilters();
            updateDetailPanel(newFirebaseId);
        }

    } catch (err) {
        console.error(err);
        customAlert((isEditing ? '수정' : '등록') + ' 중 오류가 발생했습니다.\n' + err.message);
        submitBtn.disabled = false;
        submitBtn.innerText = originalLabel;
    }
}
