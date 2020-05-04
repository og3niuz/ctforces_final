# Generated by Django 3.0.3 on 2020-05-04 09:22

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ('api', '0015_auto_20200501_2235'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='team',
            options={'ordering': ('id',), 'permissions': (('register_team', 'Can register teams for a contest'),)},
        ),
        migrations.RemoveField(
            model_name='contestparticipantrelationship',
            name='rating',
        ),
        migrations.AddField(
            model_name='team',
            name='max_rating',
            field=models.IntegerField(default=2000),
        ),
        migrations.AddField(
            model_name='team',
            name='rating',
            field=models.IntegerField(default=2000),
        ),
    ]