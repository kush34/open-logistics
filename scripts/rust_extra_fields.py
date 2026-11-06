#!/usr/bin/env python3
"""Restore extra response fields in generated Rust models.

OpenAPI Generator's Rust client drops properties not declared in the schema,
even when the schema sets `additionalProperties: true`. Python keeps them in
`additional_properties`. This adds the equivalent flattened map so both
languages expose the same raw payload.

Usage: rust_extra_fields.py <generated models directory>
"""

import sys
from pathlib import Path

# Delhivery response models whose schemas allow additional properties.
MODELS = [
    "delhivery_api_error_body",
    "delhivery_order_create_response",
    "delhivery_order_edit_response",
    "delhivery_packing_slip_response",
    "delhivery_pickup_request_response",
    "delhivery_postal_code_serviceability",
    "delhivery_rate_response_inner",
    "delhivery_serviceability_response",
    "delhivery_serviceability_response_delivery_codes_inner",
    "delhivery_shipment_item",
    "delhivery_shipment_payload",
    "delhivery_tracking_response",
]

FIELD = """
    /// Fields the schema allows but does not enumerate.
    #[serde(flatten)]
    pub additional_properties: std::collections::HashMap<String, serde_json::Value>,
"""


def patch(path: Path) -> None:
    if not path.exists():
        return

    src = path.read_text()
    if "additional_properties" in src:
        return

    marker = "pub struct "
    start = src.index(marker)
    name = src[start + len(marker) : src.index(" ", start + len(marker))]
    brace = src.index("{", start) + 1
    src = src[:brace] + FIELD + src[brace:]

    constructor = f"        {name} {{\n"
    body = src.index(constructor, src.index("pub fn new("))
    close = src.index("\n        }\n", body)
    src = (
        src[:close]
        + "\n            additional_properties: Default::default(),"
        + src[close:]
    )
    path.write_text(src)


if __name__ == "__main__":
    models = Path(sys.argv[1])
    for model in MODELS:
        patch(models / f"{model}.rs")
