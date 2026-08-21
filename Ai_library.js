// 로그인 상태가 될 때까지 대기 (로그인 화면 표시/숨김 처리 포함)
function waitForAuth() {
    return new Promise((resolve) => {
        window.auth.onAuthStateChanged((user) => {
            const loadingScreen = document.getElementById('loadingScreen');
            const loginScreen = document.getElementById('loginScreen');
            const mainWrapper = document.getElementById('mainWrapper');
            // loadingScreen 요소가 HTML에 없을 수도 있으므로(현재 index.html엔 없음) null 체크 후 처리
            if (loadingScreen) loadingScreen.style.display = 'none';
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

    // Firebase Auth 요청이 사내망 방화벽 등으로 막히면 응답이 영영 안 올 수 있어서
    // 일정 시간 안에 응답이 없으면 강제로 에러 처리 (무한 "로그인 중..." 방지)
    const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('TIMEOUT')), 15000)
    );

    try {
        if (!window.auth) {
            throw new Error('CONFIG_MISSING');
        }
        await Promise.race([
            window.auth.signInWithEmailAndPassword(email, password),
            timeoutPromise
        ]);
        // 성공 시 onAuthStateChanged가 감지해서 자동으로 화면 전환됨
    } catch (err) {
        console.error('로그인 오류:', err);

        if (err.message === 'TIMEOUT') {
            errorEl.innerText = '로그인 응답이 15초 넘게 없습니다. 사내망 방화벽/프록시가 연결을 막고 있을 수 있습니다. 다른 네트워크(개인 핫스팟 등)에서 다시 시도해보세요.';
        } else if (err.message === 'CONFIG_MISSING') {
            errorEl.innerText = 'Firebase 설정을 불러오지 못했습니다. firebase-config.js 파일 경로/내용을 확인해주세요.';
        } else if (err.code === 'auth/invalid-api-key' || err.code === 'auth/invalid-credential' || err.code === 'auth/configuration-not-found') {
            errorEl.innerText = 'Firebase 설정(API 키 등)이 올바르지 않습니다. firebase-config.js를 확인해주세요.';
        } else if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-email') {
            errorEl.innerText = '이메일 또는 비밀번호가 올바르지 않습니다.';
        } else if (err.code === 'auth/network-request-failed') {
            errorEl.innerText = '네트워크 연결에 실패했습니다. 인터넷 연결 또는 방화벽 설정을 확인해주세요.';
        } else {
            errorEl.innerText = '로그인 중 오류가 발생했습니다: ' + (err.message || err.code || '알 수 없는 오류');
        }

        btn.disabled = false;
        btn.innerText = '로그인';
    }
}

function logoutUser() {
    window.auth.signOut().then(() => location.reload());
}

// 로그인 화면의 "비밀번호를 잊으셨나요?" 클릭 시 실행
// 입력된 이메일로 Firebase가 비밀번호 재설정 링크 메일을 발송함
async function sendPasswordReset(event) {
    if (event) event.preventDefault();

    const email = document.getElementById('loginEmail').value.trim();
    const errorEl = document.getElementById('loginError');
    const linkEl = document.getElementById('loginResetLink');

    if (!email) {
        errorEl.style.color = '#ff3b30';
        errorEl.innerText = '이메일을 먼저 입력해주세요.';
        return;
    }

    if (!window.auth) {
        errorEl.style.color = '#ff3b30';
        errorEl.innerText = 'Firebase 설정을 불러오지 못했습니다. firebase-config.js 파일을 확인해주세요.';
        return;
    }

    const originalText = linkEl.innerText;
    linkEl.innerText = '전송 중...';

    try {
        await window.auth.sendPasswordResetEmail(email);
        errorEl.style.color = '#0066ff';
        errorEl.innerText = '비밀번호 재설정 메일을 보냈습니다. 메일함(스팸함 포함)을 확인해주세요.';
    } catch (err) {
        console.error('비밀번호 재설정 오류:', err);
        errorEl.style.color = '#ff3b30';
        if (err.code === 'auth/user-not-found') {
            errorEl.innerText = '등록되지 않은 이메일입니다. 관리자에게 계정 발급을 요청해주세요.';
        } else if (err.code === 'auth/invalid-email') {
            errorEl.innerText = '이메일 형식이 올바르지 않습니다.';
        } else {
            errorEl.innerText = '오류가 발생했습니다: ' + (err.message || err.code || '알 수 없는 오류');
        }
    } finally {
        linkEl.innerText = originalText;
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    // 브라우저/앱 창을 닫아도 로그인 상태가 유지되도록
    // 지속성을 LOCAL로 설정 (기기에 저장되어, 로그아웃을 직접 누르기 전까지 유지됨)
    try {
        await window.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    } catch (err) {
        console.error('로그인 지속성 설정 실패:', err);
    }

    await waitForAuth();

    window.allData = [    ];

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

    renderGroupedCards(allData);
    renderNewArrivals(allData);
    initNewArrivalsDrag();
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

    const subImagesInput = document.getElementById('subImagesInput');
    if (subImagesInput) {
        subImagesInput.addEventListener('change', () => {
            const files = Array.from(subImagesInput.files || []);
            files.forEach(file => {
                window.currentSubItems.push({
                    type: 'new',
                    file,
                    previewUrl: URL.createObjectURL(file)
                });
            });
            // 같은 파일을 다시 골라도 change가 또 발생하도록 초기화
            subImagesInput.value = '';
            renderSubPreviewList();
        });
    } else {
        console.warn('subImagesInput 요소를 찾지 못했습니다. index.html의 id="subImagesInput" 입력을 확인해주세요.');
    }

    // 대표 이미지: 등록/수정 모두 여러 장을 누적 선택해 같은 품번의
    // variation(포즈/컷)으로 묶을 수 있게 한다.
    const mainImageInputEl = document.getElementById('mainImageInput');
    if (mainImageInputEl) {
        mainImageInputEl.addEventListener('change', () => {
            // 수정 모드에서도 등록과 동일하게 여러 장을 누적 선택할 수 있다.
            // (1장만 선택하면 기존처럼 현재 컷 이미지 교체, 여러 장이면 첫 장은 교체 +
            //  나머지는 같은 품번에 새 컷으로 추가 - submitEditForm에서 처리)
            const files = Array.from(mainImageInputEl.files || []);
            files.forEach(file => {
                window.currentMainItems.push({
                    type: 'new',
                    file,
                    previewUrl: URL.createObjectURL(file),
                    prompt: ''
                });
            });
            mainImageInputEl.value = '';
            renderMainPreviewList();
        });
    } else {
        console.warn('mainImageInput 요소를 찾지 못했습니다.');
    }
});


// 최근 등록된(Firestore 등록 시각 기준) 항목을 상단 슬라이드에 표시
function getRegisteredTime(item) {
    const ts = item.createdAt || item.updatedAt;
    if (ts) {
        if (typeof ts.toMillis === 'function') return ts.toMillis();
        if (typeof ts.seconds === 'number') return ts.seconds * 1000;
    }
    // 아직 서버 타임스탬프가 반영되지 않은(이번 세션에 막 등록한) 항목은 최상단으로
    return Infinity;
}

function renderNewArrivals(data) {
    const track = document.getElementById('newArrivalsTrack');
    if (!track) return;

    // 최근 등록 시각 기준으로 정렬한 뒤, 같은 품번(그룹)은 하나로 묶어서
    // 대표 이미지 1장 + "N종" 뱃지로만 보여준다 (variation마다 카드가 퍼지지 않도록).
    const sorted = [...data].sort((a, b) => getRegisteredTime(b) - getRegisteredTime(a));
    const seen = new Set();
    const groups = [];
    for (const item of sorted) {
        const gKey = getGroupKey(item);
        if (seen.has(gKey)) continue;
        seen.add(gKey);
        groups.push(getGroupSiblings(item));
        if (groups.length >= 20) break;
    }

    if (groups.length === 0) {
        track.innerHTML = `<div class="na-empty">아직 등록된 항목이 없습니다.</div>`;
        updateNaProgress();
        return;
    }

    track.innerHTML = groups.map(group => {
        const rep = group[0];
        return `
        <div class="na-card" onclick="updateDetailPanel('${rep._key}')">
            <div class="na-card-img-wrap">
                <img src="${rep.image}" alt="${rep.title || ''}" draggable="false">
                ${group.length > 1 ? `<span class="na-badge">${group.length}종</span>` : ''}
            </div>
            <div class="na-card-title">${rep.title || ''}</div>
        </div>
    `;
    }).join('');

    updateNaProgress();
}

// 얇은 커스텀 진행바(스크롤 위치/비율)를 실제 스크롤 상태에 맞춰 갱신
function updateNaProgress() {
    const track = document.getElementById('newArrivalsTrack');
    const progress = document.getElementById('naProgress');
    const thumb = document.getElementById('naProgressThumb');
    if (!track || !progress || !thumb) return;

    const { scrollWidth, clientWidth, scrollLeft } = track;

    // 스크롤할 내용이 없으면 진행바 자체를 숨김
    if (scrollWidth <= clientWidth + 1) {
        progress.style.display = 'none';
        return;
    }
    progress.style.display = 'block';

    const widthRatio = Math.max(clientWidth / scrollWidth, 0.12);
    const maxScroll = scrollWidth - clientWidth;
    const leftRatio = maxScroll > 0 ? scrollLeft / maxScroll : 0;

    thumb.style.width = (widthRatio * 100) + '%';
    thumb.style.left = (leftRatio * (100 - widthRatio * 100)) + '%';
}

// 마우스 드래그로도 좌우 슬라이드 가능하게 (터치는 기본 스와이프로 동작)
function initNewArrivalsDrag() {
    const track = document.getElementById('newArrivalsTrack');
    if (!track || track.dataset.dragBound) return;
    track.dataset.dragBound = '1';

    track.addEventListener('scroll', updateNaProgress);
    window.addEventListener('resize', updateNaProgress);

    let isDown = false;
    let startX = 0;
    let startScroll = 0;
    let moved = false;

    track.addEventListener('pointerdown', (e) => {
        if (e.pointerType === 'touch') return; // 터치는 네이티브 스와이프 사용
        isDown = true;
        moved = false;
        startX = e.clientX;
        startScroll = track.scrollLeft;
        track.classList.add('dragging');
    });

    track.addEventListener('pointermove', (e) => {
        if (!isDown) return;
        const dx = e.clientX - startX;
        if (Math.abs(dx) > 3) moved = true;
        track.scrollLeft = startScroll - dx;
    });

    const endDrag = () => {
        isDown = false;
        track.classList.remove('dragging');
    };
    track.addEventListener('pointerup', endDrag);
    track.addEventListener('pointerleave', endDrag);

    // 드래그로 이동한 직후에는 카드 클릭이 열리지 않도록 방지
    track.addEventListener('click', (e) => {
        if (moved) {
            e.stopPropagation();
            e.preventDefault();
        }
    }, true);
}

// item.groupId가 있으면 그 값을, 없으면 자기 자신의 _key를 그룹 키로 사용
// (그룹핑 기능이 생기기 전에 등록된 기존 데이터도 자연스럽게 "1개짜리 그룹"으로 취급됨)
function getGroupKey(item) {
    return item.groupId || item._key;
}

// window.allData 전체에서 item과 같은 그룹(같은 품번의 variation들)을
// groupOrder 순서로 정렬해 반환. 그룹핑 안 된 항목은 자기 자신만 담긴 배열.
function getGroupSiblings(item) {
    const gKey = getGroupKey(item);
    return (window.allData || [])
        .filter(v => getGroupKey(v) === gKey)
        .sort((a, b) => (a.groupOrder ?? 0) - (b.groupOrder ?? 0));
}

// data를 그룹 단위로 묶는다. data의 등장 순서를 유지하면서, 각 그룹은
// 처음 등장하는 위치를 대표 위치로 삼는다.
function groupItems(data) {
    const seen = new Set();
    const groups = [];
    data.forEach(item => {
        const gKey = getGroupKey(item);
        if (seen.has(gKey)) return;
        seen.add(gKey);
        groups.push(getGroupSiblings(item));
    });
    return groups;
}

// 검색/필터 결과 표시용: variation(개별 item) 단위로 카드 하나씩 노출.
// 같은 품번의 다른 포즈가 있으면 카드 하단에 링크로 안내한다.
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
        const siblingCount = getGroupSiblings(item).length - 1;
        gallery.innerHTML += `
        <div class="card" id="card-${item._key}" onclick="updateDetailPanel('${item._key}')">
            <img src="${item.image}">
            <div class="card-body">
                <div class="card-title">${item.title}</div>
                <div class="card-product">${item.brand} · ${item.gender} · ${item.category}<br>${item.season}</div>
                <div class="card-tags">
                    <span>#${item.background}</span>
                    <span>#${item.tool}</span>
                </div>
                ${siblingCount > 0 ? `<div class="card-group-link">같은 제품의 다른 컷 보기 (${siblingCount})</div>` : ''}
            </div>
        </div>
        `;
    });
}

// 기본(필터 없는) 목록 표시용: 같은 품번의 variation들을 카드 1개로 묶어서
// 보여준다. 대표 이미지는 groupOrder가 가장 앞선 것을 사용하고, variation이
// 여러 장이면 뱃지를 눌러 나머지 썸네일을 펼쳐볼 수 있다.
function renderGroupedCards(data) {
    const gallery = document.getElementById('gallery');
    const resultCount = document.getElementById('resultCount');

    const groups = groupItems(data);

    gallery.innerHTML = '';
    resultCount.innerText = `총 ${groups.length.toLocaleString()}건의 결과`;

    if (groups.length === 0) {
        gallery.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 80px 0; color: #999; font-size: 14px;">검색 결과가 없습니다.</div>`;
        return;
    }

    groups.forEach(group => {
        const rep = group[0];
        gallery.innerHTML += `
        <div class="card" id="card-${rep._key}" onclick="updateDetailPanel('${rep._key}')">
            <div class="card-img-wrap">
                <img src="${rep.image}">
                ${group.length > 1 ? `
                <span class="group-badge" onclick="event.stopPropagation(); toggleGroupStrip(this)">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    ${group.length}종
                </span>` : ''}
            </div>
            <div class="card-body">
                <div class="card-title">${rep.title}</div>
                <div class="card-product">${rep.brand} · ${rep.gender} · ${rep.category}<br>${rep.season}</div>
                <div class="card-tags">
                    <span>#${rep.background}</span>
                    <span>#${rep.tool}</span>
                </div>
                ${group.length > 1 ? `
                <div class="group-thumb-strip">
                    ${group.map(v => `<img class="group-thumb" src="${v.image}" onclick="event.stopPropagation(); updateDetailPanel('${v._key}')">`).join('')}
                </div>` : ''}
            </div>
        </div>
        `;
    });
}

// 그룹 카드의 "N종" 뱃지를 클릭하면 나머지 variation 썸네일이 펼쳐짐
function toggleGroupStrip(badgeEl) {
    const card = badgeEl.closest('.card');
    if (card) card.classList.toggle('group-open');
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

    // 검색어나 필터가 하나라도 걸려있으면 "찾는 그 컷"이 바로 보이도록
    // variation 단위(개별)로 노출하고, 아무 조건도 없는 기본 목록에서는
    // 같은 품번끼리 카드 1개로 묶어서 보여준다.
    const hasActiveFilter = !!(keyword.trim() || type || usage || team || brand || gender || category || season || background || tool);

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

    if (hasActiveFilter) {
        renderCards(result);
    } else {
        renderGroupedCards(result);
    }
    document.getElementById('gallery').style.display = 'grid';
    document.getElementById('resultCount').style.display = 'block';
    showEmptyPanel(); 
}
function resetFilters(){
    document.getElementById('searchInput').value = '';
    document.querySelectorAll('.filter-area select').forEach(select => select.value = '');
    renderGroupedCards(allData); 
    
    document.getElementById('gallery').style.display = 'none';
    document.getElementById('resultCount').style.display = 'none';
    document.getElementById('detailPanel').innerHTML = `<div class="empty-panel"></div>`;
}

function renderSubImagesHTML(item) {
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
}

// CSS에서 상세 패널을 풀스크린 팝업으로 띄우는 조건(태블릿 이하 터치, 또는 900px 이하)과
// 동일한 조건. 이 조건일 때만 배경 스크롤을 잠가야 하며, "포인터가 마우스냐 터치냐"만으로
// 판단하면 데스크톱 앱 창을 좁혀서 모바일 레이아웃이 됐을 때(마우스는 여전히 pointer:fine)
// 스크롤 잠금이 빠져서 바깥 스크롤바와 패널 안쪽 스크롤바가 겹쳐 보이는 문제가 있었다.
function isPanelOverlayMode() {
    return window.matchMedia('(max-width: 1320px) and (not (pointer: fine)), (max-width: 900px)').matches;
}

function updateDetailPanel(key){
    const item = window.allData.find(v => v._key === key);
    if(!item) return;

    // 상세 패널이 풀스크린 팝업으로 뜨는 레이아웃일 때만 배경 스크롤을 잠근다.
    // CSS(:has)의 반영을 기다리지 않고 즉시 잠가서 스크롤바가 남아있다 사라지는
    // 겹침 현상을 방지.
    if (isPanelOverlayMode()) {
        document.body.style.overflow = 'hidden';
        const listEl = document.querySelector('.container');
        if (listEl) listEl.style.overflow = 'hidden';
    }

    document.querySelectorAll('.card').forEach(c => c.classList.remove('selected'));
    const targetCard = document.getElementById(`card-${key}`);
    if(targetCard) targetCard.classList.add('selected');

    const detailPanel = document.getElementById('detailPanel');
    
    detailPanel.innerHTML = `
        <div class="panel-content">
            <button type="button" class="detail-close-btn" onclick="showEmptyPanel()" aria-label="닫기">&times;</button>
            <div class="panel-left">
                <div class="image-wrap">
                    <img src="${item.image}" class="main-image" id="mainImage">

                    ${renderSubImagesHTML(item)}
                </div>
            </div>
            <div class="panel-right">
                <div class="panel-right-header">
                    <h2 id="panelTitle" style="margin-bottom:0; min-width:0; overflow-wrap:break-word; word-break:break-all;">${item.title}</h2>
                    <div style="display:flex; gap:6px; flex-shrink:0; white-space:nowrap;">
                        <button type="button" id="detailEditBtn" style="height:28px; padding:0 10px; border:1px solid #ddd; border-radius:6px; background:#fff; cursor:pointer; font-size:11.5px; font-weight:600;">수정</button>
                        <button type="button" id="detailDeleteBtn" style="height:28px; padding:0 10px; border:0; border-radius:6px; background:#ff3b30; color:#fff; cursor:pointer; font-size:11.5px; font-weight:600;">삭제</button>
                    </div>
                </div>
                <div class="panel-right-meta" id="panelMeta" style="font-size:14px; color:#999; margin-top:5px; margin-bottom:5px;"></div>
                <div class="info-table">
                    <div class="info-row"><strong>브랜드</strong><span id="infoBrand">${item.brand || '-'}</span></div>
                    <div class="info-row"><strong>성별</strong><span id="infoGender">${item.gender || '-'}</span></div>
                    <div class="info-row"><strong>카테고리</strong><span id="infoCategory">${item.category || '-'}</span></div>
                    <div class="info-row"><strong>시즌</strong><span id="infoSeason">${item.season || '-'}</span></div>
                    <div class="info-row"><strong>유형</strong><span id="infoUsage">${item.usage || '-'}</span></div>   
                    <div class="info-row"><strong>타입</strong><span id="infoType">${item.type || '-'}</span></div>
                    <div class="info-row"><strong>생성툴</strong><span id="infoTool">${item.tool || '-'}</span></div>
                    <div class="info-row"><strong>배경</strong><span id="infoBackground">${item.background || '-'}</span></div>
                    <div class="info-row"><strong>생성부서</strong><span id="infoTeam">${item.team || '-'}</span></div>
                    <div class="info-row"><strong>생성일</strong><span id="infoCreated">${item.created || '-'}</span></div>
                    <div class="info-row full"><strong>이미지 경로</strong><span id="infoLink">${item.link || '-'}</span></div>              
                    <div class="info-row full performance"><strong>활용 내용</strong><span id="infoUsedIn">${item.usedIn || '-'}</span></div>
                    <div class="info-row full performance"><strong>참고사항</strong><span id="infoReaction">${item.reaction || '-'}</span></div>
                </div>
                
                <div id="groupStripArea"></div>

                ${renderPromptBoxHTML(item)}
            </div>
        </div>
    `;

    updateMediaSplitClass(item);
    initSubSlider();
    applyDetailPanelItem(item);
}

// 프롬프트가 없는 항목은 빈 박스를 그대로 보여주지 않고, 박스 자체를 아예 렌더링하지 않는다.
function renderPromptBoxHTML(item) {
    if (!item.prompt) return '';
    return `
                <div class="prompt-box" id="promptBox">
                    <h3>Prompt</h3>
                    <textarea readonly id="promptText">${item.prompt}</textarea>
                    <button class="copy-btn" onclick="copyPrompt()">프롬프트 복사</button>
                </div>`;
}
// item에 따라 달라지는 부분만 채워 넣는다. updateDetailPanel(최초 오픈)과
// switchGroupCut(같은 그룹 내 다른 컷 전환) 양쪽에서 공용으로 사용.
function applyDetailPanelItem(item) {
    const editBtn = document.getElementById('detailEditBtn');
    const deleteBtn = document.getElementById('detailDeleteBtn');
    if (editBtn) editBtn.style.display = item.firebaseId ? '' : 'none';
    if (deleteBtn) deleteBtn.style.display = item.firebaseId ? '' : 'none';
    if (editBtn) editBtn.onclick = () => editItem(item.firebaseId);
    if (deleteBtn) deleteBtn.onclick = () => deleteItem(item.firebaseId);

    const metaEl = document.getElementById('panelMeta');
    if (metaEl) {
        if (item.firebaseId && (item.createdBy || item.updatedBy)) {
            metaEl.style.display = '';
            metaEl.innerHTML = `${item.createdBy ? `등록자: ${item.createdBy.split('@')[0]}` : ''}${item.updatedBy ? ` · 최종 수정: ${item.updatedBy.split('@')[0]}` : ''}`;
        } else {
            metaEl.style.display = 'none';
            metaEl.innerHTML = '';
        }
    }

    const groupStripArea = document.getElementById('groupStripArea');
    const groupSiblingsCount = groupStripArea ? getGroupSiblings(item).length : 0;
    if (groupStripArea) {
        if (groupSiblingsCount <= 1) {
            groupStripArea.innerHTML = '';
        } else {
            const siblings = getGroupSiblings(item);
            // 썸네일 목록을 다시 그리기 전에 기존 스크롤 위치를 저장해뒀다가
            // 다시 그린 뒤 그대로 복원한다. (활성 썸네일을 강제로 화면에 끌어오면
            // 오른쪽 끝까지 넘긴 상태에서 중간 썸네일을 눌렀을 때 그 썸네일이
            // 오른쪽 끝으로 붙어버리는 것처럼 보이는 문제가 있었음)
            const prevThumbsEl = document.getElementById('groupThumbs');
            const prevScrollLeft = prevThumbsEl ? prevThumbsEl.scrollLeft : null;
            groupStripArea.innerHTML = `
            <div class="detail-group-strip">
                <div class="detail-group-label">같은 제품 · 다른 컷 (${siblings.length})</div>
                <div class="detail-group-thumbs-wrap">
                    <div class="detail-group-thumbs" id="groupThumbs" onscroll="updateGroupThumbFade(this)">
                        ${siblings.map(v => `<img class="detail-group-thumb ${v._key === item._key ? 'active' : ''}" src="${v.image}" data-key="${v._key}" draggable="false" onclick="switchGroupCut('${v._key}')">`).join('')}
                    </div>
                    <div class="group-thumbs-fade" id="groupThumbsFade"></div>
                </div>
            </div>`;
            initGroupThumbFade(prevScrollLeft);
            initGroupThumbsDrag();
        }
    }
}

// 모바일: "같은 제품 다른 컷"과 "서브 이미지"가 둘 다 있을 때만
// 좌(다른 컷)/우(서브 이미지) 나란히 배치(media-split)한다.
// 둘 중 하나만 있으면 기존처럼 한 줄 전체 폭을 그대로 사용한다.
// (서브 이미지 슬라이더는 폭을 인라인 style로 직접 계산하므로, HTML 삽입 직후·
//  initSubSlider() 실행 전에 먼저 호출해서 좁아진 실제 컬럼 폭 기준으로 계산되게 한다.)
function updateMediaSplitClass(item) {
    const panelContentEl = document.querySelector('.panel-content');
    const groupStripArea = document.getElementById('groupStripArea');
    if (!panelContentEl) return;
    const groupSiblingsCount = groupStripArea ? getGroupSiblings(item).length : 0;
    const hasSubImages = !!document.getElementById('subImageContainer');
    panelContentEl.classList.toggle('media-split', groupSiblingsCount > 1 && hasSubImages);
}

// 같은 품번의 다른 컷 썸네일 클릭 시: 패널 전체를 다시 그리지 않고
// 이미지/프롬프트/메타 등 바뀌는 값만 갱신해 전환을 빠르고 매끄럽게 한다.
function switchGroupCut(key) {
    const item = window.allData.find(v => v._key === key);
    if (!item) return;

    document.querySelectorAll('.card').forEach(c => c.classList.remove('selected'));
    const targetCard = document.getElementById(`card-${key}`);
    if (targetCard) targetCard.classList.add('selected');

    const mainImg = document.getElementById('mainImage');
    if (mainImg) mainImg.src = item.image;

    const titleEl = document.getElementById('panelTitle');
    if (titleEl) titleEl.textContent = item.title;

    const fieldMap = {
        infoBrand: 'brand', infoGender: 'gender', infoCategory: 'category',
        infoSeason: 'season', infoUsage: 'usage', infoType: 'type',
        infoTool: 'tool', infoBackground: 'background', infoTeam: 'team',
        infoCreated: 'created', infoLink: 'link', infoUsedIn: 'usedIn', infoReaction: 'reaction'
    };
    Object.entries(fieldMap).forEach(([elId, field]) => {
        const el = document.getElementById(elId);
        if (el) el.textContent = item[field] || '-';
    });

    // 프롬프트 유무에 따라 박스 자체를 붙였다 뗐다 한다.
    // (다른 컷으로 전환하면서 프롬프트가 있는 컷 <-> 없는 컷을 오갈 수 있으므로
    //  textarea 값만 바꾸는 게 아니라 박스 전체를 있음/없음에 맞게 갱신해야 함)
    const oldPromptBox = document.getElementById('promptBox');
    const newPromptHTML = renderPromptBoxHTML(item);
    if (oldPromptBox) {
        if (newPromptHTML) {
            oldPromptBox.outerHTML = newPromptHTML;
        } else {
            oldPromptBox.remove();
        }
    } else if (newPromptHTML) {
        const panelRight = document.querySelector('#detailPanel .panel-right');
        if (panelRight) panelRight.insertAdjacentHTML('beforeend', newPromptHTML);
    }

    const subImageWrap = document.querySelector('#detailPanel .image-wrap');
    const oldSubContainer = document.getElementById('subImageContainer');
    const newSubHTML = renderSubImagesHTML(item);
    if (oldSubContainer) {
        oldSubContainer.outerHTML = newSubHTML;
    } else if (subImageWrap && newSubHTML) {
        subImageWrap.insertAdjacentHTML('beforeend', newSubHTML);
    }
    updateMediaSplitClass(item);
    initSubSlider();

    applyDetailPanelItem(item);
}

// 다른 컷 썸네일 목록: 오른쪽으로 더 스크롤할 내용이 있을 때만 페이드 힌트 표시
function updateGroupThumbFade(el) {
    const fade = document.getElementById('groupThumbsFade');
    if (!el || !fade) return;
    const hasMoreToRight = el.scrollWidth - el.clientWidth - el.scrollLeft > 4;
    fade.style.opacity = hasMoreToRight ? '1' : '0';
}

function initGroupThumbFade(prevScrollLeft) {
    const el = document.getElementById('groupThumbs');
    if (!el) return;
    // 다른 컷 썸네일 목록은 클릭 때마다 새로 그려지므로(활성 표시 갱신 목적)
    // 스크롤 위치가 매번 0으로 초기화된다. 이전에는 매번 활성 썸네일을 강제로
    // 화면에 끌어왔는데, 그러면 오른쪽 끝까지 스크롤해둔 상태에서 중간 썸네일을
    // 클릭했을 때 그 썸네일이 오른쪽 끝으로 붙는 것처럼 보이는 문제가 있었다.
    // 이제는 클릭 이전의 스크롤 위치를 그대로 복원해 목록이 제자리에 머물게 하고,
    // 최초로 열려서 이전 스크롤 위치가 없을 때만 활성 썸네일이 보이도록 스크롤한다.
    if (prevScrollLeft !== null && prevScrollLeft !== undefined) {
        el.scrollLeft = prevScrollLeft;
    } else {
        const activeThumb = el.querySelector('.detail-group-thumb.active');
        if (activeThumb) {
            activeThumb.scrollIntoView({ block: 'nearest', inline: 'nearest' });
        }
    }
    updateGroupThumbFade(el);
    requestAnimationFrame(() => updateGroupThumbFade(el));
}

// 마우스 드래그로도 "같은 제품 · 다른 컷" 썸네일 목록을 좌우로 넘길 수 있게 함
// (터치는 기본 스와이프 스크롤을 그대로 사용)
function initGroupThumbsDrag() {
    const el = document.getElementById('groupThumbs');
    if (!el) return;

    let moved = false;

    el.addEventListener('pointerdown', (e) => {
        if (e.pointerType === 'touch') return; // 터치는 네이티브 스와이프 사용

        // preventDefault를 안 걸어주면 이미지 위에서 mousedown+move가 브라우저의
        // 기본 "이미지 드래그(선택/드래그아웃)" 동작으로 먼저 먹혀버려서, 이후
        // move 이벤트가 이 리스너까지 오지 않아 슬라이드 자체가 아예 안 먹는
        // 원인이 됐다. draggable="false"만으로는 완전히 막히지 않는 브라우저가 있음.
        e.preventDefault();

        moved = false;
        const startX = e.clientX;
        const startScroll = el.scrollLeft;
        el.classList.add('dragging');

        // move/up은 el이 아니라 document에 걸어서, 드래그 중 마우스가 썸네일
        // 영역(세로 폭이 좁음) 밖으로 살짝 벗어나도 드래그가 끊기지 않게 한다.
        const onMove = (e2) => {
            const dx = e2.clientX - startX;
            if (Math.abs(dx) > 3) moved = true;
            el.scrollLeft = startScroll - dx;
        };
        const onUp = () => {
            el.classList.remove('dragging');
            document.removeEventListener('pointermove', onMove);
            document.removeEventListener('pointerup', onUp);
            document.removeEventListener('pointercancel', onUp);
        };
        document.addEventListener('pointermove', onMove);
        document.addEventListener('pointerup', onUp);
        document.addEventListener('pointercancel', onUp);
    });

    // 드래그로 이동한 직후에는 썸네일 클릭(다른 컷 전환)이 발동하지 않도록 방지
    el.addEventListener('click', (e) => {
        if (moved) {
            e.stopPropagation();
            e.preventDefault();
        }
    }, true);
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

    container.addEventListener('pointerdown', (e) => {
        // 불렛(점)을 터치했을 때는 드래그 로직이 개입하지 않도록 제외 (불렛 자체 클릭으로 전환 처리)
        if (e.target.closest('.sub-slider-bullets')) return;

        isDragging = true;
        startX = e.clientX;
        wrapper.style.transition = 'none';
        try { container.setPointerCapture(e.pointerId); } catch (err) {}

        prevTranslate = -window.currentSubIndex * (container.offsetWidth);
    });

    container.addEventListener('pointermove', (e) => {
        if (!isDragging) return;
        const currentX = e.clientX;
        const dragDistance = currentX - startX;
        currentTranslate = prevTranslate + dragDistance;
        wrapper.style.transform = `translateX(${currentTranslate}px)`;
    });

    const handlePointerUp = (e) => {
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

    container.addEventListener('pointerup', handlePointerUp);
    container.addEventListener('pointercancel', handlePointerUp);
    container.addEventListener('pointerleave', handlePointerUp);
}



function showEmptyPanel() {
    document.getElementById('detailPanel').innerHTML = `
        <div class="empty-panel">왼쪽 리스트에서 카드를 클릭하면 상세 정보가 나타납니다.</div>
    `;
    document.body.style.overflow = '';
    const listEl = document.querySelector('.container');
    if (listEl) listEl.style.overflow = '';
}

function copyPrompt(){
    const text = document.getElementById('promptText').value;
    navigator.clipboard.writeText(text);
    customAlert('프롬프트가 클립보드에 복사되었습니다.');
}

// 상세 패널이 열려 있는 상태로 창 크기가 바뀌는 경우(예: 데스크톱 앱 창을
// 모바일 크기로 줄이는 경우)에도 오버레이 모드 진입/이탈에 맞춰 배경 스크롤
// 잠금 상태를 다시 맞춰준다.
window.addEventListener('resize', () => {
    const panelOpen = !!document.querySelector('#detailPanel .panel-content');
    if (!panelOpen) return;
    const listEl = document.querySelector('.container');
    if (isPanelOverlayMode()) {
        document.body.style.overflow = 'hidden';
        if (listEl) listEl.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
        if (listEl) listEl.style.overflow = '';
    }
});

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
        // 모바일/태블릿(터치) 환경에서는 가로 드래그 스크롤이 필요 없고,
        // 모달/팝업 내부를 터치했을 때 화면이 옆으로 흔들리는 원인이 되므로 비활성화
        if (!window.matchMedia('(pointer: fine)').matches) return;

        if(e.target.closest('input') || e.target.closest('select') || e.target.closest('.sub-image-container') || e.target.closest('textarea') || e.target.closest('.modal-overlay')) return;
        
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

/* ---------------------------------------------------
   서브 이미지 순서 조정 UI
   - 파일 선택 순서(브라우저마다 신뢰 불가)에 의존하지 않고,
     썸네일 미리보기 + ▲▼/× 버튼으로 순서를 직접 관리한다.
   - window.currentSubItems 배열 각 항목:
       { type: 'existing', url }        // 수정 모드에서 이미 저장돼 있던 이미지
       { type: 'new', file, previewUrl } // 이번에 새로 선택한 파일
--------------------------------------------------- */
window.currentSubItems = [];

function resetSubItems() {
    // 새로 선택했던 파일들의 미리보기 objectURL 메모리 해제
    (window.currentSubItems || []).forEach(it => {
        if (it.type === 'new' && it.previewUrl) URL.revokeObjectURL(it.previewUrl);
    });
    window.currentSubItems = [];
    const input = document.getElementById('subImagesInput');
    if (input) input.value = '';
    renderSubPreviewList();
}

function renderSubPreviewList() {
    const container = document.getElementById('subPreviewList');
    if (!container) return;
    const items = window.currentSubItems;

    container.innerHTML = items.map((it, idx) => {
        const src = it.type === 'existing' ? it.url : it.previewUrl;
        return `
        <div class="sub-preview-item">
            <span class="sub-preview-num">${idx + 1}</span>
            <button type="button" class="sub-preview-remove" onclick="removeSubItem(${idx})">&times;</button>
            <img src="${src}">
            <div class="sub-preview-actions">
                <button type="button" onclick="moveSubItem(${idx}, -1)" ${idx === 0 ? 'disabled' : ''}>&uarr;</button>
                <button type="button" onclick="moveSubItem(${idx}, 1)" ${idx === items.length - 1 ? 'disabled' : ''}>&darr;</button>
            </div>
        </div>`;
    }).join('');
}

function moveSubItem(idx, dir) {
    const items = window.currentSubItems;
    const target = idx + dir;
    if (target < 0 || target >= items.length) return;
    [items[idx], items[target]] = [items[target], items[idx]];
    renderSubPreviewList();
}

function removeSubItem(idx) {
    const [removed] = window.currentSubItems.splice(idx, 1);
    if (removed && removed.type === 'new' && removed.previewUrl) URL.revokeObjectURL(removed.previewUrl);
    renderSubPreviewList();
}

/* ---------------------------------------------------
   대표 이미지 다중 선택 (variation 등록) UI
   - 신규 등록 시에만 사용. 같은 품번의 여러 포즈/컷 이미지를
     한 번에 선택하고, 이미지마다 다른 프롬프트를 입력할 수 있다.
   - window.currentMainItems 배열 각 항목:
       { type: 'new', file, previewUrl, prompt }
--------------------------------------------------- */
window.currentMainItems = [];

function resetMainItems() {
    (window.currentMainItems || []).forEach(it => {
        if (it.type === 'new' && it.previewUrl) URL.revokeObjectURL(it.previewUrl);
    });
    window.currentMainItems = [];
    const input = document.getElementById('mainImageInput');
    if (input) input.value = '';
    renderMainPreviewList();
}

function renderMainPreviewList() {
    const container = document.getElementById('mainPreviewList');
    if (!container) return;
    const items = window.currentMainItems || [];

    if (items.length === 0) {
        container.innerHTML = '';
        container.style.display = 'none';
        return;
    }
    container.style.display = 'flex';

    container.innerHTML = items.map((it, idx) => {
        const src = it.type === 'existing' ? it.url : it.previewUrl;
        return `
        <div class="main-preview-item">
            <div class="main-preview-thumb">
                <span class="main-preview-num">${idx + 1}</span>
                <button type="button" class="main-preview-remove" onclick="removeMainItem(${idx})">&times;</button>
                <img src="${src}">
                <div class="main-preview-actions">
                    <button type="button" onclick="moveMainItem(${idx}, -1)" ${idx === 0 ? 'disabled' : ''}>&uarr;</button>
                    <button type="button" onclick="moveMainItem(${idx}, 1)" ${idx === items.length - 1 ? 'disabled' : ''}>&darr;</button>
                </div>
            </div>
            <textarea class="main-preview-prompt" placeholder="이 이미지만의 프롬프트 (비워두면 위쪽 공통 프롬프트 사용)" oninput="updateMainItemPrompt(${idx}, this.value)">${it.prompt || ''}</textarea>
        </div>
        `;
    }).join('');
}

function moveMainItem(idx, dir) {
    const items = window.currentMainItems;
    const target = idx + dir;
    if (target < 0 || target >= items.length) return;
    [items[idx], items[target]] = [items[target], items[idx]];
    renderMainPreviewList();
}

function removeMainItem(idx) {
    const [removed] = window.currentMainItems.splice(idx, 1);
    if (removed && removed.previewUrl) URL.revokeObjectURL(removed.previewUrl);
    renderMainPreviewList();
}

// 텍스트를 입력할 때마다 목록 전체를 다시 그리면 입력 포커스가 끊기므로,
// 데이터만 갱신하고 화면(textarea)은 그대로 둔다.
function updateMainItemPrompt(idx, value) {
    if (window.currentMainItems[idx]) window.currentMainItems[idx].prompt = value;
}

function openRegisterModal(item = null) {
    const form = document.getElementById('registerForm');
    const modalTitle = document.getElementById('registerModalTitle');
    const submitBtn = document.getElementById('registerSubmitBtn');
    const mainImageLabel = document.getElementById('mainImageLabel');
    const mainImageInput = document.getElementById('mainImageInput');
    const mainImageHint = document.getElementById('mainImageHint');
    const mainImageMultiHint = document.getElementById('mainImageMultiHint');
    const promptHint = document.getElementById('promptHint');
    const subImageHint = document.getElementById('subImageHint');

    form.reset();
    submitBtn.disabled = false;
    window.editingFirebaseId = item ? item.firebaseId : null; // resetMainItems보다 먼저 설정(프리뷰 표시 여부 판단에 사용)
    resetSubItems();
    resetMainItems();

    // 대표 이미지는 required 속성 대신 submitRegisterForm에서 직접 검증한다.
    // (신규 등록은 누적 선택 방식이라 선택 직후 input.value를 비우기 때문에
    //  네이티브 required 검증이 오작동함)
    mainImageInput.required = false;

    if (item) {
        // 수정 모드: 기존 값 채우고, 같은 품번에 등록된 모든 컷(형제 문서)을
        // 아래 목록에 미리 채워서 보여준다. 여기서 순서를 바꾸거나(▲▼),
        // 이미지별 프롬프트를 고치거나, ×로 삭제할 수 있고, 파일을 새로
        // 추가하면 같은 품번에 새 컷으로 추가된다(등록과 동일한 방식).
        modalTitle.innerText = '항목 수정';
        submitBtn.innerText = '수정하기';
        mainImageLabel.innerText = '대표 이미지';
        mainImageInput.multiple = true;
        mainImageHint.style.display = 'none';
        mainImageMultiHint.style.display = 'block';
        mainImageMultiHint.innerText = '이미 등록된 컷은 아래 목록에 표시됩니다. ▲▼로 순서를 바꾸거나 ×로 삭제할 수 있고, 파일을 새로 선택하면 같은 품번에 새 컷으로 추가됩니다. 이미지마다 프롬프트를 다르게 입력할 수 있어요.';
        promptHint.style.display = 'block';
        subImageHint.style.display = 'block';

        const fields = ['title','type','team','brand','gender','category','season','background','tool','created','link','usage','usedIn','reaction','prompt'];
        fields.forEach(f => {
            if (form[f] && item[f] !== undefined) form[f].value = item[f];
        });

        // 같은 품번의 등록된 모든 컷을 대표 이미지 목록에 미리 채운다
        const siblings = getGroupSiblings(item);
        window.currentMainItems = siblings.map(v => ({
            type: 'existing',
            firebaseId: v.firebaseId,
            url: v.image,
            prompt: v.prompt || ''
        }));
        window.editingOriginalMainIds = siblings.map(v => v.firebaseId);
        window.editingOriginalGroupId = item.groupId || null;
        renderMainPreviewList();

        // 기존 서브 이미지들을 순서 조정 목록에 미리 채워둔다
        const existingSubs = item.subImages || (item.subImage ? [item.subImage] : []);
        window.currentSubItems = existingSubs.map(url => ({ type: 'existing', url }));
        renderSubPreviewList();
    } else {
        modalTitle.innerText = '새 항목 등록';
        submitBtn.innerText = '등록하기';
        mainImageLabel.innerText = '대표 이미지 *';
        mainImageInput.multiple = true;
        mainImageHint.style.display = 'none';
        mainImageMultiHint.style.display = 'block';
        mainImageMultiHint.innerText = '같은 제품의 다른 포즈/컷을 여러 장 선택하면 한 품번으로 묶여 등록됩니다. 이미지마다 프롬프트를 다르게 입력할 수 있어요.';
        promptHint.style.display = 'block';
        subImageHint.style.display = 'none';
    }

    document.getElementById('registerModal').style.display = 'flex';
}

function closeRegisterModal() {
    window.editingFirebaseId = null;
    window.editingOriginalMainIds = [];
    window.editingOriginalGroupId = null;
    document.getElementById('registerModal').style.display = 'none';
    document.getElementById('registerForm').reset();
    resetSubItems();
    resetMainItems();
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
        renderNewArrivals(window.allData);
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

function buildTimeoutPromise() {
    return new Promise((_, reject) =>
        setTimeout(() => reject(new Error(
            'Firestore 응답이 30초 넘게 없습니다. 사내망 방화벽/프록시가 연결을 막고 있을 수 있습니다. 다른 네트워크(개인 핫스팟 등)에서 다시 시도해보세요.'
        )), 30000)
    );
}

async function submitRegisterForm(event) {
    event.preventDefault();
    const form = event.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalLabel = submitBtn.innerText;
    const isEditing = !!window.editingFirebaseId;

    if (isEditing) {
        await submitEditForm(form, submitBtn, originalLabel);
    } else {
        await submitNewRegistration(form, submitBtn, originalLabel);
    }
}

/* ---------- 수정: 같은 품번(그룹)에 등록된 모든 컷을 한 번에 관리한다.
   대표 이미지 목록(window.currentMainItems)에는 기존 컷(existing)과 새로
   추가한 컷(new)이 함께 들어있고, 목록에 남은 순서 그대로 groupOrder를
   다시 매긴다. 목록에서 뺀(×로 지운) 기존 컷은 문서 자체를 삭제한다. ---------- */
async function submitEditForm(form, submitBtn, originalLabel) {
    const mainItems = window.currentMainItems || [];
    if (mainItems.length === 0) {
        customAlert('대표 이미지를 최소 1장 이상 남겨주세요.');
        return;
    }
    submitBtn.disabled = true;

    try {
        const subItems = window.currentSubItems || [];
        const newSubCount = subItems.filter(it => it.type === 'new').length;
        const newMainCount = mainItems.filter(it => it.type === 'new').length;
        const filesToUpload = newMainCount + newSubCount;
        let doneCount = 0;
        const updateProgress = () => {
            submitBtn.innerText = filesToUpload > 0
                ? `업로드 중... (${doneCount}/${filesToUpload})`
                : '저장 중...';
        };
        updateProgress();

        const subImageUrls = [];
        for (const it of subItems) {
            if (it.type === 'existing') {
                subImageUrls.push(it.url);
            } else {
                const url = await uploadFileToStorage(it.file);
                doneCount++; updateProgress();
                subImageUrls.push(url);
            }
        }

        const commonPrompt = form.prompt.value.trim();
        const baseData = {
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
            subImages: subImageUrls,
        };

        // 목록에 남아있는 순서대로 groupOrder를 다시 매긴다.
        // 최종적으로 1장만 남으면 그룹을 해제(groupId 없음)한다.
        const groupId = mainItems.length > 1
            ? (window.editingOriginalGroupId || (Date.now().toString(36) + Math.random().toString(36).slice(2, 8)))
            : null;

        // 목록에서 빠진(×로 지운) 기존 컷 = 삭제 대상
        const keptExistingIds = mainItems.filter(it => it.type === 'existing').map(it => it.firebaseId);
        const removedIds = (window.editingOriginalMainIds || []).filter(id => !keptExistingIds.includes(id));

        submitBtn.innerText = '정보 저장 중...';
        const editingId = window.editingFirebaseId; // closeRegisterModal이 초기화하기 전에 미리 저장

        for (const rid of removedIds) {
            await Promise.race([
                window.db.collection('gallery_items').doc(rid).delete(),
                buildTimeoutPromise()
            ]);
        }

        const savedItems = [];
        for (let i = 0; i < mainItems.length; i++) {
            const mi = mainItems[i];
            const prompt = (mi.prompt && mi.prompt.trim()) || commonPrompt;
            const groupFields = groupId ? { groupId, groupOrder: i } : { groupId: null, groupOrder: null };

            if (mi.type === 'existing') {
                const itemData = { ...baseData, prompt, image: mi.url, ...groupFields };
                await Promise.race([
                    window.db.collection('gallery_items').doc(mi.firebaseId).update({
                        ...itemData,
                        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                        updatedBy: window.currentUser ? window.currentUser.email : null
                    }),
                    buildTimeoutPromise()
                ]);
                savedItems.push({
                    ...itemData,
                    firebaseId: mi.firebaseId,
                    _key: mi.firebaseId,
                    updatedBy: window.currentUser ? window.currentUser.email : null
                });
            } else {
                const url = await uploadFileToStorage(mi.file);
                doneCount++; updateProgress();
                const itemData = { ...baseData, prompt, image: url, ...groupFields };
                const result = await Promise.race([
                    window.db.collection('gallery_items').add({
                        ...itemData,
                        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                        createdBy: window.currentUser ? window.currentUser.email : null
                    }),
                    buildTimeoutPromise()
                ]);
                savedItems.push({
                    ...itemData,
                    firebaseId: result.id,
                    _key: result.id,
                    createdBy: window.currentUser ? window.currentUser.email : null
                });
            }
        }

        // window.allData 갱신: 삭제된 문서 제거 + 기존/신규 문서 반영
        window.allData = window.allData.filter(v => !removedIds.includes(v.firebaseId));
        savedItems.forEach(si => {
            const idx = window.allData.findIndex(v => v.firebaseId === si.firebaseId);
            if (idx !== -1) {
                window.allData[idx] = { ...window.allData[idx], ...si };
            } else {
                window.allData.unshift(si);
            }
        });

        await customAlert('수정이 완료되었습니다.');

        submitBtn.disabled = false;
        submitBtn.innerText = originalLabel;
        closeRegisterModal();
        applyFilters();
        // 원래 열었던 컷이 삭제됐을 수도 있으니, 없으면 목록의 첫 컷을 보여준다.
        const stillThere = savedItems.find(v => v.firebaseId === editingId);
        updateDetailPanel(stillThere ? editingId : savedItems[0]._key);
        renderNewArrivals(window.allData);
    } catch (err) {
        console.error(err);
        customAlert('수정 중 오류가 발생했습니다.\n' + err.message);
        submitBtn.disabled = false;
        submitBtn.innerText = originalLabel;
    }
}

/* ---------- 신규 등록: 대표 이미지를 여러 장 고르면 같은 품번의
   variation(포즈/컷)으로 묶어 문서를 여러 개 생성한다ㅡ
   공통 정보/서브 이미지는 그대로 복제, 프롬프트만 이미지별로 다를 수 있음 ---------- */
async function submitNewRegistration(form, submitBtn, originalLabel) {
    const mainItems = window.currentMainItems || [];
    if (mainItems.length === 0) {
        customAlert('대표 이미지를 선택해주세요.');
        return;
    }

    submitBtn.disabled = true;

    try {
        const subItems = window.currentSubItems || [];
        const newSubCount = subItems.filter(it => it.type === 'new').length;
        const filesToUpload = mainItems.length + newSubCount;
        let doneCount = 0;
        const updateProgress = () => {
            submitBtn.innerText = filesToUpload > 0
                ? `업로드 중... (${doneCount}/${filesToUpload})`
                : '저장 중...';
        };
        updateProgress();

        // 서브 이미지(참고 이미지)는 품번 전체가 공통으로 사용
        const subImageUrls = [];
        for (const it of subItems) {
            if (it.type === 'existing') {
                subImageUrls.push(it.url);
            } else {
                const url = await uploadFileToStorage(it.file);
                doneCount++; updateProgress();
                subImageUrls.push(url);
            }
        }

        const commonPrompt = form.prompt.value.trim();
        const baseData = {
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
            subImages: subImageUrls,
        };

        // 이미지가 2장 이상일 때만 groupId를 발급해 묶는다.
        // 1장짜리는 기존과 동일하게 단독 항목으로 저장.
        const groupId = mainItems.length > 1
            ? (Date.now().toString(36) + Math.random().toString(36).slice(2, 8))
            : null;

        submitBtn.innerText = '정보 저장 중...';

        const newItems = [];
        for (let i = 0; i < mainItems.length; i++) {
            const mi = mainItems[i];
            const mainImageUrl = await uploadFileToStorage(mi.file);
            doneCount++; updateProgress();

            const itemData = {
                ...baseData,
                prompt: (mi.prompt && mi.prompt.trim()) || commonPrompt,
                image: mainImageUrl,
                ...(groupId ? { groupId, groupOrder: i } : {}),
            };

            const result = await Promise.race([
                window.db.collection('gallery_items').add({
                    ...itemData,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    createdBy: window.currentUser ? window.currentUser.email : null
                }),
                buildTimeoutPromise()
            ]);

            newItems.push({
                ...itemData,
                firebaseId: result.id,
                _key: result.id,
                createdBy: window.currentUser ? window.currentUser.email : null
            });
        }

        await customAlert(newItems.length > 1
            ? `${newItems.length}건의 포즈/컷이 한 품번으로 등록되었습니다.`
            : '등록이 완료되었습니다.');

        window.allData.unshift(...newItems);
        submitBtn.disabled = false;
        submitBtn.innerText = originalLabel;
        closeRegisterModal();
        applyFilters();
        updateDetailPanel(newItems[0]._key);
        renderNewArrivals(window.allData);
    } catch (err) {
        console.error(err);
        customAlert('등록 중 오류가 발생했습니다.\n' + err.message);
        submitBtn.disabled = false;
        submitBtn.innerText = originalLabel;
    }
}
/* ===================== 등록 현황 대시보드 ===================== */
function toJSDate(ts) {
    if (!ts) return null;
    if (typeof ts.toDate === 'function') return ts.toDate();
    if (ts instanceof Date) return ts;
    return null;
}

function formatDashboardDate(date) {
    if (!date) return '-';
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const mi = String(date.getMinutes()).padStart(2, '0');
    return `${mm}.${dd} ${hh}:${mi}`;
}

// days가 null이면 전체 기간
function getDashboardRows(days) {
    const now = new Date();
    const cutoff = days ? new Date(now.getTime() - days * 24 * 60 * 60 * 1000) : null;

    return (window.allData || [])
        .map(item => ({ item, date: toJSDate(item.createdAt) }))
        .filter(({ date }) => !cutoff || (date && date >= cutoff))
        .sort((a, b) => {
            const ta = a.date ? a.date.getTime() : 0;
            const tb = b.date ? b.date.getTime() : 0;
            return tb - ta;
        });
}

// 문서(variation) 단위 목록을 groupId 기준으로 묶어, 대표 항목 1개 + 개수로 만든다.
// (등록 현황은 "품번이 몇 건 등록됐는지"가 자연스러운 단위라 variation이 아닌 그룹으로 센다)
function getDashboardGroupRows(days) {
    const rows = getDashboardRows(days);
    const seen = new Set();
    const grouped = [];
    rows.forEach(({ item, date }) => {
        const gKey = getGroupKey(item);
        if (seen.has(gKey)) return;
        seen.add(gKey);
        const siblings = getGroupSiblings(item);
        grouped.push({ item: siblings[0] || item, date, count: siblings.length });
    });
    return grouped;
}

function renderDashboardStats() {
    const weekRows = getDashboardGroupRows(7);
    const monthRows = getDashboardGroupRows(30);
    const allRows = getDashboardGroupRows(null);
    document.getElementById('dashWeekCount').innerText = weekRows.length.toLocaleString() + '건';
    document.getElementById('dashMonthCount').innerText = monthRows.length.toLocaleString() + '건';
    document.getElementById('dashTotalCount').innerText = allRows.length.toLocaleString() + '건';
}

// 이메일에서 @ 뒤 도메인을 잘라내고 아이디만 반환 (등록자 표시용)
function formatRegistrarName(createdBy) {
    if (!createdBy) return '-';
    const at = createdBy.indexOf('@');
    return at > -1 ? createdBy.slice(0, at) : createdBy;
}

function renderDashboardTable() {
    const periodSelect = document.getElementById('dashPeriodSelect');
    const days = periodSelect && periodSelect.value ? parseInt(periodSelect.value, 10) : null;
    const rows = getDashboardGroupRows(days);
    const tbody = document.getElementById('dashTableBody');
    if (!tbody) return;

    if (rows.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:60px 0; color:#999;">등록된 항목이 없습니다.</td></tr>`;
        return;
    }

    tbody.innerHTML = rows.map(({ item, date, count }) => `
        <tr class="dash-row" onclick="handleDashboardRowClick('${item._key}')">
            <td><img class="dash-thumb" src="${item.image || ''}" onerror="this.style.visibility='hidden'"></td>
            <td>${item.title || '-'}${count > 1 ? ` <span class="dash-count-badge">${count}종</span>` : ''}</td>
            <td>${item.brand || '-'}</td>
            <td>${item.season || '-'}</td>
            <td>${formatRegistrarName(item.createdBy)}</td>
            <td>${formatDashboardDate(date)}</td>
        </tr>
    `).join('');
}

function handleDashboardRowClick(key) {
    closeDashboard();
    updateDetailPanel(key);
}

function openDashboard() {
    renderDashboardStats();
    renderDashboardTable();
    const overlay = document.getElementById('dashboardOverlay');
    if (overlay) overlay.classList.add('open');
}

function closeDashboard() {
    const overlay = document.getElementById('dashboardOverlay');
    if (overlay) overlay.classList.remove('open');
}