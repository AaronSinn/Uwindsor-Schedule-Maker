import './CustomEventForm.css'
import { Calendar } from "primereact/calendar";
import { useState } from 'react';
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button';
import { ColorPicker } from 'primereact/colorpicker';
import { MultiSelect } from 'primereact/multiselect';
        
export default function CustomEventForm(){
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [bgColour, setBgColour] = useState("#87CEEB") // Default colour is skyblue
    const [selectedDays, setSelectedDays] = useState(undefined);
    const days = [
        { name: 'Monday', code: 'M' },
        { name: 'Tuesday', code: 'T' },
        { name: 'Wednesday', code: 'W' },
        { name: 'Thursday', code: 'TH' },
        { name: 'Friday', code: 'F' }
    ];

     // Define the minimum and maximum dates for the time range
     const minTime = new Date();
     minTime.setHours(8, 0, 0); // 8:00 AM
 
     const maxTime = new Date();
     maxTime.setHours(22, 0, 0); // 9:00 PM
      
    return (
        <div className="custom-event-container">
            <h2>Add Custom Event</h2>
            <div>
                <h3>Title</h3>
                <InputText id="text-input" value={title} onChange={e => {setTitle(e.target.value)}}/>
            </div>

            <div className='time-container'>
                <div>
                    <h3>Start Time</h3>
                    <Calendar
                    id="time-input"
                    value={startTime}
                    onChange={e => {e.preventDefault(); setStartTime(e.value); console.log(e)}}
                    timeOnly
                    hourFormat="12" // Use "24" for 24-hour format
                    stepMinute={5}  // Restrict selection to multiples of 5 minutes
                    minDate={minTime} // Start of selectable range
                    maxDate={maxTime} // End of selectable range
                    />
                </div>

                <div>
                    <h3>End Time</h3>
                    <Calendar
                    id="time-input"
                    value={endTime}
                    onChange={e => {e.preventDefault(); setEndTime(e.value)}}
                    timeOnly
                    hourFormat="12" // Use "24" for 24-hour format
                    stepMinute={5}  // Restrict selection to multiples of 5 minutes
                    minDate={minTime} // Start of selectable range
                    maxDate={maxTime} // End of selectable range
                    />
                </div>
            </div>

            <div className='days-container'>

            </div>
            <h3>Days</h3>
                <MultiSelect id="days-input" options={days} optionLabel="name" value={selectedDays} onChange={(e) => setSelectedDays(e.value)}/>
            <div>
                <h3>Location</h3>
                <InputText id="text-input" value={location} onChange={e => {setLocation(e.target.value)}}/>
            </div>
            
            <div className='colour-picker-container'>
                <h3 id="colour-picker-title">Pick Background Colour:</h3>
                <ColorPicker format="hex" value={bgColour} onChange={(e) => setBgColour('#' + e.target.value)} />
            </div>
            <Button id="add-event-button" label="Add Event" severity="info" raised onClick={e => {console.log(e)}}/>
        </div>
    );
}
