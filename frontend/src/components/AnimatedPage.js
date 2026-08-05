import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const AnimatedPage = ({ children, className = "" }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: 'power3.out',
        }
      );
    }
  }, []);

  return (
    <div ref={containerRef} className={`animated-page-wrapper ${className}`}>
      {children}
    </div>
  );
};

export default AnimatedPage;
