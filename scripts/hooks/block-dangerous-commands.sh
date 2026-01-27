#!/usr/bin/env bash
set -euo pipefail

INPUT="$(cat)"

# Only gate bash invocations.
TOOL_NAME="$(echo "$INPUT" | jq -r '.toolName')"
if [ "$TOOL_NAME" != "bash" ]; then
	exit 0
fi

TOOL_ARGS="$(echo "$INPUT" | jq -r '.toolArgs')"

# Very small denylist of “never okay” patterns for an agent.
if echo "$TOOL_ARGS" | grep -qiE 'rm\s+-rf\s+/|mkfs|dd\s+if=|:\(\)\s*\{\s*:\|\s*:\s*;\s*\}\s*;|DROP\s+TABLE|TRUNCATE\s+TABLE'; then
	echo '{"permissionDecision":"deny","permissionDecisionReason":"Blocked dangerous shell/database operation"}'
	exit 0
fi

# Allow everything else.
exit 0
