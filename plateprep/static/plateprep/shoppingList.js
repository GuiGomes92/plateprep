document.addEventListener('DOMContentLoaded', function () {
    console.log(localStorage)
    for (let i = 0; i < localStorage.length; i++) {
        document.querySelector(`.check_${localStorage.key(i)}`).style.textDecoration = 'line-through';
        document.querySelector(`#check_${localStorage.key(i)}`).checked = true;
    }
})

function checkItem(ingredient) {
    if (!localStorage.getItem(ingredient)) {
        localStorage.setItem(ingredient, `line-through`);
        document.querySelector(`.check_${ingredient}`).style.textDecoration = 'line-through';
    } else {
        localStorage.removeItem(ingredient);
        document.querySelector(`.check_${ingredient}`).style.textDecoration = 'none';
    }

}