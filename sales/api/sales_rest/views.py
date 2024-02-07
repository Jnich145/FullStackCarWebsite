from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from common.json import ModelEncoder
from .models import Salesperson, Customer, AutomobileVO, Sale
import json

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ['vin']


class CustomerListEncoder(ModelEncoder):
    model = Customer
    properties = [
        'first_name',
        'last_name',
        'address',
        'phone_number',
        'id',
    ]


class SalesPersonListEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        'first_name',
        'last_name',
        'employee_id',
        'id'
    ]


class SalesListEncoder(ModelEncoder):
    model = Sale
    properties = [
        "automobile",
        "sales_person",
        "customer",
        "price",        
    ]

    def get_extra_data(self, o):
        return {
            "automobile": o.automobile.vin,
            "sales_person": {
                 "name" :o.sales_person.first_name,
                 "emp_no":o.sales_person.employee_id,
            },
            "customer": o.customer.first_name
        } 

    encoders = {
        "automobile": AutomobileVOEncoder(),
        "sales_person": SalesPersonListEncoder(),
        "customer": CustomerListEncoder(),
    }


class SalesDetailEncoder(ModelEncoder):
    model = Sale
    properties = [
        "automobile",
        "sales_person",
        "customer",
        "price",
    ]        

    encoders = {
        "automobile": AutomobileVOEncoder(),
        "sales_person": SalesPersonListEncoder(),
        "customer": CustomerListEncoder(),
    }

# Create your views here.

@require_http_methods(["GET", "POST"])
def api_list_sales_people(request):
    if request.method == "GET":
        sales_people = Salesperson.objects.all()
        return JsonResponse(
            {"sales_people": sales_people},
            encoder=SalesPersonListEncoder
        )
    else:
        try: 
            content = json.loads(request.body)
            sales_person = Salesperson.objects.create(**content)
            return JsonResponse(
                sales_person,
                encoder=SalesPersonListEncoder,
                safe=False
            )
        except:
            response = JsonResponse(
                {"error": "Could not create sales person"},
                status=400
            )
        return response


@require_http_methods(["GET", "DELETE"])
def api_sales_person_detail(request, pk):
    sales_person = Salesperson.objects.get(pk=pk)
    if request.method == "GET":
        return JsonResponse(
            sales_person,
            encoder=SalesPersonListEncoder,
            safe=False
        )
    else:
        sales_person.delete()
        return JsonResponse(
            { "deleted": True },
        )

#____________________________________________________________________________________
    
@require_http_methods(["GET", "POST"])
def api_list_customers(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerListEncoder
        )
    else:
        try: 
            content = json.loads(request.body)
            customer = Customer.objects.create(**content)
            return JsonResponse(
                customer,
                encoder=CustomerListEncoder,
                safe=False
            )
        except:
            response = JsonResponse(
                {"error": "Could not create customer"},
                status=400
            )
        return response


@require_http_methods(["GET", "DELETE"])
def api_show_customer(request, pk):
    try:
        customer = Customer.objects.get(pk=pk)
    except Customer.DoesNotExist:
        return JsonResponse(
            {"error": "Customer does not exist"},
            status=404
        )
    if request.method == "GET":
        return JsonResponse(
            customer,
            encoder=CustomerListEncoder,
            safe=False
        )
    else:
        customer.delete()
        return JsonResponse(
            {"deleted": True},
        )

#____________________________________________________________________________________
    
@require_http_methods({"GET", "POST"})
def api_list_sales(request):

    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder=SalesListEncoder,

        )
    else:
        content = json.loads(request.body)

        try: #get salesperson info
            salesperson_name = content["sales_person"]
            salesperson = Salesperson.objects.get(first_name=salesperson_name)
            content["sales_person"] = salesperson
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"message": "Salesperson not in system"},
                status=400,
            )


        try: #get customer info
            log = content["customer"]
            customer = Customer.objects.get(first_name=log)
            content["customer"] = customer
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "No customer found"},
                status=400
            )

        try:
            auto_vin = content["automobile"]
            auto = AutomobileVO.objects.get(vin=auto_vin)
            content["automobile"] = auto
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid VIN"},
                status=400,
            )

        sale = Sale.objects.create(**content)
        return JsonResponse(
            sale,
            encoder=SalesListEncoder,
            safe=False,
        )





@require_http_methods(["GET", "DELETE", "PUT"])
def api_show_sale(request, pk):
    try:
        sale = Sale.objects.get(pk=pk)
    except Sale.DoesNotExist:
        return JsonResponse(
            {"error": "Sale does not exist"},
            status=404
        )

    if request.method == "GET":
        return JsonResponse(
            sale,
            encoder=SalesDetailEncoder,
            safe=False
        )
    elif request.method == "DELETE":
        sale.delete()
        return JsonResponse(
            {"deleted": True},
        )
    else:
        content = json.loads(request.body)
        try:
            salesperson_name = content["sales_person"]
            salesperson = Salesperson.objects.get(first_name=salesperson_name)
            content["sales_person"] = salesperson
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"message": "Salesperson not in system"},
                status=400,
            )
        try:
            log = content["customer"]
            customer = Customer.objects.get(first_name=log)
            content["customer"] = customer
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "No customer found"},
                status=400
            )
        sale.update(**content)
        return JsonResponse(
            sale,
            encoder=SalesDetailEncoder,
            safe=False,
        )

#____________________________________________________________________________________
