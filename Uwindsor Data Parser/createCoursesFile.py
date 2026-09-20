import fitz
from pypdf import PdfReader

PDF_NAME = "fall_2026_ugrd_timetable.pdf"
PDF_PAGE_SIZE = len(PdfReader(f"PDFs/{PDF_NAME}").pages)

timetable = fitz.open(f"PDFs/{PDF_NAME}")

#lines in the PDF that are irelevant and give the parser trouble
linesToDelete = [
    "Fall 2026 Course Offerings\n",
    "Thursday, September 17, 2026\n",
    "02:31:46 AM\n",
    "Course Section\n",
    "Credits\n",
    "Act\n",
    "Days\n",
    "Time\n",
    "Stop \n", 
    "Time\n",
    "Start \n", 
    "Date\n",
    "End \n", 
    "Date\n",
    "Bldg/Room\n",
    "Professor\n",
]

pdfText = ""
for page in timetable:
    pdfText += page.get_text()

for line in linesToDelete:
    pdfText = pdfText.replace(line, "")

for i in range(PDF_PAGE_SIZE):
    pdfText = pdfText.replace(f"Page {i}\n", "")

pdfText = "\n".join(line for line in pdfText.splitlines() if line.strip())

with open("./coursesFile.txt", "w+") as file:
    file.write(pdfText)
