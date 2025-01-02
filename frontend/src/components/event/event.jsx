import './Event.css'

// export default function Event({title, startTime, endTime, location, day, bgColour}){
export default function Event({title, startRow, endRow, duration, location, day, bgColour}){
    console.log(title, startRow, endRow, duration, location, day, bgColour)
    return<>
        <div className='event' style={{backgroundColor: bgColour, gridColumn: day, gridRowStart: startRow, gridRowEnd: endRow}}>
            <span className='cancel'>X</span>
            <div className='title'>{title}</div>
            <div className='buffer'></div>
            <div className='time'>{duration}</div>
            <div className='location'>{location}</div>  
        </div>
    </>
}