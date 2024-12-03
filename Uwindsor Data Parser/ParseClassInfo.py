import fitz
import re
from sqlalchemy.orm import sessionmaker

IS_PROF_AND_ROOM_STATED = False

doc = fitz.open("PDFs/fall_2024_ugrd_timetable.pdf")

for page in doc:
    text = page.get_text()

    courseRegex = re.compile(r"(\w{4}-\s*?\w{4}\w?) \(-\)\n(.*)\n(Section \d{1,2} [\s\S]*?)(?=\n\w{4}-\s*?\w{4}\w?|$)")
    courses = courseRegex.findall(text)

    for course in courses:
        print(course, '\n')

        course_code = course[0]
        course_title = course[1]
        section_details = course[2]

        sectionRegex = re.compile(r"""((Section /d{1,2})\n3.00?\n([LECLAB])\n(\D*?)\n?(\d\d:\d\d \w\w)?\n?(\d\d:\d\d)?\s?\n?([PMAM]{2})?\n?
                                  (\d\d\d\d)-\n(\d\d)-(\d\d)\n(\d\d\d\d)-\n(\d\d)-(\d\d))""")
        sections = sectionRegex.findall(section_details)

        for section in sections:
            print('SECTION: ', section, '\n')
