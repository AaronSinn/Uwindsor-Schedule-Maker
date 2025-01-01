import "./Weekdays.css"

export default function Weekdays(){
    return<>
        <div className="header">
            <ul className="weekdays">
            <li className="full-text">MONDAY</li>
            <li className="full-text">TUESDAY</li>
            <li className="full-text">WEDNESDAY</li>
            <li className="full-text">THURSDAY</li>
            <li className="full-text">FRIDAY</li>
            <li className="short-text">MON</li>
            <li className="short-text">TUE</li>
            <li className="short-text">WED</li>
            <li className="short-text">THU</li>
            <li className="short-text">FRI</li>
            </ul>
        </div>
    </>
}