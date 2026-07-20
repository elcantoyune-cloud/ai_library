// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD9D2dezFKkocxoNvS-6ndmD6Uv0vMgVVs",
  authDomain: "ai-visual-library.firebaseapp.com",
  projectId: "ai-visual-library",
  storageBucket: "ai-visual-library.firebasestorage.app",
  messagingSenderId: "630307012683",
  appId: "1:630307012683:web:a791701ec098f6841f8dce",
  measurementId: "G-GMBEXSQCPK"
};

firebase.initializeApp(firebaseConfig);
window.db = firebase.firestore();
window.auth = firebase.auth();
window.db.settings({
  experimentalAutoDetectLongPolling: true,
  useFetchStreams: false
});