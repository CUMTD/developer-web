#!/usr/bin/env bash
set -euo pipefail

echo "Running repo verification (Biome + tsc)..."

pnpm run ci:verify

echo "Verification passed."
