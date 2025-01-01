import './EventList.css'
import Event from '../Event/Event'
import { v4 as uuidv4 } from "uuid"

export default function EventList({events}){
    
    return(
        <>
            { events.length > 0 ? (
                <ul>
                    {events.map((event) => (
                        <Event key={uuidv4()} event={event}/>
                    ))}
                </ul>
            ) : (
                <p>No events available. Click "Add Event" to create one!</p>
            )}
        </>
    )
}