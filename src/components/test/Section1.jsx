import { useEffect } from 'react';
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
    <div class="button_container">
      <div class="button_wrapper">
        <button class="button1">button1</button>
        <button class="button1">button2</button>
        <button class="button1">button3</button>
        <button class="button1">button4</button>
      </div>
      <img class="img1" src="/hover/kerrigan-zerg.png" alt="kerrigan" />
    </div>
  );
};

export const Section1 = () => {
  return (
    <>
      <ButtonAppear />
    </>
  );
};
