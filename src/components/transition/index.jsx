import { Canvas, extend } from '@react-three/fiber';
import { Leva } from 'leva';
import Experience from './Experience';

import { TransitionMaterial } from './TransitionMaterial';

extend({
  TransitionMaterial,
});

const App = () => {
  return (
    <>
      <Leva />
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 30 }}>
        <color attach="background" args={['#333']} />
        <Experience />
      </Canvas>
    </>
  );
};

export default App;
