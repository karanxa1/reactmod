import React from 'react';
import NativeBannerTop from './NativeBannerTop';

import './AdTest.css';

// Test component to verify ad implementation
const AdTest = () => {
  return (
    <div className="ad-test-container">
      <h1>Ad Implementation Test</h1>
      
      <div className="ad-test-section">
        <h2>Top Banner (320x50)</h2>
        <p>This should display a 320x50 banner ad from modzy.in</p>
        <NativeBannerTop />
      </div>
      
      <div className="ad-test-instructions">
        <h3>Test Instructions:</h3>
        <ul>
          <li>Check browser console for ad loading logs</li>
          <li>Verify top banner displays properly</li>
          <li>Test on mobile devices for responsive behavior</li>
          <li>Check ad performance and loading</li>
        </ul>
      </div>
    </div>
  );
};

export default AdTest;
