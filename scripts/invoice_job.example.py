# Template for scripts/invoice_job_private.py (safe to commit: placeholders only).
# To set up: copy this file to scripts/invoice_job_private.py and fill in the
# real invoice details. The private copy is gitignored.

INVOICE_NUMBER = "KA-2026-000"
INVOICE_DATE = "1 January 2026"
DUE_DATE = "15 January 2026"

CLIENT = {
    "name": "Client Company Name",
    "address_lines": ["Address line 1", "City, Country"],
    "trn": "000000000000000",          # optional, remove if not needed
    "attention": "Finance Department",  # optional, remove if not needed
}

LINE_ITEMS = [
    {"description": "Description of services", "period": "Month 2026", "amount": 1000.00},
]
