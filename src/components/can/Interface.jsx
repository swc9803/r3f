import { useState } from 'react';
import { Grape } from './Grape.jsx';
import { Lime } from './Lime.jsx';
import { Orange } from './Orange.jsx';
import { Peach } from './Peach.jsx';
import { Strawberry } from './Strawberry.jsx';
import gsap from 'gsap';

export const Interface = ({ flavor, selectedFlavor, onFlavorChange }) => {
  const [preventClick, setPreventClick] = useState(false);

  const selectFlavor = (color, name) => {
    if (!preventClick && selectedFlavor.name !== name) {
      setPreventClick(true);
      onFlavorChange(color, name);

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
    </div>
  );
};
