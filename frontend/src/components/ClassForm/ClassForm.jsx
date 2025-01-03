import './ClassForm.css';
import { Dropdown } from 'primereact/dropdown';
import { useState, useEffect } from 'react';

export default function ClassForm({ GetCourseDropdownValues, setCourse, setCourseSelectedState }) {
    const [selectedCourse, setSelectedCourse] = useState('');
    const [coursesDropdownValues, setCoursesDropdownValues] = useState([]); // State to hold dropdown values
    const [loading, setLoading] = useState(true); // State to track loading status

    useEffect(() => {
        const fetchDropdownValues = async () => {
            try {
                const values = await GetCourseDropdownValues(); // Await the promise
                setCoursesDropdownValues(values); // Update state with fetched data
            } catch (error) {
                console.error('Failed to fetch dropdown values:', error);
            } finally {
                //console.log(coursesDropdownValues);
                setLoading(false);
            }
        };

        fetchDropdownValues();
    }, [GetCourseDropdownValues]);

    return (
        <div className="class-form-container">
            <h2>Add Class</h2>
            {loading ? (
                <p>Loading courses...</p> // Show a loading message while fetching
            ) : (
                <Dropdown
                    loading={loading}
                    value={selectedCourse}
                    options={coursesDropdownValues}
                    onChange={(e) => {setSelectedCourse(e.value); setCourse(e.target.value.code); setCourseSelectedState(true)}}
                    optionLabel="name"
                    placeholder="Select a Course"
                    filter
                />
            )}
        </div>
    );
}