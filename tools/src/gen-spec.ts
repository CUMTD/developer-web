import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import SwaggerParser from "@apidevtools/swagger-parser";
import type { OpenAPIV3 } from "openapi-types";

const ENV_VAR = "OPENAPI_SPEC_URL";

const repoRoot = path.resolve(process.cwd(), "..", "..");
const specPkgDir = path.join(repoRoot, "packages", "spec");
const distDir = path.join(specPkgDir, "dist");

const outJson = path.join(distDir, "openapi.json");
const outYml = path.join(distDir, "openapi.yml");

async function ensureDir(dir: string) {
	await mkdir(dir, { recursive: true });
}

function assertObject(value: unknown): asserts value is Record<string, unknown> {
	if (typeof value !== "object" || value === null) {
		throw new Error("Downloaded spec JSON was not an object");
	}
}

function inferFormatFromContentType(contentType: string | null): "yaml" | "json" | "unknown" {
	const ct = (contentType ?? "").toLowerCase();
	if (ct.includes("json")) return "json";
	if (ct.includes("yaml") || ct.includes("yml") || ct.includes("x-yaml")) return "yaml";
	return "unknown";
}

function inferFormatFromUrl(url: string): "yaml" | "json" | "unknown" {
	const u = url.toLowerCase();
	if (u.endsWith(".json")) return "json";
	if (u.endsWith(".yaml") || u.endsWith(".yml")) return "yaml";
	return "unknown";
}

async function downloadSpec(url: string) {
	const res = await fetch(url, {
		headers: {
			Accept: "application/yaml, application/json, text/yaml, text/plain;q=0.9, */*;q=0.8",
		},
	});

	if (!res.ok) {
		throw new Error(`Failed to download OpenAPI spec: ${res.status} ${res.statusText}`);
	}

	const contentType = res.headers.get("content-type");
	const bodyText = await res.text();

	return { bodyText, contentType };
}

async function main() {
	const url = process.env[ENV_VAR];
	if (!url) {
		throw new Error(`Missing env var ${ENV_VAR}. Example: ${ENV_VAR}=https://your.api/openapi/v1.yaml`);
	}

	await ensureDir(distDir);

	const { bodyText, contentType } = await downloadSpec(url);

	const inferred =
		inferFormatFromContentType(contentType) !== "unknown"
			? inferFormatFromContentType(contentType)
			: inferFormatFromUrl(url);

	const rawKind: "yaml" | "json" = inferred === "unknown" ? "yaml" : inferred;

	// Save raw download for inspection/debugging
	if (rawKind === "json") {
		await writeFile(outJson, bodyText.endsWith("\n") ? bodyText : `${bodyText}\n`, "utf8");
	} else {
		await writeFile(outYml, bodyText.endsWith("\n") ? bodyText : `${bodyText}\n`, "utf8");
	}

	let deref: OpenAPIV3.Document;
	if (rawKind === "json") {
		const parsedUnknown: unknown = JSON.parse(bodyText);
		assertObject(parsedUnknown);

		// swagger-parser wants its own Document type (not a generic object)

		// TODO: Make validation work
		// Need to fix in generated specs first
		// const parsedDoc = parsedUnknown as unknown as OpenAPI.Document;
		// const validated = (await SwaggerParser.validate(parsedDoc)) as unknown as OpenAPIV3.Document;
		// deref = (await SwaggerParser.dereference(validated)) as unknown as OpenAPIV3.Document;
		deref = (await SwaggerParser.dereference(outYml)) as unknown as OpenAPIV3.Document;
	} else {
		// For YAML, pass the file path (this matches the string overload cleanly)
		// const validated = (await SwaggerParser.validate(outYml)) as unknown as OpenAPIV3.Document;
		// deref = (await SwaggerParser.dereference(validated)) as unknown as OpenAPIV3.Document;
		deref = (await SwaggerParser.dereference(outYml)) as unknown as OpenAPIV3.Document;
	}

	// Always write canonical dereferenced JSON
	await writeFile(outJson, `${JSON.stringify(deref, null, 2)}\n`, "utf8");

	const pathsCount = Object.keys(deref.paths ?? {}).length;

	console.log(`✅ Downloaded spec from ${url}`);
	console.log(`✅ Generated ${path.relative(repoRoot, outJson)} (${pathsCount} paths)`);
}

main().catch((err) => {
	console.error("❌ Spec generation failed");
	console.error(err);
	process.exit(1);
});
