import React from 'react';
import { Container } from 'reactstrap';
import { useState } from 'react';

import '../components/Jagged.css';


export default function Test() {

    const [text, setText] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevents the page from refreshing
        console.log('Submitted value:', text);
        setText(''); // Optional: clears the input after submission
    };

    return (
        <>
            <Container className="py-5">
                <h1>Test Page</h1>

                <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true">
                <filter id="ink-stamp">
                    {/* Higher baseFrequency (0.08) makes finer, grittier punk edges */}
                    <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.08"
                    numOctaves="3"
                    result="noise"
                    />
                    {/* Higher scale (12) makes the distortion clearly visible */}
                    <feDisplacementMap
                    in="SourceGraphic"
                    in2="noise"
                    scale="12"
                    xChannelSelector="R"
                    yChannelSelector="G"
                    />
                </filter>
                </svg>

                <hr />
                <form onSubmit={handleSubmit} className="punk-form">
                    <label htmlFor="textInput">Enter text: </label>
                    
                    {/* Wrap ONLY the input so the border hugs the text box */}
                    <div className="punk-input-wrapper">
                        <input
                            className="punk-input"
                            id="textInput"
                            type="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Type something..."
                        />
                    </div>

                    <button type="submit" className="punk-button">
                        <span>ADD KEYWORD</span>
                    </button>
                </form>
            </Container>
        </>
    )
}

