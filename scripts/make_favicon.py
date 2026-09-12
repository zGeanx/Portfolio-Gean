from PIL import Image
import numpy as np, base64, io, os

img = Image.open(r'C:\Users\Gean\.gemini\antigravity-ide\brain\031eb459-b4f5-40e4-a072-9dbdfc7a88d2\.user_uploaded\media_1789237275847.jpg')
arr = np.array(img, dtype=np.float32)

# Crop the gL region
crop = arr[420:564, 141:332]

# Target mint color
target_color = (118, 209, 176)

# Compute alpha from green channel
alpha = np.clip(crop[:, :, 1] / 209.0, 0.0, 1.0)
threshold = 15.0 / 209.0
alpha = np.where(alpha < threshold, 0.0, (alpha - threshold) / (1.0 - threshold))
alpha = np.clip(alpha, 0.0, 1.0)

h, w = crop.shape[:2]
rgba = np.zeros((h, w, 4), dtype=np.uint8)
rgba[:, :, 0] = target_color[0]
rgba[:, :, 1] = target_color[1]
rgba[:, :, 2] = target_color[2]
rgba[:, :, 3] = (alpha * 255).astype(np.uint8)

out = Image.fromarray(rgba, mode='RGBA')
bbox = out.getbbox()
out_trimmed = out.crop(bbox)

# Save transparent PNG
png_path = r'C:\Users\Gean\Downloads\portfolio geanluca\public\favicon.png'
out_trimmed.save(png_path)
print('favicon.png saved. Size:', out_trimmed.size)

# Build SVG wrapping PNG as base64
buf = io.BytesIO()
out_trimmed.save(buf, format='PNG')
b64 = base64.b64encode(buf.getvalue()).decode()
W, H = out_trimmed.size

svg_lines = [
    '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"',
    '     viewBox="0 0 {W} {H}" width="{W}" height="{H}">'.format(W=W, H=H),
    '  <image href="data:image/png;base64,' + b64 + '"',
    '         width="{W}" height="{H}"/>'.format(W=W, H=H),
    '</svg>',
]
svg = '\n'.join(svg_lines)

svg_path = r'C:\Users\Gean\Downloads\portfolio geanluca\public\favicon.svg'
with open(svg_path, 'w', encoding='utf-8') as f:
    f.write(svg)
print('favicon.svg saved! ({} bytes)'.format(len(svg)))
