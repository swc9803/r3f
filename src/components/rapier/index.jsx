import { Canvas } from '@react-three/fiber';
import './index.css';
import { Physics } from '@react-three/rapier';
import Experience from './Experience';
import { Suspense } from 'react';

const App = () => {
  return (
    <div>
      <Canvas shadows camera={{ position: [10, 10, 10], fov: 30 }}>
        <color attach="background" args={['#ececec']} />
        <Suspense>
          <Physics debug>
            <Experience />
          </Physics>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default App;
