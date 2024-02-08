from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from .models import Salesperson, Customer, Sale, AutomobileVO
from .encoders import (
    SalespersonListEncoder,
    CustomerListEncoder,
    SaleListEncoder,
)

# Create your views here.



@require_http_methods(["GET", "POST"])
def api_list_salespeople(request):
    if request.method == "GET":
        salespeople = Salesperson.objects.all()
        return JsonResponse (
            {"salespeople": salespeople},
            encoder=SalespersonListEncoder
        )
    else:
        try:
            content = json.loads(request.body)
            salesperson = Salesperson.objects.create(**content)
            return JsonResponse(
                salesperson,
                encoder=SalespersonListEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Salesperson could not be created"}
            )
            response.status_code = 400
            return response


@require_http_methods(["DELETE"])
def api_delete_salespeople(request, id):
    try:
        count,_ = Salesperson.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})
    except Salesperson.DoesNotExist:
        return JsonResponse(
            {"message": "Salesperson does not exist"},
            status=404,
        )


@require_http_methods(["GET", "POST"])
def api_list_customers(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerListEncoder,
        )

    else:
        content = json.loads(request.body)
        try:
            customer = Customer.objects.create(**content)
            return JsonResponse(
                customer,
                encoder=CustomerListEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Customer could not be created"}
            )
            response.status_code = 400
            return response


@require_http_methods(["DELETE"])
def api_delete_customers(request, id):
    try:
        count,_ = Customer.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})
    except Customer.DoesNotExist:
        return JsonResponse(
            {"message": "Customer does not exist"},
            status=404,
        )


@require_http_methods(["GET", "POST"])
def api_list_sales(request):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder=SaleListEncoder,
        )

    else:
        content = json.loads(request.body)

        try:
            salesperson = Salesperson.objects.get(id=content["salesperson"])
            content["salesperson"] = salesperson
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid salesperson"},
                status=400,
            )

        try:
            automobile = AutomobileVO.objects.get(vin=content["automobile"])
            automobile.sold = True
            automobile.save()
            content["automobile"] = automobile
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid vin"},
                status=400,
            )

        try:
            customer = Customer.objects.get(id=content["customer"])
            content["customer"] = customer
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid customer"},
                status=400,
            )

        sales = Sale.objects.create(**content)
        return JsonResponse(
            sales,
            encoder=SaleListEncoder,
            safe=False,
        )


@require_http_methods(["DELETE"])
def api_delete_sales(request, id):
    try:
        count,_ = Sale.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})
    except Sale.DoesNotExist:
        return JsonResponse(
            {"message": "Sale does not exist"},
            status=404,
        )
