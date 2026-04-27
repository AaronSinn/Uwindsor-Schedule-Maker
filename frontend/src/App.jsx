import './App.css'
import Nav from './components/Nav/Nav.jsx'
import Timeslots from './components/Timeslots/Timeslots.jsx'
import Weekdays from './components/Weekdays/Weekdays.jsx'
import ClassForm from './components/ClassForm/ClassForm.jsx'
import SectionForm from './components/SectionForm/SectionForm.jsx'
import CustomEventForm from './components/CustomEventForm/CustomEventForm.jsx'
import EventList from './components/EventList/EventList.jsx'
import DownloadButton from './components/DownloadButton/DownloadButton.jsx'
import { ToastProvider } from './context/ToastContext.jsx'
import { EventsProvider } from './context/EventsContext.jsx'
import { CourseProvider } from './context/CourseContext.jsx'

export default function App() {
  return (
    <ToastProvider>
      <EventsProvider>
        <CourseProvider>
          <Nav />
          <div className="container">
            <div className="grid-container" id="grid-container">
              <Weekdays />
              <div className="timeslots-container">
                <Timeslots />
              </div>
              <div className="event-container">
                <EventList />
              </div>
            </div>
            <div className="sidebar-container">
              <div className="image-download-container">
                <DownloadButton />
              </div>
              <ClassForm />
              <SectionForm />
              <CustomEventForm />
            </div>
          </div>
        </CourseProvider>
      </EventsProvider>
    </ToastProvider>
  );
}
