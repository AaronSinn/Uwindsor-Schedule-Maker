import fitz
import re
import datetime
from Models.LectureModel import LectureModel
from Models.SectionModel import SectionModel

IS_PROF_AND_ROOM_STATED = False

doc = fitz.open("PDFs/fall_2024_ugrd_timetable.pdf")
#file = open('test_file.txt', "wt+")

for page in doc:
    text = page.get_text()
    #file.write(page.get_text())
    #print(page.get_text())

    courseRegex = re.compile(r"(\w{4}-\s*?\w{4}\w?) \(-\)\n(.*)\n(Section \d{1,2} [\s\S]*?)\w{4}-\s*?\w{4}\w?")
    courses = courseRegex.findall(text)

    file = open('course_text.txt', "wt+")

    for course in courses:
        file.write(str(course) + '\n')
        print(course, '\n')
