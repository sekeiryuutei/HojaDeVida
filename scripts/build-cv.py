"""Build the downloadable CV PDFs from the printable HTML pages.

Usage:
    python scripts/build-cv.py

The script looks for Chrome or Edge, prints cv-en.html and cv-es.html to A4 PDFs and
overwrites assets/cv-en.pdf and assets/cv.pdf.
"""
from pathlib import Path
import shutil
import subprocess
import sys

ROOT = Path(__file__).resolve().parent.parent

CANDIDATES = [
    Path(r"C:\Program Files\Google\Chrome\Application\chrome.exe"),
    Path(r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"),
    Path(r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"),
    Path(r"C:\Program Files\Microsoft\Edge\Application\msedge.exe"),
    Path("/usr/bin/google-chrome"),
    Path("/usr/bin/google-chrome-stable"),
    Path("/usr/bin/chromium"),
    Path("/usr/bin/chromium-browser"),
    Path("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"),
    Path("/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge"),
]


def find_browser() -> Path:
    for candidate in CANDIDATES:
        if candidate.exists():
            return candidate
    found = (
        shutil.which("chrome")
        or shutil.which("google-chrome")
        or shutil.which("chromium")
        or shutil.which("msedge")
    )
    if found:
        return Path(found)
    raise SystemExit(
        "Chrome or Edge was not found. Install one of them or add its path to CANDIDATES."
    )


def build(browser: Path, source: Path, target: Path) -> None:
    if not source.exists():
        raise SystemExit(f"Missing source file: {source}")
    target.parent.mkdir(parents=True, exist_ok=True)
    command = [
        str(browser),
        "--headless=new",
        "--disable-gpu",
        "--no-pdf-header-footer",
        f"--print-to-pdf={target}",
        source.as_uri(),
    ]
    subprocess.run(command, check=True)
    print(f"wrote {target.relative_to(ROOT)} ({target.stat().st_size} bytes)")


def main() -> None:
    browser = find_browser()
    print(f"Using {browser}")
    build(browser, ROOT / "cv-en.html", ROOT / "assets" / "cv-en.pdf")
    build(browser, ROOT / "cv-es.html", ROOT / "assets" / "cv.pdf")
    print("Done. Keep cv-en.html and cv-es.html in sync with the site.")


if __name__ == "__main__":
    sys.exit(main())
