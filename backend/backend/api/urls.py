from django.urls import path
from . import views

urlpatterns = [
    path("todos/", views.ToDosListCreate.as_view(), name="todos-list"),
    path("todos/delete/<int:pk>/", views.ToDoDelete.as_view(), name="delete-todo"),
]