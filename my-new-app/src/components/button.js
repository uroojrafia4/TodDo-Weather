import React, { useContext } from 'react';
import { UserContext } from './timer';

export default function Button() {
    const user = useContext(UserContext); // Consuming the context value

    return (
        <button
            style={{
                marginTop: '10px',
                padding: '10px 20px',
                backgroundColor: '#2196F3',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
            }}
        >
            User: {user}
        </button>
    );
}
