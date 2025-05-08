// CSS imports
import '../styles/styles.css';
import App from './pages/app';

function updateNav() {
  const token = localStorage.getItem('authToken');
  const navList = document.querySelector('#nav-list');

  if (!navList) return;

  navList.innerHTML = '';

  if (token) {
    navList.innerHTML = `
      <li><a href="#/">Beranda</a></li>
      <li><a href="#/about">About</a></li>
      <li><a href="#/add">Tambah Cerita</a></li>
      <li><a href="#" id="logout-link">Keluar</a></li>
    `;
  } else {
    navList.innerHTML = `
      <li><a href="#/login">Masuk</a></li>
      <li><a href="#/">Beranda</a></li>
      <li><a href="#/about">About</a></li>
    `;
  }

  const logoutLink = document.querySelector('#logout-link');
  if (logoutLink) {
    logoutLink.addEventListener('click', () => {
      localStorage.removeItem('authToken');
      location.hash = '#/login';
      updateNav();
    });
  }
}

window.updateNav = updateNav;

document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('authToken');
  const isOnLoginPage = location.hash === '#/login';

  if (!token && !isOnLoginPage) {
    location.hash = '#/login';
    return;
  }

  const app = new App({
    content: document.querySelector('#main-content'),
    drawerButton: document.querySelector('#drawer-button'),
    navigationDrawer: document.querySelector('#navigation-drawer'),
  });

  window.updateNav();
  await app.renderPage();

  const skipLink = document.querySelector('.skip-link');
  const mainContent = document.querySelector('#main-content');

  skipLink.addEventListener('click', function (event) {
    event.preventDefault();
    skipLink.blur();
    mainContent.focus();
    mainContent.scrollIntoView();
  });

  window.addEventListener('hashchange', async () => {
    const token = localStorage.getItem('authToken');
    const publicPages = ['#/login', '#/register'];
    const isPublicPage = publicPages.includes(location.hash);

    if (!token && !isPublicPage) {
      location.hash = '#/login';
      return;
    }

    await app.renderPage();
    window.updateNav();
  });

});



async function registerServiceWorkerAndPush() {
  if (!('serviceWorker' in navigator)) return;

  const registration = await navigator.serviceWorker.register('/sw.js');

  const permission = await Notification.requestPermission();
  if (permission !== 'granted') return;

  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: 'BCCs2eonMI-6H2ctvFaWg-UYdDv387Vno_bzUzALpB442r2lCnsHmtrx8biyPi_E-1fSGABK_Qs_GlvPoJJqxbk',
  });

  const token = localStorage.getItem('authToken');
  if (!token) return;

  const subscriptionPayload = {
    endpoint: subscription.endpoint,
    keys: {
      p256dh: subscription.toJSON().keys.p256dh,
      auth: subscription.toJSON().keys.auth,
    },
  };

  console.log('Push subscription berhasil:', subscriptionPayload);

  await fetch('https://story-api.dicoding.dev/v1/notifications/subscribe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(subscriptionPayload),
  });
}

window.addEventListener('load', () => {
  registerServiceWorkerAndPush();
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/berbagiCerita/sw.js');
  });
}

