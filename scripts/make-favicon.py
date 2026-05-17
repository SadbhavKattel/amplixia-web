#!/usr/bin/env python3
"""
Process the raw logo PNG into transparent-background favicon assets.

Usage:
    python3 scripts/make-favicon.py public/raw-logo.png

What it does:
1. Loads the source PNG (any size).
2. Flood-fills the white-ish background from all four corners to make it transparent
   (tolerance handles JPG/PNG-compression artefacts at the edges).
3. Crops to the visible bounding box (no wasted padding).
4. Writes:
   - src/app/icon.png       (32x32, browser tab favicon — Next.js auto-detects)
   - src/app/apple-icon.png (180x180, iOS home-screen icon)
   - public/favicon.png     (512x512, OG/manifest use)
"""

import sys
from pathlib import Path
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent

def remove_white_bg(im: Image.Image, threshold: int = 235) -> Image.Image:
    """Make any near-white pixels transparent. Threshold is per-channel min value."""
    im = im.convert("RGBA")
    pixels = im.load()
    w, h = im.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = pixels[x, y]
            if r >= threshold and g >= threshold and b >= threshold:
                pixels[x, y] = (r, g, b, 0)
            else:
                # Smooth alpha for off-white edges to reduce halo
                # Lower the alpha proportionally to how close to white the pixel is
                m = min(r, g, b)
                if m >= 200:
                    falloff = (m - 200) / (threshold - 200)
                    falloff = max(0.0, min(1.0, falloff))
                    pixels[x, y] = (r, g, b, int(a * (1 - falloff)))
    return im

def trim_to_bbox(im: Image.Image) -> Image.Image:
    bbox = im.getbbox()
    return im.crop(bbox) if bbox else im

def fit_in_square(im: Image.Image, size: int) -> Image.Image:
    """Resize keeping aspect, center on a transparent square."""
    im2 = im.copy()
    im2.thumbnail((size, size), Image.LANCZOS)
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    x = (size - im2.width) // 2
    y = (size - im2.height) // 2
    canvas.paste(im2, (x, y), im2)
    return canvas

def main():
    if len(sys.argv) < 2:
        print(f"Usage: {sys.argv[0]} <path-to-source-image>", file=sys.stderr)
        sys.exit(1)
    src = Path(sys.argv[1])
    if not src.exists():
        print(f"Source not found: {src}", file=sys.stderr)
        sys.exit(1)

    print(f"Loading: {src}")
    im = Image.open(src)
    print(f"  size: {im.size}, mode: {im.mode}")

    print("Removing white background...")
    im = remove_white_bg(im)

    print("Trimming to visible bounding box...")
    im = trim_to_bbox(im)
    print(f"  cropped to: {im.size}")

    targets = [
        (ROOT / "src" / "app" / "icon.png",       32),
        (ROOT / "src" / "app" / "apple-icon.png", 180),
        (ROOT / "public" / "favicon.png",         512),
    ]
    for path, size in targets:
        path.parent.mkdir(parents=True, exist_ok=True)
        fit_in_square(im, size).save(path, "PNG", optimize=True)
        print(f"  ✓ {path.relative_to(ROOT)}  ({size}x{size})")

    print("\nDone. Restart `npm run dev` to pick up new icons.")

if __name__ == "__main__":
    main()
