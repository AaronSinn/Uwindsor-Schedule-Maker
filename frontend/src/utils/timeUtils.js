export  const formatTimeString = (dateInput) => {
    const date = new Date(dateInput);

    // Extract hours and minutes
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const amPm = hours >= 12 ? 'pm' : 'am';

    // Convert to 12-hour format
    hours = hours % 12 || 12;

    // Pad minutes with leading zero if necessary
    const formattedMinutes = minutes.toString().padStart(2, '0');

    // Return formatted string
    return `${hours}:${formattedMinutes} ${amPm}`;
}

// Returns the row that the event will start or stop at
export const getGridRowStartOrEnd = (dateInput) => {
    const date = new Date(dateInput);

    // Extract hours and minutes
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Define start time (8:00 AM)
    const startHour = 8;

    // Calculate total minutes since the start of the day
    const totalMinutes = (hours - startHour) * 60 + minutes;

    // Calculate the grid row start (1 row for every 5 minutes)
    return Math.floor(totalMinutes / 5) + 1;
}

// Converts the days data from the backend to an object that can be used bt Prime's dropdown
export const dayArrayToObject = (days) => {
    let daysObject = [];

    if(days.includes('M')){
        daysObject = [...daysObject, {name: 'Monday', code: '1'}];
    }
    if(days.includes('T')){
        daysObject = [...daysObject, {name: 'Tuesday', code: '2'}];
    }
    if(days.includes('W')){
        daysObject = [...daysObject, {name: 'Wednesday', code: '3'}];
    }
    if(days.includes('TH')){
        daysObject = [...daysObject, {name: 'Thursday', code: '4'}];
    }
    if(days.includes('F')){
        daysObject = [...daysObject, {name: 'Friday', code: '5'}];
    }

    return daysObject;
}

  // Converts the time received from the backend to a Date object
export const timeStringToDate = (timeString) => {
    // Get the current date
    const currentDate = new Date();

    // Extract the hours and minutes from the time string
    const [time, meridian] = timeString.split(" ");
    const [hours, minutes] = time.split(":").map(Number);

    // Convert the hours based on AM/PM
    const adjustedHours = meridian === "PM" && hours !== 12
        ? hours + 12
        : meridian === "AM" && hours === 12
        ? 0
        : hours;

    // Create a new date with the extracted time
    const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
        adjustedHours,
        minutes
    );

    return date;
}