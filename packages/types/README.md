# @mtd/developer-api-types

TypeScript type definitions for the [MTD Developer API](https://mtd.dev).

This package provides comprehensive TypeScript types generated from the MTD (Champaign-Urbana Mass Transit District) OpenAPI specification, enabling type-safe development with the MTD API.

## Installation

```bash
npm install @mtd/developer-api-types
```

```bash
pnpm add @mtd/developer-api-types
```

```bash
yarn add @mtd/developer-api-types
```

## Usage

Import the types you need for your MTD API integration:

```typescript
import type { 
	components,
	paths,
	operations
} from '@mtd/developer-api-types';

// Use component schemas
type Vehicle = components['schemas']['Vehicle'];
type Route = components['schemas']['Route'];
type Stop = components['schemas']['Stop'];

// Use path types
type GetDeparturesResponse = paths['/GetDeparturesByStop']['get']['responses']['200']['content']['application/json'];

// Use operation types
type GetRoutesOperation = operations['GetRoutes'];
```

## Type Safety Benefits

- **Autocomplete**: Get IntelliSense for all API endpoints, parameters, and responses
- **Compile-time Validation**: Catch API integration errors before runtime
- **Documentation**: Types serve as inline documentation for the API
- **Refactoring**: Safely refactor code with confidence

## Common Types

```typescript
import type { components } from '@mtd/developer-api-types';

// Transit data types
type Vehicle = components['schemas']['Vehicle'];
type Route = components['schemas']['Route'];
type Stop = components['schemas']['Stop'];
type Trip = components['schemas']['Trip'];
type Departure = components['schemas']['Departure'];

// Response types
type ApiResponse<T> = components['schemas']['ApiResponse'] & {
	data: T;
};
```

## Related Packages

- [`@mtd/developer-api-spec`](https://www.npmjs.com/package/@mtd/developer-api-spec) - OpenAPI specification (source for these types)
- [`@mtd/developer-api-client`](https://www.npmjs.com/package/@mtd/developer-api-client) - Type-safe API client that uses these types

## Recommended Usage

For the best developer experience, use this package with the type-safe API client:

```typescript
import createClient from '@mtd/developer-api-client';

const client = createClient({ 
	apiKey: 'your-api-key'
});

// Fully typed requests and responses
const { data, error } = await client.GET('/GetDeparturesByStop', {
	params: {
		query: {
			stop_id: '123',
		},
	},
});

// data is fully typed!
if (data) {
	data.departures.forEach(departure => {
		console.log(departure.headsign);
	});
}
```

## Getting Started with the API

To use the MTD Developer API, you'll need an API key:

1. Visit [mtd.dev](https://mtd.dev)
2. Sign up for a free developer account
3. Create an API key
4. Start building!

## Documentation

Full API documentation and guides are available at [mtd.dev](https://mtd.dev).

## License

Apache-2.0

## Support

- **Issues**: [GitHub Issues](https://github.com/CUMTD/developer-web/issues)
- **Repository**: [CUMTD/developer-web](https://github.com/CUMTD/developer-web)
