// Gulp все файлы JS собирает в file.min.js
// Элемент body.
const clickBody = document.body;

// Если кликнул по body.
clickBody.addEventListener('click', function(event) {
    let item = document.querySelector('.show-content');
    let icon = document.querySelector('.fa-caret-up');
    const e = event.target;
    
    if (e.classList.contains("fa-caret-down") != true &&
        e.classList.contains("fa-caret-up") != true && 
        e.classList.contains("menu__link") != true &&
        item != null) {
            item.classList.replace("show-content", "hide-content");
            icon.classList.replace("fa-caret-up", "fa-caret-down");
    }
});

//---------------------------------------------------------------------------------
// Вешаем общее событие на всю страничку.
document.body.addEventListener("click", function(e) {
    // Возвращает элемент по которому кликнули.
    const item = e.target;

    // Возвращает родительский элемент.
    const itemParent = e.target.parentElement;
    // Возвращает прородителья(<ul class="sub-menu__list).
    const contentActions = document.querySelector('.sub-menu__list');

    // Бургер меню.
    if (itemParent.classList.contains("menu-btn")
        ||
        itemParent.classList.contains("header__block")) {
        addActiveMenu();
    }

    // * При нажатии на popup. *
    // при нажатии по стрелке.
    if (item.classList.contains("fa-caret-down")) {
        // меняет класс.
        item.classList.replace("fa-caret-down", "fa-caret-up");
        contentActions.classList.replace("hide-content", "show-content");
    }
    else  if (item.classList.contains("fa-caret-up")) {
        item.classList.replace("fa-caret-up", "fa-caret-down");
        contentActions.classList.replace("show-content", "hide-content");
    } // при нажатии по тексту.
    else if (item.classList.contains("menu__link")) {
        const item_up = document.querySelector('.fa-caret-up');
        const item_down = document.querySelector('.fa-caret-down');

        if(item_up) { // не null
            if(item_up.classList.contains("fa-caret-up")) {
                item_up.classList.replace("fa-caret-up", "fa-caret-down");
                contentActions.classList.replace("show-content", "hide-content");
            }
        } 
        else if (item_down) { // не null
            if(item_down.classList.contains("fa-caret-down")) {
                item_down.classList.replace("fa-caret-down", "fa-caret-up");
                contentActions.classList.replace("hide-content", "show-content");
            }
        }
    }
})