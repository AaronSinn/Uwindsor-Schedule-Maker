import axios from "axios"

export const GetAllCourses = async () => {
    try{
        const data = await axios.get(`http://localhost:5150/api/Course/GetAllCourses`);
        return data.data;
    }catch (error){
        if(axios.isAxiosError(error)){
            console.log("Axios Error Message: ", error.message);
            return error.message;
        } else{
            console.log("Error: ", error.message);
            return error.message;
        }
    }
}

export const GetCourseDropdownValues = async () => {
    try{
        const data = await axios.get(`http://localhost:5150/api/Course/GetCourseDropdownValues`);
        return data.data;
    }catch (error){
        if(axios.isAxiosError(error)){
            console.log("Axios Error Message: ", error.message);
            return error.message;
        } else{
            console.log("Error: ", error.message);
            return error.message;
        }
    }
}

export const GetSectionDataByCourseCode = async (code) => {
    try{
        const data = await axios.get(`http://localhost:5150/api/Course/GetCourseByCode?code=${code}`);
        // console.log(data);
        if(data.data.length > 1) { //if the course had a laboratory
            const sections = [...data.data[0].sections, ...data.data[1].sections]
            const sectionsWithCourseCode = sections.map(section => ({
                courseTitle: data.data[0].code,
                ...section
            }))
            return sectionsWithCourseCode;
        }
        const sectionsWithCourseCode = data.data[0].sections.map(section => ({
            courseTitle: data.data[0].code,
            ...section
        }))
        return sectionsWithCourseCode;
    }catch (error){
        if(axios.isAxiosError(error)){
            console.log("Axios Error Message: ", error.message);
            return error.message;
        } else{
            console.log("Error: ", error.message);
            return error.message;
        }
    }
}