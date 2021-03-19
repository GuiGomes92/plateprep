# Generated by Django 3.1.4 on 2021-03-09 15:16

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('plateprep', '0008_auto_20210309_1405'),
    ]

    operations = [
        migrations.RenameField(
            model_name='meal',
            old_name='type',
            new_name='Type',
        ),
        migrations.RenameField(
            model_name='recipe',
            old_name='name',
            new_name='Name',
        ),
        migrations.RenameField(
            model_name='recipe',
            old_name='recipe_id',
            new_name='Recipe_id',
        ),
        migrations.RemoveField(
            model_name='weekmenu',
            name='Fri',
        ),
        migrations.RemoveField(
            model_name='weekmenu',
            name='MealType',
        ),
        migrations.RemoveField(
            model_name='weekmenu',
            name='Mon',
        ),
        migrations.RemoveField(
            model_name='weekmenu',
            name='Sat',
        ),
        migrations.RemoveField(
            model_name='weekmenu',
            name='Sun',
        ),
        migrations.RemoveField(
            model_name='weekmenu',
            name='Thu',
        ),
        migrations.RemoveField(
            model_name='weekmenu',
            name='Tue',
        ),
        migrations.RemoveField(
            model_name='weekmenu',
            name='Wed',
        ),
        migrations.RemoveField(
            model_name='weekmenu',
            name='user',
        ),
        migrations.AddField(
            model_name='weekmenu',
            name='Day',
            field=models.CharField(max_length=3, null=True),
        ),
        migrations.AddField(
            model_name='weekmenu',
            name='Recipe',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='menuRecipe', to='plateprep.recipe'),
        ),
        migrations.AddField(
            model_name='weekmenu',
            name='Type',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='menuType', to='plateprep.meal'),
        ),
        migrations.AddField(
            model_name='weekmenu',
            name='User',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='menuUser', to=settings.AUTH_USER_MODEL),
        ),
        migrations.DeleteModel(
            name='MealSchedule',
        ),
    ]
