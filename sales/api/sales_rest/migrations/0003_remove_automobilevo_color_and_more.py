# Generated by Django 4.0.3 on 2024-02-06 05:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0002_customer_address'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='automobilevo',
            name='color',
        ),
        migrations.RemoveField(
            model_name='automobilevo',
            name='import_href',
        ),
        migrations.RemoveField(
            model_name='automobilevo',
            name='year',
        ),
        migrations.AlterField(
            model_name='sale',
            name='price',
            field=models.PositiveBigIntegerField(),
        ),
    ]
