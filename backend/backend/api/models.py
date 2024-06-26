from django.db import models
from django.contrib.auth.models import User


class ToDos(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    complete = models.BooleanField(default=False)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="todos")

    def __str__(self):
        return self.title