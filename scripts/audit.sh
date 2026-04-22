#!/usr/bin/env bash
#
# Security audit wrapper for the V2 Design System crate.
#
# cargo-audit does not support project-local TOML config, so the ignored
# advisory IDs are listed here.  All entries come from the Dioxus 0.7
# desktop backend's transitive dependency graph (wry -> webkit2gtk ->
# gtk-rs 0.18 / glib 0.18, plus a few unmaintained proc-macro helpers)
# and cannot be patched from this crate.  Revisit after every Dioxus /
# wry release to shrink this list.
#
# Usage:
#   ./scripts/audit.sh
#
set -euo pipefail

cd "$(dirname "$0")/.."

exec cargo audit \
  --ignore RUSTSEC-2024-0411 \
  --ignore RUSTSEC-2024-0412 \
  --ignore RUSTSEC-2024-0413 \
  --ignore RUSTSEC-2024-0414 \
  --ignore RUSTSEC-2024-0415 \
  --ignore RUSTSEC-2024-0416 \
  --ignore RUSTSEC-2024-0418 \
  --ignore RUSTSEC-2024-0419 \
  --ignore RUSTSEC-2024-0420 \
  --ignore RUSTSEC-2024-0370 \
  --ignore RUSTSEC-2024-0436 \
  --ignore RUSTSEC-2025-0057 \
  --ignore RUSTSEC-2024-0429 \
  --ignore RUSTSEC-2026-0097 \
  "$@"
