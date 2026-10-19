"""Generate optimized profile images, social cards, favicons and WebP screenshots.

Run from the project root:  python scripts/build-assets.py
Requires Pillow.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageOps

ROOT = Path(__file__).resolve().parent.parent
ASSETS = ROOT / "assets"
FONTS = Path(r"C:\Windows\Fonts")

NAVY = (7, 17, 31)
NAVY_2 = (13, 27, 46)
CYAN = (56, 189, 248)
GREEN = (52, 211, 153)
WHITE = (230, 237, 247)
MUTED = (147, 164, 184)


def font(name: str, size: int) -> ImageFont.FreeTypeFont:
    path = FONTS / name
    if not path.exists():
        path = FONTS / "arial.ttf"
    return ImageFont.truetype(str(path), size)


def cover_square(im: Image.Image, size: int) -> Image.Image:
    im = ImageOps.exif_transpose(im).convert("RGB")
    w, h = im.size
    side = min(w, h)
    # Portrait: keep the upper-middle area where the face is.
    left = (w - side) // 2
    top = max(0, int((h - side) * 0.18))
    im = im.crop((left, top, left + side, top + side))
    return im.resize((size, size), Image.LANCZOS)


def rounded_photo(im: Image.Image, size: int) -> Image.Image:
    im = cover_square(im, size)
    mask = Image.new("L", (size, size), 0)
    ImageDraw.Draw(mask).ellipse((0, 0, size - 1, size - 1), fill=255)
    out = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    out.paste(im, (0, 0), mask)
    return out


def gradient_bg(width: int, height: int) -> Image.Image:
    base = Image.new("RGB", (width, height), NAVY)
    px = base.load()
    for y in range(height):
        for x in range(width):
            t = (x / width) * 0.55 + (y / height) * 0.45
            px[x, y] = (
                int(NAVY[0] + (NAVY_2[0] - NAVY[0]) * t),
                int(NAVY[1] + (NAVY_2[1] - NAVY[1]) * t),
                int(NAVY[2] + (NAVY_2[2] - NAVY[2]) * t),
            )
    # Soft cyan glow top-right and green glow bottom-left.
    glow = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.ellipse((width - 480, -220, width + 180, 420), fill=(56, 189, 248, 46))
    gd.ellipse((-260, height - 330, 360, height + 180), fill=(52, 211, 153, 28))
    glow = glow.filter(ImageFilter.GaussianBlur(90))
    base = Image.alpha_composite(base.convert("RGBA"), glow)
    # Subtle grid.
    grid = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    gd = ImageDraw.Draw(grid)
    for x in range(0, width, 40):
        gd.line((x, 0, x, height), fill=(255, 255, 255, 7), width=1)
    for y in range(0, height, 40):
        gd.line((0, y, width, y), fill=(255, 255, 255, 7), width=1)
    return Image.alpha_composite(base, grid)


def social_card(lang: str, photo: Image.Image) -> None:
    width, height = 1200, 630
    card = gradient_bg(width, height).convert("RGBA")
    draw = ImageDraw.Draw(card)

    # Accent bar.
    draw.rounded_rectangle((64, 62, 132, 70), radius=4, fill=CYAN)
    draw.text((64, 88), "VICTOR BURBANO", font=font("segoeuib.ttf", 22), fill=CYAN)

    name = "Victor Daniel\nBurbano Rincón"
    draw.multiline_text((64, 132), name, font=font("segoeuib.ttf", 64), fill=WHITE, spacing=8)

    if lang == "es":
        role = "Desarrollador Full Stack"
        sub = "Java · Spring Boot · Angular · PHP"
        location = "Cali, Colombia  ·  Remoto / híbrido"
        domain = "victorburbano.com/es"
    else:
        role = "Full-Stack Developer"
        sub = "Java · Spring Boot · Angular · PHP"
        location = "Cali, Colombia  ·  Remote / hybrid"
        domain = "victorburbano.com"

    draw.text((66, 318), role, font=font("segoeuib.ttf", 34), fill=GREEN)
    draw.text((66, 366), sub, font=font("segoeui.ttf", 25), fill=MUTED)
    draw.text((66, 456), location, font=font("segoeui.ttf", 23), fill=WHITE)
    draw.text((66, 548), domain, font=font("segoeuib.ttf", 22), fill=CYAN)

    # Photo with rings.
    size = 300
    p = photo.resize((size, size), Image.LANCZOS)
    ring = Image.new("RGBA", (size + 26, size + 26), (0, 0, 0, 0))
    rd = ImageDraw.Draw(ring)
    rd.ellipse((0, 0, size + 25, size + 25), outline=CYAN, width=3)
    rd.ellipse((7, 7, size + 18, size + 18), outline=(56, 189, 248, 70), width=1)
    card.paste(ring, (816, 156), ring)
    card.paste(p, (829, 169), p)

    # Small availability pill.
    pill = (816, 492, 1116, 542)
    draw.rounded_rectangle(pill, radius=25, fill=(8, 30, 36), outline=GREEN, width=1)
    draw.ellipse((838, 510, 850, 522), fill=GREEN)
    label = "Open to work" if lang == "en" else "Disponible"
    draw.text((864, 505), label, font=font("segoeuib.ttf", 21), fill=GREEN)

    out = ASSETS / f"og-image-{lang}.jpg"
    card.convert("RGB").save(out, "JPEG", quality=90, optimize=True, progressive=True)
    print("wrote", out.relative_to(ROOT), out.stat().st_size)


def favicons() -> None:
    size = 512
    icon = Image.new("RGB", (size, size), NAVY)
    draw = ImageDraw.Draw(icon)
    # Gradient-ish background.
    for y in range(size):
        t = y / size
        draw.line((0, y, size, y), fill=(
            int(NAVY[0] + (NAVY_2[0] - NAVY[0]) * t),
            int(NAVY[1] + (NAVY_2[1] - NAVY[1]) * t),
            int(NAVY[2] + (NAVY_2[2] - NAVY[2]) * t),
        ))
    # Cyan corner glow.
    glow = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.ellipse((size - 260, -160, size + 120, 230), fill=(56, 189, 248, 80))
    glow = glow.filter(ImageFilter.GaussianBlur(55))
    icon = Image.alpha_composite(icon.convert("RGBA"), glow)
    draw = ImageDraw.Draw(icon)
    draw.rounded_rectangle((36, 36, size - 36, size - 36), radius=104, outline=(255, 255, 255, 28), width=3)
    f = font("segoeuib.ttf", 230)
    text = "VB"
    box = draw.textbbox((0, 0), text, font=f)
    tw, th = box[2] - box[0], box[3] - box[1]
    draw.text(((size - tw) / 2, (size - th) / 2 - 24), text, font=f, fill=WHITE)
    draw.ellipse((size - 150, size - 150, size - 122, size - 122), fill=GREEN)

    icon.save(ASSETS / "icon-512.png", optimize=True)
    icon.resize((192, 192), Image.LANCZOS).save(ASSETS / "icon-192.png", optimize=True)
    icon.resize((180, 180), Image.LANCZOS).save(ASSETS / "apple-touch-icon.png", optimize=True)
    icon.resize((32, 32), Image.LANCZOS).save(ASSETS / "favicon-32.png", optimize=True)
    icon.resize((48, 48), Image.LANCZOS).save(ASSETS / "favicon-48.png", optimize=True)
    icon.save(ASSETS / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
    print("wrote favicons")


def main() -> None:
    source = Image.open(ASSETS / "profileNew.png")
    photo = cover_square(source, 800)

    photo.resize((800, 800), Image.LANCZOS).save(ASSETS / "profile-800.jpg", "JPEG", quality=88, optimize=True, progressive=True)
    photo.resize((400, 400), Image.LANCZOS).save(ASSETS / "profile-400.jpg", "JPEG", quality=88, optimize=True, progressive=True)
    photo.save(ASSETS / "profile-800.webp", "WEBP", quality=86, method=6)
    photo.resize((400, 400), Image.LANCZOS).save(ASSETS / "profile-400.webp", "WEBP", quality=86, method=6)

    social_card("en", rounded_photo(source, 300))
    social_card("es", rounded_photo(source, 300))
    favicons()

    # Optimize thesis screenshots.
    for img_path in sorted((ASSETS / "appTesis").glob("*.png")):
        im = Image.open(img_path).convert("RGB")
        out = img_path.with_suffix(".webp")
        im.save(out, "WEBP", quality=82, method=6)
        print("wrote", out.relative_to(ROOT), out.stat().st_size)


if __name__ == "__main__":
    main()
