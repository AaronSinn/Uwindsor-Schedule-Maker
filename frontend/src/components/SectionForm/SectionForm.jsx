import { useState, useEffect } from 'react';
import './SectionForm.css'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Calendar } from "primereact/calendar";
import { ColorPicker } from 'primereact/colorpicker';
import { MultiSelect } from 'primereact/multiselect';    
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { v4 as uuidv4 } from "uuid"

export default function SectionForm({addEvent, formatTimeString, getGridRowStartOrEnd, GetSectionDataByCourseCode, selectedCourse, isCourseSelected, dayArrayToObject, timeStringToDate, sendErrorMessage}) {
    const defaultStartTime = new Date();
    defaultStartTime.setHours(9, 0, 0, 0);

    const defaultEndTime = new Date();
    defaultEndTime.setHours(10, 0, 0, 0);
    
    const [disabled, setDisabled] = useState(true);
    const [startTime, setStartTime] = useState(defaultStartTime);
    const [endTime, setEndTime] = useState(defaultEndTime);
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [bgColour, setBgColour] = useState("#87CEEB") // Default colour is skyblue
    const [selectedDays, setSelectedDays] = useState(undefined);
    const [dialogVisible, setDialogVisible] = useState(false); // determines if the table modal is visible
    const [sectionData, setSectionData] = useState([]);

    const days = [
        { name: 'Monday', code: '1' },
        { name: 'Tuesday', code: '2' },
        { name: 'Wednesday', code: '3' },
        { name: 'Thursday', code: '4' },
        { name: 'Friday', code: '5' }
    ];

    const minTime = new Date();
    minTime.setHours(8, 0, 0); // 8:00 AM

    const maxTime = new Date();
    maxTime.setHours(22, 0, 0); // 9:00 PM
    
    useEffect(() => {
        if (isCourseSelected) {
            const fetchDropdownValues = async (selectedCourse) => {
                try {
                    const values = await GetSectionDataByCourseCode(selectedCourse); // Await the promise
                    setSectionData(values); // Update state with fetched data
                    //console.log(values);
                } catch (error) {
                    console.error('Failed to fetch section values:', error);
                }
            };
    
            fetchDropdownValues(selectedCourse);
        }
    }, [isCourseSelected, selectedCourse]); // Dependencies

    const handleSelect = (rowData) => {
        // Extract data into variables
        const { id, courseTitle, title, type, days, startTime, endTime, location } = rowData;
        
        // Close the table dialog
        setDialogVisible(false)
        setDisabled(false);
        setTitle(courseTitle + ' ' + type);
        setStartTime(timeStringToDate(startTime));
        setEndTime(timeStringToDate(endTime));
        setSelectedDays(dayArrayToObject(days));
        setLocation(location);
    };
    
    const dialogFooterTemplate = () => {
        return <Button label="Ok" icon="pi pi-check" severity='info' onClick={() => setDialogVisible(false)} />;
    };

    const formCheck= () => {
        if(selectedDays === undefined) {
            sendErrorMessage('Custom Event Error', 'Select a day(s) for your event to occur.')
            return;
        }
        if(startTime == null || endTime == null){
            sendErrorMessage('Custom Event Error', 'Start time or end time is missing.')
            return;
        }
        if(startTime >= endTime) {
            sendErrorMessage('Custom Event Error', 'Event start time cannot occur after or during the end time.')
            return;
        }
        addEvent(
                uuidv4(),
                title, 
                getGridRowStartOrEnd(startTime), 
                getGridRowStartOrEnd(endTime), 
                formatTimeString(startTime) + '-' + formatTimeString(endTime),
                location,
                selectedDays,
                bgColour);
        return;
     }

    return(
        <div className='course-and-section-form-container'>

            <Dialog header="Flex Scroll" visible={dialogVisible} style={{ width: '75vw' }} maximizable
                    modal contentStyle={{ height: '300px' }} onHide={() => setDialogVisible(false)} footer={dialogFooterTemplate}>
                <DataTable value={sectionData} scrollable scrollHeight="flex" tableStyle={{ minWidth: '50rem' }}>
                    <Column field="courseTitle" header="Course Title"></Column>
                    <Column field="title" header="Section"></Column>
                    <Column field="type" header="LEC/LAB"></Column>
                    <Column field="days" header="Days"></Column>
                    <Column field="startTime" header="Start Time"></Column>
                    <Column field="endTime" header="End Time"></Column>
                    <Column field="location" header="Location"></Column>
                    <Column 
                        header="Select" 
                        body={(rowData) => (
                            <Button 
                                label="Select" 
                                icon="pi pi-check" 
                                severity='success' 
                                onClick={() => handleSelect(rowData)} 
                            />
                        )}
                    ></Column>
                </DataTable>
            </Dialog>

            <h2>Add Section</h2>
            
            {/* Button becomes visible when a course is */}
            <Button id='section-button' label='Select a LEC/LAB section' severity="info" disabled={!isCourseSelected} onClick={(e) => setDialogVisible(true)}/> 

            <div>
                <h3>Title</h3>
                <InputText id="section-title-input" value={title} disabled={disabled} onChange={e => {setTitle(e.target.value)}}/>
            </div>

            <div className='time-container'>

                <div>
                    <h3>Start Time</h3>
                    <Calendar
                    id="time-input"
                    value={startTime}
                    onChange={e => {setStartTime(e.value)}}
                    timeOnly
                    hourFormat="12" // Use "24" for 24-hour format
                    stepMinute={5}  // Restrict selection to multiples of 5 minutes
                    minDate={minTime} // Start of selectable range
                    maxDate={maxTime} // End of selectable range
                    disabled={disabled}
                    />
                </div>
                <div>
                    <h3>End Time</h3>
                    <Calendar
                    id="time-input"
                    value={endTime}
                    onChange={e => {setEndTime(e.value)}}
                    timeOnly
                    hourFormat="12" // Use "24" for 24-hour format
                    stepMinute={5}  // Restrict selection to multiples of 5 minutes
                    minDate={minTime} // Start of selectable range
                    maxDate={maxTime} // End of selectable range
                    disabled={disabled}
                    />
                </div>
            </div>

            <h3>Days</h3>
                <MultiSelect id="days-input" options={days} optionLabel="name" value={selectedDays} onChange={(e) => {console.log(e.value); setSelectedDays(e.value)}} disabled={disabled}/>
            <div></div>

            <div>
                <h3>Location</h3>
                <InputText id="location-input" value={location} disabled={disabled} onChange={(e) => setLocation(e.target.value)}/>
            </div>

            <div className='colour-picker-container'>
                <h3 id="colour-picker-title">Pick Background Colour:</h3>
                <ColorPicker format="hex" value={bgColour} onChange={(e) => setBgColour('#' + e.value)} />
            </div>

            <Button id="add-course-button" label="Add Course" severity="info" raised disabled={disabled} onClick={e => {formCheck()}}/>
        </div>
    )
}