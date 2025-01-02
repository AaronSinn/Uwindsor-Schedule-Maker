import { useState } from 'react';
import './SectionForm.css'
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Calendar } from "primereact/calendar";
import { ColorPicker } from 'primereact/colorpicker';
import { MultiSelect } from 'primereact/multiselect';    
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';

export default function SectionForm({}) {
    const [disabled, setDisabled] = useState(true);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [bgColour, setBgColour] = useState("#87CEEB") // Default colour is skyblue
    const [selectedDays, setSelectedDays] = useState(undefined);
    const [dialogVisible, setDialogVisible] = useState(false); // determines if the table modal is visible
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

    return(
        <div className='course-and-section-form-container'>
            <h2>Add Section</h2>
            {/* A modal table will pop up when clicked with the section information for the course. There will be an add column with a button to add the section. */}
            <Button id='section-button' label='Select a LEC/LAB section' severity="info" disabled={disabled}/>

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
                <MultiSelect id="days-input" options={days} optionLabel="name" value={selectedDays} onChange={(e) => setSelectedDays(e.value)} disabled={disabled}/>
            <div></div>

            <div>
                <h3>Location</h3>
                <InputText id="location-input" disabled={disabled}/>
            </div>

            <div className='colour-picker-container'>
                <h3 id="colour-picker-title">Pick Background Colour:</h3>
                <ColorPicker format="hex" value={bgColour} onChange={(e) => setBgColour('#' + e.value)} />
            </div>

            <Button id="add-course-button" label="Add Course" severity="info" raised disabled={disabled}/>
        </div>
    )
}