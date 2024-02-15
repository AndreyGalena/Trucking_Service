
// определяет разрешение экрана.
console.log(screen.width);


// Модуль определения устройства.
let detect = new MobileDetect(window.navigator.userAgent);
// console.log(detect.os());

console.log("Mobile: " + detect.mobile());       // телефон или планшет
console.log("Phone: " + detect.phone());         // телефон
console.log("Tablet: " + detect.tablet());       // планшет
console.log("OS: " + detect.os());               // операционная система
console.log("userAgent: " + detect.userAgent()); // userAgent