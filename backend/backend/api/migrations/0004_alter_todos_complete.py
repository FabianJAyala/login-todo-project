# Generated by Django 5.0.6 on 2024-05-20 13:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_todos_complete'),
    ]

    operations = [
        migrations.AlterField(
            model_name='todos',
            name='complete',
            field=models.BooleanField(),
        ),
    ]
