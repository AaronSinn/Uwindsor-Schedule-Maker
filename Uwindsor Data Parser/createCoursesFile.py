import fitz

timetable = fitz.open("PDFs/winter_2026_ugrd_timetable.pdf")

#lines in the PDF that are irelevant and give the parser trouble
linesToDelete = [
    "Winter 2026 Course Offerings\n",
    "Monday, November 17, 2025\n",
    "02:33:32 AM\n",
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
PDF_PAGE_SIZE = 75


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
