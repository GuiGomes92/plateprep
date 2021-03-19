# PlatePrep
## An app to help people plan their meals.

### Why I believe this project is different from others:
It is different from both social network and commerce because it is a sort of planner, where users can look for recipes, add or remove them to their calendars, and have a shopping list generated automatically for them with ingredients from the selected recipes. I also used a third-party API to fetch the recipes from the Tasty website, which contains a whole lot of recipes.
This application used 5 models:
- User: stores users registered to this application.
- Meal: stores type of meals such as Breakfast, Lunch and Dinner.
- Recipe: stores name and recipe ids used to search for specific ones in the Tasty API.
- WeekMenu: stores information related to days in the calendar such as the user who's plugged that in, the type of meal, the recipe and which day the user would like to cook it.
- Ingredient: stores ingredients and its related information, such as the recipe they belong to and its id in the API.

### What's contained in each file:
Apart from files created automatically by Django when starting a new app, these are the following files created specifically for Plateprep:
1. Static/PlatePrep
This folder contains all images and Javascript files for the application:
- Index.js is responsible for the toggle between days also also generates the recipes dynamically via a special API, created for this project, that fetches data from the database.
- Recipe.js generates dynamically on the recipe page. This page contains specific information that was retrieved from the Tasty website, using their API. In this page, the user has the option to add the recipe to some day and meal in their calendar. If the recipe is already there, an error message is presented. 
- Search.js is the script responsible for fetching a list with recipes that contain a keyword provided from the user in a search bar. Then, it generates dynamically cards with basic info from the recipes such as name, picture, servings and a button that takes the user to the recipe page if clicked.
- ShoppingList.js keeps track, using local storage, of ingredients the user has marked as bought. When the user clicks a specific item on the list, the item will be marked as checked and with a line-through the text will appear. This information is not lost when the user logs out or refreshes the page.
- Styles.css contains personalized styles apart from bootstrap, which was also used for this project.
2. Templates
This folder contains all html files used across the application.
- Create.html is the file used on the "Create New Calendar page. It only contains the form used to search and an empty div for the results that will be generated via Javascript.
- Index.html is the html for the main page with the calendar and also the landing page if the user is logged out.
- Layout.html has the navbar used in all this application, the footer, as well as stylesheets and bootstrap scripts.
- Login.html contains the form used to login into the platform
- Recipe.html is the file used to load the recipe page and contains the form via which user might add that specific recipe to their calendar. It also presents divs with messages of error and success depending on if the user was able to add it.
- Register.html is the file where users might register to the platform
- ShoppingList.html is the file that populates the shopping lists, containing all ingredients necessary to prepare recipes that are in the calendar.
3. Views.py
In this file, there are all views that make the application run smoothly.
- The index function will return the index.html template
- The "load_day" function is an API function, responsable to retrieve from the database all the Meals linked to the logged in user and return a JsonResponse that the script will use to add to the main page.
- The "register" function is responsible to register and create users in the database.
- The "login_view" and "logout_views" will log in and log out users respectively.
- The "create" function will only return the create template, as information is retrieved from the API on the frontend.
- The "recipe" function will retrieve meal types from the database in order to use its information on the form presented in the template.
- The "form_submit" function will plug into the database a specific recipe the user is trying to save on a specific day and meal.
-  The "shopping_list" function will retrieve from the database all the recipes linked to this user and generate the list with its ingredients.
- Finally, the "Remove" function will delete a specific recipe from the calendar.

### How to run your application.
Using the usual "python3 manage.py runserver" in the server from the 'final' folder will start a server which the user might start using the application.

### Any other additional information the staff should know about your project.
A third-party API was used to retrieve information about recipes, it can be found on this website: https://rapidapi.com/apidojo/api/tasty