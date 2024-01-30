import { Canvas } from '@react-three/fiber';
import Experience from './Experience';
import { Scroll, ScrollControls } from '@react-three/drei';
import Interface from './Interface';
import ScrollManager from './ScrollManager';
import { useState } from 'react';

const App = () => {
  const [section, setSection] = useState(0);

  return (
    <>
      <Canvas shadows camera={{ position: [3, 3, 3], fov: 30 }}>
        <color attach="background" args={['#ececec']} />
        <ScrollControls pages={4} damping={0.1}>
          <ScrollManager section={section} onSectionChange={setSection} />
          <Experience />
          <Scroll html>
            <Interface />
          </Scroll>
        </ScrollControls>
      </Canvas>
    </>
  );
};

export default App;
