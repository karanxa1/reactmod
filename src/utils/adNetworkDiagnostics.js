// Ad Network Diagnostics Utility
// Helps diagnose CSP, network connectivity, and other ad loading issues

export const runAdNetworkDiagnostics = () => {
  console.group('🔧 [AD DIAGNOSTICS] Running comprehensive ad network diagnostics...');
  
  // 1. Check network connectivity
  console.log('🌐 [AD DIAGNOSTICS] Network Status:', {
    online: navigator.onLine,
    connection: navigator.connection ? {
      effectiveType: navigator.connection.effectiveType,
      downlink: navigator.connection.downlink,
      rtt: navigator.connection.rtt
    } : 'Not available'
  });
  
  // 2. Check for CSP headers
  const checkCSP = () => {
    const metaTags = document.querySelectorAll('meta[http-equiv="Content-Security-Policy"]');
    const cspHeaders = Array.from(metaTags).map(tag => tag.content);
    
    console.log('🛡️ [AD DIAGNOSTICS] CSP Meta Tags Found:', cspHeaders.length);
    cspHeaders.forEach((csp, index) => {
      console.log(`🛡️ [AD DIAGNOSTICS] CSP ${index + 1}:`, csp);
      
      // Check if ad domain is allowed
      const adDomain = 'pl27491390.profitableratecpm.com';
      const allowsAdDomain = csp.includes(adDomain) || csp.includes('*') || !csp.includes('script-src');
      console.log(`🛡️ [AD DIAGNOSTICS] CSP allows ${adDomain}:`, allowsAdDomain);
    });
    
    if (cspHeaders.length === 0) {
      console.log('✅ [AD DIAGNOSTICS] No CSP meta tags found - scripts should load freely');
    }
  };
  
  // 3. Test direct network access to ad domain
  const testAdNetworkAccess = async () => {
    const adDomain = 'https://pl27491390.profitableratecpm.com';
    
    try {
      console.log('🔍 [AD DIAGNOSTICS] Testing network access to ad domain...');
      
      // Use fetch with no-cors mode to test basic connectivity
      const response = await fetch(adDomain, {
        method: 'HEAD',
        mode: 'no-cors',
        cache: 'no-cache'
      });
      
      console.log('✅ [AD DIAGNOSTICS] Ad domain accessible:', {
        status: response.status || 'opaque',
        type: response.type
      });
    } catch (error) {
      console.error('❌ [AD DIAGNOSTICS] Ad domain access failed:', {
        error: error.message,
        name: error.name,
        stack: error.stack
      });
    }
  };
  
  // 4. Check for ad blockers
  const checkAdBlockers = () => {
    console.log('🚫 [AD DIAGNOSTICS] Checking for ad blockers...');
    
    // Common ad blocker detection methods
    const adBlockerTests = {
      'uBlock Origin': () => typeof window.uBlock !== 'undefined',
      'AdBlock Plus': () => typeof window.adblockplus !== 'undefined',
      'AdGuard': () => typeof window.adguard !== 'undefined',
      'Generic (ads.js blocked)': () => {
        try {
          const testScript = document.createElement('script');
          testScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
          return false; // If we can create it, no immediate blocking
        } catch (e) {
          return true;
        }
      }
    };
    
    let adBlockerDetected = false;
    Object.entries(adBlockerTests).forEach(([name, test]) => {
      try {
        const detected = test();
        if (detected) {
          console.warn(`🚫 [AD DIAGNOSTICS] ${name} detected`);
          adBlockerDetected = true;
        }
      } catch (e) {
        console.log(`🚫 [AD DIAGNOSTICS] ${name} test failed:`, e.message);
      }
    });
    
    if (!adBlockerDetected) {
      console.log('✅ [AD DIAGNOSTICS] No obvious ad blockers detected');
    }
  };
  
  // 5. Check browser compatibility
  const checkBrowserCompatibility = () => {
    console.log('🌍 [AD DIAGNOSTICS] Browser Compatibility:', {
      userAgent: navigator.userAgent,
      cookieEnabled: navigator.cookieEnabled,
      doNotTrack: navigator.doNotTrack,
      language: navigator.language,
      platform: navigator.platform,
      vendor: navigator.vendor
    });
    
    // Check for required APIs
    const requiredAPIs = {
      'fetch': typeof fetch !== 'undefined',
      'Promise': typeof Promise !== 'undefined',
      'addEventListener': typeof document.addEventListener !== 'undefined',
      'querySelector': typeof document.querySelector !== 'undefined',
      'createElement': typeof document.createElement !== 'undefined'
    };
    
    console.log('🌍 [AD DIAGNOSTICS] Required APIs:', requiredAPIs);
    
    const missingAPIs = Object.entries(requiredAPIs)
      .filter(([api, available]) => !available)
      .map(([api]) => api);
    
    if (missingAPIs.length > 0) {
      console.error('❌ [AD DIAGNOSTICS] Missing required APIs:', missingAPIs);
    } else {
      console.log('✅ [AD DIAGNOSTICS] All required APIs available');
    }
  };
  
  // 6. Check DOM state
  const checkDOMState = () => {
    console.log('📄 [AD DIAGNOSTICS] DOM State:', {
      readyState: document.readyState,
      hasHead: !!document.head,
      hasBody: !!document.body,
      scriptsCount: document.scripts.length,
      topBannerContainer: !!document.getElementById('container-top-native-banner'),
      mainBannerContainer: !!document.getElementById('container-6c60b3df6dc253ab9508ae6ced4c8836')
    });
  };
  
  // Run all diagnostics
  checkCSP();
  checkAdBlockers();
  checkBrowserCompatibility();
  checkDOMState();
  testAdNetworkAccess();
  
  console.groupEnd();
};

// Auto-run diagnostics in development
if (process.env.NODE_ENV === 'development') {
  // Run diagnostics after a short delay to ensure DOM is ready
  setTimeout(runAdNetworkDiagnostics, 2000);
}

export default runAdNetworkDiagnostics;