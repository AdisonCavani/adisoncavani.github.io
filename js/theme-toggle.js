"use strict";
const storageKey = 'theme-preference';
const onClick = () => {
    theme.value = theme.value === 'light'
        ? 'dark'
        : 'light';
    setPreference();
};
const getColorPreference = () => {
    if (localStorage.getItem(storageKey))
        return localStorage.getItem(storageKey);
    else
        return window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light';
};
const setPreference = () => {
    localStorage.setItem(storageKey, theme.value);
    reflectPreference();
};
const reflectPreference = () => {
    var _a;
    document.firstElementChild
        .setAttribute('data-theme', theme.value);
    (_a = document
        .querySelector('#theme-toggle')) === null || _a === void 0 ? void 0 : _a.setAttribute('aria-label', theme.value);
};
const theme = {
    value: getColorPreference(),
};
reflectPreference();
window.onload = () => {
    reflectPreference();
    document
        .querySelector('#theme-toggle')
        .addEventListener('click', onClick);
};
window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', ({ matches: isDark }) => {
    theme.value = isDark ? 'dark' : 'light';
    setPreference();
});
