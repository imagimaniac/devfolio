#!/usr/bin/env python3
import fitz
import shutil
import re

input_pdf = "/Users/impro/Projects/devfolio/public/assets/CV.pdf"
output_pdf = "/Users/impro/Projects/devfolio/public/assets/CV_new.pdf"

# Open the PDF
pdf = fitz.open(input_pdf)
page = pdf[0]

# Get all existing links
existing_links = page.get_links()

# Delete all existing links (both LinkedIn and old portfolio)
for link in existing_links:
    page.delete_link(link)

# Get text as dict to find positions
text_dict = page.get_text("dict")

# Find LinkedIn URL position - search all spans
linkedin_rect = None
for block in text_dict.get("blocks", []):
    for line in block.get("lines", []):
        for span in line.get("spans", []):
            text = span.get("text", "")
            if "linkedin.com" in text.lower():
                # Found it - get the bounding box
                linkedin_rect = fitz.Rect(span["bbox"])
                # Replace the text - cover with white
                page.draw_rect(linkedin_rect, color=(1,1,1), fill=(1,1,1))
                print(f"Found LinkedIn at: {linkedin_rect}")
                break

# If we found the LinkedIn position, use it
if linkedin_rect:
    x = linkedin_rect.x0
    y = linkedin_rect.y0 + 2  # Slight offset for text
    
    # Add "portfolio" in blue
    page.insert_text((x, y), "portfolio", fontsize=10, color=(0, 0, 1))
    
    # Add underline
    text_width = 45
    page.draw_line(fitz.Point(x, y + 3), fitz.Point(x + text_width, y + 3), color=(0, 0, 1), width=0.5)
    
    # Add clickable link at same position
    link_rect = fitz.Rect(x, y - 4, x + text_width, y + 8)
    page.insert_link({
        "kind": fitz.LINK_URI,
        "uri": "https://devfolio-mauve-six.vercel.app",
        "rect": link_rect,
        "from": link_rect
    })
    print(f"Added portfolio link at: ({x}, {y})")
else:
    # Fallback position
    print("Using fallback position")
    x, y = 60, 82
    page.insert_text((x, y), "portfolio", fontsize=10, color=(0, 0, 1))
    page.draw_line(fitz.Point(x, y + 3), fitz.Point(x + 45, y + 3), color=(0, 0, 1), width=0.5)
    link_rect = fitz.Rect(x, y - 4, x + 45, y + 8)
    page.insert_link({
        "kind": fitz.LINK_URI,
        "uri": "https://devfolio-mauve-six.vercel.app",
        "rect": link_rect,
        "from": link_rect
    })

# Save
pdf.save(output_pdf)
pdf.close()

# Replace
shutil.move(output_pdf, input_pdf)

print("\nDone! Portfolio link added, LinkedIn removed.")
