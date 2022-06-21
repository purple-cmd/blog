const darkModeQuery = window?.matchMedia('(prefers-color-scheme: dark)');
const isLinux = navigator.userAgent.includes('Linux');
const isDarkMedia = darkModeQuery.matches;
const shouldDarkMode =
    isDarkMedia ?? isLinux;
const htmlEl = document.querySelector('html');

if (shouldDarkMode) {
    toggleDarkMode();
}

function toggleDarkMode() {
    htmlEl.toggleAttribute('dark-theme');
}
