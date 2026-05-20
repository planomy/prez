#!/usr/bin/env python3
"""
HOT icons: remove outer white/checkerboard canvas only; keep rounded-square tile.
No alpha blur (that caused white fringes on every browser).
"""
from __future__ import annotations

import sys
from collections import deque
from pathlib import Path

from PIL import Image

HOT_DIR = Path(__file__).resolve().parents[1] / "assets" / "hot"
FLOOD_TOLERANCE = 18
CROP_PAD = 8
MAX_SIDE = 256

ORIGINALS: dict[str, str] = {
    "think-pair-share": "image-807ef7c1-7f33-4657-8966-3f2df7386c68.png",
    "see-think-wonder": "image-9d4fe789-b32a-46b0-9f56-587a23f2ca57.png",
    "connect-extend-challenge": "image-da5092ca-40b6-4384-b719-e79fd2ba1f34.png",
    "used-to-think-now-think": "image-83824ec5-b5c0-42d6-aca1-cda73539cac2.png",
    "three-two-one": "image-3be4cd28-51dc-416e-9dcd-73504c501c47.png",
    "exit-ticket": "image-ff59e9ef-82c7-4f4e-8575-c07c69ce571c.png",
    "claim-evidence-reasoning": "image-ca5e2c42-5ad1-4ee8-9ced-a0640dceb83c.png",
    "evaluate-defend": "image-7aa1ad74-2187-4d2c-8c99-4c1abe24a35f.png",
    "tournament-prioritiser": "image-d75c1344-d286-40b5-8821-0622b047ee24.png",
    "decision-making-matrix": "image-9e5ad1f7-3da8-433b-9f10-43289edca48d.png",
    "plus-minus-interesting": "image-af29872b-a440-4064-b5eb-00ae42c98bc6.png",
}

CURSOR_ASSETS = Path.home() / ".cursor/projects/Users-niccomino-Desktop-prez/assets"


def is_outer_margin(r: int, g: int, b: int) -> bool:
    mn = min(r, g, b)
    mx = max(r, g, b)
    return mn >= 240 and mx - mn <= 10


def similar(a: tuple[int, int, int], b: tuple[int, int, int]) -> bool:
    return max(abs(a[i] - b[i]) for i in range(3)) <= FLOOD_TOLERANCE


def strip_outer_margin(rgb: Image.Image) -> Image.Image:
    w, h = rgb.size
    src = rgb.load()
    out = Image.new("RGBA", (w, h))
    dst = out.load()

    visited = bytearray(w * h)
    q: deque[tuple[int, int, tuple[int, int, int]]] = deque()

    def push(x: int, y: int) -> None:
        i = y * w + x
        if visited[i]:
            return
        c = src[x, y]
        if not is_outer_margin(*c):
            return
        visited[i] = 1
        q.append((x, y, c))

    for x in range(w):
        push(x, 0)
        push(x, h - 1)
    for y in range(h):
        push(0, y)
        push(w - 1, y)

    for y in range(h):
        for x in range(w):
            r, g, b = src[x, y]
            dst[x, y] = (r, g, b, 0 if visited[y * w + x] else 255)

    return out


def crop_to_content(im: Image.Image) -> Image.Image:
    w, h = im.size
    px = im.load()
    min_x, min_y, max_x, max_y = w, h, 0, 0
    found = False
    for y in range(h):
        for x in range(w):
            if px[x, y][3] > 0:
                found = True
                min_x = min(min_x, x)
                min_y = min(min_y, y)
                max_x = max(max_x, x)
                max_y = max(max_y, y)
    if not found:
        return im
    min_x = max(0, min_x - CROP_PAD)
    min_y = max(0, min_y - CROP_PAD)
    max_x = min(w - 1, max_x + CROP_PAD)
    max_y = min(h - 1, max_y + CROP_PAD)
    return im.crop((min_x, min_y, max_x + 1, max_y + 1))


def resize_clean(im: Image.Image) -> Image.Image:
    """Downscale with premultiplied RGB so edges don't pick up white halos."""
    w, h = im.size
    side = max(w, h)
    if side <= MAX_SIDE:
        return im

    scale = MAX_SIDE / side
    nw, nh = int(w * scale), int(h * scale)
    px = im.load()

    premul = Image.new("RGBA", (w, h))
    ppx = premul.load()
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a == 0:
                ppx[x, y] = (0, 0, 0, 0)
            else:
                ppx[x, y] = (r * a // 255, g * a // 255, b * a // 255, a)

    rgb = premul.convert("RGB").resize((nw, nh), Image.Resampling.LANCZOS)
    alpha = im.split()[3].resize((nw, nh), Image.Resampling.LANCZOS)
    alpha = alpha.point(lambda v: 255 if v > 96 else 0)

    out = Image.merge("RGBA", (*rgb.split(), alpha))
    opx = out.load()
    for y in range(nh):
        for x in range(nw):
            r, g, b, a = opx[x, y]
            if a == 0:
                opx[x, y] = (0, 0, 0, 0)
            else:
                ar = max(a, 1)
                opx[x, y] = (
                    min(255, r * 255 // ar),
                    min(255, g * 255 // ar),
                    min(255, b * 255 // ar),
                    255,
                )
    return out


def process_icon(path: Path) -> None:
    im = strip_outer_margin(Image.open(path).convert("RGB"))
    im = crop_to_content(im)
    im = resize_clean(im)
    im.save(path, optimize=True)

    px = im.load()
    semi = sum(1 for y in range(im.size[1]) for x in range(im.size[0]) if 0 < px[x, y][3] < 255)
    print(f"  {path.name}: {im.size[0]}×{im.size[1]}, semi-transparent px={semi}")


def restore_originals() -> None:
    if not CURSOR_ASSETS.is_dir():
        print(f"Skip restore — missing {CURSOR_ASSETS}", file=sys.stderr)
        return
    for slug, filename in ORIGINALS.items():
        src = CURSOR_ASSETS / filename
        dst = HOT_DIR / f"{slug}.png"
        if src.is_file():
            dst.write_bytes(src.read_bytes())


def main() -> int:
    if "--restore" in sys.argv:
        restore_originals()

    targets = sorted(HOT_DIR.glob("*.png"))
    if not targets:
        print(f"No PNGs in {HOT_DIR}", file=sys.stderr)
        return 1
    print(f"Processing {len(targets)} icons")
    for path in targets:
        process_icon(path)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
