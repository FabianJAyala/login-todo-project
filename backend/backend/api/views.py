from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, ToDosSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import ToDos


class CurrentUserView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user


class ToDosListCreate(generics.ListCreateAPIView):
    serializer_class = ToDosSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        queryset = ToDos.objects.filter(author=user)

        complete = self.request.query_params.get('complete', None)

        if complete is not None:
            if complete.lower() == 'true':
                queryset = queryset.filter(complete=True)
            elif complete.lower() == 'false':
                queryset = queryset.filter(complete=False)

        return queryset

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)


class ToDoUpdate(generics.UpdateAPIView):
    queryset = ToDos.objects.all()
    serializer_class = ToDosSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return ToDos.objects.filter(author=user)


class ToDoDelete(generics.DestroyAPIView):
    serializer_class = ToDosSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return ToDos.objects.filter(author=user)


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]