import requests

response = requests.get('API_ENDPOINT', headers={
    'X-ApiKey': 'YOUR_API_KEY'
})

data = response.json()
print(data)
