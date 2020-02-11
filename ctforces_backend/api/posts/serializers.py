from guardian.shortcuts import assign_perm
from rest_framework import serializers as rest_serializers
from rest_framework.exceptions import ValidationError

from api import models as api_models


class PostMainSerializer(rest_serializers.ModelSerializer):
    can_edit_post = rest_serializers.BooleanField(required=False, read_only=True)
    author_username = rest_serializers.SlugRelatedField(read_only=True, slug_field='username', source='author')
    author_rating = rest_serializers.SlugRelatedField(read_only=True, slug_field='rating', source='author')

    class Meta:
        model = api_models.Post
        fields = (
            'author',
            'author_rating',
            'author_username',
            'body',
            'can_edit_post',
            'created_at',
            'id',
            'is_published',
            'title',
            'updated_at',
        )

        extra_kwargs = {
            'created_at': {
                'read_only': True,
            },
            'updated_at': {
                'read_only': True,
            },
            'author': {
                'write_only': True,
            },
        }

    def validate_author(self, data):
        if self.instance and data != self.instance.author:
            raise ValidationError({'author': 'This field is immutable once set'})
        return data

    def create(self, validated_data):
        validated_data['author'] = self.context['request'].user
        instance = super(PostMainSerializer, self).create(validated_data)
        assign_perm('view_post', instance.author, instance)
        assign_perm('change_post', instance.author, instance)
        return instance
