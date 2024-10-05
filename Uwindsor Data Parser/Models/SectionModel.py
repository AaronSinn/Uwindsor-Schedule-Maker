import datetime

class SectionModel:

    def __init__(self, sectionName:str, sectionType:str, sectionDays:str, startTime:str, endTime:str, startDate:datetime, endDate:datetime, room="TBD", professor="TBD") -> None:
        self.sectionName = sectionName
        self.sectionType = sectionType
        self.sectionDays = sectionDays
        self.startTime = startTime
        self.endTime = endTime
        self.startDate = startDate
        self.endDate = endDate
        self.room = room
        self.professor = professor

    def __str__(self) -> str:
        return (f"Section Name: {self.sectionName}\n"
                f"Section Type: {self.sectionType}\n"
                f"Section Days: {self.sectionDays}\n"
                f"Start Time: {self.startTime}\n"
                f"End Time: {self.endTime}\n"
                f"Start Date: {self.startDate}\n"
                f"End Date: {self.endDate}\n"
                f"Room: {self.room}\n"
                f"Professor: {self.professor}")
