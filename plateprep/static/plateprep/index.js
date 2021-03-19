let lastClicked = ''

document.addEventListener('DOMContentLoaded', function () {
    // Use buttons to toggle between views
    document.querySelector('#Mon').addEventListener('click', () => load_day('Mon'));
    document.querySelector('#Tue').addEventListener('click', () => load_day('Tue'));
    document.querySelector('#Wed').addEventListener('click', () => load_day('Wed'));
    document.querySelector('#Thu').addEventListener('click', () => load_day('Thu'));
    document.querySelector('#Fri').addEventListener('click', () => load_day('Fri'));
    document.querySelector('#Sat').addEventListener('click', () => load_day('Sat'));
    document.querySelector('#Sun').addEventListener('click', () => load_day('Sun'));

    load_day('Mon')
});

removeFormBreakfast = document.querySelector('#form-remove-recipe-Breakfast')
removeFormLunch = document.querySelector('#form-remove-recipe-Lunch')
removeFormDinner = document.querySelector('#form-remove-recipe-Dinner')

function load_day(day) {
    if (lastClicked != '') {
        lastClicked.style.backgroundColor = '#efefef';
    }
    let dayButton = document.querySelector(`#${day}`)
    dayButton.style.backgroundColor = '#BDBDBD';

    removeFormBreakfast.style.display = 'none'
    removeFormLunch.style.display = 'none'
    removeFormDinner.style.display = 'none'

    fetch(`${day}`)
        .then(response => response.json())
        .then(meal => {
            titleBreakfast = document.querySelector('#title-breakfast')
            titleLunch = document.querySelector('#title-lunch')
            titleDinner = document.querySelector('#title-dinner')
            titleBreakfast.innerHTML = "No Meal Scheduled"
            titleLunch.innerHTML = "No Meal Scheduled"
            titleDinner.innerHTML = "No Meal Scheduled"

            buttonBreakfast = document.querySelector('#btnBreakfast')
            buttonLunch = document.querySelector('#btnLunch')
            buttonDinner = document.querySelector('#btnDinner')

            buttonBreakfast.innerHTML = "Add Recipe"
            buttonLunch.innerHTML = "Add Recipe"
            buttonDinner.innerHTML = "Add Recipe"

            meal.forEach(meal => {
                if (meal['mealType'] === 'Breakfast') {
                    removeFormBreakfast.style.display = 'inline-block'
                    removeFormBreakfast.addEventListener('submit', (event) => {
                        event.preventDefault();
                        const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
                        const request = new Request(
                            `remove/${meal['recipeId']}`,
                            { headers: { 'X-CSRFToken': csrftoken } }
                        );
                        fetch(request, {
                            method: 'POST',
                            mode: 'same-origin',
                            body: JSON.stringify({
                                mealId: meal['recipeId'],
                                type: 'Breakfast',
                                day: day,
                            }),
                        }).then((response) => {
                            if (response.ok) {
                                load_day(day)
                            }
                        })
                    })
                    titleBreakfast.innerHTML = meal['recipeName']
                    buttonBreakfast.innerHTML = 'See Recipe'
                    buttonBreakfast.href = meal['recipeId']
                }
                else if (meal['mealType'] === 'Lunch') {
                    removeFormLunch.style.display = 'inline-block'
                    removeFormLunch.addEventListener('submit', (event) => {
                        event.preventDefault();
                        const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
                        const request = new Request(
                            `remove/${meal['recipeId']}`,
                            { headers: { 'X-CSRFToken': csrftoken } }
                        );
                        fetch(request, {
                            method: 'POST',
                            mode: 'same-origin',
                            body: JSON.stringify({
                                mealId: meal['recipeId'],
                                type: 'Lunch',
                                day: day,
                            }),
                        }).then((response) => {
                            if (response.ok) {
                                load_day(day)
                            }
                        })
                    })

                    titleLunch.innerHTML = meal['recipeName']
                    buttonLunch.innerHTML = 'See Recipe'
                    buttonLunch.href = meal['recipeId']
                }
                else if (meal['mealType'] === 'Dinner') {
                    removeFormDinner.style.display = 'inline-block'
                    removeFormDinner.addEventListener('submit', (event) => {
                        event.preventDefault();
                        const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
                        const request = new Request(
                            `remove/${meal['recipeId']}`,
                            { headers: { 'X-CSRFToken': csrftoken } }
                        );
                        fetch(request, {
                            method: 'POST',
                            mode: 'same-origin',
                            body: JSON.stringify({
                                mealId: meal['recipeId'],
                                type: 'Dinner',
                                day: day,
                            }),
                        }).then((response) => {
                            if (response.ok) {
                                load_day(day)
                            }
                        })
                    })
                    titleDinner.innerHTML = meal['recipeName']
                    buttonDinner.innerHTML = 'See Recipe'
                    buttonDinner.href = meal['recipeId']
                }
            });
        })
    lastClicked = dayButton
}