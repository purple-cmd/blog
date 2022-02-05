const shouldDarkMode = 
    !!window.matchMedia('prefers-color-scheme: dark').matches;
const bodyEl = document.querySelector('body');

if (shouldDarkMode) {
    toggleDarkMode();
}

function toggleDarkMode() {
    bodyEl.toggleAttribute('dark-theme');
}

