import './App.css'
import Nav from './components/Nav/Nav.jsx'
import Timeslots from './components/Timeslots/Timeslots.jsx'
import Weekdays from './components/Weekdays/Weekdays.jsx'
import Event from './components/Event/Event.jsx'
import ClassForm from './components/ClassForm/ClassForm.jsx'
import SectionForm from './components/SectionForm/SectionForm.jsx'
import CustomEventForm from './components/CustomEventForm/CustomEventForm.jsx'
import EventList from './components/EventList/EventList.jsx'
import { GetAllCourses, GetCourseDropdownValues } from './api.jsx'
import { useState } from 'react'

export default function App() {
  const [events, setEvents] = useState([]);

  const addEvent = (title, startTime, endTime, location, day, bgColour) => {
    // console.log(title, startTime, endTime, location, day, bgColour);
    const newEventList = [...events, {title, startTime, endTime, location, day, bgColour}]
    setEvents(newEventList);
  }

  return<>
    <Nav/>
    <div className="container"> 
      <div className="grid-container" id="grid-container">
        <Weekdays/>
        <div className="timeslots-container">
          <Timeslots/>
        </div>

        <div className="event-container">
          <EventList addEvent={addEvent} events={events}/>
          {/* <Event title={"comp-2200"} startTime={13} endTime={25} location={"Toldo 102"} day={1} bgColour={"#87CEEB"}/>
          <Event title={"comp-2200"} startTime={32} endTime={45} location={"Toldo 102"} day={1} bgColour={"#87CEEB"}/>
          <Event title={"comp-2200"} startTime={13} endTime={25} location={"Toldo 102"} day={2} bgColour={"#87CEEB"}/>
          <Event title={"comp-2200"} startTime={20} endTime={30} location={"Toldo 102"} day={3} bgColour={"#87CEEB"}/> */}
        </div>
      </div>
      <div className='sidebar-container'>
        {/* Use grid-area to layout the side bar */}
        {/* <span><button>export to png</button></span>
        <span><button>export to excel</button></span> */}
        <ClassForm GetAllCourses={GetAllCourses} GetCourseDropdownValues={GetCourseDropdownValues} />
        <SectionForm/>
        <CustomEventForm/>
      </div>
    </div>
  </>
}