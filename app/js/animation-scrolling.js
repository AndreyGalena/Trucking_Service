function onEntry(entry) {
    console.log("Функция");
    entry.forEach(change => {
        if (change.isIntersecting) {
            change.target.classList.add('element-show');
            console.log("добавил element-show");
        }
    });
}

let options = { threshold: [0.5] };
let observer = new IntersectionObserver(onEntry, options);
console.log(observer);
// К какому элементу нужно добавить element-show
let elements = document.querySelectorAll('.logo-footer');
console.log(elements);
// К этим элементам .element-animation добовляем объект(element-show)
for (let elm of elements) {
    observer.observe(elm);
    console.log("добавило элемент", elm);
}