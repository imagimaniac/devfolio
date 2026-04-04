#!/usr/bin/env python3
import fitz
import shutil

input_pdf = "/Users/impro/Projects/devfolio/public/assets/CV.pdf"
output_pdf = "/Users/impro/Projects/devfolio/public/assets/CV_new.pdf"

pdf = fitz.open(input_pdf)
page = pdf[0]

# Search for all text with 'linkedin'
words = page.get_text("words")
linkedin_found = False

for word in words:
    if "linkedin.com" in word[4].lower():
        x0, y0, x1, y1 = float(word[0]), float(word[1]), float(word[2]), float(word[3])
        print(f"Found word: {word[4]} at y0={y0}, y1={y1}")
        
        # Cover the entire line area with white
        rect = fitz.Rect(x0 - 5, y0 - 3, x1 + 5, y1 + 3)
        page.draw_rect(rect, color=(1,1,1), fill=(1,1,1))
        
        # Add new text - just "portfolio" (no URL) in same position area
        # Try to match the font better - use similar size
        page.insert_text((x0, y1 - 2), "portfolio", fontsize=9, color=(0, 0, 0.7))
        
        # Add underline
        page.draw_line(fitz.Point(x0, y1 + 1), fitz.Point(x0 + 45, y1 + 1), color=(0, 0, 0.7), width=0.5)
        
        linkedin_found = True
        print(f"Covered and added portfolio at ({x0}, {y1-2})")

if not linkedin_found:
    print("No LinkedIn text found!")

# Save
pdf.save(output_pdf)
pdf.close()
shutil.move(output_pdf, input_pdf)

print("\nDone")
