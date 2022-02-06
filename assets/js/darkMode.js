const isLinux = navigator.userAgent.includes('Linux');
const shouldDarkMode = 
    !!window.matchMedia('prefers-color-scheme: dark').matches ||
    isLinux;
const bodyEl = document.querySelector('body');

if (shouldDarkMode) {
    toggleDarkMode();
}

function toggleDarkMode() {
    bodyEl.toggleAttribute('dark-theme');
}
