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