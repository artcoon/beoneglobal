#!/usr/bin/env python3
"""
Crop Globi / Nubi brand cards from 3×2 turnaround sheets (1024×682).

Front view = top-left cell (0, 0, W//3, H//2). Nubi’s cell includes a
“Front View” caption band; we strip that band before tight non-white bbox.

Requires Pillow (see repo .venv-img or `pip install pillow`).
"""

from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image

# Sheet layout: 3 columns × 2 rows; front = top-left cell.
CELL_COLS = 3
CELL_ROWS = 2

# Nubi: rows above this in the top-left cell are mostly the caption only.
NUBI_CELL_TOP_TRIM = 52

# Padding around tight character bbox (pixels on source cell).
PADDING = 16

# Final raster: longest side clamped to this (upscale small crops for retina).
TARGET_MAX_SIDE = 1200


def _nonwhite_bbox(im: Image.Image, white_thresh: int = 248) -> tuple[int, int, int, int] | None:
    px = im.load()
    w, h = im.size
    minx, miny = w, h
    maxx, maxy = -1, -1
    for y in range(h):
        for x in range(w):
            r, g, b = px[x, y][:3]
            if r < white_thresh or g < white_thresh or b < white_thresh:
                minx = min(minx, x)
                miny = min(miny, y)
                maxx = max(maxx, x)
                maxy = max(maxy, y)
    if maxx < 0:
        return None
    return (minx, miny, maxx + 1, maxy + 1)


def _resize_to_longest_side(im: Image.Image, target_side: int) -> Image.Image:
    """Scale so max(width, height) == target_side (up or down)."""
    w, h = im.size
    side = max(w, h)
    if side == target_side:
        return im
    scale = target_side / side
    nw = max(1, int(round(w * scale)))
    nh = max(1, int(round(h * scale)))
    return im.resize((nw, nh), Image.Resampling.LANCZOS)


def crop_globi(sheet: Image.Image) -> tuple[Image.Image, dict]:
    w, h = sheet.size
    cw, ch = w // CELL_COLS, h // CELL_ROWS
    cell = sheet.crop((0, 0, cw, ch))
    bb = _nonwhite_bbox(cell)
    if bb is None:
        raise RuntimeError("Globi: no foreground in top-left cell")
    l, t, r, b = bb
    l = max(0, l - PADDING)
    t = max(0, t - PADDING)
    r = min(cw, r + PADDING)
    b = min(ch, b + PADDING)
    char = cell.crop((l, t, r, b))
    out = _resize_to_longest_side(char, TARGET_MAX_SIDE)
    meta = {
        "sheet_px": (w, h),
        "cell_rect_sheet": (0, 0, cw, ch),
        "tight_rect_cell": (l, t, r, b),
        "tight_rect_sheet": (l, t, r, b),
        "crop_px_before_scale": char.size,
        "output_px": out.size,
    }
    return out, meta


def crop_nubi(sheet: Image.Image) -> tuple[Image.Image, dict]:
    w, h = sheet.size
    cw, ch = w // CELL_COLS, h // CELL_ROWS
    cell = sheet.crop((0, 0, cw, ch))
    trimmed = cell.crop((0, NUBI_CELL_TOP_TRIM, cw, ch))
    bb = _nonwhite_bbox(trimmed)
    if bb is None:
        raise RuntimeError("Nubi: no foreground after caption trim")
    l, t, r, b = bb
    l = max(0, l - PADDING)
    t = max(0, t - PADDING)
    r = min(trimmed.width, r + PADDING)
    b = min(trimmed.height, b + PADDING)
    char = trimmed.crop((l, t, r, b))
    out = _resize_to_longest_side(char, TARGET_MAX_SIDE)
    # Coordinates relative to full sheet (top-left cell origin).
    abs_l, abs_t = l, NUBI_CELL_TOP_TRIM + t
    abs_r, abs_b = r, NUBI_CELL_TOP_TRIM + b
    meta = {
        "sheet_px": (w, h),
        "cell_rect_sheet": (0, 0, cw, ch),
        "caption_trim_cell_top": NUBI_CELL_TOP_TRIM,
        "tight_rect_trimmed": (l, t, r, b),
        "tight_rect_sheet": (abs_l, abs_t, abs_r, abs_b),
        "crop_px_before_scale": char.size,
        "output_px": out.size,
    }
    return out, meta


def main() -> None:
    p = argparse.ArgumentParser()
    p.add_argument(
        "--globi-in",
        type=Path,
        default=Path("scripts/brand-turnaround-sources/globi-turnaround.jpg"),
    )
    p.add_argument(
        "--nubi-in",
        type=Path,
        default=Path("scripts/brand-turnaround-sources/nubi-turnaround.jpg"),
    )
    p.add_argument("--globi-out", type=Path, default=Path("public/assets/brand/globi-frames/01.png"))
    p.add_argument("--nubi-out", type=Path, default=Path("public/assets/brand/nubi-frames/01.png"))
    args = p.parse_args()

    root = Path(__file__).resolve().parents[1]
    g_in = root / args.globi_in
    n_in = root / args.nubi_in
    g_out = root / args.globi_out
    n_out = root / args.nubi_out

    g_img = Image.open(g_in).convert("RGB")
    n_img = Image.open(n_in).convert("RGB")

    g_c, g_meta = crop_globi(g_img)
    n_c, n_meta = crop_nubi(n_img)

    g_out.parent.mkdir(parents=True, exist_ok=True)
    n_out.parent.mkdir(parents=True, exist_ok=True)
    g_c.save(g_out, format="PNG", optimize=True)
    n_c.save(n_out, format="PNG", optimize=True)

    print("Globi:", g_meta)
    print("Nubi:", n_meta)


if __name__ == "__main__":
    main()
