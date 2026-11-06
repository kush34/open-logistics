#!/usr/bin/env python3
"""Patch openapi-generator 2.42.0 Python doc examples.

The generator prints `Model.to_json()` (an instance method) and uses
`os.environ` without importing `os`. It also suggests the Bearer prefix for
API-key auth schemes that need a different one.
"""
import re
import sys
from pathlib import Path

package = Path(sys.argv[1])
api_key_prefix = {"delhivery": "Token"}.get(package.name, "")
files = [package / "README.md", *sorted(package.glob("docs/*.md"))]


def add_os_import(match):
    block = match.group(1)
    if "os.environ" in block and not re.search(r"^import os$", block, re.MULTILINE):
        block = "import os\n" + block
    return "```python\n" + block + "```"


for path in files:
    text = path.read_text()
    original = text

    text = re.sub(r"```python\n(.*?)```", add_os_import, text, flags=re.DOTALL)

    instance = re.search(r"^(\w+_instance) = ", text, re.MULTILINE)
    if instance:
        text = re.sub(
            r"^print\([A-Z]\w*\.to_json\(\)\)$",
            f"print({instance.group(1)}.to_json())",
            text,
            flags=re.MULTILINE,
        )

    if api_key_prefix:
        text = text.replace(
            "# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed",
            "# Set the required API key prefix",
        )
        text = re.sub(
            r"^# (configuration\.api_key_prefix\[[^\]]+\]) = 'Bearer'$",
            rf"\g<1> = '{api_key_prefix}'",
            text,
            flags=re.MULTILINE,
        )

    if text != original:
        path.write_text(text)

    assert not re.search(r"^print\([A-Z]\w*\.to_json\(\)\)$", text, re.MULTILINE), path
    for block in re.findall(r"```python\n(.*?)```", text, re.DOTALL):
        assert "os.environ" not in block or re.search(r"^import os$", block, re.MULTILINE), path
    assert not api_key_prefix or "'Bearer'" not in text, path
