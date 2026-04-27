import './ClassForm.css';
import { Dropdown } from 'primereact/dropdown';
import { useState, useEffect } from 'react';
import { GetCourseDropdownValues } from '../../api.jsx';
import { useCourse } from '../../context/CourseContext.jsx';

export default function ClassForm() {
    const { selectCourse } = useCourse();
    const [selectedCourse, setSelectedCourse] = useState('');
    const [coursesDropdownValues, setCoursesDropdownValues] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDropdownValues = async () => {
            try {
                const values = await GetCourseDropdownValues();
                setCoursesDropdownValues(values);
            } catch (error) {
                console.error('Failed to fetch dropdown values:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDropdownValues();
    }, []);

    return (
        <div className="class-form-container">
            <h2>Add Class</h2>
            {loading ? (
                <p>Loading courses...</p>
            ) : (
                <Dropdown
                    loading={loading}
                    value={selectedCourse}
                    options={coursesDropdownValues}
                    onChange={(e) => { setSelectedCourse(e.value); selectCourse(e.target.value.code); }}
                    optionLabel="name"
                    placeholder="Select a Course"
                    filter
                />
            )}
        </div>
    );
}
