import './Event.css'

// export default function Event({title, startTime, endTime, location, day, bgColour}){
export default function Event({event}){
    
    return<>
        <div className='event' style={{backgroundColor: bgColour, gridColumn: day, gridRowStart: startTime, gridRowEnd:endTime}}>
            <span className='cancel'>X</span>
            <div className='title'>{title}</div>
            <div className='buffer'></div>
            <div className='time'>9:00 am-10:00 am</div>
            <div className='location'>{location}</div>  
        </div>
    </>
}