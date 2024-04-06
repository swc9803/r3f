import { Canvas } from '@react-three/fiber';
import { Experience } from './Experience';

const App = () => {
  return (
    <>
      <Canvas shadows camera={{ position: [0, 0, 8], fov: 42 }}>
        <color attach="background" args={['#171720']} />
        <Experience />
        <fog attach="fog" args={['#171720', 10, 30]} />
      </Canvas>
    </>
  );
};

export default App;
