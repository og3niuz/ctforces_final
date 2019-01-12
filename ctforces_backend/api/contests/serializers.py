from guardian.shortcuts import assign_perm
from rest_framework import serializers as rest_serializers

from api import fields as api_fields
from api import models as api_models
from api.tasks import serializers as api_tasks_serializers


class ContestTaskRelationshipMainSerializer(rest_serializers.ModelSerializer):
    solved_count = rest_serializers.IntegerField(read_only=True)
    is_solved_by_user = rest_serializers.BooleanField(read_only=True)
    task_name = rest_serializers.SlugRelatedField(read_only=True, slug_field='name', source='task')

    contest = api_fields.CurrentUserPermissionsFilteredPKRF(
        read_only=False,
        write_only=True,
        queryset=api_models.Contest.objects.all(),
        perms='change_contest',
    )

    task = api_fields.CurrentUserPermissionsFilteredPKRF(
        read_only=False,
        write_only=True,
        queryset=api_models.Task.objects.all(),
        perms='change_task',
    )

    class Meta:
        model = api_models.ContestTaskRelationship
        fields = (
            'id',
            'contest',
            'cost',
            'is_solved_by_user',
            'task',
            'task_name',
            'ordering_number',
            'solved_count',
        )


class ContestTaskRelationshipUpdateSerializer(rest_serializers.ModelSerializer):
    class Meta:
        model = api_models.ContestTaskRelationship
        fields = (
            'id',
            'cost',
            'ordering_number',
        )


class ContestTaskViewSerializer(rest_serializers.ModelSerializer):
    solved_count = rest_serializers.IntegerField(read_only=True)
    task_tags_details = api_tasks_serializers.TaskTagSerializer(many=True, read_only=True, source='tags')
    contest_cost = rest_serializers.IntegerField(read_only=True)
    is_solved_by_user = rest_serializers.BooleanField(read_only=True)

    class Meta:
        model = api_models.Task
        fields = (
            'id',
            'author',
            'contest_cost',
            'name',
            'solved_count',
            'task_tags_details',
            'is_solved_by_user',
        )


class ContestFullSerializer(rest_serializers.ModelSerializer):
    author_username = rest_serializers.SlugRelatedField(read_only=True, slug_field='username', source='author')
    registered_count = rest_serializers.IntegerField(read_only=True)
    contest_task_relationship_details = ContestTaskRelationshipMainSerializer(
        many=True,
        read_only=True,
        source='contest_task_relationship',
    )

    class Meta:
        model = api_models.Contest
        fields = (
            'id',
            'author',
            'author_username',
            'contest_task_relationship_details',
            'description',
            'end_time',
            'is_finished',
            'is_published',
            'is_registration_open',
            'is_rated',
            'is_running',
            'name',
            'registered_count',
            'start_time',
            'publish_tasks_after_finished',
        )

        extra_kwargs = {
            'author': {
                'write_only': True,
            },
        }

    def validate(self, attrs):
        attrs['author'] = self.context['request'].user
        return attrs

    def create(self, validated_data):
        instance = super(ContestFullSerializer, self).create(validated_data)
        assign_perm('view_contest', instance.author, instance)
        assign_perm('change_contest', instance.author, instance)
        assign_perm('delete_contest', instance.author, instance)
        return instance


class ContestPreviewSerializer(rest_serializers.ModelSerializer):
    registered_count = rest_serializers.IntegerField(read_only=True)
    author_username = rest_serializers.SlugRelatedField(read_only=True, slug_field='username', source='author')

    class Meta:
        model = api_models.Contest
        fields = (
            'id',
            'author_username',
            'end_time',
            'is_finished',
            'is_published',
            'is_registration_open',
            'is_running',
            'is_rated',
            'name',
            'registered_count',
            'start_time',
        )


class ContestViewSerializer(rest_serializers.ModelSerializer):
    can_edit_contest = rest_serializers.BooleanField(read_only=True)
    author_username = rest_serializers.SlugRelatedField(read_only=True, slug_field='username', source='author')
    contest_task_relationship_details = ContestTaskRelationshipMainSerializer(
        many=True,
        read_only=True,
        source='contest_task_relationship',
    )

    class Meta:
        model = api_models.Contest
        fields = (
            'id',
            'author',
            'author_username',
            'can_edit_contest',
            'contest_task_relationship_details',
            'end_time',
            'is_finished',
            'is_published',
            'is_registration_open',
            'is_rated',
            'is_running',
            'name',
            'start_time',
        )

        extra_kwargs = {
            'author': {
                'write_only': True,
            },
        }


class ContestScoreboardUserSerializer(rest_serializers.ModelSerializer):
    cost_sum = rest_serializers.IntegerField()
    last_contest_solve = rest_serializers.DateTimeField()

    class Meta:
        model = api_models.User
        fields = (
            'id',
            'username',
            'cost_sum',
            'last_contest_solve',
        )


class ContestScoreboardUserMinimalSerializer(rest_serializers.ModelSerializer):
    class Meta:
        model = api_models.User
        fields = (
            'id',
            'username',
        )


class ContestScoreboardSerializer(rest_serializers.ModelSerializer):
    task_name = rest_serializers.CharField()

    class Meta:
        model = api_models.ContestTaskParticipantSolvedRelationship
        fields = (
            'participant_id',
            'task_name',
        )
