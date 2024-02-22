import { useRef, useState } from 'react';
import { Grape } from './Grape.jsx';
import { Lime } from './Lime.jsx';
import { Orange } from './Orange.jsx';
import { Peach } from './Peach.jsx';
import { Strawberry } from './Strawberry.jsx';
import gsap from 'gsap';

export const Interface = () => {
  const flavor = [
    { name: 'Grape', color: '#4EBC38' },
    { name: 'Strawberry', color: '#FC5A8D' },
    { name: 'Peach', color: '#FFE5B4' },
    { name: 'Orange', color: '#FFA500' },
    { name: 'Lime', color: '#BFFF00' },
  ];

  const nameRef = useRef(null);
  const [currentName, setCurrentName] = useState('Grape');
  const [preventClick, setPreventClick] = useState(false);

  const selectFlavor = (color, name) => {
    if (!preventClick && currentName !== name) {
      setPreventClick(true);
      setCurrentName(name);

      // const refs = {
      //   Grape: grapeRef.current,
      //   Strawberry: strawberryRef.current,
      //   Peach: peachRef.current,
      //   Orange: orangeRef.current,
      //   Lime: limeRef.current,
      // };

      gsap.timeline({
        onStart: () => {},
        onComplete: () => {
          setPreventClick(false);
        },
      });

      setTimeout(() => {
        setPreventClick(false);
      }, 800);
    }
  };

  return (
    <div className="switch_container">
      <div ref={nameRef} className="name">
        {currentName}
      </div>
      <div className="fruit">
        <Grape />
        <Lime />
        <Orange />
        <Peach />
        <Strawberry />
      </div>
      <div className="switch_wrapper">
        {flavor.map((item) => (
          <button key={item.name} onClick={() => selectFlavor(item.color, item.name)}>
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
};
