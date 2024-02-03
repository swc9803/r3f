import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Experience from './Experience';
import { Scroll, ScrollControls } from '@react-three/drei';
import Interface from './Interface';
import ScrollManager from './ScrollManager';
import Menu from './Menu';
import { MotionConfig } from 'framer-motion';

const App = () => {
  const [section, setSection] = useState(0);
  const [menuOpened, setMenuOpened] = useState(false);

  useEffect(() => {
    setMenuOpened(false);
  }, [section]);

  return (
    <>
      <MotionConfig
        transition={{
          type: 'spring',
          mass: 5,
          stiffness: 50,
          damping: 50,
          restDelta: 0.0001,
        }}
      >
        <Canvas shadows camera={{ position: [0, 3, 10], fov: 42 }}>
          <color attach="background" args={['#e6e7ff']} />
          <ScrollControls pages={4} damping={0.1}>
            <ScrollManager section={section} onSectionChange={setSection} />
            <Scroll>
              <Experience section={section} />
            </Scroll>
            <Scroll html>
              <Interface />
            </Scroll>
          </ScrollControls>
        </Canvas>
        <Menu
          onSectionChange={setSection}
          menuOpened={menuOpened}
          setMenuOpened={setMenuOpened}
        />
      </MotionConfig>
    </>
  );
};

export default App;
