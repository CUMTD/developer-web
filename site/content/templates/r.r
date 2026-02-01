library(httr)

response <- GET('API_ENDPOINT', add_headers(
  'X-ApiKey' = 'YOUR_API_KEY'
))

data <- content(response)
print(data)
