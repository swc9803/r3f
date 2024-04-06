import { Canvas } from '@react-three/fiber';
import { Experience } from './Experience';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { Suspense } from 'react';
import { UI } from './UI';

const App = () => {
  return (
    <>
      <Canvas shadows camera={{ position: [0, 0, 8], fov: 42 }}>
        <color attach="background" args={['#171720']} />
        <fog attach="fog" args={['#171720', 10, 30]} />
        <Suspense>
          <Experience />
        </Suspense>
        <EffectComposer>
          <Bloom mipmapBlur intensity={1.2} />
        </EffectComposer>
      </Canvas>
      <UI />
    </>
  );
};

export default App;
