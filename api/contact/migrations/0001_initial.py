# Generated by Django 3.2.12 on 2022-02-06 16:55

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ContactMessage',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, verbose_name='name')),
                ('email', models.EmailField(max_length=254, verbose_name='email address')),
                ('phone_number', models.CharField(blank=True, max_length=13, null=True, verbose_name='phone number')),
                ('message', models.CharField(max_length=1000, verbose_name='message')),
                ('status', models.SmallIntegerField(choices=[(0, 'Unread'), (1, 'Read')], db_index=True, default=0, verbose_name='message status')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='creation date')),
            ],
            options={
                'verbose_name': 'contact message',
                'verbose_name_plural': 'contact messages',
            },
        ),
    ]
