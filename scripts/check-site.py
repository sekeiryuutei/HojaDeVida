"""Static checks for the bilingual CV site."""
from html.parser import HTMLParser
from pathlib import Path
import json
import re
import sys

ROOT = Path(__file__).resolve().parent.parent
PAGES = [ROOT / "index.html", ROOT / "es" / "index.html", ROOT / "404.html"]


class Checker(HTMLParser):
    def __init__(self, path):
        super().__init__(convert_charrefs=True)
        self.path = path
        self.ids = []
        self.links = []
        self.images = []
        self.meta = {}
        self.title = ""
        self._in_title = False
        self._in_script = False
        self._script_type = ""
        self._script_data = []
        self.json_ld = []
        self.h1 = 0
        self.lang = ""

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "html":
            self.lang = attrs.get("lang", "")
        if "id" in attrs:
            self.ids.append(attrs["id"])
        if tag == "a" and "href" in attrs:
            self.links.append(attrs["href"])
        if tag == "img":
            self.images.append(attrs)
        if tag == "meta":
            key = attrs.get("name") or attrs.get("property")
            if key:
                self.meta[key] = attrs.get("content", "")
        if tag == "title":
            self._in_title = True
        if tag == "h1":
            self.h1 += 1
        if tag == "script":
            self._in_script = True
            self._script_type = attrs.get("type", "")
            self._script_data = []

    def handle_endtag(self, tag):
        if tag == "title":
            self._in_title = False
        if tag == "script":
            if self._script_type == "application/ld+json":
                self.json_ld.append("".join(self._script_data))
            self._in_script = False

    def handle_data(self, data):
        if self._in_title:
            self.title += data
        if self._in_script:
            self._script_data.append(data)


def check_page(path: Path):
    text = path.read_text(encoding="utf-8")
    parser = Checker(path)
    parser.feed(text)
    parser.close()

    errors = []
    warnings = []

    if not parser.lang:
        errors.append("missing <html lang>")
    if parser.h1 != 1:
        errors.append(f"expected exactly one <h1>, found {parser.h1}")
    if not parser.title.strip():
        errors.append("missing <title>")
    if len(parser.meta.get("description", "")) < 50:
        warnings.append("meta description is short")
    if len(parser.meta.get("description", "")) > 170:
        warnings.append("meta description is long")
    if not parser.meta.get("og:image"):
        errors.append("missing og:image")
    if not parser.meta.get("twitter:card"):
        errors.append("missing twitter:card")
    if not parser.meta.get("robots"):
        errors.append("missing robots meta")

    duplicates = {item for item in parser.ids if parser.ids.count(item) > 1}
    if duplicates:
        errors.append(f"duplicate ids: {sorted(duplicates)}")

    # Internal anchors.
    for link in parser.links:
        if link.startswith("#") and link != "#":
            if link[1:] not in parser.ids:
                errors.append(f"anchor target not found: {link}")
        if link.startswith("/") and not link.startswith("//"):
            candidate = ROOT / link.lstrip("/")
            if link.endswith("/"):
                candidate = candidate / "index.html"
            if not candidate.exists() and link not in ("/", "/es/"):
                warnings.append(f"absolute link target not in repo: {link}")

    # Local files referenced by src/href.
    for link in parser.links:
        if link.startswith(("http", "mailto:", "tel:", "#", "//")):
            continue
        clean = link.split("#")[0].split("?")[0]
        if not clean:
            continue
        if clean.startswith("/"):
            candidate = (ROOT / clean.lstrip("/")).resolve()
            if clean.endswith("/"):
                candidate = candidate / "index.html"
        else:
            candidate = (path.parent / clean).resolve()
        if not candidate.exists():
            errors.append(f"missing local link target: {link}")

    for img in parser.images:
        src = img.get("src", "")
        if not src or src.startswith(("http", "data:")):
            continue
        candidate = (path.parent / src).resolve()
        if not candidate.exists():
            errors.append(f"missing image: {src}")
        if "width" not in img or "height" not in img:
            warnings.append(f"image without width/height: {src}")
        if "alt" not in img:
            errors.append(f"image without alt: {src}")

    for block in parser.json_ld:
        try:
            json.loads(block)
        except json.JSONDecodeError as exc:
            errors.append(f"invalid JSON-LD: {exc}")

    print(f"\n== {path.relative_to(ROOT)} ==")
    print(f"lang={parser.lang} title={len(parser.title)} desc={len(parser.meta.get('description',''))} h1={parser.h1}")
    print(f"ids={len(parser.ids)} links={len(parser.links)} images={len(parser.images)} json-ld={len(parser.json_ld)}")
    for warning in warnings:
        print("WARN:", warning)
    for error in errors:
        print("ERROR:", error)
    return errors


def main():
    total_errors = 0
    for page in PAGES:
        total_errors += len(check_page(page))

    # sitemap and robots sanity.
    sitemap = (ROOT / "sitemap.xml").read_text(encoding="utf-8")
    for url in ("https://victorburbano.com/", "https://victorburbano.com/es/"):
        if url not in sitemap:
            print("ERROR: sitemap missing", url)
            total_errors += 1
    if "</content>" in sitemap or "<parameter" in sitemap:
        print("ERROR: sitemap contains tool contamination")
        total_errors += 1
    robots = (ROOT / "robots.txt").read_text(encoding="utf-8")
    if "Sitemap:" not in robots or "<parameter" in robots:
        print("ERROR: robots.txt is invalid")
        total_errors += 1

    print(f"\nTotal errors: {total_errors}")
    return 1 if total_errors else 0


if __name__ == "__main__":
    sys.exit(main())
