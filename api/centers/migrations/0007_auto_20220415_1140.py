# Generated by Django 3.2.12 on 2022-04-15 08:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('centers', '0006_rename_centerratingquestions_centerratingquestion'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='statistic',
            name='mobile_caravans',
        ),
        migrations.AlterField(
            model_name='statistic',
            name='hotline',
            field=models.SmallIntegerField(default=8457, verbose_name='hotline'),
            preserve_default=False,
        ),
    ]