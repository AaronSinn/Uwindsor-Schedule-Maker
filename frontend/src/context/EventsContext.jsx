import { createContext, useContext, useState } from 'react';

const EventsContext = createContext(null);

export function EventsProvider({ children }) {
    const [events, setEvents] = useState([]);

    const addEvent = (id, title, startRow, endRow, duration, location, days, bgColour) => {
        setEvents(prev => [...prev, { id, title, startRow, endRow, duration, location, days, bgColour }]);
    };

    const deleteEvent = (uuid) => {
        setEvents(prev => prev.filter(event => event.id !== uuid));
    };

    return (
        <EventsContext.Provider value={{ events, addEvent, deleteEvent }}>
            {children}
        </EventsContext.Provider>
    );
}

export const useEvents = () => useContext(EventsContext);
