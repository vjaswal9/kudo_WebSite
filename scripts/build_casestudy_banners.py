#!/usr/bin/env python3
"""
Generate on-brand illustration banners for each case study vertical.
1200x300, dark brand background with gold line-art representing the industry.
Output: public/og/cs-<slug>.jpg  (used as a header strip on each story card).
"""
from PIL import Image, ImageDraw, ImageFont
import math, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "public", "case-studies")

W, H = 1200, 300
BG = (15, 18, 25)
BG2 = (22, 26, 36)
GOLD = (228, 171, 37)
GOLD_DIM = (120, 94, 34)
WHITE = (235, 238, 242)
FONT_BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"


def base():
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)
    # soft diagonal gradient panel
    for x in range(W):
        t = x / W
        r = int(BG[0] + (BG2[0] - BG[0]) * t)
        g = int(BG[1] + (BG2[1] - BG[1]) * t)
        b = int(BG[2] + (BG2[2] - BG[2]) * t)
        d.line([(x, 0), (x, H)], fill=(r, g, b))
    return img, ImageDraw.Draw(img)


def label(d, text):
    f = ImageFont.truetype(FONT_BOLD, 30)
    d.text((50, H - 56), text.upper(), font=f, fill=GOLD)


def telecom():
    img, d = base()
    cx, cy = 940, 200
    # signal arcs
    for i, r in enumerate([60, 110, 160, 210]):
        col = GOLD if i % 2 == 0 else GOLD_DIM
        d.arc([cx - r, cy - r, cx + r, cy + r], start=210, end=330, fill=col, width=5)
    # tower
    d.polygon([(cx - 26, cy), (cx + 26, cy), (cx + 9, cy - 150), (cx - 9, cy - 150)], outline=WHITE, width=4)
    for yy in (cy - 30, cy - 70, cy - 110):
        d.line([(cx - 20, yy), (cx + 20, yy)], fill=WHITE, width=3)
    d.ellipse([cx - 8, cy - 162, cx + 8, cy - 146], fill=GOLD)
    label(d, "Telecommunications")
    return img


def utilities():
    img, d = base()
    # grid lines
    for gx in range(700, 1180, 60):
        d.line([(gx, 40), (gx, 250)], fill=(40, 46, 60), width=2)
    for gy in range(40, 260, 50):
        d.line([(700, gy), (1170, gy)], fill=(40, 46, 60), width=2)
    # lightning bolt
    pts = [(980, 30), (905, 150), (955, 150), (890, 270), (1010, 120), (958, 120)]
    d.polygon(pts, fill=GOLD)
    d.line(pts + [pts[0]], fill=WHITE, width=2, joint="curve")
    label(d, "Utilities")
    return img


def healthcare():
    img, d = base()
    # ECG heartbeat line
    base_y = 150
    x = 680
    pts = [(x, base_y)]
    seq = [(40, 0), (20, -8), (15, 70), (15, -150), (18, 110), (22, 0), (35, 0), (18, -40), (18, 40), (40, 0)]
    for dx, dy in seq:
        x += dx
        pts.append((x, base_y + dy))
    pts.append((1170, base_y))
    d.line(pts, fill=GOLD, width=5, joint="curve")
    # plus sign
    px, py = 1090, 80
    d.rectangle([px - 8, py - 26, px + 8, py + 26], fill=WHITE)
    d.rectangle([px - 26, py - 8, px + 26, py + 8], fill=WHITE)
    label(d, "Healthcare")
    return img


def property():
    img, d = base()
    # skyline of buildings
    base_y = 250
    bx = 700
    rng = [(70, 150), (55, 210), (80, 120), (60, 180), (90, 240), (50, 140)]
    for i, (bw, bh) in enumerate(rng):
        col = WHITE if i % 2 == 0 else GOLD
        d.rectangle([bx, base_y - bh, bx + bw, base_y], outline=col, width=4)
        # windows
        for wy in range(base_y - bh + 16, base_y - 10, 28):
            for wx in range(bx + 12, bx + bw - 8, 24):
                d.rectangle([wx, wy, wx + 8, wy + 12], fill=(col[0], col[1], col[2]))
        bx += bw + 14
    label(d, "Property Development")
    return img


def main():
    os.makedirs(OUT, exist_ok=True)
    for slug, fn in [("telecom", telecom), ("utilities", utilities), ("healthcare", healthcare), ("property", property)]:
        img = fn()
        out = os.path.join(OUT, f"{slug}.jpg")
        img.save(out, "JPEG", quality=85, optimize=True)
        print("wrote", out)


if __name__ == "__main__":
    main()
