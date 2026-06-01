#!/usr/bin/env bash
# Fails the build if any em dash or en dash appears in source/content.
# Kudo Advisory rule: no long dashes anywhere, ever.
set -euo pipefail

# em dash U+2014, en dash U+2013
PATTERN=$'—\|–'

MATCHES=$(grep -rn "$PATTERN" src public index.html marketing api 2>/dev/null \
  | grep -v "node_modules" || true)

if [ -n "$MATCHES" ]; then
  echo "✗ Long dashes found (em — or en –). Remove them before building:"
  echo "$MATCHES"
  exit 1
fi

echo "✓ No long dashes found."
