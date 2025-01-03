import './EventList.css'
import Event from '../Event/Event'
import { v4 as uuidv4 } from "uuid"

export default function EventList({events, deleteEvent}){
    
    return (
        <>
            {events.length > 0 ? (
                <>
                    {events.map(event => 
                        event.days.map(day => (
                            <Event 
                                key={uuidv4()}
                                id={event.id}
                                title={event.title} 
                                startRow={event.startRow} 
                                endRow={event.endRow} 
                                duration={event.duration} 
                                location={event.location} 
                                day={day.code} 
                                bgColour={event.bgColour}
                                deleteEvent={deleteEvent}
                            />
                        ))
                    )}
                </>
            ) : (
                <></>
            )}
        </>
    );
    
}