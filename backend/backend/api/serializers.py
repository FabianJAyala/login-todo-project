from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import ToDos

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    groups = serializers.PrimaryKeyRelatedField(queryset=Group.objects.all(), many=True)
    class Meta:
        model = User
        fields = ["id", "username", "password", "groups"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        groups_data = validated_data.pop('groups', [])
        user = User.objects.create_user(**validated_data)
        user.groups.set(groups_data)
        return user


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = "__all__"


class ToDosSerializer(serializers.ModelSerializer):
    class Meta:
        model = ToDos
        fields = ["id", "title", "content", "complete", "created_at", "author"]
        extra_kwargs = {
            "author": {"read_only": True},
            "complete": {"required": False}
        }