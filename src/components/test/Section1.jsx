import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef, useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger);

export const Section1 = () => {
  const boxRef1 = useRef();
  const boxRef2 = useRef();
  const boxRef3 = useRef();

  useEffect(() => {
    gsap.to(boxRef1.current, {
      scrollTrigger: {
        trigger: boxRef1.current,
        start: 'top 40%',
        end: '+=100',
        scrub: 2,
        markers: true,
      },
      opacity: 0.1,
      duration: 3,
    });
  }, []);

  return (
    <>
      <div ref={boxRef1} className="box box1">
        box1
      </div>
      <div ref={boxRef2} className="box box2">
        box2
      </div>
      <div ref={boxRef3} className="box box3">
        box3
      </div>
    </>
  );
};
