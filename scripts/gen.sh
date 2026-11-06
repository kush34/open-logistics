#!/usr/bin/env bash
# Regenerate specs/*.json and the Python and Rust clients.
#   ./scripts/gen.sh          write into specs/ and packages/
#   ./scripts/gen.sh --check  generate into a temp dir and diff (CI)
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
generator_version="2.42.0"
redocly_version="2.73.0"
providers=(shiprocket delhivery)
version="$(node -p "require('${root}/package.json').version")"
repo_url="https://github.com/kush34/open-logistics"
homepage="https://open-logistics.vercel.app"
author="Open Logistics"

work="$(mktemp -d)"
trap 'rm -rf "$work"' EXIT

generate() {
  npx -y "@openapitools/openapi-generator-cli@${generator_version}" generate \
    --global-property=apiTests=false,modelTests=false \
    "$@"
}

for provider in "${providers[@]}"; do
  spec_version="$(awk '/^  version:/{print $2; exit}' "$root/specs/${provider}.yaml")"
  if [[ "$spec_version" != "$version" ]]; then
    echo "specs/${provider}.yaml info.version ($spec_version) != package.json ($version)" >&2
    exit 1
  fi

  npx -y "@redocly/cli@${redocly_version}" bundle "$root/specs/${provider}.yaml" \
    --ext json -o "$work/specs/${provider}.json" >/dev/null

  generate \
    -i "$root/specs/${provider}.yaml" \
    -g python \
    -o "$work/packages/python/${provider}" \
    --additional-properties "packageName=open_logistics_${provider},projectName=open-logistics-${provider},packageVersion=${version},library=urllib3"
  rm -rf "$work/packages/python/${provider}/git_push.sh" \
    "$work/packages/python/${provider}/.github" \
    "$work/packages/python/${provider}/.gitlab-ci.yml" \
    "$work/packages/python/${provider}/.travis.yml" \
    "$work/packages/python/${provider}/test" \
    "$work/packages/python/${provider}/tox.ini" \
    "$work/packages/python/${provider}/test-requirements.txt"
  sed -i \
    -e "s|https://github.com/GIT_USER_ID/GIT_REPO_ID|${repo_url}|" \
    -e "s|{name = \"OpenAPI Generator Community\",email = \"team@openapitools.org\"}|{name = \"${author}\"}|" \
    "$work/packages/python/${provider}/pyproject.toml"
  python3 "$root/scripts/python_docs.py" "$work/packages/python/${provider}"

  generate \
    -i "$root/specs/${provider}.yaml" \
    -g rust \
    -o "$work/rust/${provider}" \
    --additional-properties "packageName=open-logistics,library=reqwest"
  rm -f "$work/rust/${provider}/git_push.sh" "$work/rust/${provider}/.travis.yml"
done

# Both providers ship as one crate: open_logistics::{shiprocket,delhivery}.
merged="$work/packages/rust/open-logistics"
mkdir -p "$merged/src"
cp "$work/rust/shiprocket/Cargo.toml" "$merged/Cargo.toml"
sed -i \
  -e 's|^name = .*|name = "open-logistics"|' \
  -e "s|^authors = .*|authors = [\"${author}\"]|" \
  -e 's|^description = .*|description = "Rust client for the Open Logistics Shiprocket and Delhivery APIs."|' \
  -e "s|^license = .*|license = \"MIT\"\nkeywords = [\"logistics\", \"shipping\", \"shiprocket\", \"delhivery\", \"api-client\"]\ncategories = [\"api-bindings\", \"web-programming::http-client\"]\nrepository = \"${repo_url}\"\nhomepage = \"${homepage}\"|" \
  "$merged/Cargo.toml"
printf '#![allow(unused_imports)]\n#![allow(clippy::too_many_arguments)]\n\npub mod delhivery;\npub mod shiprocket;\n' > "$merged/src/lib.rs"
cat > "$merged/README.md" <<EOF
# open-logistics

Rust client for the Shiprocket and Delhivery APIs.

## Install

\`\`\`toml
[dependencies]
open-logistics = "${version}"
\`\`\`

## Modules

- \`open_logistics::shiprocket\` — Shiprocket APIs and models
- \`open_logistics::delhivery\` — Delhivery APIs and models

Both modules expose \`apis\` and \`models\`.
EOF

for provider in "${providers[@]}"; do
  mkdir -p "$merged/src/${provider}"
  cp -a "$work/rust/${provider}/src/apis" "$work/rust/${provider}/src/models" "$merged/src/${provider}/"
  printf 'pub mod apis;\npub mod models;\n' > "$merged/src/${provider}/mod.rs"
  find "$merged/src/${provider}" -name '*.rs' -exec sed -i "s|crate::|crate::${provider}::|g" {} +
  python3 "$root/scripts/rust_extra_fields.py" "$merged/src/${provider}/models"
done

if [[ "${1:-}" == "--check" ]]; then
  for provider in "${providers[@]}"; do
    diff "$root/specs/${provider}.json" "$work/specs/${provider}.json"
    diff -r -x build -x dist -x '*.egg-info' -x __pycache__ -x .ruff_cache -x .pytest_cache \
      "$root/packages/python/${provider}" "$work/packages/python/${provider}"
  done
  diff -r -x target "$root/packages/rust/open-logistics" "$merged"
  echo "Generated specs and clients are up to date."
else
  for provider in "${providers[@]}"; do
    cp "$work/specs/${provider}.json" "$root/specs/${provider}.json"
    rm -rf "${root:?}/packages/python/${provider:?}"
    cp -a "$work/packages/python/${provider}" "$root/packages/python/"
  done
  rm -rf "${root:?}/packages/rust/open-logistics"
  cp -a "$merged" "$root/packages/rust/"
  echo "Regenerated specs and clients."
fi
