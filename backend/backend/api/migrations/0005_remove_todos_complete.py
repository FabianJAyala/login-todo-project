# Generated by Django 5.0.6 on 2024-05-20 13:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_alter_todos_complete'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='todos',
            name='complete',
        ),
    ]