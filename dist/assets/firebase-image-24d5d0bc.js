/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const de=function(t){const e=[];let n=0;for(let s=0;s<t.length;s++){let r=t.charCodeAt(s);r<128?e[n++]=r:r<2048?(e[n++]=r>>6|192,e[n++]=r&63|128):(r&64512)===55296&&s+1<t.length&&(t.charCodeAt(s+1)&64512)===56320?(r=65536+((r&1023)<<10)+(t.charCodeAt(++s)&1023),e[n++]=r>>18|240,e[n++]=r>>12&63|128,e[n++]=r>>6&63|128,e[n++]=r&63|128):(e[n++]=r>>12|224,e[n++]=r>>6&63|128,e[n++]=r&63|128)}return e},we=function(t){const e=[];let n=0,s=0;for(;n<t.length;){const r=t[n++];if(r<128)e[s++]=String.fromCharCode(r);else if(r>191&&r<224){const a=t[n++];e[s++]=String.fromCharCode((r&31)<<6|a&63)}else if(r>239&&r<365){const a=t[n++],o=t[n++],l=t[n++],i=((r&7)<<18|(a&63)<<12|(o&63)<<6|l&63)-65536;e[s++]=String.fromCharCode(55296+(i>>10)),e[s++]=String.fromCharCode(56320+(i&1023))}else{const a=t[n++],o=t[n++];e[s++]=String.fromCharCode((r&15)<<12|(a&63)<<6|o&63)}}return e.join("")},De={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let r=0;r<t.length;r+=3){const a=t[r],o=r+1<t.length,l=o?t[r+1]:0,i=r+2<t.length,c=i?t[r+2]:0,u=a>>2,m=(a&3)<<4|l>>4;let h=(l&15)<<2|c>>6,f=c&63;i||(f=64,o||(h=64)),s.push(n[u],n[m],n[h],n[f])}return s.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(de(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):we(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let r=0;r<t.length;){const a=n[t.charAt(r++)],l=r<t.length?n[t.charAt(r)]:0;++r;const c=r<t.length?n[t.charAt(r)]:64;++r;const m=r<t.length?n[t.charAt(r)]:64;if(++r,a==null||l==null||c==null||m==null)throw new Re;const h=a<<2|l>>4;if(s.push(h),c!==64){const f=l<<4&240|c>>2;if(s.push(f),m!==64){const p=c<<6&192|m;s.push(p)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class Re extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const ve=function(t){const e=de(t);return De.encodeByteArray(e,!0)},fe=function(t){return ve(t).replace(/\./g,"")};function Ae(){try{return typeof indexedDB=="object"}catch{return!1}}function Ce(){return new Promise((t,e)=>{try{let n=!0;const s="validate-browser-context-for-indexeddb-analytics-module",r=self.indexedDB.open(s);r.onsuccess=()=>{r.result.close(),n||self.indexedDB.deleteDatabase(s),t(!0)},r.onupgradeneeded=()=>{n=!1},r.onerror=()=>{var a;e(((a=r.error)===null||a===void 0?void 0:a.message)||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ke="FirebaseError";class v extends Error{constructor(e,n,s){super(n),this.code=e,this.customData=s,this.name=ke,Object.setPrototypeOf(this,v.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,me.prototype.create)}}class me{constructor(e,n,s){this.service=e,this.serviceName=n,this.errors=s}create(e,...n){const s=n[0]||{},r=`${this.service}/${e}`,a=this.errors[e],o=a?Se(a,s):"Error",l=`${this.serviceName}: ${o} (${r}).`;return new v(r,l,s)}}function Se(t,e){return t.replace(Oe,(n,s)=>{const r=e[s];return r!=null?String(r):`<${s}?>`})}const Oe=/\{\$([^}]+)}/g;class L{constructor(e,n,s){this.name=e,this.instanceFactory=n,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var d;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(d||(d={}));const Be={debug:d.DEBUG,verbose:d.VERBOSE,info:d.INFO,warn:d.WARN,error:d.ERROR,silent:d.SILENT},Ne=d.INFO,Me={[d.DEBUG]:"log",[d.VERBOSE]:"log",[d.INFO]:"info",[d.WARN]:"warn",[d.ERROR]:"error"},Le=(t,e,...n)=>{if(e<t.logLevel)return;const s=new Date().toISOString(),r=Me[e];if(r)console[r](`[${s}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Pe{constructor(e){this.name=e,this._logLevel=Ne,this._logHandler=Le,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in d))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Be[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,d.DEBUG,...e),this._logHandler(this,d.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,d.VERBOSE,...e),this._logHandler(this,d.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,d.INFO,...e),this._logHandler(this,d.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,d.WARN,...e),this._logHandler(this,d.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,d.ERROR,...e),this._logHandler(this,d.ERROR,...e)}}const xe=(t,e)=>e.some(n=>t instanceof n);let J,Q;function He(){return J||(J=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Ue(){return Q||(Q=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const pe=new WeakMap,K=new WeakMap,ge=new WeakMap,F=new WeakMap,X=new WeakMap;function $e(t){const e=new Promise((n,s)=>{const r=()=>{t.removeEventListener("success",a),t.removeEventListener("error",o)},a=()=>{n(D(t.result)),r()},o=()=>{s(t.error),r()};t.addEventListener("success",a),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&pe.set(n,t)}).catch(()=>{}),X.set(e,t),e}function Fe(t){if(K.has(t))return;const e=new Promise((n,s)=>{const r=()=>{t.removeEventListener("complete",a),t.removeEventListener("error",o),t.removeEventListener("abort",o)},a=()=>{n(),r()},o=()=>{s(t.error||new DOMException("AbortError","AbortError")),r()};t.addEventListener("complete",a),t.addEventListener("error",o),t.addEventListener("abort",o)});K.set(t,e)}let q={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return K.get(t);if(e==="objectStoreNames")return t.objectStoreNames||ge.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return D(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function Ve(t){q=t(q)}function je(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const s=t.call(V(this),e,...n);return ge.set(s,e.sort?e.sort():[e]),D(s)}:Ue().includes(t)?function(...e){return t.apply(V(this),e),D(pe.get(this))}:function(...e){return D(t.apply(V(this),e))}}function We(t){return typeof t=="function"?je(t):(t instanceof IDBTransaction&&Fe(t),xe(t,He())?new Proxy(t,q):t)}function D(t){if(t instanceof IDBRequest)return $e(t);if(F.has(t))return F.get(t);const e=We(t);return e!==t&&(F.set(t,e),X.set(e,t)),e}const V=t=>X.get(t);function Ge(t,e,{blocked:n,upgrade:s,blocking:r,terminated:a}={}){const o=indexedDB.open(t,e),l=D(o);return s&&o.addEventListener("upgradeneeded",i=>{s(D(o.result),i.oldVersion,i.newVersion,D(o.transaction),i)}),n&&o.addEventListener("blocked",i=>n(i.oldVersion,i.newVersion,i)),l.then(i=>{a&&i.addEventListener("close",()=>a()),r&&i.addEventListener("versionchange",c=>r(c.oldVersion,c.newVersion,c))}).catch(()=>{}),l}const Ke=["get","getKey","getAll","getAllKeys","count"],qe=["put","add","delete","clear"],j=new Map;function ee(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(j.get(e))return j.get(e);const n=e.replace(/FromIndex$/,""),s=e!==n,r=qe.includes(n);if(!(n in(s?IDBIndex:IDBObjectStore).prototype)||!(r||Ke.includes(n)))return;const a=async function(o,...l){const i=this.transaction(o,r?"readwrite":"readonly");let c=i.store;return s&&(c=c.index(l.shift())),(await Promise.all([c[n](...l),r&&i.done]))[0]};return j.set(e,a),a}Ve(t=>({...t,get:(e,n,s)=>ee(e,n)||t.get(e,n,s),has:(e,n)=>!!ee(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ze{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(Ye(n)){const s=n.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(n=>n).join(" ")}}function Ye(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const z="@firebase/app",te="0.9.25";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const R=new Pe("@firebase/app"),Xe="@firebase/app-compat",Ze="@firebase/analytics-compat",Je="@firebase/analytics",Qe="@firebase/app-check-compat",et="@firebase/app-check",tt="@firebase/auth",nt="@firebase/auth-compat",rt="@firebase/database",st="@firebase/database-compat",at="@firebase/functions",ot="@firebase/functions-compat",it="@firebase/installations",ct="@firebase/installations-compat",lt="@firebase/messaging",ht="@firebase/messaging-compat",ut="@firebase/performance",dt="@firebase/performance-compat",ft="@firebase/remote-config",mt="@firebase/remote-config-compat",pt="@firebase/storage",gt="@firebase/storage-compat",_t="@firebase/firestore",bt="@firebase/firestore-compat",Et="firebase",yt="10.7.1",It={[z]:"fire-core",[Xe]:"fire-core-compat",[Je]:"fire-analytics",[Ze]:"fire-analytics-compat",[et]:"fire-app-check",[Qe]:"fire-app-check-compat",[tt]:"fire-auth",[nt]:"fire-auth-compat",[rt]:"fire-rtdb",[st]:"fire-rtdb-compat",[at]:"fire-fn",[ot]:"fire-fn-compat",[it]:"fire-iid",[ct]:"fire-iid-compat",[lt]:"fire-fcm",[ht]:"fire-fcm-compat",[ut]:"fire-perf",[dt]:"fire-perf-compat",[ft]:"fire-rc",[mt]:"fire-rc-compat",[pt]:"fire-gcs",[gt]:"fire-gcs-compat",[_t]:"fire-fst",[bt]:"fire-fst-compat","fire-js":"fire-js",[Et]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tt=new Map,ne=new Map;function wt(t,e){try{t.container.addComponent(e)}catch(n){R.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function P(t){const e=t.name;if(ne.has(e))return R.debug(`There were multiple attempts to register component ${e}.`),!1;ne.set(e,t);for(const n of Tt.values())wt(n,t);return!0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dt={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}."},Z=new me("app","Firebase",Dt);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rt=yt;function C(t,e,n){var s;let r=(s=It[t])!==null&&s!==void 0?s:t;n&&(r+=`-${n}`);const a=r.match(/\s|\//),o=e.match(/\s|\//);if(a||o){const l=[`Unable to register library "${r}" with version "${e}":`];a&&l.push(`library name "${r}" contains illegal characters (whitespace or "/")`),a&&o&&l.push("and"),o&&l.push(`version name "${e}" contains illegal characters (whitespace or "/")`),R.warn(l.join(" "));return}P(new L(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vt="firebase-heartbeat-database",At=1,k="firebase-heartbeat-store";let W=null;function _e(){return W||(W=Ge(vt,At,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(k)}}}).catch(t=>{throw Z.create("idb-open",{originalErrorMessage:t.message})})),W}async function Ct(t){try{return await(await _e()).transaction(k).objectStore(k).get(be(t))}catch(e){if(e instanceof v)R.warn(e.message);else{const n=Z.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});R.warn(n.message)}}}async function re(t,e){try{const s=(await _e()).transaction(k,"readwrite");await s.objectStore(k).put(e,be(t)),await s.done}catch(n){if(n instanceof v)R.warn(n.message);else{const s=Z.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});R.warn(s.message)}}}function be(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kt=1024,St=30*24*60*60*1e3;class Ot{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new Nt(n),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){var e,n;const r=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),a=se();if(!(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null))&&!(this._heartbeatsCache.lastSentHeartbeatDate===a||this._heartbeatsCache.heartbeats.some(o=>o.date===a)))return this._heartbeatsCache.heartbeats.push({date:a,agent:r}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{const l=new Date(o.date).valueOf();return Date.now()-l<=St}),this._storage.overwrite(this._heartbeatsCache)}async getHeartbeatsHeader(){var e;if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=se(),{heartbeatsToSend:s,unsentEntries:r}=Bt(this._heartbeatsCache.heartbeats),a=fe(JSON.stringify({version:2,heartbeats:s}));return this._heartbeatsCache.lastSentHeartbeatDate=n,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),a}}function se(){return new Date().toISOString().substring(0,10)}function Bt(t,e=kt){const n=[];let s=t.slice();for(const r of t){const a=n.find(o=>o.agent===r.agent);if(a){if(a.dates.push(r.date),ae(n)>e){a.dates.pop();break}}else if(n.push({agent:r.agent,dates:[r.date]}),ae(n)>e){n.pop();break}s=s.slice(1)}return{heartbeatsToSend:n,unsentEntries:s}}class Nt{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Ae()?Ce().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await Ct(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const r=await this.read();return re(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const r=await this.read();return re(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function ae(t){return fe(JSON.stringify({version:2,heartbeats:t})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mt(t){P(new L("platform-logger",e=>new ze(e),"PRIVATE")),P(new L("heartbeat",e=>new Ot(e),"PRIVATE")),C(z,te,t),C(z,te,"esm2017"),C("fire-js","")}Mt("");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ee="firebasestorage.googleapis.com",Lt="storageBucket",Pt=2*60*1e3,xt=10*60*1e3;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class y extends v{constructor(e,n,s=0){super(G(e),`Firebase Storage: ${n} (${G(e)})`),this.status_=s,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,y.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return G(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var E;(function(t){t.UNKNOWN="unknown",t.OBJECT_NOT_FOUND="object-not-found",t.BUCKET_NOT_FOUND="bucket-not-found",t.PROJECT_NOT_FOUND="project-not-found",t.QUOTA_EXCEEDED="quota-exceeded",t.UNAUTHENTICATED="unauthenticated",t.UNAUTHORIZED="unauthorized",t.UNAUTHORIZED_APP="unauthorized-app",t.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",t.INVALID_CHECKSUM="invalid-checksum",t.CANCELED="canceled",t.INVALID_EVENT_NAME="invalid-event-name",t.INVALID_URL="invalid-url",t.INVALID_DEFAULT_BUCKET="invalid-default-bucket",t.NO_DEFAULT_BUCKET="no-default-bucket",t.CANNOT_SLICE_BLOB="cannot-slice-blob",t.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",t.NO_DOWNLOAD_URL="no-download-url",t.INVALID_ARGUMENT="invalid-argument",t.INVALID_ARGUMENT_COUNT="invalid-argument-count",t.APP_DELETED="app-deleted",t.INVALID_ROOT_OPERATION="invalid-root-operation",t.INVALID_FORMAT="invalid-format",t.INTERNAL_ERROR="internal-error",t.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(E||(E={}));function G(t){return"storage/"+t}function Ht(){const t="An unknown error occurred, please check the error payload for server response.";return new y(E.UNKNOWN,t)}function Ut(){return new y(E.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function $t(){return new y(E.CANCELED,"User canceled the upload/download.")}function Ft(t){return new y(E.INVALID_URL,"Invalid URL '"+t+"'.")}function Vt(t){return new y(E.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+t+"'.")}function oe(t){return new y(E.INVALID_ARGUMENT,t)}function ye(){return new y(E.APP_DELETED,"The Firebase app was deleted.")}function jt(t){return new y(E.INVALID_ROOT_OPERATION,"The operation '"+t+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class b{constructor(e,n){this.bucket=e,this.path_=n}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,n){let s;try{s=b.makeFromUrl(e,n)}catch{return new b(e,"")}if(s.path==="")return s;throw Vt(e)}static makeFromUrl(e,n){let s=null;const r="([A-Za-z0-9.\\-_]+)";function a(_){_.path.charAt(_.path.length-1)==="/"&&(_.path_=_.path_.slice(0,-1))}const o="(/(.*))?$",l=new RegExp("^gs://"+r+o,"i"),i={bucket:1,path:3};function c(_){_.path_=decodeURIComponent(_.path)}const u="v[A-Za-z0-9_]+",m=n.replace(/[.]/g,"\\."),h="(/([^?#]*).*)?$",f=new RegExp(`^https?://${m}/${u}/b/${r}/o${h}`,"i"),p={bucket:1,path:3},I=n===Ee?"(?:storage.googleapis.com|storage.cloud.google.com)":n,g="([^?#]*)",T=new RegExp(`^https?://${I}/${r}/${g}`,"i"),w=[{regex:l,indices:i,postModify:a},{regex:f,indices:p,postModify:c},{regex:T,indices:{bucket:1,path:2},postModify:c}];for(let _=0;_<w.length;_++){const S=w[_],U=S.regex.exec(e);if(U){const Te=U[S.indices.bucket];let $=U[S.indices.path];$||($=""),s=new b(Te,$),S.postModify(s);break}}if(s==null)throw Ft(e);return s}}class Wt{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gt(t,e,n){let s=1,r=null,a=null,o=!1,l=0;function i(){return l===2}let c=!1;function u(...g){c||(c=!0,e.apply(null,g))}function m(g){r=setTimeout(()=>{r=null,t(f,i())},g)}function h(){a&&clearTimeout(a)}function f(g,...T){if(c){h();return}if(g){h(),u.call(null,g,...T);return}if(i()||o){h(),u.call(null,g,...T);return}s<64&&(s*=2);let w;l===1?(l=2,w=0):w=(s+Math.random())*1e3,m(w)}let p=!1;function I(g){p||(p=!0,h(),!c&&(r!==null?(g||(l=2),clearTimeout(r),m(0)):g||(l=1)))}return m(0),a=setTimeout(()=>{o=!0,I(!0)},n),I}function Kt(t){t(!1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qt(t){return t!==void 0}function ie(t,e,n,s){if(s<e)throw oe(`Invalid value for '${t}'. Expected ${e} or greater.`);if(s>n)throw oe(`Invalid value for '${t}'. Expected ${n} or less.`)}function zt(t){const e=encodeURIComponent;let n="?";for(const s in t)if(t.hasOwnProperty(s)){const r=e(s)+"="+e(t[s]);n=n+r+"&"}return n=n.slice(0,-1),n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var x;(function(t){t[t.NO_ERROR=0]="NO_ERROR",t[t.NETWORK_ERROR=1]="NETWORK_ERROR",t[t.ABORT=2]="ABORT"})(x||(x={}));/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yt(t,e){const n=t>=500&&t<600,r=[408,429].indexOf(t)!==-1,a=e.indexOf(t)!==-1;return n||r||a}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xt{constructor(e,n,s,r,a,o,l,i,c,u,m,h=!0){this.url_=e,this.method_=n,this.headers_=s,this.body_=r,this.successCodes_=a,this.additionalRetryCodes_=o,this.callback_=l,this.errorCallback_=i,this.timeout_=c,this.progressCallback_=u,this.connectionFactory_=m,this.retry=h,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((f,p)=>{this.resolve_=f,this.reject_=p,this.start_()})}start_(){const e=(s,r)=>{if(r){s(!1,new O(!1,null,!0));return}const a=this.connectionFactory_();this.pendingConnection_=a;const o=l=>{const i=l.loaded,c=l.lengthComputable?l.total:-1;this.progressCallback_!==null&&this.progressCallback_(i,c)};this.progressCallback_!==null&&a.addUploadProgressListener(o),a.send(this.url_,this.method_,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&a.removeUploadProgressListener(o),this.pendingConnection_=null;const l=a.getErrorCode()===x.NO_ERROR,i=a.getStatus();if(!l||Yt(i,this.additionalRetryCodes_)&&this.retry){const u=a.getErrorCode()===x.ABORT;s(!1,new O(!1,null,u));return}const c=this.successCodes_.indexOf(i)!==-1;s(!0,new O(c,a))})},n=(s,r)=>{const a=this.resolve_,o=this.reject_,l=r.connection;if(r.wasSuccessCode)try{const i=this.callback_(l,l.getResponse());qt(i)?a(i):a()}catch(i){o(i)}else if(l!==null){const i=Ht();i.serverResponse=l.getErrorText(),this.errorCallback_?o(this.errorCallback_(l,i)):o(i)}else if(r.canceled){const i=this.appDelete_?ye():$t();o(i)}else{const i=Ut();o(i)}};this.canceled_?n(!1,new O(!1,null,!0)):this.backoffId_=Gt(e,n,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&Kt(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class O{constructor(e,n,s){this.wasSuccessCode=e,this.connection=n,this.canceled=!!s}}function Zt(t,e){e!==null&&e.length>0&&(t.Authorization="Firebase "+e)}function Jt(t,e){t["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function Qt(t,e){e&&(t["X-Firebase-GMPID"]=e)}function en(t,e){e!==null&&(t["X-Firebase-AppCheck"]=e)}function tn(t,e,n,s,r,a,o=!0){const l=zt(t.urlParams),i=t.url+l,c=Object.assign({},t.headers);return Qt(c,e),Zt(c,n),Jt(c,a),en(c,s),new Xt(i,t.method,c,t.body,t.successCodes,t.additionalRetryCodes,t.handler,t.errorHandler,t.timeout,t.progressCallback,r,o)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nn(t){if(t.length===0)return null;const e=t.lastIndexOf("/");return e===-1?"":t.slice(0,e)}function rn(t){const e=t.lastIndexOf("/",t.length-2);return e===-1?t:t.slice(e+1)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class H{constructor(e,n){this._service=e,n instanceof b?this._location=n:this._location=b.makeFromUrl(n,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,n){return new H(e,n)}get root(){const e=new b(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return rn(this._location.path)}get storage(){return this._service}get parent(){const e=nn(this._location.path);if(e===null)return null;const n=new b(this._location.bucket,e);return new H(this._service,n)}_throwIfRoot(e){if(this._location.path==="")throw jt(e)}}function ce(t,e){const n=e==null?void 0:e[Lt];return n==null?null:b.makeFromBucketSpec(n,t)}class sn{constructor(e,n,s,r,a){this.app=e,this._authProvider=n,this._appCheckProvider=s,this._url=r,this._firebaseVersion=a,this._bucket=null,this._host=Ee,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=Pt,this._maxUploadRetryTime=xt,this._requests=new Set,r!=null?this._bucket=b.makeFromBucketSpec(r,this._host):this._bucket=ce(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=b.makeFromBucketSpec(this._url,e):this._bucket=ce(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){ie("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){ie("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const n=await e.getToken();if(n!==null)return n.accessToken}return null}async _getAppCheckToken(){const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new H(this,e)}_makeRequest(e,n,s,r,a=!0){if(this._deleted)return new Wt(ye());{const o=tn(e,this._appId,s,r,n,this._firebaseVersion,a);return this._requests.add(o),o.getPromise().then(()=>this._requests.delete(o),()=>this._requests.delete(o)),o}}async makeRequestWithTokens(e,n){const[s,r]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,n,s,r).getPromise()}}const le="@firebase/storage",he="0.12.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const an="storage";function on(t,{instanceIdentifier:e}){const n=t.getProvider("app").getImmediate(),s=t.getProvider("auth-internal"),r=t.getProvider("app-check-internal");return new sn(n,s,r,e,Rt)}function cn(){P(new L(an,on,"PUBLIC").setMultipleInstances(!0)),C(le,he,""),C(le,he,"esm2017")}cn();var ln=document.querySelector(".fileText"),hn=document.querySelector(".uploadPercentage"),un=document.querySelector(".progress"),B,Y,Ie;const dn={apiKey:"AIzaSyDfPi21no_LTdi5szygldb0jF6l_ZDj9HQ",authDomain:"memeprojectimage.firebaseapp.com",projectId:"memeprojectimage",storageBucket:"memeprojectimage.appspot.com",messagingSenderId:"483003395248",appId:"1:483003395248:web:31c748750795d997ed1f75"};firebase.initializeApp(dn);window.getFileTo=function(t){Y=t.target.files[0],Ie=Y.name};window.uploadImageTo=function(){let t=firebase.storage().ref("images/"+Ie);const e={customMetadata:{like_number:0}};let n=t.put(Y,e);n.on("state_changed",function(s){console.log(s),B=Math.floor(s.bytesTransferred/s.totalBytes*100),console.log(B),hn.innerHTML=B+"%",un.style.width=B+"%"},s=>{console.log(s)},()=>{n.snapshot.ref.getDownloadURL().then(s=>{ln.src=s})})};const fn=document.querySelector(".background img");document.createElement("div");let N,ue=0,M=0;window.getImageFrom=function(){var t=firebase.storage().ref("images");const e=document.querySelector(".like");let n=[],s=0;t.listAll().then(function(c){c.items.forEach(function(u){n.push(u),s++})}).then(function(){r(n)}).catch(function(c){});function r(c){const u=document.createElement("div");u.className="meme-container3",document.body.appendChild(u),c.forEach(function(m,h){a(m,h,u)})}function a(c,u,m){const h=document.createElement("div");h.className="meme-item",h.id="meme-item-"+u,h.innerHTML=`
          <div class="gaze-1">
              <div class="gaze-2"></div>
          </div>
          <div class="meme-image">
              <img src="">
          </div>
        `,h.style.animationDelay=-u*3+"s",m.appendChild(h);const f=h.querySelector(".meme-image img"),p=h.querySelector(".gaze-2"),I=document.getElementById("memepng"),g=document.getElementById("totalmeme2");g.innerHTML="Total number of meme : "+s,c.getDownloadURL().then(function(T){f.src=T,fn.src=T}),c.getMetadata().then(function(T){const A=T.customMetadata.like_number;console.log(A),M+=parseInt(A);const w=document.getElementById("totalmeme");w.innerHTML="Total number of like : "+M,p.style.width=Math.floor(A*.85)+"%"}),f.addEventListener("click",function(){l(f.src),ue=u,I.innerHTML=c.name})}let o=null;function l(c){const u=document.querySelector(".meme-clicked img");(()=>new Promise((h,f)=>{const p=async I=>{await I.getDownloadURL()===c&&h(I)};Promise.all(n.map(p)).then(()=>{f(new Error("매칭되는 이미지를 찾을 수 없습니다."))})}))().then(h=>{console.log("매칭된 imageRef:",h),h.getMetadata().then(function(p){N=p.customMetadata.like_number}),o&&e.removeEventListener("click",o);const f=i.bind(null,h);e.addEventListener("click",f),o=f}).catch(h=>{h.message.includes("429")?(console.log("요청 속도 제한 초과. 기다린 후 다시 시도합니다."),setTimeout(()=>{l(c)},5e3)):console.error(h.message)}),u.src=c}function i(c){N++,console.log(N);const u={customMetadata:{like_number:N}},m=document.getElementById("totalmeme");m.innerHTML="Total number of ♥LIKE♥  : "+M,c.updateMetadata(u).then(()=>{console.log("Like clicked. Metadata updated."),c.getMetadata().then(function(h){const f=h.customMetadata.like_number;console.log(f);const p=document.querySelector("#meme-item-"+ue+" .gaze-2");p.style.width=Math.floor(f*.7)+"%",console.log(M)})})}window.addEventListener("load",function(){e.removeEventListener("click",o)})};
//# sourceMappingURL=firebase-image-24d5d0bc.js.map
