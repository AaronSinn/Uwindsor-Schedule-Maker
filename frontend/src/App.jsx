import './App.css'
import Nav from './components/Nav/Nav.jsx'
import Timeslots from './components/Timeslots/Timeslots.jsx'
import Weekdays from './components/Weekdays/Weekdays.jsx'
import Event from './components/Event/Event.jsx'
import ClassForm from './components/ClassForm/ClassForm.jsx'
import SectionForm from './components/SectionForm/SectionForm.jsx'
import CustomEventForm from './components/CustomEventForm/CustomEventForm.jsx'
import EventList from './components/EventList/EventList.jsx'
import DownloadButton from './components/DownloadButton/DownloadButton.jsx'
import { GetAllCourses, GetCourseDropdownValues, GetSectionDataByCourseCode } from './api.jsx'
import { useState, useRef } from 'react'
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button'
import html2canvas from "html2canvas"
import { formatTimeString, getGridRowStartOrEnd, dayArrayToObject, timeStringToDate } from './utils/timeUtils.js';

export default function App() {
  const [events, setEvents] = useState([]);
  const toastTopRight = useRef(null); // Error message text
  const [selectedCourse, setSelectedCourse] = useState('');
  const [isCourseSelected, setIsCourseSelected] = useState(false);

  const setCourse = (courseCode) => {
    setSelectedCourse(courseCode)
  }

  const setCourseSelectedState = (bool) => {
    setIsCourseSelected(bool);
  }

  const sendErrorMessage = (summary, msg) => {
    toastTopRight.current.show({ severity: 'error', summary: summary, detail: msg, life: 3000 });
  }

  const addEvent = (id, title, startRow, endRow, duration, location, days, bgColour) => {
    const newEventList = [...events, {id: id, title: title, startRow: startRow, endRow: endRow, duration: duration, location: location, days: days, bgColour: bgColour}]
    setEvents(newEventList);
  }

  const deleteEvent = (uuid) => {
    const newEventList = events.filter(event => {
      return event.id !== uuid;
    });
    setEvents(newEventList);
    console.log(events);
  }

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
          <EventList events={events} deleteEvent={deleteEvent}/>
          {/* <Event title={"comp-2200"} startRow={13} endRow={25} duration={'10:00 am-11:00 am'} location={"Toldo 102"} day={1} bgColour={"#87CEEB"}/>
          <Event title={"comp-2200"} startRow={32} endRow={45} duration={'10:00 am-11:00 am'} location={"Toldo 102"} day={1} bgColour={"#87CEEB"}/>
          <Event title={"comp-2200"} startRow={13} endRow={25} duration={'10:00 am-11:00 am'} location={"Toldo 102"} day={2} bgColour={"#87CEEB"}/>
          <Event title={"comp-2200"} startRow={20} endRow={30} duration={'10:00 am-11:00 am'} location={"Toldo 102"} day={3} bgColour={"#87CEEB"}/> */}
        </div>
      </div>
      <div className='sidebar-container'>
        <div class="image-download-container">
          <DownloadButton/>
        </div>

        <ClassForm GetCourseDropdownValues={GetCourseDropdownValues} setCourse={setCourse} setCourseSelectedState={setCourseSelectedState}/>
        <SectionForm addEvent={addEvent} 
                      formatTimeString={formatTimeString} 
                      getGridRowStartOrEnd={getGridRowStartOrEnd} 
                      GetSectionDataByCourseCode={GetSectionDataByCourseCode} 
                      selectedCourse={selectedCourse} 
                      isCourseSelected={isCourseSelected} 
                      dayArrayToObject={dayArrayToObject} 
                      timeStringToDate={timeStringToDate}
                      sendErrorMessage={sendErrorMessage}/>

        <CustomEventForm addEvent={addEvent} 
                      formatTimeString={formatTimeString} 
                      getGridRowStartOrEnd={getGridRowStartOrEnd} 
                      sendErrorMessage={sendErrorMessage}/>
      </div>
    </div>
  </>
}