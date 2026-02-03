# @mtd.org/developer-api-types

TypeScript type definitions for the [MTD Developer API](https://mtd.dev).

This package provides comprehensive TypeScript types generated from the Champaign-Urbana Mass Transit District (MTD) OpenAPI specification, enabling type-safe development with the MTD API.

## Installation

```bash
npm install @mtd.org/developer-api-types
```

```bash
pnpm add @mtd.org/developer-api-types
```

## Usage

Import the types you need for your MTD API integration:

```typescript
import type {
	components,
	paths,
	operations
} from '@mtd.org/developer-api-types';

// Use component schemas
type Vehicle = components['schemas']['Vehicle'];
type Route = components['schemas']['Route'];
type Stop = components['schemas']['StopBase'];

// Use path types
type GetDeparturesResponse =
	paths["/stops/{stopId}/departures"]["get"]["responses"]["200"]["content"]["application/json"];

// Use operation types
type GetRoutesOperation = operations['get-route-groups'];
```

## Type Safety Benefits

- **Autocomplete**: Get IntelliSense for all API endpoints, parameters, and responses
- **Compile-time Validation**: Catch API integration errors before runtime
- **Documentation**: Types serve as inline documentation for the API
- **Refactoring**: Safely refactor code with confidence

## Related Packages

- [`@mtd.org/developer-api-spec`](https://www.npmjs.com/package/@mtd.org/developer-api-spec) - OpenAPI specification (source for these types)
- [`@mtd.org/developer-api-client`](https://www.npmjs.com/package/@mtd.org/developer-api-client) - Type-safe API client that uses these types

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
