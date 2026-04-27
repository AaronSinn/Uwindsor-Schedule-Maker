import { createContext, useContext, useState } from 'react';

const CourseContext = createContext(null);

export function CourseProvider({ children }) {
    const [selectedCourse, setSelectedCourse] = useState('');
    const [isCourseSelected, setIsCourseSelected] = useState(false);

    const selectCourse = (courseCode) => {
        setSelectedCourse(courseCode);
        setIsCourseSelected(true);
    };

    return (
        <CourseContext.Provider value={{ selectedCourse, isCourseSelected, selectCourse }}>
            {children}
        </CourseContext.Provider>
    );
}

export const useCourse = () => useContext(CourseContext);
