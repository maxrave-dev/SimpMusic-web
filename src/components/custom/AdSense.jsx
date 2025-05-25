'use client';

import { useEffect, useRef } from 'react';

const AdSense = ({ 
  adFormat = 'auto', 
  style = { display: 'block' },
  className = ''
}) => {
  const adRef = useRef(null);

  useEffect(() => {
    if (adRef.current && adRef.current.children.length === 0) {
      try {
        // Đảm bảo biến (window.adsbygoogle) đã được định nghĩa
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.error('AdSense error:', error);
      }
    }
  }, [adRef]);

  return (
    <div className={`adsense-container ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={style}
        data-ad-client="ca-pub-4666740922614578"
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default AdSense; 