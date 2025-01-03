import './CustomEventForm.css'
import { Calendar } from "primereact/calendar";
import { useState } from 'react';
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button';
import { ColorPicker } from 'primereact/colorpicker';
import { MultiSelect } from 'primereact/multiselect';
import { v4 as uuidv4 } from "uuid"
        
export default function CustomEventForm({addEvent, formatTimeString, getGridRowStartOrEnd, sendErrorMessage}){
    const defaultStartTime = new Date();
    defaultStartTime.setHours(9, 0, 0, 0);

    const defaultEndTime = new Date();
    defaultEndTime.setHours(10, 0, 0, 0);
    
    const [startTime, setStartTime] = useState(defaultStartTime);
    const [endTime, setEndTime] = useState(defaultEndTime);
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [bgColour, setBgColour] = useState("#87CEEB") // Default colour is skyblue
    const [selectedDays, setSelectedDays] = useState(undefined);
    
    const days = [
        { name: 'Monday', code: 1 },
        { name: 'Tuesday', code: 2 },
        { name: 'Wednesday', code: 3 },
        { name: 'Thursday', code: 4 },
        { name: 'Friday', code: 5 }
    ];

     // Define the minimum and maximum dates for the time range
     const minTime = new Date();
     minTime.setHours(8, 0, 0); // 8:00 AM
 
     const maxTime = new Date();
     maxTime.setHours(22, 0, 0); // 9:00 PM

     // Checks if the day field is entered and the times are correct. Sends error and returns if not.
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
                    onChange={e => {e.preventDefault(); setStartTime(e.value);}}
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
            <Button id="add-event-button" label="Add Event" severity="info" raised onClick={e => {formCheck()}}/>
        </div>
    );
}
