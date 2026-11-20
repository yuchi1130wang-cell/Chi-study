import {defaults, type Plan} from './model';
// 使用 Firebase 官方瀏覽器模組，GitHub Pages 不需要後端伺服器。
// @ts-ignore remote browser module
import {initializeApp} from 'https://www.gstatic.com/firebasejs/13.4.0/firebase-app.js';
// @ts-ignore remote browser module
import {getAuth,GoogleAuthProvider,signInWithPopup,signOut,onAuthStateChanged} from 'https://www.gstatic.com/firebasejs/13.4.0/firebase-auth.js';
// @ts-ignore remote browser module
import {getFirestore,doc,getDocFromServer,onSnapshot,runTransaction,serverTimestamp} from 'https://www.gstatic.com/firebasejs/13.4.0/firebase-firestore.js';
export type Result={plan:Plan;version:number;updatedAt:string;canEdit:boolean};
export const identity={uid:'',name:'',canEdit:false};
let auth:any,db:any,ref:any,initPromise:Promise<void>|undefined,unsubscribe:any;
const config=()=> (window as any).STUDY_CONFIG;
export const configured=()=>!!(config()?.firebase?.apiKey&&config()?.firebase?.projectId&&config()?.firebase?.authDomain&&config()?.firebase?.appId);
const changed=()=>window.dispatchEvent(new Event('study-cloud-changed'));
export function friendly(e:any){const c=e?.code??'';if(c==='permission-denied')return '資料庫尚未開放讀取，或此帳號沒有修改權限。請檢查 Firebase 規則與管理員 UID。';if(c==='auth/unauthorized-domain')return '請在 Firebase Authentication 的授權網域加入目前 GitHub Pages 網域。';if(c==='auth/popup-blocked')return '瀏覽器阻擋了登入視窗，請允許彈出視窗後再試。';if(c==='auth/popup-closed-by-user')return '登入視窗已關閉，尚未登入。';if(c==='auth/operation-not-allowed')return '請先在 Firebase Authentication 啟用 Google 登入。';if(c==='unavailable'||c==='auth/network-request-failed')return '目前無法連線；這次勾選尚未存入雲端，請恢復網路後重試。';return e?.message||'暫時無法連線，請重試。'}
export function init(){if(initPromise)return initPromise;if(!configured())return Promise.reject(Error('尚未連接 Firebase。請先依 README 設定 firebase-config.js；目前顯示預設計畫。'));
 initPromise=new Promise<void>((resolve)=>{const app=initializeApp(config().firebase);auth=getAuth(app);db=getFirestore(app);ref=doc(db,'studyPlans','main');let first=true;onAuthStateChanged(auth,(user:any)=>{identity.uid=user?.uid??'';identity.name=user?.displayName??'';identity.canEdit=!!user&&!!config().adminUid&&user.uid===config().adminUid;if(first){first=false;resolve()}changed()});});return initPromise;}
function result(s:any):Result{const d=s.data();if(!d||!d.plan||!Number.isInteger(d.version))throw Error('雲端計畫格式不正確，請先檢查資料。');return {plan:d.plan,version:d.version,updatedAt:d.updatedAt?.toDate?.().toISOString()??'',canEdit:identity.canEdit};}
export async function read(){await init();let snap=await getDocFromServer(ref);if(!snap.exists()){if(!identity.canEdit)throw Error(identity.uid?'尚未建立計畫。請將管理員 UID 填入設定並發布資料庫規則，再重新整理。':'尚未建立計畫，請由奇登入 Google 並完成首次設定。');await runTransaction(db,async(t:any)=>{const latest=await t.get(ref);if(!latest.exists())t.set(ref,{plan:structuredClone(defaults),version:0,updatedAt:serverTimestamp()})});snap=await getDocFromServer(ref)}return result(snap)}
export async function watch(onChange:()=>void,onError:(error:string)=>void){await init();unsubscribe=onSnapshot(ref,{includeMetadataChanges:true},(s:any)=>{if(!s.metadata.hasPendingWrites&&!s.metadata.fromCache&&s.exists())onChange()},(e:any)=>onError(friendly(e)));return ()=>unsubscribe?.()}
export async function write(plan:Plan,expectedVersion:number){await init();if(!identity.canEdit)throw Error('只有奇的管理員帳號可以修改。');await runTransaction(db,async(t:any)=>{const snap=await t.get(ref);if(!snap.exists())throw Error('計畫尚未建立，請先重新整理。');if(snap.data().version!==expectedVersion)throw Object.assign(Error('另一台裝置已更新進度，已重新載入；請再勾選一次。'),{code:'study/conflict'});t.set(ref,{plan,version:expectedVersion+1,updatedAt:serverTimestamp()})});return read()}
export async function login(){await init();const p=new GoogleAuthProvider();p.setCustomParameters({prompt:'select_account'});await signInWithPopup(auth,p)}
export async function logout(){await init();await signOut(auth)}
