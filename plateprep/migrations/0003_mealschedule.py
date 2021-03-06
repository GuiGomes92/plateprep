# Generated by Django 3.1.4 on 2021-03-07 18:12

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('plateprep', '0002_meal_recipe_weekmenu'),
    ]

    operations = [
        migrations.CreateModel(
            name='MealSchedule',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('meal', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='plateprep.meal')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('weekMenu', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='plateprep.weekmenu')),
            ],
        ),
    ]
