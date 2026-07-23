// ===== PWA 설치 공통 스크립트 =====
// index.html, install.html 양쪽에서 공통으로 사용합니다.

// 1) 서비스 워커 등록 (설치 가능한 PWA가 되려면 필수)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').catch((err) => {
            console.warn('Service worker 등록 실패:', err);
        });
    });
}

// 2) 크롬/안드로이드의 "설치 가능" 이벤트를 저장해뒀다가,
//    우리가 원하는 타이밍(버튼 클릭)에 직접 설치 창을 띄운다.
window.deferredInstallPrompt = null;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    window.deferredInstallPrompt = e;
    document.dispatchEvent(new CustomEvent('pwa-install-available'));
});

window.addEventListener('appinstalled', () => {
    window.deferredInstallPrompt = null;
    document.dispatchEvent(new CustomEvent('pwa-installed'));
});

// 3) 어디서든 호출 가능한 공용 설치 트리거
window.triggerPwaInstall = async function () {
    if (!window.deferredInstallPrompt) return 'unavailable';
    window.deferredInstallPrompt.prompt();
    const { outcome } = await window.deferredInstallPrompt.userChoice;
    window.deferredInstallPrompt = null;
    return outcome; // 'accepted' | 'dismissed'
};

// 4) 이미 설치되어 실행 중인지(standalone) 여부
window.isPwaInstalled = function () {
    return window.matchMedia('(display-mode: standalone)').matches
        || window.navigator.standalone === true;
};
