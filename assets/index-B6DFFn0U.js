var N=n=>{throw TypeError(n)};var R=(n,e,t)=>e.has(n)||N("Cannot "+t);var o=(n,e,t)=>(R(n,e,"read from private field"),t?t.call(n):e.get(n)),s=(n,e,t)=>e.has(n)?N("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(n):e.set(n,t),c=(n,e,t,i)=>(R(n,e,"write to private field"),i?i.call(n,t):e.set(n,t),t),y=(n,e,t)=>(R(n,e,"access private method"),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function t(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(r){if(r.ep)return;r.ep=!0;const a=t(r);fetch(r.href,a)}})();const x={BASE_URL:"https://story-api.dicoding.dev/v1"},C={GET_ALL_STORIES:`${x.BASE_URL}/stories?location=1`,LOGIN:`${x.BASE_URL}/login`,REGISTER:`${x.BASE_URL}/register`};async function F(n){return(await(await fetch(C.GET_ALL_STORIES,{headers:{Authorization:`Bearer ${n}`}})).json()).listStory}async function U(n,e){const i=await(await fetch(C.LOGIN,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:n,password:e})})).json();if(i.error)throw new Error(i.message);return i}async function z(n,e,t){const r=await(await fetch(C.REGISTER,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:n,email:e,password:t})})).json();if(r.error)throw new Error(r.message);return r}var g,E;class J{constructor({view:e,token:t}){s(this,g);s(this,E);c(this,g,e),c(this,E,t)}async showStories(){try{const e=await F(o(this,E));if(!e||!Array.isArray(e)||e.length===0){o(this,g).showEmptyState();return}o(this,g).showStoriesOnList(e),o(this,g).showStoriesOnMap(e)}catch(e){console.error("Gagal mengambil cerita:",e),o(this,g).showErrorState()}}}g=new WeakMap,E=new WeakMap;var T;class V{constructor(){s(this,T)}async render(){return`
      <section class="container">
        <h1>Beranda Cerita</h1>
        <div id="story-list" class="story-list">Memuat cerita...</div>

        <h2 style="margin-top: 40px;">Peta Cerita</h2>
        <div id="map" style="height: 400px; margin-top: 16px; border-radius: 8px;"></div>
      </section>
    `}async afterRender(){const e=localStorage.getItem("authToken");if(!e){const t=document.querySelector("#story-list");t.innerHTML='<p>Anda belum login. Silakan <a href="#/login">login</a> terlebih dahulu.</p>';return}c(this,T,new J({view:this,token:e})),await o(this,T).showStories()}showStoriesOnList(e){const t=document.querySelector("#story-list");t.innerHTML=e.map(i=>`
      <article class="story-item">
        <img src="${i.photoUrl}" alt="Foto cerita oleh ${i.name}" class="story-image" />
        <h2>${i.name}</h2>
        <p>${i.description}</p>
        <small>Dibuat pada: ${new Date(i.createdAt).toLocaleDateString()}</small>
      </article>
    `).join("")}showStoriesOnMap(e){const t=document.getElementById("map");t._leaflet_id&&(t._leaflet_id=null,t.innerHTML="");const i=L.map("map").setView([-2.5489,118.0149],4);L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"&copy; OpenStreetMap contributors"}).addTo(i),e.forEach(r=>{r.lat&&r.lon&&L.marker([r.lat,r.lon]).addTo(i).bindPopup(`<strong>${r.name}</strong><br>${r.description}`)})}showEmptyState(){const e=document.querySelector("#story-list");e.innerHTML="<p>Tidak ada cerita ditemukan.</p>"}showErrorState(){const e=document.querySelector("#story-list");e.innerHTML="<p>Gagal memuat cerita. Silakan coba lagi nanti.</p>"}}T=new WeakMap;class K{async render(){return`
      <section class="container">
        <h1>About Page</h1>
      </section>
    `}async afterRender(){}}var f;class W{constructor(e){s(this,f);c(this,f,e)}async login(e,t){try{const i=await U(e,t);o(this,f).onLoginSuccess(i)}catch(i){o(this,f).onLoginError(i.message)}}}f=new WeakMap;var P;class Q{constructor(){s(this,P)}async render(){return`
      <section class="container">
        <h1>Login</h1>
        <form id="login-form">
          <label for="email">Email</label>
          <input type="email" id="email" required />

          <label for="password">Password</label>
          <input type="password" id="password" required minlength="8" />

          <button type="submit">Masuk</button>
        </form>
        <div id="login-message"></div>
        <p style="margin-top: 10px;">Belum punya akun? <a href="#/register">Daftar di sini</a>.</p>
      </section>
    `}async afterRender(){c(this,P,new W(this));const e=document.querySelector("#login-form");e.addEventListener("submit",t=>{t.preventDefault();const i=e.email.value,r=e.password.value;o(this,P).login(i,r)})}onLoginSuccess(e){localStorage.setItem("authToken",e.loginResult.token),document.getElementById("login-message").textContent="Login berhasil!",setTimeout(()=>{window.updateNav(),location.hash="#/"},1e3)}onLoginError(e){document.getElementById("login-message").textContent="Login gagal: "+e}}P=new WeakMap;var m,B,w,h,b,d,D,H,_,$;class Y{constructor({view:e,token:t}){s(this,d);s(this,m);s(this,B);s(this,w,null);s(this,h,null);s(this,b,null);c(this,m,e),c(this,B,t)}async initialize(){y(this,d,D).call(this),await y(this,d,H).call(this),y(this,d,_).call(this),y(this,d,$).call(this)}}m=new WeakMap,B=new WeakMap,w=new WeakMap,h=new WeakMap,b=new WeakMap,d=new WeakSet,D=function(){const e=L.map("map").setView([-2.5,118],4);L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"&copy; OpenStreetMap contributors"}).addTo(e);const t=L.icon({iconUrl:"https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",iconSize:[25,41],iconAnchor:[12,41],popupAnchor:[1,-34]});e.on("click",i=>{const{lat:r,lng:a}=i.latlng;document.getElementById("lat").value=r,document.getElementById("lon").value=a,o(this,b)&&o(this,b).remove(),c(this,b,L.marker([r,a],{icon:t}).addTo(e).bindPopup(`<strong>Lokasi dipilih:</strong><br>${r.toFixed(5)}, ${a.toFixed(5)}`).openPopup())})},H=async function(){try{c(this,h,await navigator.mediaDevices.getUserMedia({video:!0}));const e=document.getElementById("camera-video");e.srcObject=o(this,h)}catch(e){console.error("Tidak dapat mengakses kamera:",e),o(this,m).showMessage("Tidak dapat mengakses kamera.","error")}},_=function(){const e=document.getElementById("snapshot-canvas"),t=document.getElementById("camera-video"),i=document.getElementById("capture-btn"),r=document.getElementById("preview-image");i.addEventListener("click",()=>{const a=e.getContext("2d");e.width=t.videoWidth,e.height=t.videoHeight,a.drawImage(t,0,0),e.toBlob(l=>{if(!l){o(this,m).showMessage("Gagal menangkap gambar.","error");return}c(this,w,l),r&&(r.src=URL.createObjectURL(l),r.style.display="block"),o(this,h)&&o(this,h).getTracks().forEach(u=>u.stop())},"image/jpeg")})},$=function(){const e=document.getElementById("add-story-form");e.addEventListener("submit",async t=>{t.preventDefault();const i=document.getElementById("description").value,r=document.getElementById("lat").value,a=document.getElementById("lon").value;if(!o(this,w)||!i){o(this,m).showMessage("Foto dan deskripsi wajib diisi.","error");return}const l=new File([o(this,w)],"snapshot.jpg",{type:"image/jpeg"}),u=new FormData;u.append("description",i),u.append("photo",l),r&&a&&(u.append("lat",r),u.append("lon",a));try{const O=await fetch("https://story-api.dicoding.dev/v1/stories",{method:"POST",headers:{Authorization:`Bearer ${o(this,B)}`},body:u}),q=await O.json();if(O.ok)o(this,m).showMessage(q.message||"Cerita berhasil dikirim!"),e.reset(),setTimeout(()=>{location.hash="#/"},1e3);else throw new Error(q.message||"Gagal mengirim cerita.")}catch(O){console.error(O),o(this,m).showMessage("Gagal mengirim cerita.","error")}})};var I;class X{constructor(){s(this,I)}async render(){return`
      <section class="container">
        <h1>Tambah Cerita Baru</h1>

        <form id="add-story-form">
          <label for="description">Deskripsi</label>
          <textarea id="description" rows="4" required></textarea>

          <label>Ambil Foto dari Kamera</label>
          <video id="camera-video" autoplay playsinline style="width: 100%; max-width: 400px; border-radius: 8px;"></video>
          <p style="font-size: 0.9rem; color: #555; margin-top: 6px;">Cukup 1 klik untuk ambil foto.</p>
          <button type="button" id="capture-btn">Ambil Foto</button>
          <canvas id="snapshot-canvas" style="display: none;"></canvas>
          <img id="preview-image" style="display: none; width: 100%; margin-top: 1rem; border-radius: 8px;" />

          <label>Lokasi</label>
          <div id="map" style="height: 300px; margin-bottom: 1rem;"></div>
          <input type="hidden" id="lat" />
          <input type="hidden" id="lon" />

          <button type="submit">Kirim Cerita</button>
        </form>

        <div id="submit-message"></div>
      </section>
    `}async afterRender(){const e=localStorage.getItem("authToken");if(!e){const t=document.querySelector(".container");t.innerHTML=`
        <p>Anda belum login. Silakan <a href="#/login">login</a> terlebih dahulu.</p>
      `;return}c(this,I,new Y({view:this,token:e})),await o(this,I).initialize()}showMessage(e,t="success"){const i=document.getElementById("submit-message");i.style.color=t==="success"?"green":"red",i.textContent=e}}I=new WeakMap;var v;class Z{constructor(e){s(this,v);c(this,v,e)}async register(e,t,i){try{await z(e,t,i),o(this,v).onRegisterSuccess()}catch(r){o(this,v).onRegisterError(r.message)}}}v=new WeakMap;var A;class ee{constructor(){s(this,A)}async render(){return`
      <section class="container">
        <h1>Register</h1>
        <form id="register-form">
          <label for="name">Nama</label>
          <input type="text" id="name" required />

          <label for="email">Email</label>
          <input type="email" id="email" required />

          <label for="password">Password</label>
          <input type="password" id="password" required minlength="8" />

          <button type="submit">Daftar</button>
        </form>
        <div id="register-message"></div>
      </section>
    `}async afterRender(){c(this,A,new Z(this));const e=document.querySelector("#register-form");e.addEventListener("submit",t=>{t.preventDefault();const i=e.name.value,r=e.email.value,a=e.password.value;o(this,A).register(i,r,a)})}onRegisterSuccess(){const e=document.getElementById("register-message");e.style.color="green",e.textContent="Registrasi berhasil! Silakan login.",location.hash="#/login"}onRegisterError(e){const t=document.getElementById("register-message");t.style.color="red",t.textContent="Gagal daftar: "+e}}A=new WeakMap;const te={"/":new V,"/about":new K,"/register":new ee,"/login":new Q,"/add":new X};function ne(n){const e=n.split("/");return{resource:e[1]||null,id:e[2]||null}}function re(n){let e="";return n.resource&&(e=e.concat(`/${n.resource}`)),n.id&&(e=e.concat("/:id")),e||"/"}function ie(){return location.hash.replace("#","")||"/"}function oe(){const n=ie(),e=ne(n);return re(e)}var S,k,p,M,j;class ae{constructor({navigationDrawer:e,drawerButton:t,content:i}){s(this,M);s(this,S,null);s(this,k,null);s(this,p,null);c(this,S,i),c(this,k,t),c(this,p,e),y(this,M,j).call(this)}async renderPage(){const e=oe(),t=te[e];document.startViewTransition?await document.startViewTransition(async()=>{o(this,S).innerHTML=await t.render(),await t.afterRender()}):(o(this,S).innerHTML=await t.render(),await t.afterRender())}}S=new WeakMap,k=new WeakMap,p=new WeakMap,M=new WeakSet,j=function(){o(this,k).addEventListener("click",()=>{o(this,p).classList.toggle("open")}),document.body.addEventListener("click",e=>{!o(this,p).contains(e.target)&&!o(this,k).contains(e.target)&&o(this,p).classList.remove("open"),o(this,p).querySelectorAll("a").forEach(t=>{t.contains(e.target)&&o(this,p).classList.remove("open")})})};function G(){const n=localStorage.getItem("authToken"),e=document.querySelector("#nav-list");if(!e)return;e.innerHTML="",n?e.innerHTML=`
      <li><a href="#/">Beranda</a></li>
      <li><a href="#/about">About</a></li>
      <li><a href="#/add">Tambah Cerita</a></li>
      <li><a href="#" id="logout-link">Keluar</a></li>
    `:e.innerHTML=`
      <li><a href="#/login">Masuk</a></li>
      <li><a href="#/">Beranda</a></li>
      <li><a href="#/about">About</a></li>
    `;const t=document.querySelector("#logout-link");t&&t.addEventListener("click",()=>{localStorage.removeItem("authToken"),location.hash="#/login",G()})}window.updateNav=G;document.addEventListener("DOMContentLoaded",async()=>{const n=localStorage.getItem("authToken"),e=location.hash==="#/login";if(!n&&!e){location.hash="#/login";return}const t=new ae({content:document.querySelector("#main-content"),drawerButton:document.querySelector("#drawer-button"),navigationDrawer:document.querySelector("#navigation-drawer")});window.updateNav(),await t.renderPage();const i=document.querySelector(".skip-link"),r=document.querySelector("#main-content");i.addEventListener("click",function(a){a.preventDefault(),i.blur(),r.focus(),r.scrollIntoView()}),window.addEventListener("hashchange",async()=>{const a=localStorage.getItem("authToken"),u=["#/login","#/register"].includes(location.hash);if(!a&&!u){location.hash="#/login";return}await t.renderPage(),window.updateNav()})});async function se(n){if(await Notification.requestPermission()!=="granted")return;const t=await n.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:"BCCs2eonMI-6H2ctvFaWg-UYdDv387Vno_bzUzALpB442r2lCnsHmtrx8biyPi_E-1fSGABK_Qs_GlvPoJJqxbk"}),i=localStorage.getItem("authToken");if(!i)return;const r={endpoint:t.endpoint,keys:{p256dh:t.toJSON().keys.p256dh,auth:t.toJSON().keys.auth}};await fetch("https://story-api.dicoding.dev/v1/notifications/subscribe",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${i}`},body:JSON.stringify(r)})}window.addEventListener("load",async()=>{if("serviceWorker"in navigator)try{const n=await navigator.serviceWorker.register("/berbagiCerita/sw.js");await se(n)}catch(n){console.error(" Service Worker registration failed:",n)}});
