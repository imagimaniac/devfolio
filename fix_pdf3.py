#!/usr/bin/env python3
import fitz
import shutil

input_pdf = "/Users/impro/Projects/devfolio/public/assets/CV.pdf"
output_pdf = "/Users/impro/Projects/devfolio/public/assets/CV_new.pdf"

pdf = fitz.open(input_pdf)
page = pdf[0]

# Method: Search for 'linkedin' text and draw over it, then add new text
# Search for LinkedIn URL
for word in page.get_text("words"):
    if "linkedin.com" in word[4].lower():
        x0, y0, x1, y1 = word[:4]
        print(f"Found: {word[4]} at ({x0}, {y0}) to ({x1}, {y1})")
        
        # Create a covering rectangle with white color (match background)
        cover_rect = fitz.Rect(x0-2, y0-2, x1+2, y1+2)
        page.draw_rect(cover_rect, color=(1,1,1), fill=(1,1,1))
        
        # Add "portfolio" text in blue (same font size roughly)
        # Position at the start of where the URL was
        fontsize = 10  # approximate
        page.insert_text((x0, y1-2), "portfolio", fontsize=fontsize, color=(0, 0, 0.7))
        
        # Add underline
        page.draw_line(fitz.Point(x0, y1+1), fitz.Point(x0 + 50, y1+1), color=(0, 0, 0.7), width=0.5)
        
        print(f"Added 'portfolio' text and underline at ({x0}, {y1-2})")

# Save
pdf.save(output_pdf)
pdf.close()
shutil.move(output_pdf, input_pdf)

print("\nDone - replaced LinkedIn text with portfolio (blue, underlined)")
