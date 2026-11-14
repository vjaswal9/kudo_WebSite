#!/usr/bin/env python3
"""
Generate a branded, letterheaded Kudo Advisory invoice as a PDF.

Reusable template: edit scripts/invoice_job_private.py (client, line items,
invoice number, dates) for each new invoice, then run:

    python3 scripts/build_invoice.py

Output goes to invoices/<invoice_number>.pdf (gitignored, never public,
these carry real client and bank details).

Design: clean white background (invoices are printed and read by finance
departments, unlike the dark marketing collateral), with the Kudo navy and
champagne gold brand accents and a vector-drawn dot-mark (no raster logo
needed, since the real PNG logo is cream-on-transparent and would be
invisible on white).
"""
import os
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.pdfgen import canvas

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(ROOT, "invoices")
os.makedirs(OUT_DIR, exist_ok=True)

NAVY = HexColor("#10222E")
GOLD = HexColor("#B8863E")   # a print-safe deeper gold (the on-screen champagne is too pale for print/white)
GREY = HexColor("#5C5C5C")
LIGHT = HexColor("#F2F0EA")
LINE = HexColor("#D9D5C9")

W, H = A4

# ---------------------------------------------------------------------------
# Sender and bank details live in a PRIVATE, gitignored file so they never
# reach the public repo. Copy scripts/invoice_config.example.py to
# scripts/invoice_config_private.py and fill in the real values.
# ---------------------------------------------------------------------------
try:
    from invoice_config_private import (
        FROM, BANK, PAYMENT_TERMS, VAT_REGISTERED, KUDO_TRN,
    )
except ImportError:
    raise SystemExit(
        "Missing scripts/invoice_config_private.py. Copy "
        "scripts/invoice_config.example.py to that name and fill in your "
        "sender and bank details (the private file is gitignored)."
    )

# Footer line built from the private config. Uses a compact one-line address,
# so the street/PO box line and the country line are joined.
FOOTER_LINE = "  |  ".join([
    FROM["name"],
    ", ".join(FROM["address_lines"]),
    FROM["email"],
    FROM["phone"],
])


def dot_mark(c, cx, cy, r=1.1, gap=3.2, color=NAVY):
    """Vector-drawn version of the Kudo diamond dot-mark (rows 1,3,5,7,9,11,9,7,5,3,1)."""
    rows = [1, 3, 5, 7, 9, 11, 9, 7, 5, 3, 1]
    c.setFillColor(color)
    for row, count in enumerate(rows):
        y = cy - row * gap
        for i in range(count):
            x = cx + (i - (count - 1) / 2) * gap
            c.circle(x, y, r, fill=1, stroke=0)


def draw_invoice(invoice_number, invoice_date, due_date, client, line_items):
    """
    client: dict with name, address_lines (list), trn (optional), attention (optional)
    line_items: list of dicts: {description, period, amount}
    """
    path = os.path.join(OUT_DIR, f"{invoice_number}.pdf")
    c = canvas.Canvas(path, pagesize=A4)

    # ---------- Letterhead ----------
    # Mark sized and positioned to sit level with the wordmark, clear of the
    # gold rule below (rule is at H - 32mm; mark bottom stops at H - 30mm).
    dot_mark(c, 23 * mm, H - 17 * mm, r=0.48 * mm, gap=1.3 * mm, color=NAVY)
    c.setFillColor(NAVY)
    c.setFont("Helvetica-Bold", 17)
    c.drawString(34 * mm, H - 22 * mm, "Kudo Advisory")
    c.setFillColor(GREY)
    c.setFont("Helvetica", 8.5)
    c.drawString(34 * mm, H - 27 * mm, "Independent AI Advisory  |  kudoadvisory.com")

    c.setFillColor(NAVY)
    c.setFont("Helvetica-Bold", 22)
    c.drawRightString(W - 20 * mm, H - 20 * mm, "INVOICE")
    c.setFillColor(GREY)
    c.setFont("Helvetica", 9.5)
    c.drawRightString(W - 20 * mm, H - 27 * mm, f"Invoice No: {invoice_number}")

    c.setStrokeColor(GOLD)
    c.setLineWidth(1.4)
    c.line(20 * mm, H - 32 * mm, W - 20 * mm, H - 32 * mm)

    # ---------- From / Bill To ----------
    top = H - 42 * mm
    c.setFillColor(NAVY)
    c.setFont("Helvetica-Bold", 9)
    c.drawString(20 * mm, top, "FROM")
    c.drawString(110 * mm, top, "BILL TO")

    c.setFont("Helvetica-Bold", 10.5)
    c.setFillColor(NAVY)
    c.drawString(20 * mm, top - 6 * mm, FROM["name"])
    c.drawString(110 * mm, top - 6 * mm, client["name"])

    c.setFont("Helvetica", 9.5)
    c.setFillColor(GREY)
    y = top - 11 * mm
    for line in FROM["address_lines"]:
        c.drawString(20 * mm, y, line)
        y -= 4.6 * mm
    c.drawString(20 * mm, y, FROM["email"])
    y -= 4.6 * mm
    c.drawString(20 * mm, y, FROM["phone"])
    if VAT_REGISTERED and KUDO_TRN:
        y -= 4.6 * mm
        c.drawString(20 * mm, y, f"TRN: {KUDO_TRN}")

    y2 = top - 11 * mm
    for line in client["address_lines"]:
        c.drawString(110 * mm, y2, line)
        y2 -= 4.6 * mm
    if client.get("trn"):
        c.drawString(110 * mm, y2, f"TRN: {client['trn']}")
        y2 -= 4.6 * mm
    if client.get("attention"):
        c.drawString(110 * mm, y2, f"Attention: {client['attention']}")
        y2 -= 4.6 * mm

    # ---------- Invoice meta strip ----------
    meta_y = top - 40 * mm
    c.setFillColor(LIGHT)
    c.roundRect(20 * mm, meta_y - 8 * mm, W - 40 * mm, 12 * mm, 2 * mm, fill=1, stroke=0)
    c.setFillColor(NAVY)
    c.setFont("Helvetica-Bold", 8.5)
    labels = ["INVOICE DATE", "DUE DATE", "CURRENCY"]
    values = [invoice_date, due_date, BANK["currency"]]
    col_x = [26 * mm, 90 * mm, 154 * mm]
    for lbl, val, x in zip(labels, values, col_x):
        c.setFont("Helvetica-Bold", 7.5)
        c.setFillColor(GREY)
        c.drawString(x, meta_y - 2.5 * mm, lbl)
        c.setFont("Helvetica-Bold", 10)
        c.setFillColor(NAVY)
        c.drawString(x, meta_y - 6.5 * mm, val)

    # ---------- Line items table ----------
    table_top = meta_y - 20 * mm
    c.setFillColor(NAVY)
    c.rect(20 * mm, table_top - 8 * mm, W - 40 * mm, 8 * mm, fill=1, stroke=0)
    c.setFillColor(HexColor("#FFFFFF"))
    c.setFont("Helvetica-Bold", 8.5)
    c.drawString(23 * mm, table_top - 5.5 * mm, "DESCRIPTION")
    c.drawString(140 * mm, table_top - 5.5 * mm, "PERIOD")
    c.drawRightString(W - 23 * mm, table_top - 5.5 * mm, "AMOUNT (AED)")

    row_y = table_top - 8 * mm
    subtotal = 0.0
    c.setFont("Helvetica", 9.5)
    for i, item in enumerate(line_items):
        row_h = 10 * mm
        if i % 2 == 1:
            c.setFillColor(LIGHT)
            c.rect(20 * mm, row_y - row_h, W - 40 * mm, row_h, fill=1, stroke=0)
        c.setFillColor(NAVY)
        c.drawString(23 * mm, row_y - 6.5 * mm, item["description"])
        c.setFillColor(GREY)
        c.drawString(140 * mm, row_y - 6.5 * mm, item["period"])
        c.setFillColor(NAVY)
        c.drawRightString(W - 23 * mm, row_y - 6.5 * mm, f"{item['amount']:,.2f}")
        subtotal += item["amount"]
        row_y -= row_h

    c.setStrokeColor(LINE)
    c.setLineWidth(0.6)
    c.line(20 * mm, row_y, W - 20 * mm, row_y)

    # ---------- Totals ----------
    vat = subtotal * 0.05 if VAT_REGISTERED else 0.0
    total = subtotal + vat
    ty = row_y - 8 * mm
    c.setFont("Helvetica", 9.5)
    c.setFillColor(GREY)
    c.drawRightString(150 * mm, ty, "Subtotal")
    c.setFillColor(NAVY)
    c.drawRightString(W - 23 * mm, ty, f"AED {subtotal:,.2f}")
    ty -= 6 * mm
    c.setFillColor(GREY)
    c.drawRightString(150 * mm, ty, "VAT (5%)" if VAT_REGISTERED else "VAT (not registered)")
    c.setFillColor(NAVY)
    c.drawRightString(W - 23 * mm, ty, f"AED {vat:,.2f}")
    ty -= 8 * mm
    c.setFillColor(NAVY)
    c.rect(120 * mm, ty - 3 * mm, W - 140 * mm, 10 * mm, fill=1, stroke=0)
    c.setFillColor(HexColor("#FFFFFF"))
    c.setFont("Helvetica-Bold", 10.5)
    c.drawRightString(150 * mm, ty + 1 * mm, "TOTAL DUE")
    c.drawRightString(W - 23 * mm, ty + 1 * mm, f"AED {total:,.2f}")

    # ---------- Payment details ----------
    pay_y = ty - 22 * mm
    c.setFillColor(NAVY)
    c.setFont("Helvetica-Bold", 9)
    c.drawString(20 * mm, pay_y, "PAYMENT DETAILS")
    c.setFont("Helvetica", 9.5)
    c.setFillColor(GREY)
    rows = [
        ("Bank", BANK["bank_name"]),
        ("Account name", BANK["account_name"]),
        ("IBAN", BANK["iban"]),
        ("SWIFT / BIC", BANK["swift"]),
    ]
    yy = pay_y - 6 * mm
    for label, val in rows:
        c.setFillColor(GREY)
        c.drawString(20 * mm, yy, f"{label}:")
        c.setFillColor(NAVY)
        c.drawString(50 * mm, yy, val)
        yy -= 5 * mm

    yy -= 3 * mm
    c.setFillColor(GREY)
    c.setFont("Helvetica-Oblique", 9)
    c.drawString(20 * mm, yy, PAYMENT_TERMS)

    # ---------- Footer ----------
    c.setStrokeColor(GOLD)
    c.setLineWidth(1)
    c.line(20 * mm, 22 * mm, W - 20 * mm, 22 * mm)
    c.setFillColor(GREY)
    c.setFont("Helvetica", 8)
    c.drawCentredString(W / 2, 16 * mm, FOOTER_LINE)
    c.setFont("Helvetica-Oblique", 8)
    c.drawCentredString(W / 2, 11 * mm, "Thank you for your business.")

    c.showPage()
    c.save()
    print("wrote", os.path.relpath(path, ROOT))
    return path


if __name__ == "__main__":
    # The invoice being generated lives in a PRIVATE, gitignored file, so client
    # names, tax numbers and amounts never reach the public repo. Copy
    # scripts/invoice_job.example.py to scripts/invoice_job_private.py and edit
    # it for each new invoice.
    try:
        from invoice_job_private import (
            INVOICE_NUMBER, INVOICE_DATE, DUE_DATE, CLIENT, LINE_ITEMS,
        )
    except ImportError:
        raise SystemExit(
            "Missing scripts/invoice_job_private.py. Copy "
            "scripts/invoice_job.example.py to that name and fill in the "
            "invoice details (the private file is gitignored)."
        )

    draw_invoice(INVOICE_NUMBER, INVOICE_DATE, DUE_DATE, CLIENT, LINE_ITEMS)
