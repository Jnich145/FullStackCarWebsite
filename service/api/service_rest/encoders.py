from common.json import ModelEncoder
from .models import Technician, Appointment

class TechnicianListEncoder(ModelEncoder):
    model = Technician
    properties = ["first_name", "last_name", "employee_id", "id"]

class AppointmentListEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "status",
        "is_vip",
        "date_time",
        "reason",
        "vin",
        "customer",
        "technician",
        "id",
        ]
    encoders = {"technician": TechnicianListEncoder()}
