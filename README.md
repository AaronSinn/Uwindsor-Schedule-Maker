# [Uwindsor-Schedule-Maker](https://AaronSinn.github.io/Uwindsor-Schedule-Maker)
React app where users can create their weekly timetable for every class at the University of Windsor.

![screenshot](https://github.com/user-attachments/assets/d4fb22fd-2a53-409f-8ac9-d449bb01f0a7)

## Setup and Installation
Ensure that you have the lastest version of Python and Node.js installed.

## Parsing the Data and Seeding the Database
Change the URL in `ParseClassInfo.py` depending on the Port the backend is running on.
By default the Backend is hosted on `http://localhost:5150`

Move into Uwindsor Data Parser Directory
```bash
cd Uwindsor Data Parser
```
Install the dependencies
```bash
pip3 install -r requirements.txt
```
Create the Text file for the parser to work with - Modify any information regarding the PDF if necessary
```bash
py createCoursesFile.py
```

When you run the parser, POST requests will seed the databse.
```bash
py ParseClassInfo.py
```

## Running the Frontend
Move into your frontend folder.
```bash
cd frontend
```

Install the required modules
```bash
npm install
```

Run the Vite application using: 
```bash
npm run dev
```

Go To:
`http://localhost:5173/`