import React, { createContext, useContext, useState, useEffect } from 'react';
import Button from './button';

export const UserContext = createContext(); // Exporting context

export default function Timer() {
    const [time, setTime] = useState(0); // Initialize time
    const [isRunning, setIsRunning] = useState(true); // Track timer state
    const user = 'Rafia'; // Example user value

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        }
        return () => clearInterval(interval); // Cleanup interval
    }, [isRunning]);

    function stopTimer() {
        setIsRunning(false); // Stop the timer
    }

    function resumeTimer() {
        setIsRunning(true); // Resume the timer
    }
   function reset(){
   setIsRunning(false);
   setTime(0);
   setIsRunning(true);

   }
    return (
        <UserContext.Provider value={user}>
            <div style={{ textAlign: 'center', margin: '20px', fontFamily: 'Arial, sans-serif' }}>
                <h1 style={{ fontSize: '2rem', color: '#333' }}>
                    {String(time).padStart(2, '0')}
                </h1>
                <button
                    onClick={stopTimer}
                    style={{
                        margin: '5px',
                        padding: '10px 20px',
                        backgroundColor: '#f44336',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Pause
                </button>
                <button
                    onClick={resumeTimer}
                    style={{
                        margin: '5px',
                        padding: '10px 20px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Resume
                </button>
                <button
                    onClick={reset}
                    style={{
                        margin: '5px',
                        padding: '10px 20px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Reset
                </button>
                <Button />
            </div>
        </UserContext.Provider>
    );
}
