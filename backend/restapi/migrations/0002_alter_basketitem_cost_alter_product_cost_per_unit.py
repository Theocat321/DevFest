# Generated by Django 4.2.1 on 2023-12-03 19:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('restapi', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='basketitem',
            name='cost',
            field=models.FloatField(),
        ),
        migrations.AlterField(
            model_name='product',
            name='cost_per_unit',
            field=models.FloatField(),
        ),
    ]
