import { GlobalEnvSchema, ServerEnvSchema } from "@env/schema";

// Parse using process.env so it matches Next build environment
GlobalEnvSchema.parse(process.env);

ServerEnvSchema.parse(process.env);

console.log("✅ Environment validated");
