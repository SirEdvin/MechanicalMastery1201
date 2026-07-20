#!/usr/bin/env python3
"""Generate Mechanical Essence component textures from existing pack artwork.

The rod and gear preserve their source texture's shape, alpha, and shading while
being hue-mapped into the Basic Mechanical Essence palette. Triangle textures
are exact quarter wedges cut from their source cube and rotated to a common
upward-facing orientation.
"""

from __future__ import annotations

import colorsys
from pathlib import Path
from typing import cast

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
TEXTURES = ROOT / "kubejs/assets/kubejs/textures/item"
CUBE_VARIANTS = (
    "1",
    "1_5a",
    "1_5b",
    "2",
    "2_5a",
    "2_5b",
    "3",
    "3_5a",
    "3_5b",
    "4",
    "4_5a",
    "4_5b",
)


def lightness_range(image: Image.Image) -> tuple[float, float]:
    pixels = cast(list[tuple[int, int, int, int]], list(image.get_flattened_data()))
    lightness = [
        colorsys.rgb_to_hls(r / 255, g / 255, b / 255)[1]
        for r, g, b, alpha in pixels
        if alpha
    ]
    return min(lightness), max(lightness)


def recolor(source_name: str, output_name: str, palette_name: str) -> None:
    source = Image.open(TEXTURES / source_name).convert("RGBA")
    palette = Image.open(TEXTURES / palette_name).convert("RGBA")

    source_pixels = cast(list[tuple[int, int, int, int]], list(source.get_flattened_data()))
    palette_data = cast(list[tuple[int, int, int, int]], list(palette.get_flattened_data()))
    palette_pixels = [pixel for pixel in palette_data if pixel[3] >= 250]
    hue_values = [colorsys.rgb_to_hls(r / 255, g / 255, b / 255)[0] for r, g, b, _ in palette_pixels]
    saturation_values = [colorsys.rgb_to_hls(r / 255, g / 255, b / 255)[2] for r, g, b, _ in palette_pixels]
    target_hue = sum(hue_values) / len(hue_values)
    target_saturation = sum(saturation_values) / len(saturation_values)
    target_min, target_max = lightness_range(palette)
    source_min, source_max = lightness_range(source)

    recolored: list[tuple[int, int, int, int]] = []
    for red, green, blue, alpha in source_pixels:
        if not alpha:
            recolored.append((0, 0, 0, 0))
            continue

        source_lightness = colorsys.rgb_to_hls(red / 255, green / 255, blue / 255)[1]
        position = (source_lightness - source_min) / (source_max - source_min)
        target_lightness = target_min + position * (target_max - target_min)
        out_red, out_green, out_blue = colorsys.hls_to_rgb(
            target_hue,
            target_lightness,
            target_saturation,
        )
        recolored.append(
            (round(out_red * 255), round(out_green * 255), round(out_blue * 255), alpha)
        )

    source.putdata(recolored)
    source.save(TEXTURES / output_name)


def triangle(source_name: str, output_name: str) -> None:
    source = Image.open(TEXTURES / source_name).convert("RGBA")
    width, height = source.size
    center_x, center_y = width // 2, height // 2

    # Cut the top-right quadrant from the diamond-shaped cube. Rotating this
    # square quadrant diagonally exposes its triangular silhouette clearly;
    # selecting a cardinal wedge instead makes the quarter look like a tiny
    # copy of the original diamond at inventory scale.
    piece = Image.new("RGBA", source.size)
    for y in range(height):
        for x in range(width):
            if x >= center_x and y <= center_y:
                pixel = cast(tuple[int, int, int, int], source.getpixel((x, y)))
                piece.putpixel((x, y), pixel)

    # Rotate the quarter to point upward, then center it on the original canvas.
    piece = piece.rotate(-135, resample=Image.Resampling.NEAREST, expand=True)
    bounds = piece.getbbox()
    if bounds is None:
        raise ValueError(f"{source_name} produced an empty triangle")
    cropped = piece.crop(bounds)

    # Higher-tier cube sprites contain decorative pixels outside the core
    # diamond. Keep their colors, but clip the rotated quarter to an explicit
    # upward triangle so those decorations cannot become legs or prongs. Fill
    # any transparent decorative cutouts from the nearest source pixel; without
    # this, tier 3 and 4 quarters look like arches instead of solid triangles.
    opaque_pixels = [
        (x, y, cast(tuple[int, int, int, int], cropped.getpixel((x, y))))
        for y in range(cropped.height)
        for x in range(cropped.width)
        if cast(tuple[int, int, int, int], cropped.getpixel((x, y)))[3]
    ]
    center = (cropped.width - 1) / 2
    for y in range(cropped.height):
        half_width = ((y + 1) / cropped.height) * cropped.width / 2 + 1
        for x in range(cropped.width):
            if abs(x - center) > half_width:
                cropped.putpixel((x, y), (0, 0, 0, 0))
            elif not cast(tuple[int, int, int, int], cropped.getpixel((x, y)))[3]:
                nearest = min(opaque_pixels, key=lambda pixel: (pixel[0] - x) ** 2 + (pixel[1] - y) ** 2)
                red, green, blue, _ = nearest[2]
                cropped.putpixel((x, y), (red, green, blue, 255))

    output = Image.new("RGBA", source.size)
    output.alpha_composite(
        cropped,
        ((width - cropped.width) // 2, (height - cropped.height) // 2),
    )
    output.save(TEXTURES / output_name)


def main() -> None:
    recolor("diamond_rod.png", "cube1_rod.png", "cube1.png")
    recolor("aluminum_gear.png", "cube1_gear.png", "cube1.png")
    for variant in CUBE_VARIANTS:
        triangle(f"cube{variant}.png", f"cube{variant}_triangle.png")


if __name__ == "__main__":
    main()
