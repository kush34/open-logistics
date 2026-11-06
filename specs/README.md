# OpenAPI specs

`specs/*.yaml` are the source of truth for the generated Python and Rust clients.
`specs/*.json` are the same documents bundled by Redocly for tools that want JSON.

Regenerate everything:

```bash
./scripts/gen.sh
```

Verify the checked-in output matches the specs (what CI runs):

```bash
./scripts/gen.sh --check
```

Validate the specs:

```bash
npx -y @redocly/cli@2.73.0 lint specs/shiprocket.yaml specs/delhivery.yaml
```

## Editing

1. Change the operation or schema in the relevant YAML file.
2. Keep `operationId` values in snake_case; they become method names in every
   language.
3. Keep wire field names snake_case; generated model fields use the wire name
   as-is. Provider payloads with camelCase keys are not renamed.
4. Keep `info.version` equal to the root `package.json` version; `gen.sh` fails
   if they differ.
5. Run `./scripts/gen.sh` and commit the result.
