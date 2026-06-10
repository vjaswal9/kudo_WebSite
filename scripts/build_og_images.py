#!/usr/bin/env python3
"""
Generate branded Open Graph (social share) images, 1200x630, for key pages.
Dark brand background, gold accent, logo, page title and a short kicker.
Output: public/og/<slug>.jpg  (referenced per-page via PageMeta ogImage).
"""
from PIL import Image, ImageDraw, ImageFont
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(ROOT, "public", "og")
LOGO_PATH = os.path.join(ROOT, "src", "assets", "kudo-logo.png")

W, H = 1200, 630
BG = (16, 34, 46)        # Brand Navy #10222E
GOLD = (199, 163, 90)    # Champagne gold #C7A35A
WHITE = (255, 255, 220)  # Brand Cream #FFFFDC
MUTED = (150, 165, 168)

FONT_BLACK = "/System/Library/Fonts/Supplemental/Arial Black.ttf"
FONT_BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
FONT_REG = "/System/Library/Fonts/Supplemental/Arial.ttf"

# slug, kicker (small gold), title (large white)
PAGES = [
    ("home", "Independent AI Advisory · UAE", "We exist to make AI move"),
    ("assessment", "Free · 3 Minutes · Instant Score", "AI Readiness Assessment"),
    ("case-studies", "Client Stories · UAE & Middle East", "What making AI move looks like"),
    ("services", "Six independent services", "AI Advisory Services"),
    ("uae", "Dubai · Abu Dhabi · Middle East", "AI Advisory across the UAE"),
    ("guide", "Free Guide", "5 Reasons Enterprise AI Pilots Fail"),
    ("about", "Founder & CEO, Kudo Advisory", "Vijay Jaswal"),
    ("insights", "Insights · Kudo Advisory", "Practical AI thinking for enterprise leaders"),
    # Articles (most shared on LinkedIn)
    ("why-enterprise-ai-pilots-fail", "Insights", "Why enterprise AI pilots fail"),
    ("ai-governance-middle-east", "Insights", "AI governance in the Middle East"),
    ("ai-operating-model", "Insights", "Designing an AI operating model"),
    ("ciso-cio-ai-collaboration", "Insights", "CIO and CISO collaboration on AI"),
    ("ai-use-case-prioritisation", "Insights", "Prioritising AI use cases"),
    ("measuring-ai-roi", "Insights", "Measuring AI ROI"),
]


def font(path, size):
    return ImageFont.truetype(path, size)


def wrap(draw, text, fnt, max_w):
    words = text.split()
    lines, cur = [], ""
    for w in words:
        trial = (cur + " " + w).strip()
        if draw.textlength(trial, font=fnt) <= max_w:
            cur = trial
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def make(slug, kicker, title):
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)

    # subtle gold glow top-left
    glow = Image.new("RGB", (W, H), BG)
    gd = ImageDraw.Draw(glow)
    gd.ellipse([-300, -400, 500, 300], fill=(26, 44, 56))
    img = Image.blend(img, glow, 0.5)
    d = ImageDraw.Draw(img)

    PAD = 80
    # gold accent bar
    d.rectangle([PAD, 150, PAD + 70, 158], fill=GOLD)

    # logo top-right
    try:
        logo = Image.open(LOGO_PATH).convert("RGBA")
        lw = 300
        lh = int(logo.height * lw / logo.width)
        logo = logo.resize((lw, lh), Image.LANCZOS)
        img.paste(logo, (W - PAD - lw, 70), logo)
    except Exception as e:
        print("logo skip:", e)

    # kicker
    fk = font(FONT_BOLD, 30)
    d.text((PAD, 185), kicker.upper(), font=fk, fill=GOLD)

    # title (wrapped)
    ft = font(FONT_BLACK, 78)
    lines = wrap(d, title, ft, W - 2 * PAD)
    y = 250
    for ln in lines:
        d.text((PAD, y), ln, font=ft, fill=WHITE)
        y += 92

    # footer url
    ff = font(FONT_REG, 30)
    d.text((PAD, H - 80), "kudoadvisory.com", font=ff, fill=MUTED)

    out = os.path.join(OUT_DIR, f"{slug}.jpg")
    img.save(out, "JPEG", quality=86, optimize=True)
    print("wrote", out)


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    for slug, kicker, title in PAGES:
        make(slug, kicker, title)


if __name__ == "__main__":
    main()
