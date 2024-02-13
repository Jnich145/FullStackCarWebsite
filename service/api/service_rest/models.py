from django.db import models
from django.urls import reverse


# class Status(models.Model):
#     name = models.CharField(max_length=10)

#     def __str__(self):
#         return self.name

#     class Meta:
#         ordering = ("id",)  # Default ordering for Status
#         verbose_name_plural = "statuses"  # Fix the pluralization


class Technician(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    employee_id = models.PositiveSmallIntegerField(unique=True)

    def __str__(self):
        return self.first_name
    def get_api_url(self):
        return reverse("api_list_technicians", kwargs={"id": self.employee_id})


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)


class Appointment(models.Model):
    date_time = models.DateTimeField()
    reason = models.CharField(max_length=100)
    vin = models.CharField(max_length=17, unique=True)
    customer = models.CharField(max_length=100)
    is_vip = models.BooleanField(default=False)
    status = models.CharField(max_length=100, default="Created")
    technician = models.ForeignKey(
        Technician,
        related_name="appointments",
        on_delete=models.CASCADE,
    )
