# Generated by Django 2.1.2 on 2018-11-08 11:09

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ('api', '0022_auto_20181107_1744'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='contestparticipantrelationship',
            unique_together={('contest', 'participant')},
        ),
    ]