import coursesFull from "./data/courses_full.json"
import coursesMin from "./data/courses_min.json"

export const GetAllCourses = async () => {
    try{
        return coursesFull;
    }catch (error){
        console.log("Error: ", error.message);
        return error.message;
    }
}

export const GetCourseDropdownValues = async () => {
    try{
        return coursesMin;
    }catch (error){
        console.log("Error: ", error.message);
        return error.message;
    }
}

export const GetSectionDataByCourseCode = async (code) => {
    try{
        const matchingCourses = coursesFull.filter(course => course.code === code);
        const sectionsWithCourseCode = matchingCourses.flatMap(courseData =>
            courseData.sections.map(section => ({
                courseTitle: courseData.code,
                ...section
            }))
        )
        return sectionsWithCourseCode;
    }catch (error){
        console.log("Error: ", error.message);
        return error.message;
    }
}