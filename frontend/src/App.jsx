import './App.css'
import Nav from './components/Nav/Nav.jsx'
import Timeslots from './components/Timeslots/Timeslots.jsx'
import Weekdays from './components/Weekdays/Weekdays.jsx'
import Event from './components/Event/Event.jsx'
import ClassForm from './components/ClassForm/ClassForm.jsx'
import SectionForm from './components/SectionForm/SectionForm.jsx'
import CustomEventForm from './components/CustomEventForm/CustomEventForm.jsx'
import EventList from './components/EventList/EventList.jsx'
import { GetAllCourses, GetCourseDropdownValues, GetSectionDataByCourseCode } from './api.jsx'
import { useState, useRef } from 'react'
import { Toast } from 'primereact/toast';

export default function App() {
  const [events, setEvents] = useState([]);
  const toastTopRight = useRef(null); // Error message text

  const sendErrorMessage = (summary, msg) => {
    toastTopRight.current.show({ severity: 'error', summary: summary, detail: msg, life: 3000 });
  }

  const addEvent = (title, startRow, endRow, duration, location, days, bgColour) => {
    const newEventList = [...events, {title: title, startRow: startRow, endRow: endRow, duration: duration, location: location, days: days, bgColour: bgColour}]
    setEvents(newEventList);
  }

  const formatTimeString = (dateInput) => {
    const date = new Date(dateInput);

    // Extract hours and minutes
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const amPm = hours >= 12 ? 'pm' : 'am';

    // Convert to 12-hour format
    hours = hours % 12 || 12;

    // Pad minutes with leading zero if necessary
    const formattedMinutes = minutes.toString().padStart(2, '0');

    // Return formatted string
    return `${hours}:${formattedMinutes} ${amPm}`;
  }

  // Returns the row that the event will start or stop at
  const getGridRowStartOrEnd = (dateInput) => {
    const date = new Date(dateInput);

    // Extract hours and minutes
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Define start time (8:00 AM)
    const startHour = 8;

    // Calculate total minutes since the start of the day
    const totalMinutes = (hours - startHour) * 60 + minutes;

    // Calculate the grid row start (1 row for every 5 minutes)
    return Math.floor(totalMinutes / 5) + 1;
  }
  console.log(GetSectionDataByCourseCode('COMP-2120'));
  return<>
    <Toast ref={toastTopRight} position="top-right" />
    <Nav/>
    <div className="container"> 
      <div className="grid-container" id="grid-container">
        <Weekdays/>
        <div className="timeslots-container">
          <Timeslots/>
        </div>

        <div className="event-container">
          <EventList events={events} />
          <Event title={"comp-2200"} startRow={13} endRow={25} duration={'10:00 am-11:00 am'} location={"Toldo 102"} day={1} bgColour={"#87CEEB"}/>
          <Event title={"comp-2200"} startRow={32} endRow={45} duration={'10:00 am-11:00 am'} location={"Toldo 102"} day={1} bgColour={"#87CEEB"}/>
          <Event title={"comp-2200"} startRow={13} endRow={25} duration={'10:00 am-11:00 am'} location={"Toldo 102"} day={2} bgColour={"#87CEEB"}/>
          <Event title={"comp-2200"} startRow={20} endRow={30} duration={'10:00 am-11:00 am'} location={"Toldo 102"} day={3} bgColour={"#87CEEB"}/>
        </div>
      </div>
      <div className='sidebar-container'>
        {/* Use grid-area to layout the side bar */}
        {/* <span><button>export to png</button></span>
        <span><button>export to excel</button></span> */}
        <ClassForm GetAllCourses={GetAllCourses} GetCourseDropdownValues={GetCourseDropdownValues} GetSectionDataByCourseCode={GetSectionDataByCourseCode}/>
        <SectionForm/>
        <CustomEventForm addEvent={addEvent} formatTimeString={formatTimeString} getGridRowStartOrEnd={getGridRowStartOrEnd} sendErrorMessage={sendErrorMessage}/>
      </div>
    </div>
  </>
}