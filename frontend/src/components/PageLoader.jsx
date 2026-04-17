import React from 'react';

const PageLoader = () => (
  <div style={{
    height: '100vh',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#0f172a',
    color: '#fff'
  }}>
    <div className="loader-dots" style={{ fontSize: '18px' }}>
      Loading<span>.</span><span>.</span><span>.</span>
    </div>
  </div>
);

export default PageLoader;
