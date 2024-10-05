import pymupdf
import re
import datetime
from Models.LectureModel import LectureModel
from Models.SectionModel import SectionModel

IS_PROF_AND_ROOM_STATED = False

doc = pymupdf.open("PDFs/fall_2024_ugrd_timetable.pdf")

for page in doc:
    text = page.get_text()

    if(IS_PROF_AND_ROOM_STATED):
        #TODO: Define this when profs and rooms are added to the PDF
        lectureRegex = re.compile(r"(\w{4}-\s*?\w{4}\w?) \(-\)\n(.*)\n(.*)\n\S{4,5}\n(LEC)\n(\D*?)\n?(\d\d:\d\d \w\w)?\n?(\d\d:\d\d)?\s?\n?([PMAM]{2})?\n?(\d\d\d\d)-\n(\d\d)-(\d\d)\n(\d\d\d\d)-\n(\d\d)-(\d\d)")
    else:
        lectureRegex = re.compile(r"(\w{4}-\s*?\w{4}\w?) \(-\)\n(.*)\n(.*)\n\S{4,5}\n(LEC)\n(\D*?)\n?(\d\d:\d\d \w\w)?\n?(\d\d:\d\d)?\s?\n?([PMAM]{2})?\n?(\d\d\d\d)-\n(\d\d)-(\d\d)\n(\d\d\d\d)-\n(\d\d)-(\d\d)")
    lectures = lectureRegex.findall(text)

    #example lecture: ('AERO-1970A', 'Prac: Prof Devt Pilot Training', 'Section 1 ', 'LEC', 'M', '05:30 PM', '09:30', 'PM', '2024', '09', '05', '2024', '12', '04')
    for lecture in lectures:
        courseCode = lecture[0].strip()
        courseTitle = lecture[1]
        lectureClass = LectureModel(courseCode, courseTitle)

       
        sectionName = lecture[2][:-1]  #removes the trailing whitespace
        sectionType = lecture[3]
        sectionDays = lecture[4]
        startTime = lecture[5]
        endTime = lecture[6] + " " + lecture[7] #appends XX:XX and PM or AM
        startDate = datetime.datetime(int(lecture[8]), int(lecture[9]), int(lecture[10]))
        endDate = datetime.datetime(int(lecture[11]), int(lecture[12]), int(lecture[13]))
        #section will be a Lecture session, there will be a seperate regex for labs
        sectionClass = SectionModel(sectionName, sectionType, sectionDays, startTime, endTime, startDate, endDate)
        lectureClass.lectureSectionList.append(sectionClass)

        print(lectureClass, "\n\n")

        #MASSIVE TODO: Get a seperate refex for course and section. The current one mixes both and connot get the section info for courses with more than one lectue session