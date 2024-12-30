import './class-form.css';
import { Dropdown } from 'primereact/dropdown';
import { useState, useEffect } from 'react';

export default function ClassForm({ GetAllCourses, GetCourseDropdownValues }) {
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
                setLoading(false); // Set loading to false regardless of success or error
            }
        };

        fetchDropdownValues();
    }, [GetCourseDropdownValues]);

    return (
        <div className="class-form-container">
            <h3>Add Class</h3>
            {loading ? (
                <p>Loading courses...</p> // Show a loading message while fetching
            ) : (
                <Dropdown
                    loading={loading}
                    value={selectedCourse}
                    options={coursesDropdownValues}
                    onChange={(e) => setSelectedCourse(e.value)}
                    optionLabel="name"
                    placeholder="Select a Course"
                    filter
                />
            )}
        </div>
    );
}