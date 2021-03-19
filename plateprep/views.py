from django.shortcuts import render
import json
from django.core import serializers
from django.http import JsonResponse
import requests
from django.contrib.auth import authenticate, login, logout
from django.urls import reverse
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth.decorators import login_required
from .models import User, Meal, Recipe, WeekMenu, Ingredient

# Create your views here.
def index(request):
    return render(request, "index.html")

@login_required
def load_day(request, day):
    meals = WeekMenu.objects.filter(
        User=User.objects.get(username=request.user), 
        Day=day
        )
    return JsonResponse([meal.serialize() for meal in meals], safe=False)

def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "register.html", {
                "message": "Passwords must match."
            })

        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "register.html")

def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))

def login_view(request):
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "login.html")

def create(request):
    if request.method == "GET":
        return render(request, "create.html")

def recipe(request, recipe_id):
    if request.method == "GET":
        mealTypes = Meal.objects.all()
        for meal in mealTypes:
            print(meal)
        return render(request, "recipe.html", {
            "id": recipe_id,
            "mealTypes": mealTypes
        })

@login_required
def form_submit(request):
    if request.method == "POST":
        data = json.loads(request.body)
        recipeId = data.get("id")
        recipeName = data.get("name")
        weekDay = data.get("day")
        mealType = data.get("type")
        ingredients = data.get("ingredients")

        try:
            isRecipe = Recipe.objects.get(Recipe_id=recipeId)
        except:
            recipe = Recipe.objects.create(Name=recipeName, Recipe_id=recipeId)
            recipe.save()

            for ingredient in ingredients:
                newIngredient = Ingredient.objects.create(Recipe_name=Recipe.objects.get(Name=recipeName), Recipe_id=Recipe.objects.get(Recipe_id=recipeId), Ingredient=ingredient)
                newIngredient.save()
        
        try:
            isMenu = WeekMenu.objects.get(User=request.user, Type=Meal.objects.get(Type=mealType), Recipe=Recipe.objects.get(Name=recipeName, Recipe_id=recipeId), Day=weekDay)
            return JsonResponse({"error": "This recipe has already been added to this meal. Try Another"}, status=409)
        except:
            menu = WeekMenu(User=request.user, Type=Meal.objects.get(Type=mealType), Recipe=Recipe.objects.get(Name=recipeName, Recipe_id=recipeId), Day=weekDay)
            menu.save()

        return JsonResponse({"message": "Worked"}, status=200)

@login_required
def shopping_list(request):
    if request.method == "GET":
        recipes = []
        userMenus = WeekMenu.objects.filter(User=request.user)
            
        for menu in userMenus:
            recipe = []
            recipeName = [menu.Recipe.Name]
            recipe.append(recipeName)
            for ingredient in Ingredient.objects.filter(Recipe_name=Recipe.objects.get(Name=menu.Recipe.Name)):
                if ingredient.Ingredient != 'n/a':
                    ingredientItem = []
                    ingredientItem.append(ingredient)
                    ingredientItem.append(ingredient.id)
                    recipe.append(ingredientItem)
            if (recipe not in recipes):
                recipes.append(recipe)

        if not recipes:
            return render(request, "shoppingList.html", {
            "message": "No recipes yet."
        })
        else:
            return render(request, "shoppingList.html", {
                "recipes": recipes
            })

@login_required
def remove(request, recipeId):
    if request.method == "POST":
        data = json.loads(request.body)
        mealId = data.get('mealId')
        mealType = data.get('type')
        day = data.get('day')
        print(mealId)
        print(mealType)
        print(day)

        deleteMenu = WeekMenu.objects.get(
            User=request.user, 
            Type=Meal.objects.get(Type=mealType), 
            Recipe=Recipe.objects.get(Recipe_id=mealId),
            Day=day)
        deleteMenu.delete()

        return JsonResponse({"message": recipeId}, status=200)
