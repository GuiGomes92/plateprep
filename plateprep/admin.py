from django.contrib import admin
from .models import User, Meal, Recipe, WeekMenu, Ingredient

# Register your models here.
admin.site.register(User)
admin.site.register(Meal)
admin.site.register(Recipe)
admin.site.register(WeekMenu)
admin.site.register(Ingredient)