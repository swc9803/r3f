import { Scroll, ScrollControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Experience } from './Experience';
import { UI } from './UI';
import './style.scss';

const App = () => {
  return (
    <Canvas shadows camera={{ position: [0, 2, 8], fov: 30 }}>
      <color attach="background" args={['#61b6ff']} />
      <ScrollControls pages={3}>
        <Scroll>
          <Experience />
        </Scroll>
        <Scroll html>
          <UI />
        </Scroll>
      </ScrollControls>
    </Canvas>
  );
};

export default App;
