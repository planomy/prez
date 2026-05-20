#!/usr/bin/env python3
"""Convert Keynote black-background exports to transparent PNGs in assets/hot/."""
from __future__ import annotations

from collections import deque
from pathlib import Path

from PIL import Image

CURSOR_ASSETS = Path.home() / ".cursor/projects/Users-niccomino-Desktop-prez/assets"
HOT_DIR = Path(__file__).resolve().parents[1] / "assets" / "hot"
BLACK_MAX = 32
FLOOD_TOLERANCE = 28
CROP_PAD = 4
MAX_SIDE = 256

# Upload order → slug
MAPPING = [
    ("image-df2ae207-3669-4c11-80c3-b8ec5b17de0f.png", "think-pair-share"),
    ("image-1b580ae1-e849-4a73-875e-8afdbde84030.png", "claim-evidence-reasoning"),
    ("image-a6a46749-4720-4053-9f05-63a489be9604.png", "used-to-think-now-think"),
    ("image-45d4464c-d07e-45bb-8aa4-6c2ff8566d71.png", "see-think-wonder"),
    ("image-0202e543-8584-42c5-afcc-21d98c3f428d.png", "connect-extend-challenge"),
    ("image-7e29ff6c-b93e-4c74-87e6-04b058b0e6f0.png", "three-two-one"),
    ("image-434bf665-b2ab-4036-9d9d-b1e80acffa20.png", "evaluate-defend"),
    ("image-8786e818-2813-4a89-a23b-9e2faae21116.png", "exit-ticket"),
    ("image-dd0bece8-21ee-42c2-a1c1-ee235aae405e.png", "plus-minus-interesting"),
    ("image-e01dd326-60d7-4fe8-a942-45c56c3efd34.png", "tournament-prioritiser"),
    ("image-b251a9a3-7d90-4b5c-ba2e-4c20ef0c68df.png", "decision-making-matrix"),
    # Tier-1 HOT + Socratic stems
    ("image-8d9de43a-debd-41da-8040-57f3783fb1ea.png", "rose-thorn-bud"),
    ("image-661d4ddc-b26f-4436-8b30-91cc1954e178.png", "socratic-stems"),
    ("image-90e96431-824c-4f16-a725-838ef9343586.png", "frayer-model"),
    ("image-47a0d4f4-187f-4354-b937-dcb50c3334da.png", "kwl"),
    ("image-afddd3ea-7112-4c66-bd34-bf682f4156bd.png", "soapstone"),
    ("image-a63dd171-7bcf-4db5-9b22-bbbc691af448.png", "qft"),
]


def process_cutout(im: Image.Image) -> Image.Image:
    im = im.convert("RGBA")
    w, h = im.size
    px = im.load()
    corners = [(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1)]
    if all(px[x, y][3] < 8 for x, y in corners):
        return crop_and_resize(im)
    return crop_and_resize(black_to_alpha(im.convert("RGB")))


def is_black(r: int, g: int, b: int) -> bool:
    return max(r, g, b) <= BLACK_MAX


def similar(a: tuple[int, int, int], b: tuple[int, int, int]) -> bool:
    return max(abs(a[i] - b[i]) for i in range(3)) <= FLOOD_TOLERANCE


def black_to_alpha(im: Image.Image) -> Image.Image:
    rgb = im.convert("RGB")
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
        if not is_black(*c):
            return
        visited[i] = 1
        q.append((x, y, c))

    for x in range(w):
        push(x, 0)
        push(x, h - 1)
    for y in range(h):
        push(0, y)
        push(w - 1, y)

    while q:
        x, y, ref = q.popleft()
        dst[x, y] = (0, 0, 0, 0)
        for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
            if nx < 0 or ny < 0 or nx >= w or ny >= h:
                continue
            i = ny * w + nx
            if visited[i]:
                continue
            nc = src[nx, ny]
            if similar(nc, ref) and is_black(*nc):
                visited[i] = 1
                q.append((nx, ny, nc))

    for y in range(h):
        for x in range(w):
            r, g, b = src[x, y]
            if visited[y * w + x]:
                dst[x, y] = (0, 0, 0, 0)
            else:
                dst[x, y] = (r, g, b, 255)

    return out


def crop_and_resize(im: Image.Image) -> Image.Image:
    px = im.load()
    w, h = im.size
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
    if found:
        min_x = max(0, min_x - CROP_PAD)
        min_y = max(0, min_y - CROP_PAD)
        max_x = min(w - 1, max_x + CROP_PAD)
        max_y = min(h - 1, max_y + CROP_PAD)
        im = im.crop((min_x, min_y, max_x + 1, max_y + 1))

    side = max(im.size)
    if side > MAX_SIDE:
        scale = MAX_SIDE / side
        nw, nh = int(im.size[0] * scale), int(im.size[1] * scale)
        im = im.resize((nw, nh), Image.Resampling.LANCZOS)
        px = im.load()
        for y in range(nh):
            for x in range(nw):
                r, g, b, a = px[x, y]
                if a < 128:
                    px[x, y] = (0, 0, 0, 0)
                else:
                    px[x, y] = (r, g, b, 255)
    return im


def main() -> None:
    HOT_DIR.mkdir(parents=True, exist_ok=True)
    for src_name, slug in MAPPING:
        src = CURSOR_ASSETS / src_name
        if not src.is_file():
            raise SystemExit(f"Missing: {src}")
        im = process_cutout(Image.open(src))
        out = HOT_DIR / f"{slug}.png"
        im.save(out, optimize=True)
        print(f"{slug}.png ← {src_name} ({im.size[0]}×{im.size[1]})")


if __name__ == "__main__":
    main()
