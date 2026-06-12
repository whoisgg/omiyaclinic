"""Recorta las 6 hojas de momiji de la lámina (fondo blanco) a PNG transparentes.
Key por canal con Pillow puro (sin numpy): quita el blanco, mantiene la hoja
opaca, protege bordes con croma. Luego parte en grid 3x2 y recorta cada hoja.
"""
import os
from PIL import Image, ImageChops

SRC = "public/momiji/leaves-sheet.png"
OUT = "public/momiji/leaves"
COLS, ROWS = 3, 2
PAD = 12          # padding al recortar al bounding box
MAXW = 520        # ancho maximo de cada hoja exportada

os.makedirs(OUT, exist_ok=True)
im = Image.open(SRC).convert("RGB")
R, G, B = im.split()

# min y max por pixel (canales)
mn = ImageChops.darker(ImageChops.darker(R, G), B)
mx = ImageChops.lighter(ImageChops.lighter(R, G), B)
chroma = ImageChops.subtract(mx, mn)

# alpha por luminancia del minimo: blanco (mn alto) -> transparente,
# rampa suave entre 215 y 240, opaco bajo 215.
def ramp(v):
    if v >= 240:
        return 0
    if v <= 215:
        return 255
    return int((240 - v) * 255 / 25)

alpha_min = mn.point(ramp)
# proteccion de croma: opaco solo donde hay color real (croma alto)
chroma_alpha = chroma.point(lambda c: 255 if c >= 26 else 0)
alpha = ImageChops.lighter(alpha_min, chroma_alpha)
# piso: mata el alpha tenue del fondo (compresion / tinte del papel)
alpha = alpha.point(lambda a: 0 if a < 45 else a)

rgba = im.convert("RGBA")
rgba.putalpha(alpha)

W, H = rgba.size
cw, ch = W // COLS, H // ROWS
n = 0
for r in range(ROWS):
    for c in range(COLS):
        cell = rgba.crop((c * cw, r * ch, (c + 1) * cw, (r + 1) * ch))
        bbox = cell.split()[3].getbbox()
        if not bbox:
            continue
        x0, y0, x1, y1 = bbox
        x0 = max(0, x0 - PAD); y0 = max(0, y0 - PAD)
        x1 = min(cell.width, x1 + PAD); y1 = min(cell.height, y1 + PAD)
        leaf = cell.crop((x0, y0, x1, y1))
        if leaf.width > MAXW:
            h = round(leaf.height * MAXW / leaf.width)
            leaf = leaf.resize((MAXW, h), Image.LANCZOS)
        n += 1
        leaf.save(os.path.join(OUT, f"leaf-{n}.png"))
        print(f"leaf-{n}.png  {leaf.size}")

print(f"OK: {n} hojas recortadas en {OUT}")
