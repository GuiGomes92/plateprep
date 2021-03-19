from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("remove/<int:recipeId>", views.remove, name="remove"),
    path("register", views.register, name="register"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("create", views.create, name="create"),
    path("<int:recipe_id>", views.recipe, name="recipe"),
    path("form_submit", views.form_submit, name="form_submit"),
    path("shoppingList", views.shopping_list, name="shoppingList"),
    path("<str:day>", views.load_day, name="load_day"),
]