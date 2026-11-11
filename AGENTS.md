# Agent instructions

## Docs follow API changes

Any change that adds, removes, renames, or changes the behaviour of a public
API must update the docs in the same change or pull request. This covers
exported classes, methods, options, config fields, error types, and entry
points.

Do not treat "docs" as a follow-up. A PR that changes the API without docs is
incomplete.

Checklist for an API change:

- Update the relevant page under `docs/` (and add a page if the change is a new
  entry point or concept).
- Add the page to the sidebar in `docs/.vitepress/config.js`.
- Update `docs/public/llms.txt` so LLM readers learn the new shape.
- Update `README.md` if it shows the changed call.
- Run `npm run docs:build` and confirm it passes.

Deprecations count as API changes: document what replaces them and when they
will be removed.
