import re
import json
import shutil

with open('./coursesFile.txt', 'r') as file:
    text = file.read()

courseRegex = re.compile(r"(\w{4}-\s*?\w{4}\w?) \(-\)\n(.*)\n(Section \d{1,2} [\s\S]*?)(?=\n\w{4}-\s*?\w{4}\w?|$)")
courses = courseRegex.findall(text)

all_courses = []
courses_min = []

course_min_Set = set()

for course in courses:
    print(course, '\n')

    course_code = course[0]
    course_title = course[1]
    section_details = course[2]

    sectionRegex = re.compile(r"(Section \d+) (Full)?\n?(\d.\d\d)?\n(\w+)\n?([A-Za-z]+)?\n?(\d\d:\d\d [APM]+)?\n?(\d\d:\d\d)?\s?\n?([APM]+)?\n(\d\d\d\d)-\n(\d\d-\d\d)\n(\d\d\d\d)-\n(\d\d-\d\d)")
    sections = sectionRegex.findall(section_details)

    sections_list = []

    for section in sections:
        #print('SECTION: ', section, '\n')
        days = []

        if(len(section[4]) > 1):
            if(section[4] == 'TH'):
                days = ['TH']

            if(section[4] == 'TTH'):
                days = ['T', 'TH']

            if(section[4] == 'MW'):
                days = ['M', 'W']
                
            if(section[4] == 'MFW'):
                days = ['M', 'W', 'F']

            if(section[4] == 'SA'):
                #GENG-3500, GENG-4400, NURS-2531, NURS-3542
                days = ['SA']

            if(section[4] == 'MTWTH'):
                days = ['M', 'T', 'W', 'TH']   
        else:
            days.append(section[4]) 
        
        new_section = {
            "title": section[0],
            "type": section[3],
            "days": days,
            "startTime": section[5],
            "endTime": section[6] + ' ' + section[7],
            "room": "",
            "professor": ""
        }

        sections_list.append(new_section)

    course = {
        "code": course_code.replace(" ", ""),
        "title": course_title,
        "sections": sections_list
    }

    all_courses.append(course)

    if course["code"] not in course_min_Set:
        courses_min.append({"name": course["code"], "code": course["code"]})
    course_min_Set.add(course["code"])

with open('./courses_full.json', 'w') as file:
    json.dump(all_courses, file, indent=2)

with open('./courses_min.json', 'w') as file:
    json.dump(courses_min, file, indent=2)

shutil.copy('./courses_full.json', '../frontend/src/data/courses_full.json')
shutil.copy('./courses_min.json', '../frontend/src/data/courses_min.json')