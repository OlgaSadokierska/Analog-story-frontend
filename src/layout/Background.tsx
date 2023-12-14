import React from 'react';
import backgroundImage from '../assets/img.jpg';

export default function Background() {
    return (
        <div
            className='main'
            style={{
                position: 'relative',
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh',
                overflow: 'hidden', // Ukryj paski przewijania
                margin: 0,
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                fontFamily: 'Arial, sans-serif',
                color: 'white',
            }}
        >
            <h1 style={{ fontSize: '2.5em', margin: 0 }}>Now, it is yours</h1>
            <p style={{ fontSize: '1.2em', margin: 0 }}>ANALOG STORY</p>
        </div>
    );
}
