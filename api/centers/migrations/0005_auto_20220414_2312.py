# Generated by Django 3.2.12 on 2022-04-14 20:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('centers', '0004_alter_testingcenter_testing_price'),
    ]

    operations = [
        migrations.CreateModel(
            name='CenterRatingQuestions',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question', models.TextField(verbose_name='question')),
                ('question_ro', models.TextField(null=True, verbose_name='question')),
                ('question_en', models.TextField(null=True, verbose_name='question')),
                ('answer_type', models.SmallIntegerField(choices=[(1, 'Yes/No'), (2, 'Text')], verbose_name='answer type')),
            ],
            options={
                'verbose_name': 'center rating question',
                'verbose_name_plural': 'center rating questions',
            },
        ),
        migrations.AddField(
            model_name='centerrating',
            name='answers',
            field=models.JSONField(default=dict, verbose_name='answers'),
        ),
    ]
