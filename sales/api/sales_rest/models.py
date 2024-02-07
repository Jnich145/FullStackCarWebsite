from django.db import models
from django.urls import reverse

# Create your models here.
class AutomobileVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True, null=True)
    vin = models.CharField(max_length=17, unique=True)
    color = models.CharField(max_length=100, null=True)
    model = models.CharField(max_length=100, null=True)
    sold = models.BooleanField(default=False)

    def __str__(self):
        return self.vin

class Salesperson(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    employee_id = models.PositiveIntegerField(unique=True)

    def get_api_url(self):
        return reverse("api_sales_person", kwargs={"pk": self.id})
    
    def __str__(self):
        return self.first_name

class Customer(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    address = models.CharField(max_length=200, null=True, blank=True)
    phone_number = models.CharField(max_length=10, unique=True)

    def get_api_url(self):
        return reverse("api_customer", kwargs={"pk": self.id})
    
    def __str__(self):
        return (self.first_name, self.last_name)

class Sale(models.Model):
    price = models.PositiveBigIntegerField()

    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="sales",
        on_delete=models.CASCADE,
    )
    sales_person = models.ForeignKey(
        Salesperson,
        related_name="sales",
        on_delete=models.CASCADE,
    )
    customer = models.ForeignKey(
        Customer,
        related_name="sales",
        on_delete=models.CASCADE,
    )
    
    def get_api_url(self):
        return reverse("api_show_sale", kwargs={"pk": self.id})
    
    def __str__(self):
        return f"Car: {self.automobile} | Customer: {self.customer}"
