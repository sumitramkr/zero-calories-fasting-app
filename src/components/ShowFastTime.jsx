import { useEffect, useMemo, useState } from "react";
import { calculateFastTime, convertToReadableDateTime } from "../utils/GlobalFunctions";

const ShowFastTime = () => {
    const [startTime, setStartTime] = useState(Number(localStorage.getItem("startTime")) ?? null);
    const [endTime, setEndTime] = useState(Number(localStorage.getItem("endTime")) ?? null);
    const [reset, setReset] = useState(Boolean(localStorage.getItem("refresh")) ?? false);
    const [currentTime, setCurrentTime] = useState(Date.now());

    const { seconds, minutes, hours, days, weeks, months, years } = useMemo(() => calculateFastTime(startTime, endTime), [endTime]);
    const {
        seconds: seconds2,
        minutes: minutes2,
        hours: hours2,
        days: days2,
        weeks: weeks2,
        months: months2,
        years: years2
    } = useMemo(() => calculateFastTime(startTime, Date.now()), [startTime, currentTime]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(Date.now());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleTime = (e, action) => {
        e.preventDefault();
        if (action === "start") {
            setStartTime(() => Date.now());
            localStorage.setItem("startTime", Date.now());
        } else if (action === "end") {
            setEndTime(() => Date.now());
            localStorage.setItem("endTime", Date.now());
            localStorage.setItem("refresh", true);
            setReset(true);
        }
    };

    const handleReset = e => {
        e.preventDefault();
        setStartTime(null);
        setEndTime(null);
        setReset(false);
        localStorage.clear();
    };

    return (
        <div style={{ margin: "2rem", backgroundColor: "#213547", width: "50vw", borderRadius: "1rem", padding: "1rem 1rem 3rem 1rem" }}>
            <h1>Fasting Time</h1>
            {startTime ? <p>Start Time: {convertToReadableDateTime(startTime)}</p> : <> </>}
            {endTime ? <p>End Time: {convertToReadableDateTime(endTime)}</p> : <></>}
            {seconds ? (
                <p>{`Fasting Time: ${years ? years + " years," : ""} ${months ? (months % 12) + " months," : ""} ${
                    weeks ? (weeks % 7) + " weeks," : ""
                } ${days ? (days % 30) + " days," : ""} ${hours ? (hours % 60) + " hours," : ""} ${minutes ? (minutes % 60) + " minutes," : ""}  ${
                    seconds ? (seconds % 60) + " seconds," : ""
                }`}</p>
            ) : (
                <> </>
            )}

            {startTime && !endTime ? (
                <p>{`Current Fasting Time: ${years2 ? years2 + " years," : ""} ${months2 ? (months2 % 12) + " months," : ""} ${
                    weeks2 ? (weeks2 % 7) + " weeks," : ""
                } ${days2 ? (days2 % 30) + " days," : ""} ${hours2 ? (hours2 % 60) + " hours," : ""} ${
                    minutes2 ? (minutes2 % 60) + " minutes," : ""
                }  ${seconds2 ? (seconds2 % 60) + " seconds," : ""}`}</p>
            ) : (
                <> </>
            )}

            {!reset ? (
                !startTime ? (
                    <button onClick={e => handleTime(e, "start")}>Start Fasting</button>
                ) : (
                    <button onClick={e => handleTime(e, "end")}>End Fasting</button>
                )
            ) : (
                <></>
            )}

            {reset ? <button onClick={e => handleReset(e)}>Reset</button> : <></>}
        </div>
    );
};

export default ShowFastTime;
