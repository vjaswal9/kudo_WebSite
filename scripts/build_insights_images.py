#!/usr/bin/env python3
"""
Generate text-free, on-brand article visuals for the Insights section
(hero image + listing thumbnail). Distinct per article via a seeded motif,
so the blog looks designed, not stocky. No baked-in title text.
Output: public/insights/<slug>.jpg  (1200x630)
"""
from PIL import Image, ImageDraw, ImageFont
import hashlib, math, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "public", "insights")

W, H = 1200, 630
BG = (13, 16, 22)
BG2 = (20, 25, 35)
GOLD = (228, 171, 37)
FONT_BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"

# slug -> small category label (gold, bottom-left)
ARTICLES = {
    "why-enterprise-ai-pilots-fail": "AI Strategy",
    "ai-governance-middle-east": "AI Governance",
    "ai-operating-model": "Operating Model",
    "ciso-cio-ai-collaboration": "Leadership",
    "ai-use-case-prioritisation": "AI Strategy",
    "measuring-ai-roi": "Delivery",
}


def seed_of(slug):
    return int(hashlib.md5(slug.encode()).hexdigest(), 16)


def make(slug, label):
    s = seed_of(slug)
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img, "RGBA")

    # diagonal gradient
    for y in range(H):
        t = y / H
        r = int(BG[0] + (BG2[0] - BG[0]) * t)
        g = int(BG[1] + (BG2[1] - BG[1]) * t)
        b = int(BG[2] + (BG2[2] - BG[2]) * t)
        d.line([(0, y), (W, y)], fill=(r, g, b))

    # soft gold glow, position varies per article
    gx = 300 + (s % 600)
    gy = 120 + ((s // 7) % 360)
    for rad in range(420, 0, -8):
        a = int(16 * (1 - rad / 420))
        d.ellipse([gx - rad, gy - rad, gx + rad, gy + rad], fill=(228, 171, 37, a))

    # concentric ring motif, seeded position
    cx = 900 + (s % 200)
    cy = 315 + ((s // 13) % 200) - 100
    for i, rad in enumerate([70, 120, 175, 235, 300]):
        a = 70 if i % 2 == 0 else 38
        d.ellipse([cx - rad, cy - rad, cx + rad, cy + rad], outline=(228, 171, 37, a), width=3)

    # a few thin connecting lines (network motif), seeded
    import random
    rng = random.Random(s)
    pts = [(rng.randint(60, W - 60), rng.randint(60, H - 120)) for _ in range(5)]
    for i in range(len(pts)):
        for j in range(i + 1, len(pts)):
            if rng.random() < 0.5:
                d.line([pts[i], pts[j]], fill=(228, 171, 37, 26), width=2)
    for p in pts:
        d.ellipse([p[0] - 4, p[1] - 4, p[0] + 4, p[1] + 4], fill=(228, 171, 37, 120))

    # gold accent bar + small category label (bottom-left)
    d.rectangle([60, H - 96, 60 + 54, H - 90], fill=GOLD)
    f = ImageFont.truetype(FONT_BOLD, 30)
    d.text((60, H - 78), label.upper(), font=f, fill=GOLD)

    out = os.path.join(OUT, f"{slug}.jpg")
    img.convert("RGB").save(out, "JPEG", quality=84, optimize=True)
    print("wrote", out)


def main():
    os.makedirs(OUT, exist_ok=True)
    for slug, label in ARTICLES.items():
        make(slug, label)


if __name__ == "__main__":
    main()
