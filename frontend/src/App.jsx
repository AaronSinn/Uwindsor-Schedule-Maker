import './App.css'
import Nav from './components/nav/nav.jsx'
import Timeslots from './components/timeslots/timeslots.jsx'
import Weekdays from './components/weekdays/weekdays.jsx'
import Event from './components/event/event.jsx'
import ClassForm from './components/class-form/class-form.jsx'

export default function App() {
  return<>
    <Nav/>
    <div className="container"> 
      <div className="grid-container" id="grid-container">
        <Weekdays/>
        <div className="timeslots-container">
          <Timeslots/>
        </div>

        <div className="event-container">
          <Event title={"comp-2200"} startTime={13} endTime={25} location={"Toldo 102"} day={1} bgColour={"Skyblue"}/>
          <Event title={"comp-2200"} startTime={32} endTime={45} location={"Toldo 102"} day={1} bgColour={"Skyblue"}/>
          <Event title={"comp-2200"} startTime={13} endTime={25} location={"Toldo 102"} day={2} bgColour={"Skyblue"}/>
          <Event title={"comp-2200"} startTime={20} endTime={30} location={"Toldo 102"} day={3} bgColour={"Skyblue"}/>
        </div>
      </div>
      <div className='sidebar-container'>
        {/* Use grid-area to layout the side bar */}
        <span><button>export to png</button></span>
        <span><button>export to excel</button></span>
        <ClassForm/>
      </div>
    </div>
  </>
}