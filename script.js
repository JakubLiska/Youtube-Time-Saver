console.log('dwa');

const sel = document.querySelector('body');
console.log('sel', sel);

window.addEventListener('load', (event) => {
    console.log('ktoś zrobił loada');
});
setInterval(() => {
    console.log('one');
}, 5000);
