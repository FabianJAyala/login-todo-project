# Generated by Django 5.0.6 on 2024-05-20 13:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_remove_todos_complete'),
    ]

    operations = [
        migrations.AddField(
            model_name='todos',
            name='complete',
            field=models.BooleanField(default=False),
        ),
    ]
