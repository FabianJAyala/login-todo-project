from django.urls import path
from . import views

urlpatterns = [
    path("todos/", views.ToDosListCreate.as_view(), name="todos-list"),
    path('todos/<int:pk>/', views.ToDoUpdate.as_view(), name="update-todo"),
    path("todos/delete/<int:pk>/", views.ToDoDelete.as_view(), name="delete-todo"),
    path('users/current/', views.CurrentUserView.as_view(), name="current-user"),
    path('groups/', views.GroupListAPIView.as_view(), name="group-list"),
]