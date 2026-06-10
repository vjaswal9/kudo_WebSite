#!/usr/bin/env python3
"""
Generate Kudo Advisory Mini Brand Guidelines v4 (updated palette).
Adds champagne gold + muted teal to the navy + cream system.
Output: Kudo_Advisory_Mini_Guidelines_v4.pdf
"""
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "Kudo_Advisory_Mini_Guidelines_v4.pdf")
LOGO = os.path.join(ROOT, "src", "assets", "kudo-logo.png")

NAVY = HexColor("#10222E")
CREAM = HexColor("#FFFFDC")
GOLD = HexColor("#C7A35A")
TEAL = HexColor("#4E9D94")
MUTE = HexColor("#9AA8AC")

W, H = A4
c = canvas.Canvas(OUT, pagesize=A4)


def bg():
    c.setFillColor(NAVY)
    c.rect(0, 0, W, H, fill=1, stroke=0)


def dot_mark(cx, cy, r=2.0, gap=6.2, rows=7, color=GOLD):
    c.setFillColor(color)
    for row in range(rows):
        for i in range(row + 1):
            x = cx + (i - row / 2) * gap
            y = cy - row * gap
            c.circle(x, y, r, fill=1, stroke=0)


# ---------- PAGE 1: COVER ----------
bg()
dot_mark(W - 42 * mm, H - 40 * mm, color=GOLD)
c.setFillColor(CREAM)
c.setFont("Helvetica-Bold", 30)
c.drawString(22 * mm, H - 45 * mm, "Kudo Advisory")
c.setFillColor(MUTE)
c.setFont("Helvetica", 13)
c.drawString(22 * mm, H - 53 * mm, "Mini Brand Guidelines  (v4, updated palette)")

c.setFillColor(CREAM)
c.setFont("Helvetica-Bold", 13)
c.drawString(22 * mm, H - 95 * mm, "We exist to make AI move.")
c.setFillColor(MUTE)
c.setFont("Helvetica", 10.5)
text = c.beginText(22 * mm, H - 108 * mm)
for line in [
    "v4 formalises the working colour system used across the website and",
    "collateral: the navy + cream foundation, plus a refined champagne gold",
    "(derived from the logo mark gradient) and a muted teal supporting accent.",
]:
    text.textLine(line)
c.drawText(text)

# small swatch row
sw = 26 * mm
y = H - 150 * mm
for i, (name, col, hexv) in enumerate([
    ("Navy", NAVY, "#10222E"), ("Cream", CREAM, "#FFFFDC"),
    ("Champagne", GOLD, "#C7A35A"), ("Teal", TEAL, "#4E9D94")]):
    x = 22 * mm + i * (sw + 6 * mm)
    c.setFillColor(col); c.rect(x, y, sw, sw, fill=1, stroke=1)
    c.setStrokeColor(MUTE)
    c.setFillColor(CREAM); c.setFont("Helvetica-Bold", 9)
    c.drawString(x, y - 6 * mm, name)
    c.setFillColor(MUTE); c.setFont("Helvetica", 7.5)
    c.drawString(x, y - 10 * mm, hexv)
c.showPage()

# ---------- PAGE 2: COLOURS ----------
bg()
c.setFillColor(CREAM); c.setFont("Helvetica-Bold", 20)
c.drawString(22 * mm, H - 30 * mm, "Colours")

rows = [
    ("Navy", "#10222E", "RGB 16, 34, 46", "Primary background. The brand canvas.", NAVY, CREAM),
    ("Cream", "#FFFFDC", "RGB 255, 255, 220", "Logo, headings and primary text on navy.", CREAM, NAVY),
    ("Champagne Gold", "#C7A35A", "RGB 199, 163, 90", "Accent and primary actions (CTAs, highlights). From the mark gradient.", GOLD, NAVY),
    ("Muted Teal", "#4E9D94", "RGB 78, 157, 148", "Supporting accent only: tags, links, data, states. Use sparingly.", TEAL, NAVY),
]
y = H - 48 * mm
for name, hexv, rgb, use, col, txt in rows:
    c.setFillColor(col); c.setStrokeColor(MUTE)
    c.rect(22 * mm, y - 18 * mm, 34 * mm, 22 * mm, fill=1, stroke=1)
    c.setFillColor(col); c.setFont("Helvetica-Bold", 9)
    # name + hex
    c.setFillColor(CREAM); c.setFont("Helvetica-Bold", 13)
    c.drawString(62 * mm, y - 3 * mm, name)
    c.setFillColor(GOLD); c.setFont("Helvetica-Bold", 10)
    c.drawString(62 * mm, y - 9 * mm, f"{hexv}    {rgb}")
    c.setFillColor(MUTE); c.setFont("Helvetica", 9.5)
    c.drawString(62 * mm, y - 15 * mm, use)
    y -= 30 * mm

c.setFillColor(CREAM); c.setFont("Helvetica-Bold", 12)
c.drawString(22 * mm, y - 2 * mm, "Balance (rule of thumb)")
c.setFillColor(MUTE); c.setFont("Helvetica", 9.5)
c.drawString(22 * mm, y - 9 * mm, "Roughly 60% navy, 30% cream, 10% gold. Teal is a small fraction of the 10%.")
c.showPage()

# ---------- PAGE 3: LOGO + FILES ----------
bg()
c.setFillColor(CREAM); c.setFont("Helvetica-Bold", 20)
c.drawString(22 * mm, H - 30 * mm, "Logo & usage")

# logo lockup band
c.setFillColor(HexColor("#0C1A24"))
c.rect(22 * mm, H - 95 * mm, W - 44 * mm, 40 * mm, fill=1, stroke=0)
dot_mark(40 * mm, H - 62 * mm, r=1.6, gap=4.8, rows=7, color=CREAM)
c.setFillColor(CREAM); c.setFont("Helvetica-Bold", 26)
c.drawString(70 * mm, H - 73 * mm, "Kudo Advisory")
c.setFillColor(MUTE); c.setFont("Helvetica", 9)
c.drawString(70 * mm, H - 80 * mm, "We exist to make AI move")

items = [
    "Primary lockup includes the tagline. Use the cream mark and text on navy or dark imagery; use the navy mark on light/cream.",
    "Clear space: keep at least one dot-radius of space around the mark; avoid crowding the tagline.",
    "Digital (web/social): PNG 2048 or 4096 where possible. Favicons: favicon.ico and favicon-*.png.",
    "Print / large format: use SVGs in logos/svg and mark/svg. Transparent overlays: /cream on dark, /navy on light.",
    "The champagne gold appears as the mark's gradient and as the UI accent; do not use a bright/saturated amber.",
]
c.setFillColor(CREAM); c.setFont("Helvetica", 10.5)
y = H - 110 * mm
for it in items:
    c.setFillColor(GOLD); c.drawString(22 * mm, y, "•")
    c.setFillColor(MUTE)
    t = c.beginText(28 * mm, y)
    # naive wrap
    words = it.split(); line = ""
    for w in words:
        if c.stringWidth((line + " " + w).strip(), "Helvetica", 10.5) < (W - 50 * mm):
            line = (line + " " + w).strip()
        else:
            t.textLine(line); line = w
    if line:
        t.textLine(line)
    c.drawText(t)
    y -= 16 * mm

c.setFillColor(MUTE); c.setFont("Helvetica", 8)
c.drawString(22 * mm, 18 * mm, "Kudo Advisory  |  Mini Brand Guidelines v4  |  Confidential")
c.showPage()

c.save()
print("wrote", OUT, os.path.getsize(OUT) // 1024, "KB")
