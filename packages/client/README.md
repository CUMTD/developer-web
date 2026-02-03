# @mtd/developer-api-client

Type-safe API client for the [MTD Developer API](https://mtd.dev).

This package provides a fully type-safe HTTP client for the MTD (Champaign-Urbana Mass Transit District) Developer API, built on [openapi-fetch](https://github.com/drwpow/openapi-typescript/tree/main/packages/openapi-fetch) with types generated from the official OpenAPI specification.

## Features

- ✅ **Fully Type-Safe**: Complete TypeScript support with autocomplete and compile-time validation
- ✅ **Lightweight**: Minimal dependencies, tree-shakeable
- ✅ **Spec-Driven**: Generated directly from the official OpenAPI spec
- ✅ **Modern**: Built on native `fetch` API
- ✅ **Framework Agnostic**: Works anywhere JavaScript runs

## Installation

```bash
npm install @mtd/developer-api-client
```

```bash
pnpm add @mtd/developer-api-client
```

```bash
yarn add @mtd/developer-api-client
```

## Quick Start

```typescript
import createClient from '@mtd/developer-api-client';

// Create a client with your API key
const client = createClient({
	apiKey: 'your-api-key-here'
});

// Make fully typed API calls
const { data, error } = await client.GET('/GetDeparturesByStop', {
	params: {
		query: {
			stop_id: 'TERMINAL'
		}
	}
});

if (error) {
	console.error('API Error:', error);
} else {
	// data is fully typed!
	data.departures.forEach(departure => {
		console.log(`${departure.headsign} - ${departure.expected_mins} min`);
	});
}
```

## API Reference

### Creating a Client

```typescript
import createClient from '@mtd/developer-api-client';

const client = createClient({
	apiKey: 'your-api-key',
	// Optional: override base URL
	baseUrl: 'https://api.mtd.dev/v3.0.0'
});
```

### Making Requests

All API methods are fully typed based on the OpenAPI specification:

```typescript
// GET requests
const { data, error } = await client.GET('/GetRoutes', {
	params: {
		query: {
			// Query parameters are typed
		}
	}
});

// POST requests (if applicable)
const { data, error } = await client.POST('/endpoint', {
	body: {
		// Request body is typed
	}
});
```

## Common Examples

### Get Routes

```typescript
const { data, error } = await client.GET('/GetRoutes');

if (data) {
	data.routes.forEach(route => {
		console.log(`${route.route_short_name}: ${route.route_long_name}`);
	});
}
```

### Get Departures by Stop

```typescript
const { data, error } = await client.GET('/GetDeparturesByStop', {
	params: {
		query: {
			stop_id: 'TERMINAL',
			pt: 30 // preview time in minutes
		}
	}
});

if (data) {
	data.departures.forEach(dep => {
		console.log(`${dep.headsign} arriving in ${dep.expected_mins} minutes`);
	});
}
```

### Get Vehicle Positions

```typescript
const { data, error } = await client.GET('/GetVehicles', {
	params: {
		query: {
			route_id: '100YELLOW'
		}
	}
});

if (data) {
	data.vehicles.forEach(vehicle => {
		console.log(`Vehicle ${vehicle.vehicle_id} at ${vehicle.location.lat}, ${vehicle.location.lon}`);
	});
}
```

## Error Handling

The client returns both `data` and `error`. Always check for errors:

```typescript
const { data, error } = await client.GET('/GetRoutes');

if (error) {
	// Error is typed based on the API spec
	console.error('Status:', error.status);
	console.error('Message:', error.message);
	return;
}

// Safe to use data here
console.log(data.routes);
```

## TypeScript Support

The client provides full TypeScript support out of the box:

```typescript
import type { paths, components } from '@mtd/developer-api-types';

// Use types from the spec
type Route = components['schemas']['Route'];
type Vehicle = components['schemas']['Vehicle'];

// All requests and responses are typed
const client = createClient({ apiKey: 'key' });
const response = await client.GET('/GetRoutes'); // response is typed!
```

## Related Packages

- [`@mtd/developer-api-spec`](https://www.npmjs.com/package/@mtd/developer-api-spec) - OpenAPI specification
- [`@mtd/developer-api-types`](https://www.npmjs.com/package/@mtd/developer-api-types) - TypeScript types (used internally)

## Getting Your API Key

To use this client, you'll need an MTD Developer API key:

1. Visit [mtd.dev](https://mtd.dev)
2. Sign up for a free developer account
3. Create an API key in your dashboard
4. Use the key with this client

## Documentation

- **Full API Documentation**: [mtd.dev](https://mtd.dev)
- **API Reference**: [mtd.dev/api-reference](https://mtd.dev/api-reference)
- **Getting Started Guide**: [mtd.dev/docs](https://mtd.dev/docs)

## License

Apache-2.0

## Support

- **Issues**: [GitHub Issues](https://github.com/CUMTD/developer-web/issues)
- **Repository**: [CUMTD/developer-web](https://github.com/CUMTD/developer-web)

## Contributing

This package is generated from the OpenAPI specification. For bugs or feature requests, please open an issue on the [main repository](https://github.com/CUMTD/developer-web).
