import './Event.css'

export default function Event({ id, title, startRow, endRow, duration, location, day, bgColour, deleteEvent}){
    console.log(id, title, startRow, endRow, duration, location, day, bgColour)
    return<>
        <div className='event' style={{backgroundColor: bgColour, gridColumn: day, gridRowStart: startRow, gridRowEnd: endRow}}>
            <span className='cancel' onClick={() => deleteEvent(id)}>X</span>
            <div className='title'>{title}</div>
            <div className='buffer'></div>
            <div className='time'>{duration}</div>
            <div className='location'>{location}</div>  
        </div>
    </>
}