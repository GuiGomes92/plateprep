form = document.querySelector("#search")
form.addEventListener('submit', (event) => {
    event.preventDefault();
    q = document.querySelector('#search_q').value;
    results = document.querySelector('#results')

    fetch(`https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&q=${q}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "7b36be9c9bmsh10f12e7f9465364p1578f7jsnbfe8304f7bf6",
            "x-rapidapi-host": "tasty.p.rapidapi.com"
        }
    })
        .then(response => response.json())
        .then(result => {
            results.innerHTML = '';
            console.log(result);
            for (let i = 0; i < result['results'].length; i++) {
                recipeDiv = document.createElement('div')
                recipeDiv.classList.add("card")
                recipeDiv.classList.add("card-div")
                recipeDiv.style.width = "18rem";

                recipeBody = document.createElement('div')
                recipeBody.classList.add("card-body")

                recipeImg = document.createElement('img')
                let imgAtt = document.createAttribute("src");
                imgAtt.value = result['results'][i]['thumbnail_url'];
                recipeImg.setAttributeNode(imgAtt);
                recipeImg.classList.add("card-img-top")

                recipeTitle = document.createElement('h5')
                recipeTitle.classList.add("card-title")
                recipeTitle.innerHTML = result['results'][i]['name']

                recipeP = document.createElement('p')
                recipeP.classList.add("card-text")
                if (recipeP.innerHTML = result['results'][i]['yields']) {
                    recipeP.innerHTML = result['results'][i]['yields']
                } else {
                    recipeP.style.display = 'none'
                }

                recipeLink = document.createElement('a')
                let recipeLinkAtt = document.createAttribute("href");
                recipeLinkAtt.value = result['results'][i]['id'];
                recipeLink.setAttributeNode(recipeLinkAtt);
                recipeLink.classList.add("btn")
                recipeLink.classList.add("btn-secondary")
                recipeLink.innerHTML = "See Recipe"

                recipeDiv.appendChild(recipeImg)
                recipeBody.appendChild(recipeTitle)
                recipeBody.appendChild(recipeP)
                recipeBody.appendChild(recipeLink)
                recipeDiv.appendChild(recipeBody)
                results.appendChild(recipeDiv)
            }
        })
        .catch(err => {
            console.error(err);
        });
});