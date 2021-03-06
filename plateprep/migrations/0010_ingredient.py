# Generated by Django 3.1.4 on 2021-03-12 08:31

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('plateprep', '0009_auto_20210309_1516'),
    ]

    operations = [
        migrations.CreateModel(
            name='Ingredient',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Ingredient', models.CharField(max_length=100)),
                ('Recipe_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ingredientRecipeId', to='plateprep.recipe')),
                ('Recipe_name', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ingredientRecipe', to='plateprep.recipe')),
            ],
        ),
    ]
