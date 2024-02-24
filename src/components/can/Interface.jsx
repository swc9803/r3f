import { useState } from 'react';
import { Grape } from './Grape.jsx';
import { Lime } from './Lime.jsx';
import { Orange } from './Orange.jsx';
import { Peach } from './Peach.jsx';
import { Strawberry } from './Strawberry.jsx';
import gsap from 'gsap';
import { Model } from './Model.jsx';
import { Canvas } from '@react-three/fiber';

export const Interface = () => {
  const flavor = [
    { name: 'Grape', color: '#4EBC38' },
    { name: 'Strawberry', color: '#FC5A8D' },
    { name: 'Peach', color: '#FFE5B4' },
    { name: 'Orange', color: '#FFA500' },
    { name: 'Lime', color: '#BFFF00' },
  ];

  const [selectedFlavor, setSelectedFlavor] = useState(flavor[0]);
  const [preventClick, setPreventClick] = useState(false);

  const selectFlavor = (color, name) => {
    if (!preventClick && selectedFlavor.name !== name) {
      setPreventClick(true);
      setSelectedFlavor({ name, color });

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
      <div className="name">{selectedFlavor.name}</div>
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
      <Canvas>
        <Model selectedFlavor={selectedFlavor} />
      </Canvas>
    </div>
  );
};
