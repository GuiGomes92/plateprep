from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    pass

class Meal(models.Model):
    Type = models.CharField(max_length=20)

    def __str__(self):
            return f"{self.Type}"

class Recipe(models.Model):
    Name = models.CharField(max_length=100)
    Recipe_id = models.IntegerField(default=0)

    def __str__(self):
            return f"{self.Recipe_id}: {self.Name}"

class WeekMenu(models.Model):
    User = models.ForeignKey(User, on_delete=models.CASCADE, related_name="menuUser", null=True)
    Type = models.ForeignKey(Meal, on_delete=models.CASCADE, related_name="menuType", null=True)
    Recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name="menuRecipe", null=True)
    Day = models.CharField(max_length=3, null=True)

    def __str__(self):
            return f"{self.User}: {self.Type} on {self.Day}: {self.Recipe}"
    
    def serialize(self):
        return {
            "id": self.id,
            "user": self.User.username,
            "mealType": self.Type.Type,
            "recipeName": self.Recipe.Name,
            "recipeId": self.Recipe.Recipe_id,
            "day": self.Day,
        }

class Ingredient(models.Model):
    Recipe_name = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name="ingredientRecipe")
    Recipe_id = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name="ingredientRecipeId")
    Ingredient = models.CharField(max_length=100)

    def __str__(self):
            return f"{self.Ingredient}"