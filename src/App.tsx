import React, { useState, useEffect } from 'react';
import { useSDK } from '@telegram-apps/sdk-react';
import './App.css';
import axios from 'axios';

function App() {
  const sdk = useSDK();
  const [message, setMessage] = useState<string>('');
  const [serverStatus, setServerStatus] = useState<string>('Checking...');

  useEffect(() => {
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

    // Set up Telegram back button if in Telegram
    if (sdk) {
      sdk.enableBackButton();
      sdk.onBackButtonClick(() => {
        sdk.showAlert('Closing Mini App');
        sdk.close();
      });

      // Set Telegram theme
      sdk.onPlatformThemeChange(({ theme }) => {
        document.documentElement.className = theme;
      });
    }
  }, [sdk]);

  const handleMainButton = () => {
    if (sdk) {
      sdk.showMainButton();
      sdk.setMainButtonText('Submit');
      sdk.onMainButtonClick(() => {
        if (message.trim()) {
          sdk.showAlert(`You submitted: ${message}`);
          setMessage('');
        } else {
          sdk.showAlert('Please enter a message first');
        }
      });
    }
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
          {sdk ? (
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
