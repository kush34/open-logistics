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

  generate \
    -i "$root/specs/${provider}.yaml" \
    -g rust \
    -o "$work/packages/rust/${provider}" \
    --additional-properties "packageName=open_logistics_${provider},library=reqwest"
  rm -f "$work/packages/rust/${provider}/git_push.sh" "$work/packages/rust/${provider}/.travis.yml"
  sed -i "s|^authors = .*|authors = [\"${author}\"]\nrepository = \"${repo_url}\"\nhomepage = \"${homepage}\"\ndocumentation = \"https://docs.rs/open_logistics_${provider}\"|" \
    "$work/packages/rust/${provider}/Cargo.toml"
  python3 "$root/scripts/rust_extra_fields.py" \
    "$work/packages/rust/${provider}/src/models"
done

if [[ "${1:-}" == "--check" ]]; then
  for provider in "${providers[@]}"; do
    diff "$root/specs/${provider}.json" "$work/specs/${provider}.json"
    diff -r -x build -x dist -x '*.egg-info' -x __pycache__ -x .ruff_cache -x .pytest_cache \
      "$root/packages/python/${provider}" "$work/packages/python/${provider}"
    diff -r -x target \
      "$root/packages/rust/${provider}" "$work/packages/rust/${provider}"
  done
  echo "Generated specs and clients are up to date."
else
  for provider in "${providers[@]}"; do
    cp "$work/specs/${provider}.json" "$root/specs/${provider}.json"
    for language in python rust; do
      rm -rf "${root:?}/packages/${language:?}/${provider:?}"
      cp -a "$work/packages/${language}/${provider}" "$root/packages/${language}/"
    done
  done
  echo "Regenerated specs and clients."
fi
