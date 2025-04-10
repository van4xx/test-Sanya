import React, { useState, useEffect } from 'react';
import {
  on,
  off,
  mainButton,
  backButton,
  invokeCustomMethod,
  themeParams
} from '@telegram-apps/sdk';
import './App.css';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState<string>('');
  const [serverStatus, setServerStatus] = useState<string>('Checking...');
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  useEffect(() => {
    // Check if running in Telegram
    // @ts-ignore - Telegram is added by the Telegram WebApp
    setIsInitialized(!!window.Telegram?.WebApp);

    // Check server connection
    const checkServer = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/health');
        if (response.data.status === 'ok') {
          setServerStatus('Connected to server');
        } else {
          setServerStatus('Server status unknown');
        }
      } catch (error) {
        setServerStatus('Failed to connect to server');
      }
    };

    checkServer();

    // Set up Telegram back button
    backButton.enable();
    
    const handleBackButton = () => {
      invokeCustomMethod('showAlert', { message: 'Closing Mini App' });
      invokeCustomMethod('close');
    };
    
    // Use the proper event name from the SDK
    on('backButtonClicked', handleBackButton);

    // Set color scheme based on Telegram theme
    const updateTheme = () => {
      document.documentElement.className = themeParams.colorScheme || 'light';
    };
    
    // Set initial theme
    updateTheme();
    
    // Listen for theme changes
    const handleThemeChange = () => {
      updateTheme();
    };
    
    on('themeChanged', handleThemeChange);

    return () => {
      off('backButtonClicked', handleBackButton);
      off('themeChanged', handleThemeChange);
    };
  }, []);

  const handleMainButton = () => {
    mainButton.show();
    mainButton.setText('Submit');
    
    const handleMainButtonClick = () => {
      if (message.trim()) {
        invokeCustomMethod('showAlert', { message: `You submitted: ${message}` });
        setMessage('');
      } else {
        invokeCustomMethod('showAlert', { message: 'Please enter a message first' });
      }
    };
    
    // Use the proper event name from the SDK
    on('mainButtonClicked', handleMainButtonClick);
    
    return () => {
      off('mainButtonClicked', handleMainButtonClick);
    };
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Telegram Mini App Demo</h1>
        <p>Server Status: {serverStatus}</p>
        
        <div className="input-container">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter a message"
            onClick={handleMainButton}
          />
        </div>
        
        <div className="info-container">
          <p>
            This is a Telegram Mini App demo. You can interact with Telegram's native UI elements.
          </p>
          {isInitialized ? (
            <p>TMA SDK initialized successfully!</p>
          ) : (
            <p>Not running inside Telegram or TMA SDK not initialized.</p>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
