// Import necessary libraries
import React, { useState, useEffect } from 'react';
import './App.css'; // Add any necessary styling here

const ReactionTimeGame = () => {
  const [isActive, setIsActive] = useState(false); // Is the button ready to be clicked?
  const [message, setMessage] = useState('Click "Start" to begin!');
  const [startTime, setStartTime] = useState(null); // When the button turns active
  const [reactionTime, setReactionTime] = useState(null); // Reaction time result
  const [timeoutId, setTimeoutId] = useState(null);
  const [congratsScreen, setCongratsScreen] = useState(false); // For showing congrats screen

  useEffect(() => {
    // Adding snowfall animation on mount
    const canvas = document.createElement('canvas');
    canvas.id = 'snowfall';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    const snowflakes = Array.from({ length: 100 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: Math.random() * 4 + 1,
      speed: Math.random() * 3 + 1,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      snowflakes.forEach((flake) => {
        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
        flake.y += flake.speed;
        if (flake.y > window.innerHeight) flake.y = -flake.radius;
      });
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      document.body.removeChild(canvas);
    };
  }, []);

  // Start the game
  const startGame = () => {
    setMessage('Wait for the button to turn green...');
    setIsActive(false);
    setReactionTime(null);
    setCongratsScreen(false);

    // Clear any existing timeouts to avoid overlapping games
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Set a random delay (between 2 and 5 seconds) before the button becomes active
    const delay = Math.random() * 3000 + 2000; // 2000ms to 5000ms

    const id = setTimeout(() => {
      setIsActive(true);
      setMessage('Click now!');
      setStartTime(Date.now());
    }, delay);

    setTimeoutId(id);
  };

  // Handle button click
  const handleClick = () => {
    if (!isActive) {
      // Button clicked too early
      setMessage('Too early! Wait for the green light.');
      setReactionTime(null);
      clearTimeout(timeoutId);
    } else {
      // Calculate reaction time
      const endTime = Date.now();
      const time = endTime - startTime;
      setReactionTime(time);
      if (time < 500) {
        setCongratsScreen(true);
      } else {
        setMessage(`Your reaction time is ${time}ms. Click "Start" to try again!`);
      }
      setIsActive(false);
    }
  };

  if (congratsScreen) {
    return (
      <div
        className="holiday-card"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          backgroundColor: '#1e792c',
          fontFamily: '"Mountains of Christmas", cursive',
          color: '#333',
          textAlign: 'center',
          padding: '20px',
          boxShadow: '0 0 15px rgba(0, 0, 0, 0.2)',
        }}
      >
        <div
          style={{
            backgroundColor: '#f8f9fa',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            maxWidth: '400px',
            textAlign: 'center',
          }}
        >
          <h1 style={{ fontSize: '2rem', marginBottom: '15px', color: '#2e8b57' }}>🎅 Happy New Year, Misheel! 🎄</h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '15px', color: '#555' }}>
            Hey, hope you are doing well!
          </p>
          <p style={{ fontSize: '1.2rem', marginBottom: '15px', color: '#555' }}>
            Congrats on passing the vibe check with fast reflexes.
          </p>
          <p style={{ fontSize: '1.2rem', marginBottom: '15px', color: '#555' }}>
            Thank you for hosting me in Singapore. I've had a lot of fun hanging out with you guys. I respect you as the cool hardworking Singapore-whiz, truly 🫡.
          </p>
          <p style={{ fontSize: '1.2rem', marginBottom: '15px', color: '#555' }}>
            Hope 2025 will be a good, happy, and kind year to you with lots and lots of "W"s in Apex too. A hangout in Europe would be mad too 🤞.
          </p>
          <p style={{ fontSize: '1.2rem', marginBottom: '15px', color: '#555' }}>
            Sincerely,
          </p>
          <p style={{ fontSize: '1.2rem', marginBottom: '15px', color: '#555' }}>
          Byambaa.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="reaction-time-game"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#ffebcd',
        backgroundImage: 'url(https://www.transparenttextures.com/patterns/bright-squares.png)',
        fontFamily: '"Mountains of Christmas", cursive',
        textAlign: 'center',
        padding: '20px',
      }}
    >
      <h1 style={{ color: '#333', marginBottom: '20px', fontSize: '3rem' }}>🎄 New Year Old Me 🎅</h1>
      <p style={{ color: '#333', marginBottom: '20px', fontSize: '1.5rem' }}>This is a holiday card for my gamer bud. Please, pass the vibe check.</p>
      <p style={{ color: '#555', marginBottom: '20px', fontSize: '1.5rem' }}>{message}</p>
      <button
        style={{
          backgroundColor: isActive ? '#008000' : '#8b0000',
          color: 'white',
          fontSize: '1.2rem',
          padding: '12px 25px',
          border: 'none',
          borderRadius: '12px',
          cursor: isActive ? 'pointer' : 'not-allowed',
          transition: 'background-color 0.3s ease',
          marginBottom: '15px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
        onClick={handleClick}
        disabled={!isActive && reactionTime === null}
      >
        {isActive ? '🎄 Click Me! 🎄' : 'Wait...'}
      </button>
      <button
        onClick={startGame}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          fontSize: '18px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        Start
      </button>
      <footer style={{ marginTop: '30px', color: '#888', fontSize: '14px' }}>
        Made with ❤️ for the holidays
      </footer>
    </div>
  );
};

export default ReactionTimeGame;
