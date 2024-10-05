import Models.SectionModel as SectionModel

class LectureModel:

    def __init__(self, courseCode:str , courseTitle:str) -> None:
        self.courseCode = courseCode
        self.courseTitle = courseTitle
        self.lectureSectionList = []
        self.labSectionList = []

    def __str__(self) -> str:
        lectureInfo = "Course Code: " + self.courseCode + ", Course Title: " + self.courseTitle + "\n"

        for section in self.lectureSectionList:
            lectureInfo = lectureInfo + str(section)

        return lectureInfo