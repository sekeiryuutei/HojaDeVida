"""Repair UTF-8 text that was read as Windows-1252 and re-saved as UTF-8.

This happens when PowerShell 5.1 `Get-Content` reads a UTF-8 file without a BOM
and `Set-Content -Encoding UTF8` writes it back. The original bytes can be
recovered by encoding the mojibake back to cp1252 and decoding as UTF-8.
"""
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parent.parent
TARGETS = [ROOT / "index.html", ROOT / "es" / "index.html"]


def encode_cp1252_keep_controls(text: str) -> bytes:
    out = bytearray()
    for char in text:
        if char == "\u009d":
            # cp1252 leaves 0x9D undefined; PowerShell preserved it as U+009D.
            out.append(0x9D)
            continue
        try:
            out.extend(char.encode("cp1252"))
        except UnicodeEncodeError as exc:
            raise ValueError(f"Cannot encode U+{ord(char):04X} ({char!r})") from exc
    return bytes(out)


def repair(path: Path) -> bool:
    raw = path.read_bytes()
    text = raw.decode("utf-8")
    if "\u00c3" not in text and "\u00c2" not in text and "\u00e2\u20ac" not in text:
        print(f"{path.name}: no mojibake found")
        return False

    recovered = encode_cp1252_keep_controls(text).decode("utf-8")
    if "\ufffd" in recovered:
        raise ValueError(f"{path}: recovery produced replacement characters")

    path.write_text(recovered, encoding="utf-8", newline="")
    print(f"{path.relative_to(ROOT)}: repaired ({len(raw)} -> {path.stat().st_size} bytes)")
    return True


if __name__ == "__main__":
    changed = 0
    for target in TARGETS:
        try:
            changed += int(repair(target))
        except Exception as exc:
            print(f"ERROR {target}: {exc}")
            sys.exit(1)
    print(f"Done. Files changed: {changed}")
