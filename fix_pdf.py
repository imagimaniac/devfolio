#!/usr/bin/env python3
import fitz
import shutil

input_pdf = "/Users/impro/Projects/devfolio/public/assets/CV.pdf"
output_pdf = "/Users/impro/Projects/devfolio/public/assets/CV_new.pdf"

pdf = fitz.open(input_pdf)
page = pdf[0]

# Get text with positions
text_dict = page.get_text('dict')

# Find and remove LinkedIn URL, then add portfolio
for block in text_dict.get('blocks', []):
    if 'lines' not in block:
        continue
    for line in block['lines']:
        for span in line.get('spans', []):
            text = span.get('text', '')
            if 'linkedin.com' in text.lower():
                bbox = fitz.Rect(span['bbox'])
                
                # Cover with white rectangle to completely hide
                page.draw_rect(bbox, color=(1,1,1), fill=(1,1,1))
                
                # Get position for new text
                x = bbox.x0
                y = bbox.y1 - 2  # Adjust to baseline
                
                # Add "portfolio" in blue (matching typical link color)
                page.insert_text((x, y), "portfolio", fontsize=span.get('size', 10), color=(0, 0, 0.7))
                
                print(f"Replaced LinkedIn with portfolio at position ({x}, {y})")

# Save
pdf.save(output_pdf)
pdf.close()
shutil.move(output_pdf, input_pdf)

print("Fixed - replaced LinkedIn URL with portfolio text")
