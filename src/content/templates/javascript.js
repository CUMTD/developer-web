const response = await fetch("API_ENDPOINT", {
	headers: {
		"X-ApiKey": "YOUR_API_KEY",
	},
});

const data = await response.json();
console.log(data);
