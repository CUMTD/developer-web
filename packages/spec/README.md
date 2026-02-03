# @mtd/developer-api-spec

OpenAPI Specification for the [MTD Developer API](https://mtd.dev).

This package provides the complete OpenAPI specification for the Champaign-Urbana Mass Transit District (MTD) Developer API, enabling developers to build transit applications with real-time bus information, route data, and more.

## Installation


```bash
npm install @mtd/developer-api-spec
```

```bash
pnpm add @mtd/developer-api-spec
```

## Usage

This package exports the OpenAPI specification in both JSON and YAML formats.

### JSON Format

```javascript
import openapi from '@mtd/developer-api-spec/openapi.json';

console.log(openapi.info.version);
```

### YAML Format

```javascript
import openapiYaml from '@mtd/developer-api-spec/openapi.yml';
```

## Use Cases

- **Code Generation**: Generate type-safe API clients in any language
- **API Documentation**: Generate interactive API documentation using tools like Swagger UI or Redoc
- **API Testing**: Create automated API tests using the spec as a reference
- **Mock Servers**: Generate mock API servers for development and testing
- **Schema Validation**: Validate API requests and responses against the spec

## Related Packages

- [`@mtd/developer-api-types`](https://www.npmjs.com/package/@mtd/developer-api-types) - TypeScript type definitions generated from this spec
- [`@mtd/developer-api-client`](https://www.npmjs.com/package/@mtd/developer-api-client) - Type-safe API client built from this spec

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
