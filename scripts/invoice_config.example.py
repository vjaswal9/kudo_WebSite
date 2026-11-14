# Template for scripts/invoice_config_private.py (safe to commit: placeholders only).
# To set up: copy this file to scripts/invoice_config_private.py and fill in the
# real values. The private copy is gitignored and must never be committed.

FROM = {
    "name": "Your Company Name",
    "address_lines": ["Address line 1", "City, Country"],
    "email": "you@example.com",
    "phone": "+000 00 000 0000",
}

BANK = {
    "bank_name": "Your Bank",
    "account_name": "Exact account name at the bank",
    "iban": "XX00 0000 0000 0000 0000 000",
    "swift": "SWIFT/BIC code",
    "currency": "AED",
}

PAYMENT_TERMS = "Payment due within 14 days of the invoice date."
VAT_REGISTERED = False
KUDO_TRN = ""
