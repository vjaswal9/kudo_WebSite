#!/usr/bin/env python3
"""
Crop downloaded stock photos to a consistent 1200x400 banner and apply an
on-brand dark overlay (navy gradient + subtle gold edge) so they sit well
with the dark site theme. Output: public/case-studies/<slug>.jpg
"""
from PIL import Image, ImageEnhance
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW = "/tmp/cs_raw"
OUT = os.path.join(ROOT, "public", "case-studies")

W, H = 1200, 400
NAVY = (13, 16, 22)
GOLD = (228, 171, 37)

# crop focus: vertical position 0=top,0.5=center,1=bottom for the cropped window
FOCUS = {"telecom": 0.5, "utilities": 0.5, "healthcare": 0.5, "property": 0.45}


def cover_crop(img, focus_y):
    """Scale + center-crop to exactly WxH (object-fit: cover)."""
    src_ratio = img.width / img.height
    dst_ratio = W / H
    if src_ratio > dst_ratio:
        new_h = H
        new_w = int(H * src_ratio)
    else:
        new_w = W
        new_h = int(W / src_ratio)
    img = img.resize((new_w, new_h), Image.LANCZOS)
    left = (new_w - W) // 2
    top = int((new_h - H) * focus_y)
    return img.crop((left, top, left + W, top + H))


def overlay(img):
    img = img.convert("RGB")
    # tone down the photo a touch so text/brand reads
    img = ImageEnhance.Brightness(img).enhance(0.82)
    img = ImageEnhance.Color(img).enhance(0.9)

    # navy gradient: darker on the left (where labels go) fading right
    grad = Image.new("L", (W, 1))
    for x in range(W):
        # 0.78 alpha at far left -> 0.28 at right
        a = int(255 * (0.78 - 0.5 * (x / W)))
        grad.putpixel((x, 0), max(0, min(255, a)))
    grad = grad.resize((W, H))
    navy_layer = Image.new("RGB", (W, H), NAVY)
    img = Image.composite(navy_layer, img, grad)

    # subtle bottom-to-top navy fade for grounding
    vgrad = Image.new("L", (1, H))
    for y in range(H):
        a = int(190 * (y / H) ** 2)
        vgrad.putpixel((0, y), a)
    vgrad = vgrad.resize((W, H))
    img = Image.composite(Image.new("RGB", (W, H), NAVY), img, vgrad)

    # thin gold accent bar along the bottom
    d = img.load()
    for y in range(H - 5, H):
        for x in range(W):
            d[x, y] = GOLD
    return img


def main():
    os.makedirs(OUT, exist_ok=True)
    for slug, fy in FOCUS.items():
        src = os.path.join(RAW, f"{slug}.jpg")
        img = Image.open(src)
        img = cover_crop(img, fy)
        img = overlay(img)
        out = os.path.join(OUT, f"{slug}.jpg")
        img.save(out, "JPEG", quality=82, optimize=True)
        print("wrote", out, os.path.getsize(out) // 1024, "KB")


if __name__ == "__main__":
    main()
