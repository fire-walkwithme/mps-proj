# Generated by Django 2.2.7 on 2019-11-18 12:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0028_auto_20191118_1254'),
    ]

    operations = [
        migrations.AlterField(
            model_name='participant',
            name='whoVoted',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='round',
            name='allow',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='round',
            name='eliminate',
            field=models.IntegerField(null=True),
        ),
    ]
