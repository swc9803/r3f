import { useState } from 'react';
import { Interface } from './Interface.jsx';
import { Model } from './Model.jsx';
import './index.css';
import { Canvas } from '@react-three/fiber';

const App = () => {
  const flavor = [
    { name: 'Grape', color: '#4EBC38' },
    { name: 'Strawberry', color: '#FC5A8D' },
    { name: 'Peach', color: '#FFE5B4' },
    { name: 'Orange', color: '#FFA500' },
    { name: 'Lime', color: '#BFFF00' },
  ];

  const [selectedFlavor, setSelectedFlavor] = useState(flavor[0]);

  const handleFlavorChange = (color, name) => {
    setSelectedFlavor({ name, color });
  };

  return (
    <>
      <Interface
        flavor={flavor}
        selectedFlavor={selectedFlavor}
        onFlavorChange={handleFlavorChange}
      />
      <Canvas>
        <Model selectedFlavor={selectedFlavor} />
      </Canvas>
    </>
  );
};

export default App;
