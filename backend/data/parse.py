import requests
import json

places = {}

places["tourism"] = []
places["parks"] = []
places["restaurants"] = []
places["housing"] = []
places["museums"] = []
places["entertainment"] = []

# Function to parse the API data 
def data(feature, response):
    for site in response["features"]: 
        name = site["properties"]["name"]
        address = site["properties"]["formatted"]
        coords = [site["properties"]["lon"], site["properties"]["lat"]]

        obj = {
            "name": name,
            "address": address, 
            "coordinates": coords
        }

        places[feature].append(obj)


url = "https://api.geoapify.com/v2/places?categories=tourism.attraction&filter=place:51d78dcdee167c52c059a5d22785e3544440f00101f90121af020000000000c0020a92031043697479206f66204e657720596f726b&limit=56&apiKey=YOUR_API_KEY"    
response = requests.get(url).json()
data("tourism", response)

url = "https://api.geoapify.com/v2/places?categories=leisure.park&filter=place:517bd8384d167e52c059afb076b00e634440f00101f9012c25800000000000c002089203094d616e68617474616e&limit=20&apiKey=YOUR_API_KEY" 
response = requests.get(url).json()
data("parks", response)

url = "https://api.geoapify.com/v2/places?categories=catering.restaurant&filter=place:517bd8384d167e52c059afb076b00e634440f00101f9012c25800000000000c002089203094d616e68617474616e&limit=20&apiKey=YOUR_API_KEY"
response = requests.get(url).json()
data("restaurants", response)

url = "https://api.geoapify.com/v2/places?categories=accommodation.apartment,accommodation.motel,accommodation.hotel&filter=place:517bd8384d167e52c059afb076b00e634440f00101f9012c25800000000000c002089203094d616e68617474616e&limit=20&apiKey=YOUR_API_KEY"    
response = requests.get(url).json()
data("housing", response)

url = "https://api.geoapify.com/v2/places?categories=entertainment.museum&filter=place:517bd8384d167e52c059afb076b00e634440f00101f9012c25800000000000c002089203094d616e68617474616e&limit=20&apiKey=YOUR_API_KEY"    
response = requests.get(url).json()
data("museums", response)

url = "https://api.geoapify.com/v2/places?categories=entertainment.cinema,entertainment.culture,entertainment.zoo,entertainment.amusement_arcade,entertainment.theme_park&filter=place:517bd8384d167e52c059afb076b00e634440f00101f9012c25800000000000c002089203094d616e68617474616e&limit=20&apiKey=YOUR_API_KEY"    
response = requests.get(url).json()
data("entertainment", response)

with open("NY_LOC.json", "w") as file: 
    json.dump(places, file, indent=4)