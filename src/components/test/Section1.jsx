import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ButtonAppear = () => {
  useEffect(() => {
    gsap.from('.button1', {
      scale: 0,
      stagger: 0.1,
      repeat: -1,
      repeatDelay: 1,
      duration: 1,
      ease: 'power2.out',
    });
    gsap.from('.img1', {
      scaleY: 0,
      delay: 0.3,
      repeat: -1,
      repeatDelay: 1.3,
      duration: 1,
      ease: 'power2.out',
    });
  }, []);

  return (
    <div className="button_container">
      <div className="button_wrapper">
        <button className="button1">button1</button>
        <button className="button1">button2</button>
        <button className="button1">button3</button>
        <button className="button1">button4</button>
      </div>
      <img className="img1" src="/hover/kerrigan-zerg.png" alt="kerrigan" />
    </div>
  );
};

const Mask = () => {
  useEffect(() => {
    gsap.to('.article', {
      clipPath: 'circle(75%)',
      duration: 3,
      ease: 'power2.out',
      repeat: -1,
      repeatDelay: 1,
    });
  }, []);

  return (
    <div className="mask_wrapper">
      <div className="article">
        <p>
          text1 text1 text1 text1 text1 text1 text1 text1 text1 text1 text1 text1 text1
          text1 text1 text1 text1 text1 text1 text1
        </p>
      </div>
    </div>
  );
};

const Reverse = () => {
  useEffect(() => {
    gsap.to('.box', {
      clipPath: 'circle(75%)',
      duration: 3,
      ease: 'power2.out',
      repeat: -1,
      repeatDelay: 1,
    });
  }, []);

  return (
    <div className="reverse_wrapper">
      <div className="box" />
      <p>
        text1 text1 text1 text1 text1 text1 text1 text1 text1 text1 text1 text1 text1
        text1 text1 text1 text1 text1 text1 text1
      </p>
    </div>
  );
};

const texts = [
  { text: 'M' },
  { text: 'Y' },
  { text: '' },
  { text: 'N' },
  { text: 'A' },
  { text: 'M' },
  { text: 'E' },
  { text: '' },
  { text: 'I' },
  { text: 'S' },
  { text: '' },
  { text: 'C' },
  { text: 'H' },
  { text: 'O' },
  { text: 'I' },
];
const FillBox = () => {
  const wrapperRef = useRef(null);
  const boxRef = useRef(null);
  const textRef = useRef(null);

  const fillBox = gsap.timeline({ paused: true });

  useEffect(() => {
    ScrollTrigger.create({
      animation: fillBox,
      trigger: wrapperRef.current,
      start: 'top 70%',
      // end: "+=400",
      // scrub: 2,
      markers: true,
    });

    fillBox.from(textRef.current, {
      y: 10,
      opacity: 0,
      stagger: 0.1,
      duration: 0.5,
    });
    fillBox.to(boxRef.current, {
      clipPath: 'circle(75%)',
      ease: 'power2.out',
      duration: 2,
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [fillBox]);

  return (
    <div className="fill_wrapper" ref={wrapperRef}>
      <div className="box" ref={boxRef} />
      {texts.map((item, index) => (
        <p key={index} ref={textRef}>
          {item.text || '\u00A0'}
        </p>
      ))}
    </div>
  );
};

export const Section1 = () => {
  return (
    <>
      <ButtonAppear />
      <Mask />
      <Reverse />
      <FillBox />
    </>
  );
};
