import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import Experience from './Experience';
import { Suspense, useMemo } from 'react';
import { KeyboardControls } from '@react-three/drei';

// eslint-disable-next-line react-refresh/only-export-components
export const Controls = {
  forward: 'forward',
  back: 'back',
  left: 'left',
  right: 'right',
  jump: 'jump',
};

const App = () => {
  const map = useMemo(
    () => [
      { name: Controls.forward, keys: ['ArrowUp', 'KeyW'] },
      { name: Controls.back, keys: ['ArrowDown', 'KeyS'] },
      { name: Controls.left, keys: ['ArrowLeft', 'KeyA'] },
      { name: Controls.right, keys: ['ArrowRight', 'KeyD'] },
      { name: Controls.jump, keys: ['Space'] },
    ],
    [],
  );

  return (
    <KeyboardControls map={map}>
      <Canvas shadows camera={{ position: [10, 10, 10], fov: 30 }}>
        <color attach="background" args={['#ececec']} />
        <Suspense>
          <Physics debug gravity={[0, -4, 0]}>
            <Experience />
          </Physics>
        </Suspense>
      </Canvas>
    </KeyboardControls>
  );
};

export default App;
