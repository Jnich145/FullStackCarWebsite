from django.urls import path
from sales_rest.views import (
    api_list_sales_people, 
    api_sales_person_detail, 
    api_list_customers, 
    api_show_customer, 
    api_list_sales, 
    api_show_sale
)

urlpatterns = [
    path('salespeople/', api_list_sales_people, name="api_list_sales_people"),
    path('salespeople/<int:pk>/', api_sales_person_detail, name="api_sales_person_detail"),
    path('customers/', api_list_customers, name="api_list_customers"),
    path('customers/<int:pk>/', api_show_customer, name="api_show_customer"),
    path('sales/', api_list_sales, name="api_list_sales"),
    path('sales/<int:pk>/', api_show_sale, name="api_show_sale")
    ]
