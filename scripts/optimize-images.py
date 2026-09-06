"""
Genera las variantes WebP de /public/assets y el manifiesto que usa <Media>.

Ejecútalo cada vez que agregues fotos nuevas al catálogo:

    npm run optimize:images

Produce, por cada .jpeg de public/assets:
  opt/<nombre>-420.webp    rejilla en móvil
  opt/<nombre>-840.webp    rejilla en pantallas de alta densidad
  opt/<nombre>-full.webp   lightbox, a resolución completa: los flyers llevan
                           especificaciones impresas que deben quedar legibles

y escribe src/data/imageManifest.ts con los anchos REALES de cada variante. El
descriptor "w" del srcset tiene que coincidir con el ancho del archivo: si una
foto original mide menos que el objetivo no se amplía, se declara su ancho real
para que el navegador elija bien.

Requiere Pillow:  pip install Pillow
"""

from __future__ import annotations

import pathlib
import sys

try:
    from PIL import Image
except ImportError:  # pragma: no cover
    sys.exit('Falta Pillow. Instálalo con:  pip install Pillow')

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC_DIR = ROOT / 'public' / 'assets'
OUT_DIR = SRC_DIR / 'opt'
MANIFEST = ROOT / 'src' / 'data' / 'imageManifest.ts'

TARGETS = {'small': 420, 'large': 840}
QUALITY_GRID = 78
QUALITY_FULL = 82


def build() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    entries: dict[str, dict[str, int]] = {}
    before = after = 0

    sources = sorted(SRC_DIR.glob('*.jpeg')) + sorted(SRC_DIR.glob('*.jpg'))
    if not sources:
        sys.exit(f'No encontré imágenes en {SRC_DIR}')

    for path in sources:
        before += path.stat().st_size
        image = Image.open(path).convert('RGB')
        stem = path.stem
        widths: dict[str, int] = {}

        for key, target in TARGETS.items():
            width = min(target, image.width)          # nunca ampliamos
            height = round(image.height * width / image.width)
            out = OUT_DIR / f'{stem}-{target}.webp'
            image.resize((width, height), Image.LANCZOS).save(
                out, 'WEBP', quality=QUALITY_GRID, method=6
            )
            after += out.stat().st_size
            widths[key] = width

        full = OUT_DIR / f'{stem}-full.webp'
        image.save(full, 'WEBP', quality=QUALITY_FULL, method=6)
        after += full.stat().st_size

        entries[stem] = widths

    write_manifest(entries)

    print(f'{len(entries)} imágenes procesadas')
    print(f'  JPEG originales : {before / 1024 / 1024:.2f} MB')
    print(f'  WebP generados  : {after / 1024 / 1024:.2f} MB (3 variantes por imagen)')
    print(f'  Manifiesto      : {MANIFEST.relative_to(ROOT)}')


def write_manifest(entries: dict[str, dict[str, int]]) -> None:
    lines = [
        '/**',
        ' * GENERADO POR scripts/optimize-images.py — no lo edites a mano.',
        ' * Ancho real en píxeles de cada variante WebP. El srcset lo necesita para',
        ' * declarar descriptores "w" honestos cuando la foto original es más',
        ' * pequeña que el tamaño objetivo.',
        ' */',
        'export interface ManifestEntry {',
        '  small: number;',
        '  large: number;',
        '}',
        '',
        'export const imageManifest: Record<string, ManifestEntry> = {',
    ]
    for stem in sorted(entries):
        w = entries[stem]
        lines.append(f"  '{stem}': {{ small: {w['small']}, large: {w['large']} }},")
    lines.append('};')
    MANIFEST.write_text('\n'.join(lines) + '\n', encoding='utf-8')


if __name__ == '__main__':
    build()
