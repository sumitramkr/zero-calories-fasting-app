export function convertToReadableDateTime(date) {
    const readableDate = new Date(date);
    // format it in eg. 3rd January 2024, 05.30 PM
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    };
    return readableDate.toLocaleString("en-US", options);
}

export function calculateFastTime(startTime, endTime) {
    let fastTime = {
        seconds: 0,
        minutes: 0,
        hours: 0,
        days: 0,
        weeks: 0,
        months: 0,
        years: 0
    };
    if (startTime && endTime) {
        const fastTimeInMilliseconds = endTime - startTime;
        const fastTimeInSeconds = Math.floor(fastTimeInMilliseconds / 1000);
        const fastTimeInMinutes = Math.floor(fastTimeInSeconds / 60);
        const fastTimeInHours = Math.floor(fastTimeInMinutes / 60);
        const fastTimeInDays = Math.floor(fastTimeInHours / 24);
        const fastTimeInWeeks = Math.floor(fastTimeInDays / 7);
        const fastTimeInMonths = Math.floor(fastTimeInWeeks / 4);
        const fastTimeInYears = Math.floor(fastTimeInMonths / 12);
        fastTime = {
            seconds: fastTimeInSeconds,
            minutes: fastTimeInMinutes,
            hours: fastTimeInHours,
            days: fastTimeInDays,
            weeks: fastTimeInWeeks,
            months: fastTimeInMonths,
            years: fastTimeInYears
        };
    }
    return fastTime;
}
