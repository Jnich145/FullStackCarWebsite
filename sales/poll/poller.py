import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sales_project.settings")
django.setup()

# Import models from sales_rest, here.
from sales_rest.models import AutomobileVO



def poll():
    while True:
        print('Sales poller polling for data')
        try:
            url = "http://project-beta-inventory-api-1:8000/api/automobiles/"
            response = requests.get(url)
            content = json.loads(response.content)
            print(content)  
            for automobile in content["autos"]:
                AutomobileVO.objects.update_or_create(
                    import_href=automobile["href"],
                    defaults={
                        "vin": automobile["vin"],
                        "model": automobile["model"],
                        "color": automobile["color"]
                    }
                )
        except Exception as e:
            print(e, file=sys.stderr)

        time.sleep(60)


if __name__ == "__main__":
    poll()
