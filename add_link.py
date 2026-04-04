#!/usr/bin/env python3
import fitz  # PyMuPDF
import shutil

input_pdf = "/Users/impro/Projects/devfolio/public/assets/CV.pdf"
output_pdf = "/Users/impro/Projects/devfolio/public/assets/CV_new.pdf"

# Open the PDF
pdf = fitz.open(input_pdf)
page = pdf[0]  # First page

# Add a link annotation - position where LinkedIn typically is
link_rect = fitz.Rect(60, 728, 145, 742)

# Insert the link
page.insert_link({
    "kind": fitz.LINK_URI,
    "uri": "https://devfolio-mauve-six.vercel.app",
    "rect": link_rect,
    "from": link_rect
})

# Add visible "portfolio" text in blue
page.insert_text((60, 740), "portfolio", fontsize=10, color=(0, 0, 1))

# Draw underline
page.draw_line(fitz.Point(60, 743), fitz.Point(105, 743), color=(0, 0, 1), width=0.5)

# Save to new file
pdf.save(output_pdf)
pdf.close()

# Replace original with new
shutil.move(output_pdf, input_pdf)

print("Portfolio link added successfully!")
print("Link: https://devfolio-mauve-six.vercel.app")
print("Position: (60, 740) - blue 'portfolio' text with underline")
