# Generated by Django 4.0.3 on 2024-02-08 00:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0006_rename_sales_person_sale_salesperson'),
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
            name='model',
        ),
        migrations.RemoveField(
            model_name='automobilevo',
            name='sold',
        ),
        migrations.AlterField(
            model_name='customer',
            name='address',
            field=models.CharField(max_length=60, null=True),
        ),
        migrations.AlterField(
            model_name='customer',
            name='first_name',
            field=models.CharField(max_length=40),
        ),
        migrations.AlterField(
            model_name='customer',
            name='last_name',
            field=models.CharField(max_length=40),
        ),
        migrations.AlterField(
            model_name='customer',
            name='phone_number',
            field=models.PositiveBigIntegerField(),
        ),
        migrations.AlterField(
            model_name='sale',
            name='automobile',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='+', to='sales_rest.automobilevo'),
        ),
        migrations.AlterField(
            model_name='sale',
            name='customer',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='+', to='sales_rest.customer'),
        ),
        migrations.AlterField(
            model_name='sale',
            name='price',
            field=models.PositiveIntegerField(),
        ),
        migrations.AlterField(
            model_name='sale',
            name='salesperson',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='+', to='sales_rest.salesperson'),
        ),
        migrations.AlterField(
            model_name='salesperson',
            name='employee_id',
            field=models.PositiveSmallIntegerField(),
        ),
        migrations.AlterField(
            model_name='salesperson',
            name='first_name',
            field=models.CharField(max_length=40),
        ),
        migrations.AlterField(
            model_name='salesperson',
            name='last_name',
            field=models.CharField(max_length=40),
        ),
    ]
