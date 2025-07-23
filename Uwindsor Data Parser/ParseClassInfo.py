import fitz, re, requests

IS_PROF_AND_ROOM_STATED = False
DELETE_URL = 'http://localhost:5150/api/Course/DeleteAllCourses'
POST_URL= 'http://localhost:5150/api/Course/CreateCourse'
HEADERS = {
    "Content-Type": "application/json"
}

errorFile = open("errorFile.txt", "w+")

with open('./coursesFile.txt', 'r') as file:
    text = file.read()

courseRegex = re.compile(r"(\w{4}-\s*?\w{4}\w?) \(-\)\n(.*)\n(Section \d{1,2} [\s\S]*?)(?=\n\w{4}-\s*?\w{4}\w?|$)")
courses = courseRegex.findall(text)

#Deletes all of the current courses to make room for the new ones - TODO: maybe keep the old ones in the db instead, give the current courses a X202X code, frontend only uses course with X202X code?
delete_response = requests.delete(DELETE_URL)

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

    print(course, '\n\n')

    post_response = requests.post(POST_URL, json=course, headers=HEADERS)

    if post_response.status_code == 200:
        print("Request was successful!")
        print(post_response.json())  # if the response is JSON
    else:
        errorFile.write(f"Error: {post_response.status_code}")
        errorFile.write(post_response.text)
