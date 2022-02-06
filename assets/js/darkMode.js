const isLinux = navigator.userAgent.includes('Linux');
const shouldDarkMode = 
    window?.matchMedia('prefers-color-scheme: dark').matches ||
    isLinux;
const htmlEl = document.querySelector('html');

if (shouldDarkMode) {
    toggleDarkMode();
}

window.matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', _ => { console.log('changed!!');})

function toggleDarkMode() {
    htmlEl.toggleAttribute('dark-theme');
}
