import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  initializeFirestore,
  memoryLocalCache,
  collection,
  doc,
  setDoc,
  getDoc,
  onSnapshot,
  getDocs,
  deleteDoc,
  writeBatch,
  query,
  where,
  orderBy,
  documentId,
  limit,
  startAfter,
  getCountFromServer
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  setPersistence,
  browserSessionPersistence,
  browserLocalPersistence,
  getIdTokenResult
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFunctions, httpsCallable } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-functions.js";
import {
  initializeAppCheck,
  ReCaptchaEnterpriseProvider
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app-check.js";

const firebaseConfig = {
  apiKey: "AIzaSyCzvPwTbxc_Lg7peKRgP0zUrlmI6kkE0b4",
  authDomain: "seal-management-68465.firebaseapp.com",
  projectId: "seal-management-68465",
  storageBucket: "seal-management-68465.firebasestorage.app",
  messagingSenderId: "933578260928",
  appId: "1:933578260928:web:68a9a6cc81be82ffbf0825"
};

const app = initializeApp(firebaseConfig);
const db = initializeFirestore(app, {
  // 公文可能含內部資訊，只保留記憶體快取；關閉分頁後不留 IndexedDB 離線副本。
  localCache: memoryLocalCache()
}, "document-management");
const auth = getAuth(app);
const functions = getFunctions(app, "asia-east1");

const appCheckKey = String(window.documentManagementConfig?.recaptchaEnterpriseSiteKey || '').trim();
if (appCheckKey) {
  initializeAppCheck(app, {
    provider: new ReCaptchaEnterpriseProvider(appCheckKey),
    isTokenAutoRefreshEnabled: true
  });
} else {
  console.warn('Firebase App Check is not configured; account-management functions will reject production calls.');
}

// 使用者可自行選擇是否在受信任裝置跨分頁保存登入；永不保存帳號或密碼。
const rememberLogin = (() => {
  try { return localStorage.getItem('dispatch_remember_login') === '1'; }
  catch (error) { return false; }
})();
await setPersistence(auth, rememberLogin ? browserLocalPersistence : browserSessionPersistence);

window.firebaseAPI = {
  db,
  auth,
  functions,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  setPersistence,
  browserSessionPersistence,
  browserLocalPersistence,
  getIdTokenResult,
  httpsCallable,
  collection,
  doc,
  setDoc,
  getDoc,
  onSnapshot,
  getDocs,
  deleteDoc,
  writeBatch,
  query,
  where,
  orderBy,
  documentId,
  limit,
  startAfter,
  getCountFromServer
};

window.dispatchEvent(new Event("firebase-ready"));
