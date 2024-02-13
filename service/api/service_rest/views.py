from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from .models import Technician, Appointment
from .encoders import TechnicianListEncoder, AppointmentListEncoder


@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianListEncoder,
            safe=False,
        )
    else:
        try:
            content = json.loads(request.body)
            technician = Technician.objects.create(**content)
            return JsonResponse(
                technician,
                encoder=TechnicianListEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create a technican"}
            )
            response.status_code = 400
            return response

@require_http_methods(["DELETE"])
def api_delete_technician(request, id):
    try:
        technican = Technician.objects.get(id=id)
        technican.delete()
        return JsonResponse(
            technican,
            encoder=TechnicianListEncoder,
            safe=False,
        )
    except Technician.DoesNotExist:
        return JsonResponse({"message": "Technican Does not exist"}, status=404)


@require_http_methods(["GET", "POST"])
def api_list_appointments(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentListEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)
        try:
            technician = Technician.objects.get(employee_id=content["technician"])
            content["technician"] = technician
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid technician id"}, status=404
            )
        try:
            appointment = Appointment.objects.create(**content)
            return JsonResponse(
                appointment,
                encoder=AppointmentListEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create an appointment"}
            )
            response.status_code = 400
            return response

@require_http_methods(["DELETE"])
def api_delete_appointment(request, id):
    try:
        appointment = Appointment.objects.get(id=id)
        appointment.delete()
        return JsonResponse(
            appointment,
            encoder=AppointmentListEncoder,
            safe=False,
        )
    except Appointment.DoesNotExist:
        return JsonResponse({"message": "Appointment Does not exist"}, status=404)

@require_http_methods(["PUT"])
def api_cancel_appointment(request, id):
    try:
        appointment = Appointment.objects.get(id=id)
        appointment.status = "CANCELLED"
        appointment.save()
        return JsonResponse(
            appointment,
            encoder=AppointmentListEncoder,
            safe=False,
        )
    except Appointment.DoesNotExist:
        return JsonResponse({"message": "Appointment Does not exist"}, status=404)

@require_http_methods(["PUT"])
def api_finish_appointment(request, id):
    try:
        appointment = Appointment.objects.get(id=id)
        appointment.status = "FINISHED"
        appointment.save()

        return JsonResponse(
            appointment,
            encoder=AppointmentListEncoder,
            safe=False,
        )
    except Appointment.DoesNotExist:
        return JsonResponse({"message": "Appointment Does not exist"}, status=404)
