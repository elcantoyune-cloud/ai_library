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
function compressImageIfNeeded(file, maxDimension = 2200, quality = 0.85, thresholdMB = 2) {
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
        const subFiles = Array.from(form.subImages.files || []);
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