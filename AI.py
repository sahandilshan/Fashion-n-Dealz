import csv

from deepomatic.api.client import Client
from deepomatic.api.inputs import ImageInput

client = Client('812163618651', '1b365fe218aa4b77bd811c9d1e80911e')

model = client.RecognitionSpec.retrieve("fashion-v4")

url = "https://i.pinimg.com/originals/34/7b/32/347b3214800619a2ef54eb944dd1966b.jpg"
url2 = "https://eazyslim.co.za/wp-content/uploads/2018/09/jeans-9.jpg"
url3 = "https://www.gotceleb.com/wp-content/uploads/celebrities/julianne-moore/out-in-new-york-city/Julianne-Moore-out-in-NYC--12.jpg"

result = model.inference(inputs=[ImageInput(url)], show_discarded=False)  # get the result

# print(result['outputs'][0]['labels']['predicted'])
result = result['outputs'][0]['labels']['predicted']
items = {item['label_name'] for item in result}
# items.append("sss")
print(f'Identified items :{items}')

discounts = {}

with open('discount.csv') as file:
    reader = csv.DictReader(file)
    for row in reader:
        key = row['Item'].lower()
        discounts[key] = row['Discount']
        # print(f'{row["Item"]} - {row["Discount"]}')

discountItems = [key for key in discounts.keys()]

print(f'Discounts available for :{discountItems}')

print(f'================== discounts ==================')
for item in items:
    if item in discounts:
        print(f'{item} :{discounts[item]}%')
print(f'===============================================\n')
