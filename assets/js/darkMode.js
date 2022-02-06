const isLinux = navigator.userAgent.includes('Linux');
const shouldDarkMode =
    window?.matchMedia('prefers-color-scheme: dark').matches ||
    isLinux;
const htmlEl = document.querySelector('html');

if (shouldDarkMode) {
    toggleDarkMode();
}

window.matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', () => {
        htmlEl.setAttribute('dark-theme');
    });

function toggleDarkMode() {
    htmlEl.toggleAttribute('dark-theme');
}
