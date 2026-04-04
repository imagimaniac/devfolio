#!/usr/bin/env python3
import fitz
import shutil

input_pdf = "/Users/impro/Projects/devfolio/public/assets/CV.pdf"
output_pdf = "/Users/impro/Projects/devfolio/public/assets/CV_new.pdf"

pdf = fitz.open(input_pdf)
page = pdf[0]

# Get all existing links and their positions
links = page.get_links()
print(f"Found {len(links)} links")

# Find LinkedIn links and replace URI
for link in links:
    uri = link.get('uri', '')
    if 'linkedin' in uri.lower():
        rect = link.get('from')
        # Delete this link
        page.delete_link(link)
        
        # Add new link to portfolio at same position
        page.insert_link({
            "kind": fitz.LINK_URI,
            "uri": "https://devfolio-mauve-six.vercel.app",
            "rect": rect,
            "from": rect
        })
        print(f"Replaced LinkedIn link with portfolio at {rect}")

# Save
pdf.save(output_pdf)
pdf.close()
shutil.move(output_pdf, input_pdf)

print("Done - LinkedIn link now goes to portfolio website")
