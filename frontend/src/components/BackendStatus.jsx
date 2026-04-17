import React, { useState, useEffect } from 'react';
import { API_BASE } from '../config';
import '../styles/wakeup.css';

const WAKEUP_ESTIMATE = 50; // Render free tier can take up to 50s

const BackendStatus = ({ children }) => {
  const [isWakingUp, setIsWakingUp] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [timeLeft, setTimeLeft] = useState(WAKEUP_ESTIMATE);
  const [errorCount, setErrorCount] = useState(0);

  useEffect(() => {
    let checkInterval;
    let timerInterval;

    const checkHealth = async () => {
      try {
        const res = await fetch(`${API_BASE}/health`);
        if (res.ok) {
          setIsReady(true);
          setIsWakingUp(false);
          clearInterval(checkInterval);
          clearInterval(timerInterval);
        } else {
          throw new Error('Not ready');
        }
      } catch (err) {
        setErrorCount(prev => prev + 1);
        // If it's taking more than a few seconds, show the wakeup screen
        if (errorCount > 2 && !isWakingUp && !isReady) {
          setIsWakingUp(true);
        }
      }
    };

    // Initial check
    checkHealth();

    // Regular health check interval
    checkInterval = setInterval(checkHealth, 3000);

    return () => {
      clearInterval(checkInterval);
      if (timerInterval) clearInterval(timerInterval);
    };
  }, [errorCount, isWakingUp, isReady]);

  useEffect(() => {
    let timerInterval;
    if (isWakingUp && timeLeft > 0) {
      timerInterval = setInterval(() => {
        setTimeLeft(prev => Math.max(0, prev - 1));
      }, 1000);
    }
    return () => clearInterval(timerInterval);
  }, [isWakingUp, timeLeft]);

  if (!isReady && isWakingUp) {
    const progress = ((WAKEUP_ESTIMATE - timeLeft) / WAKEUP_ESTIMATE) * 100;

    return (
      <div className="wakeup-container">
        <div className="wakeup-card">
          <div className="wakeup-icon pulse">
            🩺
          </div>
          <h1 className="wakeup-title">Starting Services</h1>
          <p className="wakeup-subtitle">
            The system is waking up from a deep sleep. 
            This usually happens on the first visit. 
            Hang tight!
          </p>
          
          <div className="wakeup-progress-container">
            <div 
              className="wakeup-progress-bar" 
              style={{ width: `${Math.min(100, progress)}%` }}
            ></div>
          </div>
          
          <div className="wakeup-timer">
            <span>{Math.round(progress)}% Complete</span>
            <span>Est. {timeLeft}s remaining</span>
          </div>

          <div style={{ marginTop: '24px', fontSize: '12px', color: '#475569' }} className="loader-dots">
            Connecting to server<span>.</span><span>.</span><span>.</span>
          </div>

          <button 
            className="wakeup-retry-btn"
            onClick={() => {
              setTimeLeft(WAKEUP_ESTIMATE);
              setErrorCount(0);
              fetch(`${API_BASE}/health`).then(res => {
                if(res.ok) setIsReady(true);
              }).catch(() => {});
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2v6h-6"></path><path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path><path d="M3 22v-6h6"></path><path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path></svg>
            Refresh Connection
          </button>
        </div>
      </div>
    );
  }

  // If not ready and not showing wakeup yet (still trying initial fast checks)
  if (!isReady) {
      return (
          <div className="wakeup-container" style={{ background: '#0f172a' }}>
              <div className="loader-dots" style={{ fontSize: '24px' }}>
                  Initializing<span>.</span><span>.</span><span>.</span>
              </div>
          </div>
      );
  }

  return children;
};

export default BackendStatus;
