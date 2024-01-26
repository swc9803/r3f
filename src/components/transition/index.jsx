import { Canvas } from '@react-three/fiber';
import Experience from './Experience';
import { Suspense } from 'react';

const App = () => {
  return (
    <Canvas shadows camera={{ position: [10, 10, 10], fov: 30 }}>
      <Suspense>
        <Experience />
      </Suspense>
    </Canvas>
  );
};

export default App;
