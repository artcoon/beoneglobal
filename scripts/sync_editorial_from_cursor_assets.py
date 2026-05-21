#!/usr/bin/env python3
"""
Sync premium editorial PNGs from Cursor session assets into public/assets/editorial/.

Section slot copies: hero, overview-aside, philosophy-wide, philosophy-hero-band, global-cta
(no technology-banner — #technology is CSS-only in the app).

Allowed sources:
  - Beone_Global_Brand_Guideline_Final_*_Page_NN_*.png (all pages, sorted by page number)
  - design-element-*.png with file size >= 100_000 bytes (large mockups only)

Excluded: Screenshot_*, small design-element chips, IR/PPT slide exports.

Run from repo root:
  python3 scripts/sync_editorial_from_cursor_assets.py
"""
from __future__ import annotations

import re
import shutil
import sys
from pathlib import Path

CURSOR_ASSETS = Path.home() / ".cursor/projects/Users-martin-Projects-biwon-global-web/assets"
REPO_ROOT = Path(__file__).resolve().parents[1]
EDITORIAL_DIR = REPO_ROOT / "public/assets/editorial"
BRAND_DIR = REPO_ROOT / "public/assets/brand"


def _page_num(p: Path) -> int:
    m = re.search(r"Page_(\d+)", p.name)
    return int(m.group(1)) if m else 0


def main() -> int:
    if not CURSOR_ASSETS.is_dir():
        print(f"Missing assets dir: {CURSOR_ASSETS}", file=sys.stderr)
        return 1

    beone = sorted(CURSOR_ASSETS.glob("Beone_Global*.png"), key=_page_num)
    large_de: list[tuple[int, Path]] = []
    for p in CURSOR_ASSETS.glob("design-element-*.png"):
        sz = p.stat().st_size
        if sz >= 100_000:
            large_de.append((sz, p))
    large_de.sort(reverse=True)
    de_paths = [p for _, p in large_de]

    # Large packaging / mockup PNGs first (hero + gallery lead), then guideline pages.
    pool = de_paths + beone
    if not pool:
        print("No Beone or large design-element PNGs found", file=sys.stderr)
        return 1

    EDITORIAL_DIR.mkdir(parents=True, exist_ok=True)
    removed = list(EDITORIAL_DIR.glob("*.png"))
    for p in removed:
        p.unlink()
    print(f"Removed {len(removed)} prior editorial PNG(s)")

    for i, src in enumerate(pool, start=1):
        shutil.copy2(src, EDITORIAL_DIR / f"premium-{i:02d}.png")

    # Section slots: first entries in pool (large design-element mockups, then Beone pages).
    if len(pool) < 4:
        print("Need at least 4 pool images for editorial slot copies", file=sys.stderr)
        return 1
    shutil.copy2(pool[0], EDITORIAL_DIR / "hero.png")
    shutil.copy2(pool[1], EDITORIAL_DIR / "overview-aside.png")
    shutil.copy2(pool[2], EDITORIAL_DIR / "philosophy-wide.png")
    shutil.copy2(pool[2], EDITORIAL_DIR / "philosophy-hero-band.png")
    shutil.copy2(pool[3], EDITORIAL_DIR / "global-cta.png")

    guideline_src = next((p for p in beone if "Page_58" in p.name), beone[0])
    BRAND_DIR.mkdir(parents=True, exist_ok=True)
    shutil.copy2(guideline_src, BRAND_DIR / "hero-guideline-mockup.png")

    print(
        f"Wrote premium-01..premium-{len(pool):02d}, hero, overview-aside, "
        "philosophy-wide, philosophy-hero-band, global-cta"
    )
    print(f"Set site.editorial.galleryCount in siteContent.ts to: {len(pool)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
