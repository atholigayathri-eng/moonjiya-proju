import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FlowingBackground = () => {
  const blob1Ref = useRef(null);
  const blob2Ref = useRef(null);
  const blob3Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (blob1Ref.current) {
        gsap.to(blob1Ref.current, {
          yPercent: 40,
          rotation: 45,
          ease: 'none',
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.5,
          },
        });
      }

      if (blob2Ref.current) {
        gsap.to(blob2Ref.current, {
          yPercent: -50,
          rotation: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 2,
          },
        });
      }

      if (blob3Ref.current) {
        gsap.to(blob3Ref.current, {
          scale: 1.3,
          ease: 'none',
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="flowing-bg-decor" aria-hidden="true">
      <div ref={blob1Ref} className="flowing-blob-1"></div>
      <div ref={blob2Ref} className="flowing-blob-2"></div>
      <div ref={blob3Ref} className="flowing-blob-3"></div>
    </div>
  );
};

export default FlowingBackground;
