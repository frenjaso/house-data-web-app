export function getDisplayDateTime(epoch) {
    const date = getLocalizedDate(epoch, "America/Los_Angeles")

    let currentDay= String(date.getDate());
    let currentMonth = String(date.getMonth()+1)

    let currentHour = String(date.getHours()).padStart(2, '0');
    let currentMinute = String(date.getMinutes()).padStart(2,"0");
    let currentSecond = String(date.getSeconds()).padStart(2,"0");

    let currentDateTime = `${currentMonth}/${currentDay} - ${currentHour}:${currentMinute}:${currentSecond}`;
    return currentDateTime;
}

export function getTimeString(date) {
    let currentHour = String(date.getHours()).padStart(2, '0');
    let currentMinute = String(date.getMinutes()).padStart(2,"0");
    let currentSecond = String(date.getSeconds()).padStart(2,"0");

    let currentTime = `${currentHour}:${currentMinute}:${currentSecond}`;
    return currentTime;
}

export function getDateString(date) {
    let currentDay= String(date.getDate()).padStart(2, '0');
    let currentMonth = String(date.getMonth()+1).padStart(2,"0");
    let currentYear = date.getFullYear();

    let currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
    return currentDate;
}

export function getUtcTimeString(date) {
    let currentHour = String(date.getUTCHours()).padStart(2, '0');
    let currentMinute = String(date.getUTCMinutes()).padStart(2,"0");
    let currentSecond = String(date.getUTCSeconds()).padStart(2,"0");

    let currentTime = `${currentHour}:${currentMinute}:${currentSecond}`;
    return currentTime;
}

export function getUtcDateString(date) {
    let currentDay= String(date.getUTCDate()).padStart(2, '0');
    let currentMonth = String(date.getUTCMonth()+1).padStart(2,"0");
    let currentYear = date.getUTCFullYear();

    let currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
    return currentDate;
}

function getLocalizedDate(epoch, timezone) {
    const date = new Date(epoch);
    return new Date(date.toLocaleString("en-US", { timeZone: timezone }));
}