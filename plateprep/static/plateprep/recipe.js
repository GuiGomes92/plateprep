window.addEventListener('load', loadPage());

formAdd = document.querySelector('#form_add')
msgAdd = document.querySelector('#msg-add')
msgError = document.querySelector('#msg-error')

formAdd.addEventListener('submit', (event) => {
    event.preventDefault();
    const recipeId = document.querySelector('#recipe_id').value
    const recipeName = document.querySelector('#RecipeName').innerHTML
    const weekDay = document.querySelector('#insertDay').value
    const mealType = document.querySelector('#insertType').value
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

    const ingredients = document.querySelectorAll('.ingredientName')
    let ingredientsList = []

    for (let i = 0; i < ingredients.length; i++) {
        ingredientsList.push(ingredients[i].innerHTML)
    }

    const request = new Request(
        '/form_submit',
        { headers: { 'X-CSRFToken': csrftoken } }
    );
    fetch(request, {
        method: 'POST',
        mode: 'same-origin',
        body: JSON.stringify({
            id: recipeId,
            name: recipeName,
            day: weekDay,
            type: mealType,
            ingredients: ingredientsList
        }),
    })
        .then(response => {
            if (!response.ok) {
                formAdd.style.display = 'none'
                msgError.style.display = 'block'
                return response.json();
            }
            // Successful response, parse the JSON and return the data
            formAdd.style.display = 'none'
            msgAdd.style.display = 'block'
            return response.json();
        });

})

function loadPage() {
    id = document.querySelector('#recipe_id').value
    //Create recipe body
    recipeBody = document.querySelector('#recipeBody')
    fetch(`https://tasty.p.rapidapi.com/recipes/detail?id=${id}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "7b36be9c9bmsh10f12e7f9465364p1578f7jsnbfe8304f7bf6",
            "x-rapidapi-host": "tasty.p.rapidapi.com"
        }
    })
        .then(response => response.json())
        .then(result => {
            //Create title of the page
            title = document.createElement('h1')
            title.innerHTML = result['name']
            title.id = "RecipeName";

            //Create div for elements
            recipeIngredients = document.createElement('div')
            recipeIngredients.classList.add("ingredientDiv");

            //Create img of recipe
            recipeImg = document.createElement('img')
            let imgAtt = document.createAttribute("src");
            imgAtt.value = result['thumbnail_url'];
            recipeImg.setAttributeNode(imgAtt);

            recipeImg.classList.add('figure-img-recipe')
            recipeImg.classList.add('rounded')

            //Add img to figure div
            figureDiv = document.createElement('figure')
            figureDiv.classList.add('figure')

            //Add figure div to recipeimg div
            figureDiv.appendChild(recipeImg)

            //Add image to recipe ingredients
            recipeIngredients.appendChild(figureDiv)

            //append to body title and recipe div
            recipeBody.appendChild(title)
            recipeBody.appendChild(recipeIngredients)

            //Create div for ingredients
            divIngredients = document.createElement('div')
            divIngredients.classList.add('recipeText')
            //Create title for ingredients
            ingredientTitle = document.createElement('h2')
            ingredientTitle.innerHTML = "Ingredients"

            divIngredients.appendChild(ingredientTitle)

            //Create ul for ingredients
            ingredientsList = document.createElement('ul')

            //Create li's for ingredients list
            for (let i = 0; i < result['sections'][0]['components'].length; i++) {
                ingredient = document.createElement('li')
                ingredient.classList.add("ingredientName");
                ingredient.innerHTML = result['sections'][0]['components'][i]['raw_text']
                ingredientsList.appendChild(ingredient)
            }

            //Append ul to ingredients list
            divIngredients.appendChild(ingredientsList)
            recipeIngredients.appendChild(divIngredients)

            //Create div for instruction
            divInstructions = document.createElement('div')
            divInstructions.classList.add('recipeText')

            //Create title for instructions
            instructionTitle = document.createElement('h2')
            instructionTitle.innerHTML = "Instructions"

            divInstructions.appendChild(instructionTitle)

            //Create ol for instructions
            instructionsList = document.createElement('ol')

            //Create instructions list
            for (let i = 0; i < result['instructions'].length; i++) {
                instruction = document.createElement('li')
                instruction.innerHTML = result['instructions'][i]['display_text']
                instructionsList.appendChild(instruction)
            }
            divInstructions.appendChild(instructionsList)
            recipeIngredients.appendChild(divInstructions)
        })
        .catch(err => {
            console.error(err);
        });
}