const darkModeQuery = window?.matchMedia('(prefers-color-scheme: dark)');
const isLinux = navigator.userAgent.includes('Linux');
const isDarkMedia = darkModeQuery.matches;
const shouldDarkMode =
    isDarkMedia ?? isLinux;
const htmlEl = document.querySelector('html');

if (shouldDarkMode) {
    toggleDarkMode();
}

darkModeQuery.addEventListener('change', e => {
        e.matches ? htmlEl.setAttribute('dark-theme', true) : htmlEl.removeAttribute('dark-theme')
});

function toggleDarkMode() {
    htmlEl.toggleAttribute('dark-theme');
}
